/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
      },
      colors: {
        primary: '#8bd0cc',
        'primary-dark': {
          DEFAULT: 'hsl(219, 26%, 52%)',
        },
        'primary-light': {
          DEFAULT: '#b3d9d7',
        },
        'background-static': {
          DEFAULT: '#232528',
        },
        danger: {
          DEFAULT: '#ed1c24',
        },
        text: {
          DEFAULT: 'hsl(177, 80%, 90%)',
        },
        'text-dark': {
          DEFAULT: 'hsl(177, 80%, 10%)',
        },
        'cyan-highlight': '#00eaff',
        'cyan-highlight-alpha-02': 'rgba(0, 234, 255, 0.02)',
        'cyan-highlight-alpha-04': 'rgba(0, 234, 255, 0.04)',
      },
      boxShadow: {
        'details-card':
          'inset 0 1px 1px 0 rgba(0, 234, 255, 0.2), inset 0 24px 48px 0 rgba(0, 234, 255, 0.06)',
        'details-card-hover':
          'inset 0 1px 1px 0 rgba(0, 234, 255, 0.3), inset 0 24px 48px 0 rgba(0, 234, 255, 0.1)',
      },
      transitionDuration: {
        450: '0.45s',
      },
      transitionTimingFunction: {
        'custom-cubic': 'cubic-bezier(0.6, 0.6, 0, 1)',
      },
      aspectRatio: {
        '2/1.5': '2 / 1.5',
        '2/1.8': '2 / 1.8',
      },
      spacing: {
        '2.5rem': '2.5rem',
        '1.2rem': '1.2rem',
        'section-gap': '160px',
      },
      fontSize: {
        '2.6rem': '2.6rem',
        '1.25rem': '1.25rem',
        '1.08rem': '1.08rem',
      },
      letterSpacing: {
        '0.01em': '0.01em',
      },
      backgroundImage: {
        'background-dynamic': 'linear-gradient(135deg, #10131a 80%, #181c27 100%)',
      },
    },
  },
  plugins: [],
}
