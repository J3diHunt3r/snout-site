import React from 'react';
import { usePublicStats } from '../hooks/usePublicStats';

function formatCount(n) {
    if (n == null || !Number.isFinite(n)) return '—';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 10_000) return `${Math.round(n / 1000)}k`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(Math.floor(n));
}

function StatBlock({ label, value, sub }) {
    return (
        <div className="min-w-[4.5rem]">
            <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{label}</p>
            {sub ? <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{sub}</p> : null}
        </div>
    );
}

function StatsSetupPanel({ error }) {
    const code = error?.code;
    const path = import.meta.env.VITE_FIREBASE_STATS_DOC_PATH || 'stats/public';
    const permissionDenied =
        code === 'PERMISSION' || code === 'permission-denied' || String(error?.message || '').toLowerCase().includes('permission');

    return (
        <div className="text-xs text-amber-900 dark:text-amber-100/95 leading-relaxed rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-3 py-3 space-y-3">
            <p className="font-semibold text-amber-950 dark:text-amber-50">Fix community stats (one-time setup)</p>

            {code === 'NOT_CONFIGURED' ? (
                <p>
                    Add <code className="text-[11px] px-1">VITE_FIREBASE_API_KEY</code> and{' '}
                    <code className="text-[11px] px-1">VITE_FIREBASE_PROJECT_ID</code> to{' '}
                    <code className="text-[11px] px-1">.env.local</code>, then restart <code className="text-[11px] px-1">npm run dev</code>.
                </p>
            ) : null}

            {permissionDenied ? (
                <>
                    <p>
                        Firestore denied this read. In Firebase Console → Firestore → Rules, merge something like the block below
                        (keep your other rules for users, etc.):
                    </p>
                    <pre className="text-[10px] overflow-x-auto p-2 rounded bg-white/80 dark:bg-black/40 border border-amber-200/80 dark:border-amber-900 font-mono">
                        {`match /stats/{docId} {
  allow read: if true;
  allow write: if false;
}`}
                    </pre>
                </>
            ) : null}

            {code !== 'NOT_CONFIGURED' ? (
                <ol className="list-decimal pl-4 space-y-1.5">
                    <li>Firebase Console → Firestore Database.</li>
                    <li>
                        Collection ID: <code className="text-[11px] bg-white/70 dark:bg-black/40 px-1 rounded">stats</code> → Add
                        document
                    </li>
                    <li>
                        Document ID must be <code className="text-[11px] bg-white/70 dark:bg-black/40 px-1 rounded">public</code>{' '}
                        (click &quot;Add document&quot; and type that ID — do not use an auto-generated ID).
                    </li>
                    <li>
                        Add <strong>number</strong> fields:
                        <code className="block mt-1 text-[11px] bg-white/70 dark:bg-black/40 px-2 py-1 rounded font-mono">
                            totalUsers, totalPets, basicUsers, proUsers, businessUsers
                        </code>
                    </li>
                    <li>
                        Publish rules so clients can <code className="text-[11px] px-1">read</code>{' '}
                        <code className="text-[11px] px-1">{path}</code>. See <code className="text-[11px]">firestore.rules.example</code>.
                    </li>
                    <li>Refresh this page.</li>
                </ol>
            ) : null}

            {import.meta.env.DEV ? (
                <p className="text-[11px] opacity-90 border-t border-amber-200/80 dark:border-amber-800 pt-2 font-mono break-words">
                    {error?.message}
                </p>
            ) : null}
        </div>
    );
}

/**
 * Live counts from Firestore (see .env.example). Falls back if Firebase is not configured or read fails.
 */
export default function HeroStats() {
    const { stats, loading, error } = usePublicStats();
    const configured = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID);

    if (loading) {
        return (
            <div className="pt-8 flex flex-wrap items-end gap-6 sm:gap-10" aria-busy="true">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-8 w-14 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
                        <div className="h-3 w-16 rounded bg-gray-100 dark:bg-slate-800 animate-pulse" />
                    </div>
                ))}
                <p className="w-full text-xs text-slate-500 dark:text-slate-400">Loading community stats…</p>
            </div>
        );
    }

    if (!configured) {
        return (
            <div className="pt-8 flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-slate-900" />
                    ))}
                </div>
                <p>Trusted by pet owners worldwide</p>
            </div>
        );
    }

    if (error && !stats) {
        return (
            <div className="pt-8 space-y-3 max-w-xl">
                <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-slate-900" />
                        ))}
                    </div>
                    <p>Trusted by pet owners worldwide</p>
                </div>
                {import.meta.env.DEV ? <StatsSetupPanel error={error} /> : null}
                {!import.meta.env.DEV ? (
                    <p className="text-xs text-slate-500">Live stats unavailable — connect Firestore public stats.</p>
                ) : null}
            </div>
        );
    }

    const { totalUsers, totalPets, basicUsers, proUsers, businessUsers } = stats;

    return (
        <div className="pt-8">
            <div className="flex flex-wrap items-end gap-x-8 gap-y-4 sm:gap-x-10">
                <StatBlock label="Users" value={formatCount(totalUsers)} />
                <StatBlock label="Pets" value={formatCount(totalPets)} />
                <div className="flex flex-wrap gap-x-6 gap-y-2 border-l border-gray-200 dark:border-slate-700 pl-6 sm:pl-8">
                    <StatBlock label="Basic" value={formatCount(basicUsers)} sub="accounts" />
                    <StatBlock label="Pro" value={formatCount(proUsers)} sub="accounts" />
                    <StatBlock label="Business" value={formatCount(businessUsers)} sub="accounts" />
                </div>
            </div>
        </div>
    );
}
