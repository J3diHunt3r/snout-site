import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { QrCode, Activity, Brain, MapPin, MessageCircle, Radio } from 'lucide-react';

/** App screenshots (public/) — paired with feature themes */
const SCREENSHOTS = {
    qr: '/scr/IMG_0295.PNG',
    health: '/scr/IMG_0299.PNG',
    ai: '/scr/IMG_0298.PNG',
    geo: '/scr/IMG_0292.PNG',
    lost: '/scr/IMG_0296.PNG',
    messaging: '/scr/IMG_0291.PNG',
};

function FeatureCardFace({ icon: Icon, title, description, screenshot }) {
    return (
        <>
            <div className="relative w-full aspect-[9/16] max-h-[220px] sm:max-h-[240px] bg-slate-100 dark:bg-slate-900">
                <img
                    src={screenshot}
                    alt={`${title} — in-app screenshot`}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 shrink-0 bg-[var(--color-primary-light)]/10 text-[var(--color-primary)] rounded-xl flex items-center justify-center">
                        <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold dark:text-white leading-tight pt-0.5">{title}</h3>
                </div>
                <p className="text-[var(--color-text-light)] leading-relaxed text-[15px] sm:text-base">{description}</p>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, description, screenshot, index, reduceMotion }) {
    return (
        <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-48px', amount: 0.2 }}
            transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: reduceMotion ? 0 : index * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="h-full"
        >
            <div className="group h-full rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col shadow-[var(--shadow-lg)] transition-all duration-300 hover:shadow-xl hover:border-[var(--color-primary)]/25 hover:-translate-y-0.5">
                <FeatureCardFace icon={icon} title={title} description={description} screenshot={screenshot} />
            </div>
        </motion.article>
    );
}

const Features = () => {
    const reduceMotion = useReducedMotion();

    const features = [
        {
            icon: QrCode,
            title: 'Smart QR Protection',
            description:
                'Share a scannable pet QR in seconds. Finders reach you instantly with a scan—clear, modern, and effortless.',
            screenshot: SCREENSHOTS.qr,
        },
        {
            icon: Activity,
            title: 'Daily Health Checks',
            description:
                'Log wellness, food, and water in a calm, easy-to-use flow—built for quick daily check-ins without friction.',
            screenshot: SCREENSHOTS.health,
        },
        {
            icon: Brain,
            title: 'AI & Snout ID',
            description:
                'Snout scan uses on-device style guidance to capture your pet’s nose pattern—smart biometrics that feel futuristic yet simple.',
            screenshot: SCREENSHOTS.ai,
        },
        {
            icon: MapPin,
            title: 'Geo-aware help',
            description:
                'When someone finds your pet, they can tap Get Directions—location-aware messaging that helps reunions happen faster.',
            screenshot: SCREENSHOTS.geo,
        },
        {
            icon: Radio,
            title: 'Lost Pet Broadcast',
            description:
                'Send a radius alert so nearby users know to look—your location anchors a 2-mile broadcast when every minute counts.',
            screenshot: SCREENSHOTS.lost,
        },
        {
            icon: MessageCircle,
            title: 'Direct messaging',
            description:
                'Chat with groomers and businesses in a clean, modern thread—reviews and booking context stay in one place.',
            screenshot: SCREENSHOTS.messaging,
        },
    ];

    return (
        <section id="features" className="py-24 bg-[var(--color-bg)] relative scroll-mt-24">
            <div className="container">
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: reduceMotion ? 0 : 0.45 }}
                    className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
                >
                    <span className="text-[var(--color-primary)] font-bold tracking-wide uppercase text-sm">Features</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 dark:text-white">Everything Your Pet Needs</h2>
                    <p className="text-[var(--color-text-light)] text-lg">
                        A modern, approachable app: intuitive screens, AI-powered tools, and location-smart safety—built for real life with pets.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} index={index} reduceMotion={reduceMotion} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
