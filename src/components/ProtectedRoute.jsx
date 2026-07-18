import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

/**
 * @param {{ children: React.ReactNode, adminOnly?: boolean }} props
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-light)]">
                Loading…
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/account" replace />;
    }

    return children;
}
