/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    backgroundImage: {
        'auth-bg': "url('/src/assets/login.jpg')"
    },
    extend: {},
  },
  plugins: [],
}

