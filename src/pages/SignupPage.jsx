import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import Navbar from '../components/Navbar';
import SiteFooter from '../components/SiteFooter';
import Button from '../components/ui/Button';
import FloatingField from '../components/ui/FloatingField';
import GoogleIcon from '../components/ui/GoogleIcon';
import AppleIcon from '../components/ui/AppleIcon';
import useAuth from '../hooks/useAuth';
import { AuthActionError, signInWithApple, signInWithGoogle, signUpWithEmail } from '../services/auth';

const SignupPage = () => {
    useSEO({ title: 'Sign Up | Snout Scout', description: 'Create a Snout Scout account to manage your plan and billing.', path: '/signup' });

    const { user } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    if (user) {
        navigate('/account', { replace: true });
        return null;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setBusy(true);
        try {
            await signUpWithEmail(name, email, password);
            navigate('/account', { replace: true });
        } catch (err) {
            setError(err instanceof AuthActionError ? err.message : 'Failed to create account.');
        } finally {
            setBusy(false);
        }
    }

    async function handleProvider(signIn, label) {
        setError('');
        setBusy(true);
        try {
            await signIn();
            navigate('/account', { replace: true });
        } catch (err) {
            setError(err instanceof AuthActionError ? err.message : `Failed to sign up with ${label}.`);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text)]">
            <Navbar />
            <main className="flex-1 w-full max-w-md mx-auto px-4 pt-36 pb-20">
                <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
                <p className="mt-2 text-sm text-[var(--color-text-light)]">
                    Already have the Snout Scout app? Sign up with the same email to link your plan.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 space-y-8">
                    <FloatingField
                        id="signup-name"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FloatingField
                        id="signup-email"
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FloatingField
                        id="signup-password"
                        label="Password"
                        type="password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <Button type="submit" variant="dark" className="w-full" disabled={busy}>
                        Create account <span aria-hidden="true">→</span>
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
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-[var(--color-primary)] hover:underline">
                        Log in
                    </Link>
                </p>
            </main>
            <SiteFooter />
        </div>
    );
};

export default SignupPage;
