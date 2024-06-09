import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        fontFamily: {
            sans: [
                '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                {
                    fontFeatureSettings: '"slnt" 0',
                },
            ],
            serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        colors: {
            ...colors,
            spotiGreen: '#49E12E',
        },
        animation: {
            'spin-slow': 'spin 3s linear infinite',
        },
    },
    plugins: [],
};
