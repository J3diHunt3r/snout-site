import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import SiteFooter from './SiteFooter';

/**
 * @param {{ title: string, lastUpdated: string, children: React.ReactNode }} props
 */
export default function LegalPageShell({ title, lastUpdated, children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300">
            <Navbar />
            <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-24 md:pt-28 pb-16">
                <Link
                    to="/"
                    className="inline-block text-sm font-semibold text-[var(--color-primary)] hover:underline mb-8"
                >
                    ← Back to home
                </Link>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                    {title}
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-light)]">Last updated: {lastUpdated}</p>
                <div className="mt-10 space-y-8 text-[15px] md:text-base leading-relaxed text-slate-800">
                    {children}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}
