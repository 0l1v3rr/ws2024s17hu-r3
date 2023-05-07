/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#0057ff",
        "blue-secondary": "#518cff",
        "blue-button": "#2a73ff",
        "text-secondary": "#303437",
        "text-primary": "#404446",
        "text-card-title": "#202325",
        "white-secondary": "#dcd2d8",
        "white-primary": "#f2f4f5",
        gray: "#e3e5e5",
        "text-disabled": "#979c9e",
        pink: "#e80c8f",
        purple: "#6b4eff",
      },
    },
  },
  plugins: [],
};
