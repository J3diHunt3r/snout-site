import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { getFirebaseAuth, getFirebaseDb } from '../lib/firebase';
import { isAdminEmail } from '../lib/admin';
import { AuthContext } from './authContextBase';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(getFirebaseAuth()));

    useEffect(() => {
        const auth = getFirebaseAuth();
        if (!auth) return undefined;
        const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db || !user) return undefined;
        const unsubscribe = onSnapshot(doc(db, 'Users', user.uid), (snap) => {
            setUserDoc(snap.exists() ? snap.data() : null);
        });
        return () => {
            unsubscribe();
            setUserDoc(null);
        };
    }, [user]);

    const value = {
        user,
        userDoc,
        loading,
        isAdmin: isAdminEmail(user?.email),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
