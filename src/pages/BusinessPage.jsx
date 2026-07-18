import React, { useEffect, useState } from 'react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import useSEO from '../hooks/useSEO';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import Button from '../components/ui/Button';
import FloatingField from '../components/ui/FloatingField';
import { getDownloadURL, ref } from 'firebase/storage';
import useAuth from '../hooks/useAuth';
import { getFirebaseDb, getFirebaseStorage } from '../lib/firebase';

function formatDate(value) {
    if (!value?.toDate) return '—';
    return value.toDate().toLocaleDateString();
}

function generateInvoiceNumber(bookingId) {
    const random = Math.floor(100000 + Math.random() * 900000);
    const suffix = bookingId.slice(0, 6).toUpperCase();
    return `INV-${random}-${suffix}`;
}

function monthLabel(date) {
    return date.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
}

function lastNMonthKeys(n) {
    const keys = [];
    const now = new Date();
    for (let i = n - 1; i >= 0; i -= 1) {
        keys.push(monthLabel(new Date(now.getFullYear(), now.getMonth() - i, 1)));
    }
    return keys;
}

function StatTile({ label, value }) {
    return (
        <div className="rounded-2xl border border-emerald-100/80 bg-white/80 p-5 shadow-sm">
            <p className="text-sm text-[var(--color-text-light)]">{label}</p>
            <p className="mt-1 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}

/** Single-hue bar chart: bar length is the only magnitude encoding, so one flat brand hue is correct (no ramp needed). */
function BarChart({ title, data, formatValue = (v) => v }) {
    const max = Math.max(...data.map((d) => d.value), 1);
    return (
        <div className="rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
            {data.length === 0 ? (
                <p className="mt-4 text-sm text-[var(--color-text-light)]">No data yet.</p>
            ) : (
                <div className="mt-6 flex items-end gap-3 h-40">
                    {data.map((d) => (
                        <div key={d.label} className="flex-1 flex flex-col items-center justify-end h-full">
                            <span className="mb-1 text-xs font-medium text-slate-700">{formatValue(d.value)}</span>
                            <div
                                className="w-full max-w-[24px] rounded-t-[4px] bg-[var(--color-primary)]"
                                style={{
                                    height: `${(d.value / max) * 100}%`,
                                    minHeight: d.value > 0 ? '4px' : undefined,
                                }}
                            />
                            <span className="mt-2 text-[11px] text-[var(--color-text-light)] whitespace-nowrap">
                                {d.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const EMPTY_SERVICE = { name: '', category: '', description: '', duration: '', price: '', isActive: true };

function ServicesTab({ uid }) {
    const [services, setServices] = useState(null);
    const [error, setError] = useState('');
    const [form, setForm] = useState(EMPTY_SERVICE);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    async function loadServices() {
        const db = getFirebaseDb();
        if (!db) {
            setError('Firebase is not configured.');
            return;
        }
        try {
            const snap = await getDocs(query(collection(db, 'business_services'), where('businessId', '==', uid)));
            const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            rows.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
            setServices(rows);
        } catch {
            setError('Failed to load services.');
        }
    }

    useEffect(() => {
        loadServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    function startEdit(service) {
        setEditingId(service.id);
        setForm({
            name: service.name || '',
            category: service.category || '',
            description: service.description || '',
            duration: service.duration ?? '',
            price: service.price ?? '',
            isActive: service.isActive ?? true,
        });
    }

    function resetForm() {
        setEditingId(null);
        setForm(EMPTY_SERVICE);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const db = getFirebaseDb();
        if (!db) return;
        setSaving(true);
        try {
            const payload = {
                businessId: uid,
                name: form.name.trim(),
                category: form.category.trim(),
                description: form.description.trim(),
                duration: Number(form.duration) || 0,
                price: Number(form.price) || 0,
                isActive: Boolean(form.isActive),
                updatedAt: serverTimestamp(),
            };
            if (editingId) {
                await updateDoc(doc(db, 'business_services', editingId), payload);
            } else {
                await addDoc(collection(db, 'business_services'), { ...payload, createdAt: serverTimestamp() });
            }
            resetForm();
            await loadServices();
        } catch {
            setError('Failed to save service.');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Delete this service?')) return;
        const db = getFirebaseDb();
        if (!db) return;
        await deleteDoc(doc(db, 'business_services', id));
        await loadServices();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
                <FloatingField id="svc-name" label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <FloatingField id="svc-category" label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <FloatingField id="svc-duration" label="Duration (minutes)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                <FloatingField id="svc-price" label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <div className="sm:col-span-2">
                    <FloatingField id="svc-description" label="Description" as="textarea" className="h-24 resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                    Active (visible to customers)
                </label>
                <div className="sm:col-span-2 flex gap-3">
                    <Button type="submit" variant="dark" disabled={saving}>
                        {editingId ? 'Save changes' : 'Add service'}
                    </Button>
                    {editingId && (
                        <Button type="button" variant="ghost" onClick={resetForm}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 space-y-3">
                {services === null && <p className="text-sm text-[var(--color-text-light)]">Loading…</p>}
                {services?.length === 0 && <p className="text-sm text-[var(--color-text-light)]">No services yet.</p>}
                {services?.map((s) => (
                    <div key={s.id} className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm">
                        <div>
                            <p className="font-semibold text-slate-900">
                                {s.name} <span className="text-[var(--color-text-light)] font-normal">— {s.category}</span>
                            </p>
                            <p className="text-sm text-[var(--color-text-light)]">
                                £{s.price} · {s.duration} min · {s.isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <Button variant="ghost" onClick={() => startEdit(s)}>Edit</Button>
                            <Button variant="ghost" onClick={() => handleDelete(s.id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BookingsTab({ uid }) {
    const [bookings, setBookings] = useState(null);
    const [error, setError] = useState(() => (getFirebaseDb() ? '' : 'Firebase is not configured.'));

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) return;
        getDocs(query(collection(db, 'bookings'), where('businessId', '==', uid)))
            .then((snap) => {
                const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                rows.sort((a, b) => (b.startTime?.toMillis?.() || 0) - (a.startTime?.toMillis?.() || 0));
                setBookings(rows);
            })
            .catch(() => setError('Failed to load bookings.'));
    }, [uid]);

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!bookings) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-200 text-[var(--color-text-light)]">
                        <th className="py-2 pr-4 font-medium">Customer</th>
                        <th className="py-2 pr-4 font-medium">Pet</th>
                        <th className="py-2 pr-4 font-medium">Service</th>
                        <th className="py-2 pr-4 font-medium">When</th>
                        <th className="py-2 pr-4 font-medium">Price</th>
                        <th className="py-2 pr-4 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((b) => (
                        <tr key={b.id} className="border-b border-gray-100">
                            <td className="py-2 pr-4">{b.customerName || '—'}</td>
                            <td className="py-2 pr-4">{b.petName || '—'}</td>
                            <td className="py-2 pr-4">{b.serviceName || '—'}</td>
                            <td className="py-2 pr-4 whitespace-nowrap">{formatDate(b.startTime)}</td>
                            <td className="py-2 pr-4">£{b.price ?? '—'}</td>
                            <td className="py-2 pr-4 capitalize">{b.status || '—'}</td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr><td colSpan={6} className="py-4 text-[var(--color-text-light)]">No bookings yet.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function ReviewsTab({ uid }) {
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(() => (getFirebaseDb() ? '' : 'Firebase is not configured.'));

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) return;
        getDocs(query(collection(db, 'business_reviews'), where('businessId', '==', uid)))
            .then((snap) => {
                const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
                rows.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
                setReviews(rows);
            })
            .catch(() => setError('Failed to load reviews.'));
    }, [uid]);

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!reviews) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    return (
        <div className="space-y-3">
            {reviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">{r.customerName || 'Unknown customer'}</p>
                        <span className="text-sm font-medium text-amber-500">{'★'.repeat(r.rating || 0)}{'☆'.repeat(5 - (r.rating || 0))}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">{r.comment}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-light)]">{formatDate(r.createdAt)}</p>
                </div>
            ))}
            {reviews.length === 0 && <p className="text-sm text-[var(--color-text-light)]">No reviews yet.</p>}
        </div>
    );
}

function InvoicesTab({ uid }) {
    const [invoices, setInvoices] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    async function loadAll() {
        const db = getFirebaseDb();
        if (!db) {
            setError('Firebase is not configured.');
            return;
        }
        try {
            const [invoiceSnap, bookingSnap] = await Promise.all([
                getDocs(query(collection(db, 'invoices'), where('businessId', '==', uid))),
                getDocs(query(collection(db, 'bookings'), where('businessId', '==', uid))),
            ]);
            const invoiceRows = invoiceSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
            invoiceRows.sort((a, b) => (b.invoiceDate?.toMillis?.() || 0) - (a.invoiceDate?.toMillis?.() || 0));
            setInvoices(invoiceRows);
            setBookings(bookingSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            setError('Failed to load invoices.');
        }
    }

    useEffect(() => {
        loadAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    function handleSelectBooking(bookingId) {
        setSelectedBookingId(bookingId);
        const booking = bookings.find((b) => b.id === bookingId);
        setAmount(booking?.price != null ? String(booking.price) : '');
    }

    async function handleCreateInvoice(e) {
        e.preventDefault();
        const db = getFirebaseDb();
        if (!db || !selectedBookingId) return;
        const booking = bookings.find((b) => b.id === selectedBookingId);
        if (!booking) return;

        setSaving(true);
        try {
            await addDoc(collection(db, 'invoices'), {
                businessId: uid,
                bookingId: selectedBookingId,
                customerId: booking.customerId,
                amount: Number(amount) || 0,
                invoiceNumber: generateInvoiceNumber(selectedBookingId),
                invoiceDate: serverTimestamp(),
                createdAt: serverTimestamp(),
            });
            setSelectedBookingId('');
            setAmount('');
            await loadAll();
        } catch {
            setError('Failed to create invoice.');
        } finally {
            setSaving(false);
        }
    }

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!invoices) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    return (
        <div>
            <form onSubmit={handleCreateInvoice} className="flex flex-col sm:flex-row gap-3 rounded-2xl border border-emerald-100/80 bg-white/80 p-6 shadow-sm">
                <select
                    value={selectedBookingId}
                    onChange={(e) => handleSelectBooking(e.target.value)}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    required
                >
                    <option value="">Select a booking to invoice…</option>
                    {bookings.map((b) => (
                        <option key={b.id} value={b.id}>
                            {b.customerName || 'Unknown'} — {b.serviceName || 'Service'} ({formatDate(b.startTime)})
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-32 rounded-xl border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                    required
                />
                <Button type="submit" variant="dark" disabled={saving || !selectedBookingId}>
                    Create invoice
                </Button>
            </form>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-200 text-[var(--color-text-light)]">
                            <th className="py-2 pr-4 font-medium">Invoice #</th>
                            <th className="py-2 pr-4 font-medium">Date</th>
                            <th className="py-2 pr-4 font-medium">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id} className="border-b border-gray-100">
                                <td className="py-2 pr-4">{inv.invoiceNumber}</td>
                                <td className="py-2 pr-4 whitespace-nowrap">{formatDate(inv.invoiceDate)}</td>
                                <td className="py-2 pr-4">£{inv.amount}</td>
                            </tr>
                        ))}
                        {invoices.length === 0 && (
                            <tr><td colSpan={3} className="py-4 text-[var(--color-text-light)]">No invoices yet.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function AnalyticsTab({ uid }) {
    const [bookings, setBookings] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [error, setError] = useState(() => (getFirebaseDb() ? '' : 'Firebase is not configured.'));

    useEffect(() => {
        const db = getFirebaseDb();
        if (!db) return;
        Promise.all([
            getDocs(query(collection(db, 'bookings'), where('businessId', '==', uid))),
            getDocs(query(collection(db, 'business_reviews'), where('businessId', '==', uid))),
        ])
            .then(([bookingSnap, reviewSnap]) => {
                setBookings(bookingSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
                setReviews(reviewSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
            })
            .catch(() => setError('Failed to load analytics.'));
    }, [uid]);

    if (error) return <p className="text-sm text-red-600">{error}</p>;
    if (!bookings || !reviews) return <p className="text-sm text-[var(--color-text-light)]">Loading…</p>;

    const completed = bookings.filter((b) => b.status === 'completed');
    const totalRevenue = completed.reduce((sum, b) => sum + (Number(b.price) || 0), 0);
    const avgRating = reviews.length
        ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length
        : 0;

    const monthKeys = lastNMonthKeys(6);
    const revenueByMonth = monthKeys.map((label) => ({ label, value: 0 }));
    const bookingsByMonth = monthKeys.map((label) => ({ label, value: 0 }));

    completed.forEach((b) => {
        if (!b.startTime?.toDate) return;
        const bucket = revenueByMonth.find((m) => m.label === monthLabel(b.startTime.toDate()));
        if (bucket) bucket.value += Number(b.price) || 0;
    });

    bookings.forEach((b) => {
        if (!b.startTime?.toDate) return;
        const bucket = bookingsByMonth.find((m) => m.label === monthLabel(b.startTime.toDate()));
        if (bucket) bucket.value += 1;
    });

    const serviceTotals = new Map();
    completed.forEach((b) => {
        const key = b.serviceName || 'Other';
        serviceTotals.set(key, (serviceTotals.get(key) || 0) + (Number(b.price) || 0));
    });
    const topServices = [...serviceTotals.entries()]
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);

    const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
        label: `${star}★`,
        value: reviews.filter((r) => Number(r.rating) === star).length,
    }));

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatTile label="Total revenue" value={`£${totalRevenue.toLocaleString()}`} />
                <StatTile label="Total bookings" value={bookings.length.toLocaleString()} />
                <StatTile label="Average rating" value={reviews.length ? avgRating.toFixed(1) : '—'} />
                <StatTile label="Reviews" value={reviews.length.toLocaleString()} />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <BarChart title="Revenue by month" data={revenueByMonth} formatValue={(v) => `£${v}`} />
                <BarChart title="Bookings by month" data={bookingsByMonth} />
                <BarChart title="Top services by revenue" data={topServices} formatValue={(v) => `£${v}`} />
                <BarChart title="Rating distribution" data={ratingCounts} />
            </div>
        </div>
    );
}

/** `imagePath` may be a full download URL or a Storage path, depending on how it was written. */
function useResolvedImageUrl(imagePath) {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function resolve() {
            if (!imagePath) {
                if (!cancelled) setUrl(null);
                return;
            }
            if (/^https?:\/\//.test(imagePath)) {
                if (!cancelled) setUrl(imagePath);
                return;
            }
            const storage = getFirebaseStorage();
            if (!storage) return;
            try {
                const resolved = await getDownloadURL(ref(storage, imagePath));
                if (!cancelled) setUrl(resolved);
            } catch {
                if (!cancelled) setUrl(null);
            }
        }

        resolve();
        return () => {
            cancelled = true;
        };
    }, [imagePath]);

    return url;
}

const BusinessPage = () => {
    useSEO({ title: 'Business Dashboard | Snout Scout', description: 'Manage your services, bookings, reviews, and invoices.', path: '/business' });

    const { user, userDoc } = useAuth();
    const [tab, setTab] = useState('analytics');
    const logoUrl = useResolvedImageUrl(userDoc?.imagePath);

    const isBusiness = userDoc?.accountType === 'business';

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
            <Navbar />
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-36 pb-20">
                <div className="flex items-center gap-4">
                    {logoUrl && (
                        <img
                            src={logoUrl}
                            alt={userDoc?.businessName ? `${userDoc.businessName} logo` : 'Business logo'}
                            className="h-14 w-14 rounded-xl object-cover border border-emerald-100/80 shadow-sm"
                        />
                    )}
                    <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Business dashboard</h1>
                </div>

                {!isBusiness ? (
                    <p className="mt-4 text-sm text-[var(--color-text-light)]">
                        This area is for Business plan accounts. Upgrade from the pricing section to unlock it.
                    </p>
                ) : (
                    <>
                        <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-200">
                            {[
                                { id: 'analytics', label: 'Analytics' },
                                { id: 'services', label: 'Services' },
                                { id: 'bookings', label: 'Bookings' },
                                { id: 'reviews', label: 'Reviews' },
                                { id: 'invoices', label: 'Invoices' },
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
                            {tab === 'analytics' && <AnalyticsTab uid={user.uid} />}
                            {tab === 'services' && <ServicesTab uid={user.uid} />}
                            {tab === 'bookings' && <BookingsTab uid={user.uid} />}
                            {tab === 'reviews' && <ReviewsTab uid={user.uid} />}
                            {tab === 'invoices' && <InvoicesTab uid={user.uid} />}
                        </div>
                    </>
                )}
            </main>
            <SiteFooter />
        </div>
    );
};

export default BusinessPage;
