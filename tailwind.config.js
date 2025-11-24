/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c9432b",
        secondary: "#2d5f5d",
        dark: "#0a0a0a",
      },
    },
  },
  plugins: [],
};
