/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                base: "#0b0f1a",
                surface: "#131a2a",
                primary: "#22d3ee",
                secondary: "#a78bfa",
                accent: "#22d3ee",
                subtle: "#9ca3af",
            },
            boxShadow: {
                'glow-primary': '0 0 40px -12px rgba(34, 211, 238, 0.45)',
                'glow-secondary': '0 0 40px -12px rgba(167, 139, 250, 0.45)',
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                glow: 'glow 2s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.6s ease-out',
                'slide-down': 'slide-down 0.6s ease-out',
                'fade-in': 'fade-in 0.6s ease-out',
                loading: 'loading 1.5s ease-in-out infinite',
                spin: 'spin 1s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)' },
                    '50%': { boxShadow: '0 0 40px rgba(34, 211, 238, 0.6)' },
                },
                'pulse-glow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                'slide-up': {
                    'from': { opacity: '0', transform: 'translateY(30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-down': {
                    'from': { opacity: '0', transform: 'translateY(-30px)' },
                    'to': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in': {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                },
                loading: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' },
                },
                spin: {
                    'from': { transform: 'rotate(0deg)' },
                    'to': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
