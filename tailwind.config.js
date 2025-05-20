/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'blueLight': 'rgba(212, 209, 240, 0.6)',
        'peach': 'rgba(246, 214, 199, 0.6)',
        'blueDark':'#3A3B73'
      }
    },
  },
  plugins: [],
}

