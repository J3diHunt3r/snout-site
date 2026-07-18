import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import useSEO from '../hooks/useSEO';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import Button from '../components/ui/Button';
import FloatingField from '../components/ui/FloatingField';
import useAuth from '../hooks/useAuth';
import { getFirebaseDb } from '../lib/firebase';
import { signOutUser } from '../services/auth';
import { BillingPortalError, createBillingPortalUrl } from '../services/billing';

const PLAN_LABELS = { basic: 'Basic', pro: 'Pro', business: 'Business' };

function PlanBadge({ accountType }) {
    const label = PLAN_LABELS[accountType] || 'Basic';
    return (
        <span className="inline-flex items-center rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
            {label} plan
        </span>
    );
}

const AccountPage = () => {
    useSEO({ title: 'My Account | Snout Scout', description: 'Manage your Snout Scout account and billing.', path: '/account' });

    const { user, userDoc } = useAuth();
    const [name, setName] = useState('');
    const [savingName, setSavingName] = useState(false);
    const [nameSaved, setNameSaved] = useState(false);
    const [billingBusy, setBillingBusy] = useState(false);
    const [billingError, setBillingError] = useState('');

    useEffect(() => {
        if (userDoc?.username) setName(userDoc.username);
    }, [userDoc?.username]);

    async function handleSaveName(e) {
        e.preventDefault();
        setSavingName(true);
        setNameSaved(false);
        try {
            await updateProfile(user, { displayName: name });
            const db = getFirebaseDb();
            if (db) {
                await setDoc(doc(db, 'Users', user.uid), { username: name }, { merge: true });
            }
            setNameSaved(true);
        } finally {
            setSavingName(false);
        }
    }

    async function handleManageBilling() {
        setBillingError('');
        setBillingBusy(true);
        try {
            const url = await createBillingPortalUrl();
            if (url) window.location.href = url;
        } catch (err) {
            setBillingError(
                err instanceof BillingPortalError && err.code === 'functions/failed-precondition'
                    ? "You don't have a paid plan yet — subscribe from the pricing section to manage billing here."
                    : 'Failed to open billing portal. Please try again.'
            );
        } finally {
            setBillingBusy(false);
        }
    }

    const subscriptionStatus = userDoc?.subscription?.status || userDoc?.subscriptionStatus;
    const isPaidPlan = userDoc?.accountType === 'pro' || userDoc?.accountType === 'business';

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
            <Navbar />
            <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-36 pb-20">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">My account</h1>
                <p className="mt-2 text-sm text-[var(--color-text-light)]">{user?.email}</p>

                <section className="mt-8 rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Plan</h2>
                            <div className="mt-2 flex items-center gap-3">
                                <PlanBadge accountType={userDoc?.accountType} />
                                {subscriptionStatus && (
                                    <span className="text-sm text-[var(--color-text-light)] capitalize">
                                        {subscriptionStatus}
                                    </span>
                                )}
                            </div>
                        </div>
                        {isPaidPlan ? (
                            <Button variant="outline" onClick={handleManageBilling} disabled={billingBusy}>
                                Manage billing
                            </Button>
                        ) : (
                            <Link
                                to={{ pathname: '/', hash: '#pricing' }}
                                className="rounded-md bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-800"
                            >
                                Upgrade plan
                            </Link>
                        )}
                    </div>
                    {billingError && <p className="mt-3 text-sm text-red-600">{billingError}</p>}
                </section>

                {userDoc?.accountType === 'business' && (
                    <section className="mt-6 rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Business dashboard</h2>
                                <p className="mt-1 text-sm text-[var(--color-text-light)]">
                                    Manage your services, bookings, reviews, and invoices.
                                </p>
                            </div>
                            <Link
                                to="/business"
                                className="rounded-md bg-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-slate-800"
                            >
                                Open dashboard
                            </Link>
                        </div>
                    </section>
                )}

                <section className="mt-6 rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900">Profile</h2>
                    <form onSubmit={handleSaveName} className="mt-6 flex flex-col sm:flex-row sm:items-end gap-4">
                        <div className="flex-1">
                            <FloatingField
                                id="account-name"
                                label="Display name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="dark" disabled={savingName}>
                            Save
                        </Button>
                    </form>
                    {nameSaved && <p className="mt-2 text-sm text-emerald-700">Saved.</p>}
                </section>

                <button
                    type="button"
                    onClick={() => signOutUser()}
                    className="mt-8 text-sm font-medium text-[var(--color-text-light)] hover:text-slate-900"
                >
                    Sign out
                </button>
            </main>
            <SiteFooter />
        </div>
    );
};

export default AccountPage;
