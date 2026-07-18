import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
    return (
        <footer className="border-t border-emerald-100/80 bg-[var(--color-bg-soft)] py-10">
            <div className="container flex flex-col items-center justify-between gap-4 text-center text-sm text-[var(--color-text-light)] sm:flex-row sm:text-left">
                <p>&copy; {new Date().getFullYear()} Snout Scout. All rights reserved.</p>
                <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <Link to="/privacy" className="hover:text-[var(--color-primary)] transition-colors">
                        Privacy Policy
                    </Link>
                    <Link to="/terms" className="hover:text-[var(--color-primary)] transition-colors">
                        Terms of Use
                    </Link>
                    <a href="/#contact" className="hover:text-[var(--color-primary)] transition-colors">
                        Contact
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default SiteFooter;
