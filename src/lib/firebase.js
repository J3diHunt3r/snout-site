import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

function getFirebaseConfig() {
    return {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };
}

/**
 * Returns Firestore instance, or null if config is incomplete (site still works with fallbacks).
 * Optional VITE_FIREBASE_FIRESTORE_DATABASE_ID for a non-default named database (not "(default)").
 */
export function getFirebaseDb() {
    const cfg = getFirebaseConfig();
    if (!cfg.apiKey || !cfg.projectId) {
        return null;
    }
    const existing = getApps()[0];
    const app = existing ?? initializeApp(cfg);
    const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID;
    if (databaseId && String(databaseId).trim() !== '') {
        return getFirestore(app, String(databaseId).trim());
    }
    return getFirestore(app);
}

/**
 * Returns Firebase Functions instance, or null if config is incomplete.
 */
export function getFirebaseFunctions() {
    const cfg = getFirebaseConfig();
    if (!cfg.apiKey || !cfg.projectId) {
        return null;
    }
    const existing = getApps()[0];
    const app = existing ?? initializeApp(cfg);
    return getFunctions(app);
}

/**
 * Returns Firebase Auth instance, or null if config is incomplete.
 */
export function getFirebaseAuth() {
    const cfg = getFirebaseConfig();
    if (!cfg.apiKey || !cfg.projectId) {
        return null;
    }
    const existing = getApps()[0];
    const app = existing ?? initializeApp(cfg);
    return getAuth(app);
}

/**
 * Returns Firebase Storage instance, or null if config is incomplete.
 */
export function getFirebaseStorage() {
    const cfg = getFirebaseConfig();
    if (!cfg.apiKey || !cfg.projectId) {
        return null;
    }
    const existing = getApps()[0];
    const app = existing ?? initializeApp(cfg);
    return getStorage(app);
}

export function isFirebaseConfigured() {
    const cfg = getFirebaseConfig();
    return Boolean(cfg.apiKey && cfg.projectId);
}
