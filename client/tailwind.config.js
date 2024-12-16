/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'soft-gray': '#E3E2E9',
        'light-gray': '#F9F9F9',
        'charcoal': '#373737',
        'soft-black': '#1B1B1B',
        'indigo': '#263374',
        'darker-gray': '#D7D7D7'
      }
    },
  },
  plugins: [
  ],
}

