import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Download } from 'lucide-react';
import StaggeredText from './ui/StaggeredText';
import HeroStats from './HeroStats';

/** Hero device frame — screenshot from public/scr */
const HERO_APP_SCREEN = '/scr/IMG_0294.PNG';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg-soft)] pt-20">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-[var(--color-primary-light)]/10 to-transparent rounded-bl-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/5 rounded-full blur-3xl -z-10" />

            <div className="container grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-semibold tracking-wide"
                    >
                        #1 Pet Care App
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight flex flex-col items-start">
                        <StaggeredText text="The Ultimate" />
                        <span className="text-[var(--color-primary)]">
                            <StaggeredText text="Super App" delay={15} />
                        </span>
                        <div className="flex items-center gap-3">
                            <span>for</span>
                            <StaggeredText text="Your Pet" delay={30} />
                        </div>
                    </h1>

                    <p className="text-xl text-[var(--color-text-light)] max-w-lg">
                        From health checks to QR recovery, Snout connects you with everything your pet needs.
                        Smart. Secure. Modern.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button variant="primary">
                            <Download size={20} /> Download for iOS
                        </Button>
                        <Button variant="secondary">
                            <Download size={20} /> Get on Android
                        </Button>
                    </div>

                    <HeroStats />
                </motion.div>

                {/* Phone mockup with real app screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotate: 5 }}
                    animate={{
                        opacity: 1,
                        y: [0, -15, 0],
                        rotate: [5, 3, 5]
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 0.2 },
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative flex justify-center md:justify-end pb-8 md:pb-0"
                >
                    <div className="relative w-[min(280px,85vw)] sm:w-[300px] h-[min(560px,170vw)] sm:h-[600px] bg-black rounded-[44px] sm:rounded-[50px] border-[8px] sm:border-[10px] border-black shadow-2xl overflow-hidden ring-1 ring-white/10 transform hover:scale-[1.02] transition-transform duration-500">
                        {/* Dynamic island / notch */}
                        <div
                            className="absolute top-2 left-1/2 -translate-x-1/2 w-[32%] max-w-[120px] h-6 sm:h-7 bg-black rounded-full z-20 pointer-events-none shadow-sm"
                            aria-hidden
                        />
                        <img
                            src={HERO_APP_SCREEN}
                            alt="Snout app pet profile with QR code and quick actions"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                            width={390}
                            height={844}
                            fetchPriority="high"
                        />
                    </div>

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        className="absolute top-16 sm:top-20 -right-2 sm:-right-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 max-w-[150px] border border-gray-100 dark:border-gray-700"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                            <span className="text-xs font-bold dark:text-white">Lost & Found</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">&quot;Found within 2 miles!&quot;</p>
                    </motion.div>
                </motion.div>
            </div >
        </section >
    );
};

export default Hero;
