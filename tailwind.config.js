/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        "body-text": "#B5E65E",
        "bg-black": "#1c1a1c",
        "bg-subtle-black": "#161816",
        "bg-hover": "#11111150"
      }
    },
    theme: {
      container: {
        center: true,
        padding: "1rem"
      }
    }
  },
  plugins: []
};
