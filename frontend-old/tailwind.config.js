/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#0b0f1b',
        'text': '#ffffff',
        'alt-text': '#4b4646',
        'primary': '#d68a3d',
        'secondary': '#eac392',
      },
      fontFamily: {
        sans: ['var(--font-antonio)', 'sans-serif'],
        paragraph: ['var(--font-proximanova)', 'sans-serif'],
      },
      fontSize: {
        'pc-superheading': ['16rem', { lineHeight: 'auto' }],
        'pc-supersub': ['3rem', { lineHeight: 'auto' }],
        'pc-heading': ['8rem', { lineHeight: '90px' }],
        'pc-paragraph': ['2.25rem', { lineHeight: '100px' }],
        'pc-cta': ['2rem', { lineHeight: 'auto' }],
        'pc-footer': ['1.25rem', { lineHeight: 'auto' }],
        'mb-superheading': ['4rem', { lineHeight: 'auto' }],
        'mb-heading': ['4rem', { lineHeight: '110px' }],
        'mb-supersub': ['1.5rem', { lineHeight: 'auto' }],
        'mb-paragraph': ['1.25rem', { lineHeight: 'auto' }],
        'mb-cta': ['1.5rem', { lineHeight: 'auto' }],
        'mb-footer': ['0.75rem', { lineHeight: 'auto' }],
      },
    },
  },
  plugins: [],
};
