import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
    return (
        <footer className="border-t border-emerald-100/80 bg-[var(--color-bg-soft)] py-10 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="container flex flex-col items-center justify-between gap-4 text-center text-sm text-[var(--color-text-light)] sm:flex-row sm:text-left">
                <p>&copy; {new Date().getFullYear()} Snout Scout. All rights reserved.</p>
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors dark:hover:text-emerald-400">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors dark:hover:text-emerald-400">
                        Terms of Use
                    </Link>
                    <a href="/#contact" className="hover:text-[var(--color-primary)] transition-colors dark:hover:text-emerald-400">
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default SiteFooter;
