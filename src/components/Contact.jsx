import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import FloatingField from './ui/FloatingField';
import { Mail, Phone, MapPin } from 'lucide-react';
import { sendContactMessage } from '../services/contact';

const Contact = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | sent | error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');
        try {
            await sendContactMessage(formState);
            setStatus('sent');
            setFormState({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-24 bg-[var(--color-bg-soft)] scroll-mt-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-wide text-sm">Get in Touch</span>
                        <h2 className="text-4xl font-bold mt-2 mb-6">Let's Chat</h2>
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
                                    <p className="text-gray-500">carl@gardenrouteenterprises.com</p>
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
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <FloatingField
                                id="contact-name"
                                label="Name"
                                type="text"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                            <FloatingField
                                id="contact-email"
                                label="Email"
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                            <FloatingField
                                id="contact-message"
                                label="Message"
                                as="textarea"
                                className="h-28 resize-none"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                            <Button variant="dark" className="w-full" disabled={status === 'sending'}>
                                {status === 'sending' ? 'Sending…' : 'Send Message'} <span aria-hidden="true">→</span>
                            </Button>

                            {status === 'sent' && (
                                <p className="text-sm font-medium text-[var(--color-primary)]">
                                    Thanks — we'll be in touch soon!
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-sm font-medium text-red-600">{errorMessage}</p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
