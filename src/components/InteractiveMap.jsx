import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Info, Navigation } from 'lucide-react';

const locations = [
    { id: 1, type: 'vet', x: 20, y: 30, name: "City Paws Vet", status: "Open Now", rating: 4.9 },
    { id: 2, type: 'park', x: 50, y: 50, name: "Golden Bone Park", status: "Busy", rating: 4.8 },
    { id: 3, type: 'store', x: 70, y: 20, name: "Whiskers & Co", status: "Closing Soon", rating: 4.5 },
    { id: 4, type: 'vet', x: 60, y: 70, name: "Emergency Vet 24/7", status: "Open 24/7", rating: 5.0 },
    { id: 5, type: 'park', x: 30, y: 80, name: "Riverside Walk", status: "Quiet", rating: 4.7 },
];

const InteractiveMap = () => {
    const [activeId, setActiveId] = useState(null);

    return (
        <section className="py-24 bg-[var(--color-bg)] transition-colors duration-300">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square md:aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl group cursor-crosshair">
                        {/* Map Background (Abstract) */}
                        <div className="absolute inset-0 bg-[#e5e7eb] dark:bg-slate-800 transition-colors duration-300">
                            {/* Roads */}
                            <svg className="w-full h-full opacity-30 dark:opacity-10" width="100%" height="100%">
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />
                                <path d="M 0 100 Q 250 50 500 100 T 1000 100" fill="none" stroke="currentColor" strokeWidth="8" className="text-white dark:text-gray-700" />
                                <path d="M 300 0 L 300 400" fill="none" stroke="currentColor" strokeWidth="8" className="text-white dark:text-gray-700" />
                            </svg>
                        </div>

                        {/* Pins */}
                        {locations.map((loc) => (
                            <motion.div
                                key={loc.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2"
                                style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    onClick={() => setActiveId(loc.id === activeId ? null : loc.id)}
                                    className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 
                      ${loc.type === 'vet' ? 'bg-red-500 text-white' :
                                            loc.type === 'park' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                                >
                                    <MapPin size={20} />
                                    {activeId === loc.id && (
                                        <span className="absolute inset-0 rounded-full animate-ping bg-inherit opacity-75"></span>
                                    )}
                                </motion.button>

                                {/* Tooltip */}
                                <AnimatePresence>
                                    {activeId === loc.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 dark:text-white p-4 rounded-xl shadow-xl w-48 z-20 pointer-events-none"
                                        >
                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">{loc.name}</h4>
                                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                <span>{loc.status}</span>
                                                <span className="flex items-center gap-1 text-yellow-500">★ {loc.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[var(--color-primary)] text-xs font-bold">
                                                <Navigation size={12} /> 0.8 miles away
                                            </div>
                                            {/* Arrow */}
                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 rotate-45"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}

                        {/* User Location */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-md z-0">
                            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-bold">
                            <Navigation size={16} /> Live GPS Tracking
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold dark:text-white">Explore a Pet-Friendly World</h2>
                        <p className="text-[var(--color-text-light)] text-lg leading-relaxed">
                            Need a Vet at 2 AM? Looking for a park that's not crowded? Snout's interactive map shows you everything nearby in real-time.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Real-time Crowd Levels for Parks",
                                "Emergency Vet Filtering",
                                "Pet-Friendly Cafes & Stores",
                                "Safe Walking Route Suggestions"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-lg dark:text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">✓</div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
