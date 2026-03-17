/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Une palette "Tiger" pour le côté pro/construction
        tiger: {
          yellow: "#FFB800",
          black: "#1A1A1A",
          gray: "#F5F5F5",
        }
      }
    },
  },
  plugins: [],
}