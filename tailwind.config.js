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
      }
    },
  },
  plugins: [],
}