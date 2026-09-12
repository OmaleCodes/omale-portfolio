import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#05060d",
          deep: "#03040a",
          panel: "#0a0e1f",
        },
        signal: {
          cyan: "#2de2ff",
          purple: "#b18aff",
        },
        ink: {
          primary: "#e7ecf9",
          secondary: "#8891ab",
          faint: "#565f7d",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        "glow-cyan": "0 0 1px rgba(45,226,255,0.6), 0 0 24px rgba(45,226,255,0.18), 0 0 60px rgba(45,226,255,0.08)",
        "glow-purple": "0 0 1px rgba(177,138,255,0.6), 0 0 24px rgba(177,138,255,0.18), 0 0 60px rgba(177,138,255,0.08)",
        "glow-cyan-lg": "0 20px 60px -10px rgba(45,226,255,0.35), 0 0 40px rgba(45,226,255,0.2)",
        "glow-purple-lg": "0 20px 60px -10px rgba(177,138,255,0.35), 0 0 40px rgba(177,138,255,0.2)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        "drift-slow": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.05)" },
        },
        "drift-slow-alt": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-3%, 2%, 0) scale(1.08)" },
        },
      },
      animation: {
        "drift-slow": "drift-slow 22s ease-in-out infinite",
        "drift-slow-alt": "drift-slow-alt 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
