import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';
import { Check } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, isBusiness, delay, checkoutLink }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true }}
        className="relative flex flex-col h-full px-8 py-10 md:py-0 text-[var(--color-text)]"
    >
        <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold">{title}</h3>
            {isPopular && (
                <span className="bg-[var(--color-accent)]/20 text-[var(--color-secondary)] px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    Most Popular
                </span>
            )}
        </div>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-bold">{price}</span>
            {price !== 'Free' && <span className="text-sm text-gray-500">/month</span>}
        </div>

        <ul className="flex-1 space-y-4 mb-8">
            {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check size={18} className="text-[var(--color-primary)]" />
                    <span className="text-gray-600">{feature}</span>
                </li>
            ))}
        </ul>

        <Button
            variant={isPopular ? 'primary' : isBusiness ? 'secondary' : 'outline'}
            className="w-full"
            disabled={!checkoutLink && Boolean(isBusiness || isPopular)}
            onClick={checkoutLink ? () => { window.location.href = checkoutLink; } : undefined}
        >
            {checkoutLink ? 'Get Started' : isBusiness ? 'Contact Sales' : 'Get Started'}
        </Button>
    </motion.div>
);

const PRO_CHECKOUT_LINK = import.meta.env.VITE_STRIPE_PRO_LINK;
const BUSINESS_CHECKOUT_LINK = import.meta.env.VITE_STRIPE_BUSINESS_LINK;

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

                <div className="grid md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-gray-200 max-w-6xl mx-auto items-stretch">
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
                            "Up to 5 pets in your Kennel",
                            "Advanced Health Analytics",
                            "Priority Lost Pet Broadcasting",
                            "Store Medical Records",
                            "Ad-free Experience"
                        ]}
                        delay={0.1}
                        checkoutLink={PRO_CHECKOUT_LINK}
                    />
                    <PricingCard
                        title="Business"
                        price="£19.99"
                        isBusiness
                        features={[
                            "Everything Pro",
                            "Dashboard for Revenue Tracking",
                            "Business Profile & Verification",
                            "Automated Invoicing System",
                            "Direct Messaging with Customers",
                            "Showcase Services on Map",
                            "Staff Management"
                        ]}
                        delay={0.2}
                        checkoutLink={BUSINESS_CHECKOUT_LINK}
                    />
                </div>
            </div>
        </section>
    );
};

export default Pricing;
