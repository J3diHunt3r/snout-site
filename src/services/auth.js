import {
    GoogleAuthProvider,
    OAuthProvider,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '../lib/firebase';

/** Thrown when an auth action fails; `code` mirrors the Firebase Auth error code. */
export class AuthActionError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'AuthActionError';
        this.code = code;
    }
}

function requireAuth() {
    const auth = getFirebaseAuth();
    if (!auth) {
        throw new AuthActionError('NOT_CONFIGURED', 'Sign-in is not configured.');
    }
    return auth;
}

/** Creates the Users/{uid} doc for a first-time sign-in, if it doesn't already exist. */
export async function ensureUserDoc(user) {
    const db = getFirebaseDb();
    if (!db || !user) return;

    const ref = doc(db, 'Users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return;

    await setDoc(ref, {
        email: user.email || '',
        username: user.displayName || '',
        accountType: 'basic',
        createdAt: serverTimestamp(),
    });
}

export async function signUpWithEmail(name, email, password) {
    const auth = requireAuth();
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
            await updateProfile(credential.user, { displayName: name });
        }
        await ensureUserDoc(credential.user);
        return credential.user;
    } catch (e) {
        throw new AuthActionError(e?.code || 'UNKNOWN', e?.message || 'Failed to create account.');
    }
}

export async function signInWithEmail(email, password) {
    const auth = requireAuth();
    try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        await ensureUserDoc(credential.user);
        return credential.user;
    } catch (e) {
        throw new AuthActionError(e?.code || 'UNKNOWN', e?.message || 'Failed to sign in.');
    }
}

export async function signInWithGoogle() {
    const auth = requireAuth();
    try {
        const credential = await signInWithPopup(auth, new GoogleAuthProvider());
        await ensureUserDoc(credential.user);
        return credential.user;
    } catch (e) {
        throw new AuthActionError(e?.code || 'UNKNOWN', e?.message || 'Failed to sign in with Google.');
    }
}

export async function signInWithApple() {
    const auth = requireAuth();
    try {
        const credential = await signInWithPopup(auth, new OAuthProvider('apple.com'));
        await ensureUserDoc(credential.user);
        return credential.user;
    } catch (e) {
        throw new AuthActionError(e?.code || 'UNKNOWN', e?.message || 'Failed to sign in with Apple.');
    }
}

export async function sendPasswordReset(email) {
    const auth = requireAuth();
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        throw new AuthActionError(e?.code || 'UNKNOWN', e?.message || 'Failed to send reset email.');
    }
}

export async function signOutUser() {
    const auth = requireAuth();
    await signOut(auth);
}
