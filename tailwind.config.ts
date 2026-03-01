import { type Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#E8432D",
        "accent-light": "#ff6b4a",
        dark: "#080810",
        darker: "#04040a",
        glass: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        tajawal: ["var(--font-tajawal)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(232,67,45,0.4)",
        "glow-sm": "0 0 15px rgba(232,67,45,0.3)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
