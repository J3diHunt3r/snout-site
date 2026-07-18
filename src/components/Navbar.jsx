import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';
import useAuth from '../hooks/useAuth';

const navItems = [
    { label: 'Features', to: { pathname: '/', hash: '#features' } },
    { label: 'Pricing', to: { pathname: '/', hash: '#pricing' } },
    { label: 'About', to: { pathname: '/', hash: '#about' } },
    { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { user, userDoc, isAdmin } = useAuth();

    const accountItems = user
        ? [
              ...(isAdmin ? [{ label: 'Admin', to: { pathname: '/admin' } }] : []),
              ...(userDoc?.accountType === 'business' ? [{ label: 'Business', to: { pathname: '/business' } }] : []),
              { label: 'Account', to: { pathname: '/account' } },
          ]
        : [{ label: 'Log In', to: { pathname: '/login' } }];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/70 backdrop-blur-lg shadow-lg border-b border-gray-200/50 py-4'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                    <img
                        src={logo}
                        alt="Snout Scout"
                        className="w-20 h-20 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                    {accountItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Button variant="primary" className="py-2 px-5 text-sm">
                        Download
                    </Button>
                </div>

                <button
                    type="button"
                    className="md:hidden p-2"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 flex flex-col gap-4 md:hidden shadow-xl">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-lg font-medium py-2"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {accountItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-lg font-medium py-2"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
