import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "relative overflow-hidden px-6 py-3 font-semibold transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100";

    const variants = {
        primary: "rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-light)] hover:shadow-lg hover:shadow-green-900/20 hover:scale-105",
        secondary: "rounded-full bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-light)] hover:shadow-lg hover:shadow-orange-900/20 hover:scale-105",
        outline: "rounded-full border-solid border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
        ghost: "rounded-full text-[var(--color-text)] hover:bg-gray-100",
        dark: "rounded-md bg-slate-900 text-white uppercase tracking-widest text-xs font-bold hover:bg-slate-800 hover:shadow-lg hover:scale-[1.02]",
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
