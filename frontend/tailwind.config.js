// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Update path based on your project structure
    "./components/**/*.{js,ts,jsx,tsx}",  // Add this if your components are in a root components folder
    "./pages/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}