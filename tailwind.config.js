import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                spotiGreen: '#49E12E',
            },
            fontFamily: {
                sans: [
                    '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                    {
                        fontFeatureSettings: '"slnt" 0',
                    },
                ],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'skeleton-loading': 'skeleton-loading 1s infinite linear',
            },
            keyframes: {
                'skeleton-loading': {
                    '0%': {
                        left: '-50%',
                    },
                    '100%': {
                        left: '100%',
                    },
                },
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme, addUtilities }) {
            matchUtilities(
                {
                    'auto-fill': (value) => ({
                        gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
                    }),
                    'auto-fit': (value) => ({
                        gridTemplateColumns: `repeat(auto-fit, minmax(min(${value}, 100%), 1fr))`,
                    }),
                },
                {
                    values: theme('width', {}),
                }
            );

            addUtilities({
                '.mask-gradient': {
                    'mask-image': 'linear-gradient(90deg, black, black 80%, transparent)',
                },
                '.mask-gradient-vertical': {
                    'mask-image': 'linear-gradient(180deg, black, black 80%, transparent)',
                },
                '.text-shadow-lg': {
                    'text-shadow': '0 0 10px rgba(0, 0, 0, 0.15)',
                },
                '.text-shadow-md': {
                    'text-shadow': '0 0 4px rgba(0, 0, 0, 0.25)',
                },
            });
        }),
    ],
};
