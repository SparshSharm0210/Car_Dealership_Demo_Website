/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07080B',
          900: '#0D0E12',
          800: '#14161E',
          700: '#1C1F2B',
        },
        gold: {
          300: '#F9E7B3',
          400: '#F3E5AB',
          500: '#D4AF37',
          600: '#B58F22',
          700: '#8A6A12',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      }
    },
  },
  plugins: [],
}
