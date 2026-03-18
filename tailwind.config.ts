import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FAFAF7',
          dark: '#1A1A18',
          warm: '#F5F3EE',
        },
        gold: {
          DEFAULT: '#C5A55A',
          light: '#D4BC7C',
          dark: '#A8893E',
        },
        charcoal: '#2D2D2A',
        'warm-gray': '#9B978F',
        'body-text': '#5C5850',
        kitaya: {
          red: '#C62828',
          'red-dark': '#8E0000',
          'red-light': '#FF5F52',
        },
        teagate: {
          blue: '#1A237E',
          'blue-mid': '#283593',
          'blue-light': '#534BAE',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Outfit', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'scroll-pulse': 'scrollPulse 2s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.4', transform: 'scaleY(0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;