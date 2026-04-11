import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Check } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, isBusiness, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className={`relative p-8 rounded-2xl ${isPopular ? 'bg-[var(--color-primary)] text-white shadow-xl scale-105 z-10' : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 text-[var(--color-text)]'}`}
    >
        {isPopular && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-accent)] text-black px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                Most Popular
            </div>
        )}

        <h3 className={`text-xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-[var(--color-text)] dark:text-white'}`}>{title}</h3>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold">{price}</span>
            {price !== 'Free' && <span className={`text-sm ${isPopular ? 'text-green-100' : 'text-gray-500'}`}>/month</span>}
        </div>

        <ul className="space-y-4 mb-8">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check size={18} className={isPopular ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'} />
                    <span className={isPopular ? 'text-green-50' : 'text-gray-600'}>{feature}</span>
                </li>
            ))}
        </ul>

        <Button
            variant={isPopular ? 'secondary' : 'primary'}
            className="w-full"
        >
            {isBusiness ? 'Contact Sales' : 'Get Started'}
        </Button>
    </motion.div>
);

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-[var(--color-bg-soft)] scroll-mt-24">
            <div className="container">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[var(--color-primary)] font-bold tracking-wide uppercase text-sm">Pricing</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Plans for Every Paw</h2>
                    <p className="text-[var(--color-text-light)] text-lg">
                        Whether you're a pet parent or a business, we have a plan for you. Prices in GBP.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    <PricingCard
                        title="Basic"
                        price="Free"
                        features={[
                            "Pet Profile & Basic Health Log",
                            "Community Access",
                            "Lost Pet Alerts (Receive)",
                            "Basic Map View"
                        ]}
                        delay={0}
                    />
                    <PricingCard
                        title="Pro"
                        price="£4.99"
                        isPopular
                        features={[
                            "Unlimited AI Consultations",
                            "Advanced Health Analytics",
                            "Priority Lost Pet Broadcasting",
                            "Store Medical Records",
                            "Ad-free Experience"
                        ]}
                        delay={0.1}
                    />
                    <PricingCard
                        title="Business"
                        price="£19.99"
                        isBusiness
                        features={[
                            "Business Profile & Verification",
                            "Invoicing System",
                            "Direct Messaging with Customers",
                            "Showcase Services on Map",
                            "Staff Management"
                        ]}
                        delay={0.2}
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;
