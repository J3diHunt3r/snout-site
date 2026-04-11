import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function ScrollToHash() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            if (!id) {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                return;
            }
            const tryScroll = () => {
                const el = document.getElementById(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }
                return false;
            };
            if (tryScroll()) return undefined;
            const t = window.setTimeout(() => {
                tryScroll();
            }, 0);
            return () => window.clearTimeout(t);
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        return undefined;
    }, [pathname, hash]);

    return null;
}

function App() {
    return (
        <Router>
            <ScrollToHash />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
