/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: [
    "./index.html",        // Include index.html (for Vite)
    "./src/**/*.{js,jsx,ts,tsx}" // Ensure React files are scanned
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
