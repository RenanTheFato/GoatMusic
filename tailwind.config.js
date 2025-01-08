/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carbon-black': '#2C2C2C',
      },
      fontFamily: {
          outfit:["Outfit", "sans-serif"],
      },
      keyframes: {
        'slide-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        'slide-left': 'slide-left 0.5s ease-out'
      }
    },
  },
  plugins: [],
}