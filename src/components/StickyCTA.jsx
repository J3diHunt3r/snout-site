import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { Download } from 'lucide-react';

const StickyCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 500px (approx hero height)
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none flex justify-center"
                >
                    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 p-3 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto max-w-xl mx-auto">
                        <div className="hidden sm:block pl-2">
                            <span className="font-bold text-sm">Get Snout today</span>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="primary" className="py-2 px-4 text-sm">
                                <Download size={16} /> iOS
                            </Button>
                            <Button variant="secondary" className="py-2 px-4 text-sm">
                                <Download size={16} /> Android
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default StickyCTA;
