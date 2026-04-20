/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F4F5F0',
        charcoal: '#252B22',
        sage: '#7B9473',
        'sage-light': '#A8BFA2',
        'sage-dark': '#4A6245',
        linen: '#E8EAE0',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
