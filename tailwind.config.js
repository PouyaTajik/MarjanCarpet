/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F8F3EA",
        pistachio: "#DDE5C2",
        coffee: "#5A3825",
        wine: "#7B1E22",
        clay: "#B86B46",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
}
