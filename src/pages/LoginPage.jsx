import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import Button from '../components/ui/Button';
import FloatingField from '../components/ui/FloatingField';
import GoogleIcon from '../components/ui/GoogleIcon';
import AppleIcon from '../components/ui/AppleIcon';
import useAuth from '../hooks/useAuth';
import {
    AuthActionError,
    sendPasswordReset,
    signInWithApple,
    signInWithEmail,
    signInWithGoogle,
} from '../services/auth';

const LoginPage = () => {
    useSEO({ title: 'Log In | Snout Scout', description: 'Log in to manage your Snout Scout account.', path: '/login' });

    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/account';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [busy, setBusy] = useState(false);

    if (user) {
        navigate(redirectTo, { replace: true });
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setInfo('');
        setBusy(true);
        try {
            await signInWithEmail(email, password);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err instanceof AuthActionError ? err.message : 'Failed to sign in.');
        } finally {
            setBusy(false);
        }
    }

    async function handleProvider(signIn, label) {
        setError('');
        setInfo('');
        setBusy(true);
        try {
            await signIn();
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err instanceof AuthActionError ? err.message : `Failed to sign in with ${label}.`);
        } finally {
            setBusy(false);
        }
    }

    async function handleForgotPassword() {
        setError('');
        setInfo('');
        if (!email) {
            setError('Enter your email above first, then click "Forgot password".');
            return;
        }
        try {
            await sendPasswordReset(email);
            setInfo('Password reset email sent — check your inbox.');
        } catch (err) {
            setError(err instanceof AuthActionError ? err.message : 'Failed to send reset email.');
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
            <Navbar />
            <main className="flex-1 w-full max-w-md mx-auto px-4 pt-36 pb-20">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Log in</h1>
                <p className="mt-2 text-sm text-[var(--color-text-light)]">
                    Use the same email/Google account you signed up with on the Snout Scout app.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                    <FloatingField
                        id="login-email"
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FloatingField
                        id="login-password"
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {info && <p className="text-sm text-emerald-700">{info}</p>}

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <Button type="submit" variant="dark" className="w-full" disabled={busy}>
                        Log in <span aria-hidden="true">→</span>
                    </Button>
                </form>

                <div className="mt-6 flex items-center gap-3 text-xs uppercase text-[var(--color-text-light)]">
                    <span className="h-px flex-1 bg-gray-200" />
                    or
                    <span className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="mt-4 space-y-3">
                    <Button
                        variant="outline"
                        className="w-full"
                        disabled={busy}
                        onClick={() => handleProvider(signInWithGoogle, 'Google')}
                    >
                        <GoogleIcon /> Continue with Google
                    </Button>
                    <Button
                        variant="outline"
                        className="w-full"
                        disabled={busy}
                        onClick={() => handleProvider(signInWithApple, 'Apple')}
                    >
                        <AppleIcon /> Continue with Apple
                    </Button>
                </div>

                <p className="mt-6 text-sm text-[var(--color-text-light)]">
                    New here?{' '}
                    <Link to="/signup" className="font-medium text-[var(--color-primary)] hover:underline">
                        Create an account
                    </Link>
                </p>
            </main>
            <SiteFooter />
        </div>
    );
};

export default LoginPage;
