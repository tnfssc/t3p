/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/**/*.html",
    "./index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
  },
};
