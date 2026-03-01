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
        "ios-card":
          "0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
        "ios-elevated":
          "0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
        "ios-glow": "0 0 30px rgba(232,67,45,0.4)",
      },
      backdropBlur: {
        glass: "20px",
        "ios-sm": "16px",
        "ios-md": "24px",
        "ios-lg": "40px",
        "ios-xl": "60px",
      },
      transitionTimingFunction: {
        ios: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "ios-bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "ios-smooth": "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      borderRadius: {
        "ios-sm": "10px",
        "ios-md": "14px",
        "ios-lg": "20px",
        "ios-xl": "28px",
        "ios-2xl": "36px",
      },
    },
  },
  plugins: [],
} satisfies Config;
