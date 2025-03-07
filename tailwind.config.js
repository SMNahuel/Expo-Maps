/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    color: {
      textColor: "#888888"
    },
    fontFamily:{
      TradeGothic: ["'TradeGothic'"]
    }
  },
  plugins: [],
};
