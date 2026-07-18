import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AccountPage from './pages/AccountPage';
import BusinessPage from './pages/BusinessPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return undefined;
        }

        const id = hash.replace('#', '');
        if (!id) {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            return undefined;
        }

        const scrollToEl = () => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        scrollToEl();
        // Images below the fold (Hero, Features, InteractiveMap, etc.) can still be
        // loading and shifting layout after the first attempt on a fresh page load,
        // so re-run a few times as things settle to land on the right spot.
        const timers = [100, 400, 900].map((delay) => window.setTimeout(scrollToEl, delay));
        return () => timers.forEach(window.clearTimeout);
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <Router>
            <AuthProvider>
                <ScrollToHash />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/account"
                        element={
                            <ProtectedRoute>
                                <AccountPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/business"
                        element={
                            <ProtectedRoute>
                                <BusinessPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
