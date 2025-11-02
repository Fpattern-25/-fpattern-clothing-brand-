/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#111827",
          accent: "#f59e0b",
        },
      },
    },
  },
  plugins: [],
};
