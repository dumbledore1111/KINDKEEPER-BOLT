/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          peach: '#FFB38E',
          cream: '#FFCF9D',
          orange: '#FF6B2C',
          coral: '#FF4F2C',
        }
      }
    },
  },
  plugins: [],
};