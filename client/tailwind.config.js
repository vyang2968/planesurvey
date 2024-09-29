/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'sky-blue': '#87CEEB',
        'davys-gray': '#5D5D5D',
        'alice-blue': '#FOF8FF',
        'jet': '#2F2F2F',
        'silver': '#C0C0C0'
      }
    },
  },
  plugins: [],
}

