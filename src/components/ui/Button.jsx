import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group";

    const variants = {
        primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] hover:shadow-lg hover:shadow-green-900/20 hover:scale-105",
        secondary: "bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-light)] hover:shadow-lg hover:shadow-orange-900/20 hover:scale-105",
        outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
        ghost: "text-[var(--color-text)] hover:bg-gray-100",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>

            {/* Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </motion.button>
    );
};

export default Button;
