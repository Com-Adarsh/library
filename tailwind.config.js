/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'crimson': '#D70A0A', // High-energy Crimson
        'slate-navy': '#0A192F', // Deep Space Navy
        'ghost-white': '#F8FAFC',
        'emerald': '#00C853', // Vivid Emerald Green for 'Verified' and 'Live' states
        'sky-blue': '#2563EB',
        'slate-gray': '#64748B',
        'light-gray': '#E2E8F0',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.2' }],
        'h2': ['2.25rem', { lineHeight: '1.3' }],
        'h3': ['1.875rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
