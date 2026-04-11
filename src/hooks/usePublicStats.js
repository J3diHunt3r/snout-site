import { useEffect, useState } from 'react';

function isFirebaseConfigured() {
    return Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);
}

/** @returns {{ stats: object | null, loading: boolean, error: Error | null }} */
export function usePublicStats() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(() => isFirebaseConfigured());
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isFirebaseConfigured()) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        setLoading(true);
        setError(null);

        import('../services/stats')
            .then(({ fetchPublicStats }) => fetchPublicStats())
            .then((data) => {
                if (!cancelled) {
                    setStats(data);
                    setError(null);
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    console.error('[usePublicStats]', err);
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setStats(null);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { stats, loading, error };
}
