import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log("Form submitted", formState);
    };

    return (
        <section className="py-24 bg-[var(--color-bg-soft)]">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-wide text-sm">Get in Touch</span>
                        <h2 className="text-4xl font-bold mt-2 mb-6 dark:text-white">Let's Chat</h2>
                        <p className="text-[var(--color-text-light)] text-lg mb-8">
                            Have questions about our business plans? Want to partner with us?
                            Or just want to show us a picture of your dog? We're all ears.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[var(--color-primary)]">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Email Us</h4>
                                    <p className="text-gray-500">hello@snout.app</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[var(--color-primary)]">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Call Us</h4>
                                    <p className="text-gray-500">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[var(--color-primary)]">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Visit Us</h4>
                                    <p className="text-gray-500">123 Pet Lane, San Francisco, CA</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all dark:text-white"
                                    placeholder="John Doe"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all dark:text-white"
                                    placeholder="john@example.com"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 dark:text-white">Message</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-gray-600 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all h-32 resize-none dark:text-white"
                                    placeholder="How can we help?"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                ></textarea>
                            </div>
                            <Button variant="primary" className="w-full">
                                <Send size={18} /> Send Message
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
