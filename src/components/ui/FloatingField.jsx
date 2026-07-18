import React from 'react';

const FloatingField = ({ id, label, as: Component = 'input', className = '', ...props }) => (
    <div className="relative">
        <Component
            id={id}
            placeholder=" "
            className={`peer w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-5 pb-2 outline-none transition-colors focus:border-[var(--color-primary)] ${className}`}
            {...props}
        />
        <label
            htmlFor={id}
            className="pointer-events-none absolute left-0 top-5 text-base text-gray-400 transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-[var(--color-primary)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold"
        >
            {label}
        </label>
    </div>
);

export default FloatingField;
