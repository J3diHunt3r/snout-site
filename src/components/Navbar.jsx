import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

const navItems = [
    { label: 'Features', to: { pathname: '/', hash: '#features' } },
    { label: 'Pricing', to: { pathname: '/', hash: '#pricing' } },
    { label: 'About', to: { pathname: '/', hash: '#about' } },
    { label: 'Contact', to: { pathname: '/', hash: '#contact' } },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 py-4'
                    : 'bg-transparent py-6'
            }`}
        >
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter dark:text-white">
                    <img
                        src={logo}
                        alt="Snout Scout"
                        className="w-20 h-20 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-sm dark:invert dark:brightness-200"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-sm font-medium hover:text-[var(--color-primary)] transition-colors dark:text-gray-300"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsDark(!isDark)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors dark:text-yellow-400 text-gray-600"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Button variant="primary" className="py-2 px-5 text-sm">
                        Download
                    </Button>
                </div>

                <button
                    type="button"
                    className="md:hidden p-2 dark:text-white"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileOpen && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 p-4 flex flex-col gap-4 md:hidden shadow-xl">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className="text-lg font-medium py-2 dark:text-gray-200"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                        <span className="dark:text-gray-300">Theme</span>
                        <button
                            type="button"
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 dark:text-yellow-400"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
