/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terracotta: '#C67B5C',
        sand: '#E8D8C4',
        warmbeige: '#F4EFE8',
        brown: '#6E5849',
        'terracotta-dark': '#A85F42',
        border: '#D4C4B0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
