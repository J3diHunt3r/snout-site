import React, { useEffect, useState } from 'react';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import useSEO from '../hooks/useSEO';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import { getFirebaseDb } from '../lib/firebase';

function formatDate(value) {
    if (!value?.toDate) return '—';
    return value.toDate().toLocaleDateString();
}

function CustomersTab() {
    const [customers, setCustomers] = useState(null);
    const [error, setError] = useState(() => (getFirebaseDb() ? '' : 'Firebase is not configured.'));

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) return;
        getDocs(query(collection(db, 'Users'), limit(200)))
            .then((snap) => setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
            .catch(() => setError('Failed to load customers.'));
    }, []);

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!customers) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-200 text-[var(--color-text-light)]">
                        <th className="py-2 pr-4 font-medium">Email</th>
                        <th className="py-2 pr-4 font-medium">Plan</th>
                        <th className="py-2 pr-4 font-medium">Subscription</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c.id} className="border-b border-gray-100">
                            <td className="py-2 pr-4">{c.email || c.id}</td>
                            <td className="py-2 pr-4 capitalize">{c.accountType || 'basic'}</td>
                            <td className="py-2 pr-4 capitalize">{c.subscriptionStatus || '—'}</td>
                        </tr>
                    ))}
                    {customers.length === 0 && (
                        <tr>
                            <td colSpan={3} className="py-4 text-[var(--color-text-light)]">No customers yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function LeadsTab() {
    const [leads, setLeads] = useState(null);
    const [error, setError] = useState(() => (getFirebaseDb() ? '' : 'Firebase is not configured.'));

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) return;
        getDocs(query(collection(db, 'Leads'), orderBy('createdAt', 'desc'), limit(200)))
            .then((snap) => setLeads(snap.docs.map((d) => ({ id: d.id, ...d.data() }))))
            .catch(() => setError('Failed to load leads.'));
    }, []);

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!leads) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-200 text-[var(--color-text-light)]">
                        <th className="py-2 pr-4 font-medium">Name</th>
                        <th className="py-2 pr-4 font-medium">Email</th>
                        <th className="py-2 pr-4 font-medium">Message</th>
                        <th className="py-2 pr-4 font-medium">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead.id} className="border-b border-gray-100 align-top">
                            <td className="py-2 pr-4 whitespace-nowrap">{lead.name}</td>
                            <td className="py-2 pr-4 whitespace-nowrap">
                                <a href={`mailto:${lead.email}`} className="text-[var(--color-primary)] hover:underline">
                                    {lead.email}
                                </a>
                            </td>
                            <td className="py-2 pr-4 max-w-md">{lead.message}</td>
                            <td className="py-2 pr-4 whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                        </tr>
                    ))}
                    {leads.length === 0 && (
                        <tr>
                            <td colSpan={4} className="py-4 text-[var(--color-text-light)]">No leads yet.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const AdminPage = () => {
    useSEO({ title: 'Admin | Snout Scout', description: 'Internal customer and lead management.', path: '/admin' });
    const [tab, setTab] = useState('customers');

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
            <Navbar />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-36 pb-20">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Admin</h1>

                <div className="mt-6 flex gap-2 border-b border-gray-200">
                    {[
                        { id: 'customers', label: 'Customers' },
                        { id: 'leads', label: 'Leads' },
                    ].map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            onClick={() => setTab(t.id)}
                            className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                                tab === t.id
                                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                                    : 'border-transparent text-[var(--color-text-light)] hover:text-slate-900'
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    {tab === 'customers' ? <CustomersTab /> : <LeadsTab />}
                </div>
            </main>
            <SiteFooter />
        </div>
    );
};

export default AdminPage;
