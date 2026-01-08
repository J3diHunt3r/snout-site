import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Dog Mom",
        content: "I lost reusable 2 hours thanks to the QR feature. I was panic-stricken until I got the notification!",
        rating: 5
    },
    {
        name: "Dr. Aris Thorne",
        role: "Veterinarian",
        content: "The health tracking logs are incredibly detailed. It makes my job so much easier when owners bring their history.",
        rating: 5
    },
    {
        name: "Mike Ross",
        role: "Pet Store Owner",
        content: "Switching our business to Snout was the best decision. The invoicing is seamless and clients love the direct booking.",
        rating: 5
    },
    {
        name: "Jessica Pearson",
        role: "Cat Lover",
        content: "Gemini AI helped me figure out why my cat was refusing to eat. Turns out it was just stress from the move!",
        rating: 4
    },
    {
        name: "Harvey Specter",
        role: "Pro User",
        content: "Premium features are worth every penny. The analytics are precise and the UI is beautiful.",
        rating: 5
    }
];

const TestimonialCard = ({ name, role, content, rating }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 min-w-[300px] mx-4">
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
            ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 h-24 overflow-hidden relative">"{content}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold">
                {name[0]}
            </div>
            <div>
                <div className="font-bold text-sm dark:text-white">{name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{role}</div>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    return (
        <section className="py-20 overflow-hidden bg-[var(--color-bg)]">
            <div className="text-center mb-12">
                <span className="text-[var(--color-primary)] font-bold uppercase tracking-wide text-sm">Community Love</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2">Trusted by 10,000+ Owners</h2>
            </div>

            {/* Marquee Effect */}
            <div className="relative w-full flex overflow-hidden mask-linear-gradient">
                <motion.div
                    className="flex"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                >
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <TestimonialCard key={i} {...t} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
