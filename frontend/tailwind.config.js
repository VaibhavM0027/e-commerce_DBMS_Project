/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff9900',
        secondary: '#131921',
        accent: '#febd69'
      }
    },
  },
  plugins: [],
}
