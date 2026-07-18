import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Stethoscope, Trees, Coffee, Route } from 'lucide-react';

const highlights = [
    {
        icon: Stethoscope,
        title: 'Vets & emergency care',
        description: 'Filter by hours, species, and distance when minutes matter.',
    },
    {
        icon: Trees,
        title: 'Parks & walks',
        description: 'See green spaces and crowd hints so you pick the right spot.',
    },
    {
        icon: Coffee,
        title: 'Pet-friendly venues',
        description: 'Cafés, shops, and services that welcome paws.',
    },
    {
        icon: Route,
        title: 'Smarter routes',
        description: 'Plan walks that suit your pet’s energy and your schedule.',
    },
];

const previewPlaces = [
    { icon: Stethoscope, label: 'City Paws Vet', meta: 'Open now · 0.8 mi', accent: 'bg-rose-500/15 text-rose-700' },
    { icon: Trees, label: 'Riverside Park', meta: 'Usually quiet · 1.2 mi', accent: 'bg-emerald-500/15 text-emerald-800' },
    { icon: Coffee, label: 'The Wag Café', meta: 'Pet menu · 0.4 mi', accent: 'bg-amber-500/15 text-amber-800' },
];

const InteractiveMap = () => {
    return (
        <section className="relative py-24 md:py-28 overflow-hidden bg-[var(--color-bg)] border-t border-emerald-100/60">
            <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[var(--color-primary-light)]/8 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-amber-200/15 blur-3xl" />

            <div className="container relative z-10">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45 }}
                            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/90 px-4 py-1.5 text-sm font-semibold text-[var(--color-primary)] shadow-sm"
                        >
                            <Navigation className="h-4 w-4" aria-hidden />
                            Discovery map
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
                        >
                            Explore a pet-friendly world
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="mt-4 text-lg leading-relaxed text-[var(--color-text-light)]"
                        >
                            Find vets, parks, and welcoming spots near you—curated for pets and the people who love them. Snout
                            keeps context in one place so you spend less time searching and more time together.
                        </motion.p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {highlights.map(({ icon: Icon, title, description }, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.08 + i * 0.05 }}
                                    className="rounded-2xl border border-emerald-100/90 bg-white/90 p-5 shadow-[var(--shadow-sm)]"
                                >
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                                    </span>
                                    <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-light)]">{description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Visual: layered “map” cards — brand-aligned, no fake grid UI */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55 }}
                        className="relative mx-auto w-full max-w-lg lg:max-w-none lg:justify-self-end"
                    >
                        <div className="relative rounded-[2rem] border border-emerald-200/50 bg-gradient-to-br from-emerald-50/90 via-white to-amber-50/50 p-6 shadow-[var(--shadow-lg)] md:p-8">
                            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,197,94,0.12),transparent_50%)]),transparent_50%)]" />

                            <div className="relative flex items-center justify-between gap-3 border-b border-emerald-100/80 pb-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-sm">
                                        <MapPin className="h-4 w-4" aria-hidden />
                                    </span>
                                    Near you
                                </div>
                                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-emerald-800 shadow-sm">
                                    Live
                                </span>
                            </div>

                            <ul className="relative mt-5 space-y-3">
                                {previewPlaces.map((place, i) => {
                                    const PlaceIcon = place.icon;
                                    return (
                                    <motion.li
                                        key={place.label}
                                        initial={{ opacity: 0, x: 12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                                        className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
                                    >
                                        <span
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${place.accent}`}
                                        >
                                            <PlaceIcon className="h-6 w-6" strokeWidth={2} aria-hidden />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-slate-900">{place.label}</p>
                                            <p className="text-sm text-[var(--color-text-light)]">{place.meta}</p>
                                        </div>
                                        <Navigation className="h-4 w-4 shrink-0 text-emerald-600 opacity-70" aria-hidden />
                                    </motion.li>
                                    );
                                })}
                            </ul>

                            <p className="relative mt-5 text-center text-xs font-medium text-[var(--color-text-light)]">
                                Illustrative previews · real listings in the Snout Scout app
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
