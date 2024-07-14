/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F6F1FF",
        secondary: "#EDE4FF",
        third: "#C6ADF8",
        forth: "#D3BDFF",
        fifth: "#F0E8FF",
        "text-primary": "#2D1313",
      },
      fontFamily: {
        sora: "Sora",
      },
    },
  },
  plugins: [],
};
