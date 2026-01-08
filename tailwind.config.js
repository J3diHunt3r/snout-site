/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                'primary-light': 'var(--color-primary-light)',
                secondary: 'var(--color-secondary)',
                'secondary-light': 'var(--color-secondary-light)',
                accent: 'var(--color-accent)',
                bg: 'var(--color-bg)',
                'bg-soft': 'var(--color-bg-soft)',
                text: 'var(--color-text)',
                'text-light': 'var(--color-text-light)',
            },
            fontFamily: {
                sans: ['var(--font-main)', 'sans-serif'],
                display: ['var(--font-display)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
