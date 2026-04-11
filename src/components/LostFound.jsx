import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Radio, Smartphone, Navigation } from 'lucide-react';
import Button from './ui/Button';

/** Map screenshot — same phone frame treatment as Hero */
const LOST_MAP_SCREEN = '/scr/map.png';

const steps = [
    { icon: Radio, text: 'Tap Broadcast alert in the app' },
    { icon: Smartphone, text: 'Neighbors within 2 miles get notified instantly' },
    { icon: Navigation, text: 'Share location and updates in real time' },
];

const LostFound = () => {
    return (
        <section className="py-24 md:py-28 relative overflow-hidden bg-[var(--color-bg-soft)] dark:bg-slate-900 border-y border-emerald-200/30 dark:border-slate-800">
            {/* Soft background accents */}
            <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-[var(--color-primary-light)]/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-200/20 dark:bg-emerald-900/20 blur-3xl" />

            <div className="container relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Copy */}
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="inline-flex items-center gap-2 rounded-full border border-red-200/80 bg-white/90 px-4 py-1.5 text-sm font-semibold text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                        >
                            <Bell className="h-4 w-4 shrink-0" aria-hidden />
                            Emergency broadcast
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-5xl"
                        >
                            Lost your best friend?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="mt-3 text-xl font-semibold text-[var(--color-primary)] dark:text-emerald-400 md:text-2xl"
                        >
                            Panic less. Act fast.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.15 }}
                            className="mt-5 text-lg leading-relaxed text-[var(--color-text-light)]"
                        >
                            One tap alerts every Snout user nearby with your pet&apos;s photo, medical notes, and last known
                            location—so your community can help bring them home.
                        </motion.p>

                        <ul className="mt-8 space-y-3">
                            {steps.map(({ icon: Icon, text }, i) => (
                                <motion.li
                                    key={text}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
                                    className="flex gap-4 rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/80"
                                >
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-emerald-500/15 dark:text-emerald-400">
                                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    </span>
                                    <span className="pt-0.5 font-medium leading-snug text-slate-800 dark:text-slate-100">{text}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.25 }}
                            className="mt-8"
                        >
                            <Button variant="primary">See how it works</Button>
                        </motion.div>
                    </div>

                    {/* App map screenshot in phone frame (matches Hero) */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative mx-auto flex w-full max-w-md justify-center lg:max-w-none lg:justify-end pb-8 lg:pb-0"
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [4, 2.5, 4] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                            className="relative"
                        >
                        <div className="relative w-[min(280px,85vw)] sm:w-[300px] h-[min(560px,170vw)] sm:h-[600px] bg-black rounded-[44px] sm:rounded-[50px] border-[8px] sm:border-[10px] border-black shadow-2xl overflow-hidden ring-1 ring-white/10 transform hover:scale-[1.02] transition-transform duration-500">
                            <div
                                className="absolute top-2 left-1/2 -translate-x-1/2 w-[32%] max-w-[120px] h-6 sm:h-7 bg-black rounded-full z-20 pointer-events-none shadow-sm"
                                aria-hidden
                            />
                            <img
                                src={LOST_MAP_SCREEN}
                                alt="Snout app map showing lost pet broadcast radius and nearby helpers"
                                className="absolute inset-0 w-full h-full object-cover object-top"
                                width={390}
                                height={844}
                                loading="lazy"
                            />
                        </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -14, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                            className="absolute top-20 sm:top-24 -right-1 sm:right-0 lg:-right-4 bg-white dark:bg-slate-800 p-3.5 rounded-xl shadow-xl z-20 max-w-[158px] border border-emerald-100 dark:border-slate-700"
                        >
                            <p className="text-[11px] font-semibold text-[var(--color-primary)] dark:text-emerald-400 uppercase tracking-wide">
                                Live radius
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
                                Get your pet back in no time
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LostFound;
