import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bell } from 'lucide-react';
import Button from './ui/Button';

const LostFound = () => {
    return (
        <section className="py-24 bg-black text-white overflow-hidden relative">
            {/* Background Radial Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-1 rounded-full text-sm font-bold border border-red-500/20">
                        <Bell size={16} /> Emergency Broadcast
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold">Lost Your Best Friend? <br /> Panic Less, Act Fast.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Tap one button to instantly notify every Snout user within a 2-mile radius.
                        They'll receive your pet's photo, medical info, and last known location immediately.
                    </p>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">1</div>
                            <span className="font-medium">Tap "Broadcast Alert"</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">2</div>
                            <span className="font-medium">Neighbors get instant notification</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">3</div>
                            <span className="font-medium">Receive live location updates</span>
                        </li>
                    </ul>
                    <div className="pt-6">
                        <Button variant="primary">See How It Works</Button>
                    </div>
                </div>

                {/* Pulse Visualization */}
                <div className="relative h-[400px] flex items-center justify-center">
                    {/* Center Point */}
                    <div className="relative z-20 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                            <MapPin className="text-white" size={24} />
                        </div>
                    </div>

                    {/* Ripples */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 2, 2.5],
                                opacity: [0.8, 0.4, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.8, // Staggered delays
                                ease: "easeOut"
                            }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-[var(--color-primary)]/50 bg-[var(--color-primary)]/10"
                        />
                    ))}

                    {/* Satellites / Users */}
                    {[1, 2, 3, 4, 5].map((i) => {
                        const angle = (i / 5) * 2 * Math.PI; // Distribute overlapping
                        const radius = 140;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;

                        return (
                            <motion.div
                                key={`user-${i}`}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + (i * 0.2) }}
                                className="absolute w-10 h-10 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center"
                                style={{ x, y }}
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LostFound;
