import { feSpotLight } from "framer-motion/client";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "200px",
      smd: "540px",
      md: "720px",
      lg: "1080px",
      xl: "1440px",
    },
    extend: {
      colors: {
        redText: "#FF6363",
        darkText: "#000000",
        lightText: "#9b9b9b",
        greenText: "#1d8221",
        skyText: "#32bde8",
        whiteText: "#ffffff",
      },
      flex: {
        full: "0 0 100%",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
