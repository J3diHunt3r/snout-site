import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Activity, Brain, MapPin, MessageCircle, Heart, Radio } from 'lucide-react';
import TiltCard from './ui/TiltCard';
import aiGif from '../assets/gifs/ai-ss.gif';

const FeatureCard = ({ icon: Icon, title, description, delay, gif }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
    >
        <TiltCard className="h-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-[var(--shadow-lg)] border border-gray-100 dark:border-gray-700">
            <div className="w-14 h-14 bg-[var(--color-primary-light)]/10 text-[var(--color-primary)] rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                {gif ? (
                    <img src={gif} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <Icon size={32} />
                )}
            </div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
            <p className="text-[var(--color-text-light)] leading-relaxed">{description}</p>
        </TiltCard>
    </motion.div>
);

const Features = () => {
    const features = [
        {
            icon: QrCode,
            title: "Smart QR Protection",
            description: "Instantly identify lost pets with a simple scan. Owners are notified with your location immediately."
        },
        {
            icon: Activity,
            title: "Daily Health Checks",
            description: "Monitor your pet's vitals and get AI-driven insights to keep them happy and healthy."
        },
        {
            icon: Brain,
            title: "AI & ML Integration",
            description: "Our advanced AI analyzes your pet's behavior and health trends to predict issues before they happen.",
            gif: aiGif
        },
        {
            icon: MapPin,
            title: "Geo-Location Services",
            description: "Find nearest vets, pet stores, and pet-friendly cafes. Explore the world with your best friend."
        },
        {
            icon: Radio,
            title: "Lost Pet Broadcast",
            description: "Lost your pet? Broadcast an alert to all app users within a 2-mile radius instantly."
        },
        {
            icon: MessageCircle,
            title: "Direct Messaging",
            description: "Connect with businesses and vets directly through the app for appointments and advice."
        }
    ];

    return (
        <section className="py-24 bg-[var(--color-bg)] relative">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <span className="text-[var(--color-primary)] font-bold tracking-wide uppercase text-sm">Features</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 dark:text-white">Everything Your Pet Needs</h2>
                    <p className="text-[var(--color-text-light)] text-lg">
                        Snout combines cutting-edge technology with love to provide the best care ecosystem.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            {...feature}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
