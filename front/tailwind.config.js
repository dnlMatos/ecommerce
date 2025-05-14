/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-200": "#008000",
        "primary-100": "#228822",
        "secundary-200": "#00b050",
        "secundary-100": "#0b1a78",
      },
    },
  },
  plugins: [],
};
