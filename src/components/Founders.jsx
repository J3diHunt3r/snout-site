import React from 'react';
import { motion } from 'framer-motion';

const Founders = () => {
    return (
        <section className="py-24 bg-[var(--color-bg)]">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-wide text-sm">Our Story</span>
                        <h2 className="text-4xl font-bold dark:text-white">Born from a Lost Paws</h2>
                        <p className="text-[var(--color-text-light)] text-lg leading-relaxed">
                            The idea for Snout came on a rainy Tuesday when our founder, Alex, spent 6 hours searching for his golden retriever, Cooper.
                            We realized that in a world of instant connections, our pets remained disconnected.
                        </p>
                        <p className="text-[var(--color-text-light)] text-lg leading-relaxed">
                            We built Snout to bridge that gap. To ensure that no pet parent ever feels that panic again.
                            What started as a simple tracker has evolved into a complete ecosystem for pet health, safety, and happiness.
                        </p>

                        <div className="pt-6">
                            <h3 className="font-bold text-xl mb-1">The Founders</h3>
                            <p className="text-gray-500">Built with love by pet owners, for pet owners.</p>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Founder 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-3"
                        >
                            <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-[var(--color-primary)]/10 group-hover:bg-transparent transition-colors" />
                                {/* Placeholder for Founder Image */}
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Founder Photo
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">Alex Johnson</div>
                                <div className="text-sm text-[var(--color-primary)]">CEO & Co-Founder</div>
                            </div>
                        </motion.div>

                        {/* Founder 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3 mt-8"
                        >
                            <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-[var(--color-primary)]/10 group-hover:bg-transparent transition-colors" />
                                {/* Placeholder for Founder Image */}
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Founder Photo
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">Sarah Chen</div>
                                <div className="text-sm text-[var(--color-primary)]">CTO & Co-Founder</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founders;
