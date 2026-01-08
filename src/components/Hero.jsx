import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Download, ChevronRight } from 'lucide-react';
import logo from '../assets/images/logo.png';
import StaggeredText from './ui/StaggeredText';

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
                            <StaggeredText text="Your Graphic Pet" delay={30} />
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

                    <div className="pt-8 flex items-center gap-4 text-sm font-medium text-[var(--color-text-light)]">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                            ))}
                        </div>
                        <p>Trusted by 10,000+ Pet Owners</p>
                    </div>
                </motion.div>

                {/* Visual/Phone Mockup */}
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
                    className="relative hidden md:block"
                >
                    {/* Abstract Phone Shape */}
                    <div className="relative mx-auto w-[300px] h-[600px] bg-black rounded-[50px] border-[10px] border-black shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

                        {/* Screen Content Placeholder */}
                        <div className="w-full h-full bg-white flex flex-col relative">
                            {/* Header */}
                            <div className="h-40 bg-[var(--color-primary)] rounded-b-[40px] p-6 flex items-end relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                                {/* Logo Overlay */}
                                <img src={logo} className="absolute top-6 left-1/2 -translate-x-1/2 w-12 h-12 opacity-20 invert" alt="Snout watermark" />

                                <div className="text-white relative z-10">
                                    <div className="text-sm opacity-80">Good Morning,</div>
                                    <div className="text-2xl font-bold">Bella 🐶</div>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="p-4 space-y-4">
                            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-50 flex items-center gap-4 hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">HR</div>
                                <div>
                                    <div className="font-bold">Heart Rate</div>
                                    <div className="text-sm text-green-600 flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Normal • 80 bpm
                                    </div>
                                </div>
                            </div>
                            <div className="bg-[var(--color-primary-light)]/20 p-4 rounded-xl border border-green-100 relative overflow-hidden group">
                                <div className="font-bold text-[var(--color-primary)]">Daily Goal</div>
                                <div className="h-2 bg-white rounded-full mt-2 w-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "75%" }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                        className="h-full bg-[var(--color-primary)]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button */}
                        <div className="absolute bottom-6 right-6 w-14 h-14 bg-[var(--color-primary)] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
                            <span className="text-2xl">+</span>
                        </div>
                    </div>


                    {/* Decorative elements behind phone */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                        className="absolute top-20 -right-10 bg-white p-4 rounded-xl shadow-xl z-20 max-w-[150px]"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                            <span className="text-xs font-bold">Lost & Found</span>
                        </div>
                        <p className="text-xs text-gray-500">"Found within 2 miles!"</p>
                    </motion.div>
                </motion.div>
            </div >
        </section >
    );
};

export default Hero;
