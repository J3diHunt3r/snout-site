import {
    collection,
    doc,
    getDoc,
    getDocs,
    getCountFromServer,
    limit,
    query,
    where,
} from 'firebase/firestore';
import { getFirebaseDb } from '../lib/firebase';

/**
 * @typedef {{
 *   totalUsers: number,
 *   totalPets: number,
 *   basicUsers: number,
 *   proUsers: number,
 *   businessUsers: number
 * }} PublicStats
 */

const DEFAULT_STATS_PATH = 'stats/public';

/** Thrown when stats cannot be loaded; `code` is stable for UI hints. */
export class StatsLoadError extends Error {
    /**
     * @param {'NOT_CONFIGURED' | 'BAD_PATH' | 'MISSING_DOC' | 'INVALID_DATA' | 'PERMISSION'} code
     * @param {string} message
     */
    constructor(code, message) {
        super(message);
        this.name = 'StatsLoadError';
        this.code = code;
    }
}

function num(v) {
    if (v == null || v === '') return 0;
    if (typeof v === 'string') {
        const parsed = Number(v.trim());
        return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : 0;
    }
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

/** First matching key wins (handles casing / snake_case from exports or manual entry). */
function pickNum(data, keys) {
    if (!data || typeof data !== 'object') return 0;
    for (const k of keys) {
        if (Object.prototype.hasOwnProperty.call(data, k) && data[k] != null && data[k] !== '') {
            return num(data[k]);
        }
    }
    return 0;
}

function normalizeStats(data) {
    if (!data || typeof data !== 'object') return null;
    return {
        totalUsers: pickNum(data, [
            'totalUsers',
            'TotalUsers',
            'total_users',
            'users',
            'userCount',
            'total_user',
        ]),
        totalPets: pickNum(data, ['totalPets', 'TotalPets', 'total_pets', 'pets', 'petCount', 'total_pet']),
        basicUsers: pickNum(data, [
            'basicUsers',
            'usersBasic',
            'basic_users',
            'BasicUsers',
            'basic',
            'freeUsers',
        ]),
        proUsers: pickNum(data, ['proUsers', 'usersPro', 'pro_users', 'ProUsers', 'pro', 'proUserCount']),
        businessUsers: pickNum(data, [
            'businessUsers',
            'usersBusiness',
            'business_users',
            'BusinessUsers',
            'business',
            'businessUserCount',
        ]),
    };
}

function resolveStatsPath() {
    const explicit = import.meta.env.VITE_FIREBASE_STATS_DOC_PATH;
    if (explicit && String(explicit).trim()) {
        return String(explicit).trim();
    }
    const col = import.meta.env.VITE_FIREBASE_STATS_COLLECTION || 'stats';
    const docId = import.meta.env.VITE_FIREBASE_STATS_DOC_ID || 'public';
    return `${col}/${docId}`;
}

/**
 * If stats/public is missing, list `stats` and use document `public` if present, else first doc (auto-ID friendly).
 */
async function tryLoadFromStatsCollection(db, requestedPath) {
    let listSnap;
    try {
        listSnap = await getDocs(query(collection(db, 'stats'), limit(25)));
    } catch (e) {
        const code = e?.code;
        if (code === 'permission-denied') {
            throw new StatsLoadError(
                'PERMISSION',
                'Firestore denied listing collection "stats". Rules must allow read on stats/{docId} (get + list). See firestore.rules.example.'
            );
        }
        throw e;
    }

    if (listSnap.empty) {
        throw new StatsLoadError(
            'MISSING_DOC',
            `No documents in collection "stats". Add a document (ID "public" recommended) with number fields: totalUsers, totalPets, basicUsers, proUsers, businessUsers.`
        );
    }

    const preferred = listSnap.docs.find((d) => d.id === 'public');
    const picked = preferred ?? listSnap.docs[0];
    const resolvedPath = `stats/${picked.id}`;

    if (import.meta.env.DEV) {
        if (!preferred && requestedPath === 'stats/public') {
            console.warn(
                `[stats] No document at "stats/public". Using "${resolvedPath}" instead. Add or rename a document to ID "public" for a stable path.`
            );
        }
    }

    return { raw: picked.data(), resolvedPath };
}

async function fetchFromDocument(db) {
    const path = resolveStatsPath();
    const segments = path.split('/').filter(Boolean);
    if (segments.length < 2) {
        throw new StatsLoadError(
            'BAD_PATH',
            `Stats path must be collection/document (e.g. stats/public). Current: "${path}"`
        );
    }
    const docRef = doc(db, ...segments);
    let snap;
    try {
        snap = await getDoc(docRef);
    } catch (e) {
        const code = e?.code;
        if (code === 'permission-denied') {
            throw new StatsLoadError(
                'PERMISSION',
                'Firestore denied read. Add a rule allowing read on stats/{docId} (see firestore.rules.example in the repo).'
            );
        }
        throw e;
    }

    let raw;
    let resolvedPath = path;

    if (snap.exists()) {
        raw = snap.data();
    } else if (segments.length === 2 && segments[0] === 'stats') {
        const fallback = await tryLoadFromStatsCollection(db, path);
        raw = fallback.raw;
        resolvedPath = fallback.resolvedPath;
    } else {
        if (import.meta.env.DEV) {
            console.warn(
                `[stats] No document at "${path}". Project: ${import.meta.env.VITE_FIREBASE_PROJECT_ID}`
            );
        }
        throw new StatsLoadError(
            'MISSING_DOC',
            `No document at "${path}". Create it in Firestore or use collection "stats" with any document ID (we will fall back only for stats/*).`
        );
    }

    if (import.meta.env.DEV) {
        console.info(`[stats] Loaded "${resolvedPath}" — fields in document:`, Object.keys(raw || {}));
    }

    const normalized = normalizeStats(raw);
    if (!normalized) {
        throw new StatsLoadError('INVALID_DATA', 'stats document data could not be read.');
    }

    if (import.meta.env.DEV) {
        const sum =
            normalized.totalUsers +
            normalized.totalPets +
            normalized.basicUsers +
            normalized.proUsers +
            normalized.businessUsers;
        if (sum === 0) {
            console.warn(
                '[stats] All counts are 0. Field names may not match. Expected any of: totalUsers, totalPets, basicUsers, proUsers, businessUsers (or common aliases). See keys logged above.'
            );
        }
    }

    return normalized;
}

async function fetchFromAggregate(db) {
    const usersCollection = import.meta.env.VITE_FIREBASE_USERS_COLLECTION || 'users';
    const petsCollection = import.meta.env.VITE_FIREBASE_PETS_COLLECTION || 'pets';
    const planField = import.meta.env.VITE_FIREBASE_USER_PLAN_FIELD || 'plan';

    const planPro = import.meta.env.VITE_FIREBASE_PLAN_PRO_VALUE || 'pro';
    const planBasic = import.meta.env.VITE_FIREBASE_PLAN_BASIC_VALUE || 'basic';
    const planBusiness = import.meta.env.VITE_FIREBASE_PLAN_BUSINESS_VALUE || 'business';

    const usersRef = collection(db, usersCollection);
    const petsRef = collection(db, petsCollection);

    const [totalUsersSnap, totalPetsSnap, proSnap, basicSnap, businessSnap] = await Promise.all([
        getCountFromServer(query(usersRef)),
        getCountFromServer(query(petsRef)),
        getCountFromServer(query(usersRef, where(planField, '==', planPro))),
        getCountFromServer(query(usersRef, where(planField, '==', planBasic))),
        getCountFromServer(query(usersRef, where(planField, '==', planBusiness))),
    ]);

    return {
        totalUsers: totalUsersSnap.data().count,
        totalPets: totalPetsSnap.data().count,
        basicUsers: basicSnap.data().count,
        proUsers: proSnap.data().count,
        businessUsers: businessSnap.data().count,
    };
}

/**
 * Loads public stats for the marketing site.
 * Mode: VITE_FIREBASE_STATS_MODE=document (default) | aggregate
 * @returns {Promise<PublicStats>}
 */
export async function fetchPublicStats() {
    const db = getFirebaseDb();
    if (!db) {
        throw new StatsLoadError(
            'NOT_CONFIGURED',
            'Missing VITE_FIREBASE_API_KEY or VITE_FIREBASE_PROJECT_ID in .env.local'
        );
    }

    const mode = (import.meta.env.VITE_FIREBASE_STATS_MODE || 'document').toLowerCase();

    if (mode === 'aggregate') {
        return fetchFromAggregate(db);
    }
    return fetchFromDocument(db);
}
