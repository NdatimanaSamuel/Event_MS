/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebarBg: "#66ccff",
        colorText: "#666",
        sidebarHover: "#000000",
       
      },
    },
  },
  plugins: [],
}

