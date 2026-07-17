import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        "panel-2": "var(--panel-2)",
        hairline: "var(--hairline)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        amber: "var(--amber)",
        "amber-bright": "var(--amber-bright)",
        teal: "var(--teal)",
        violet: "var(--violet)",
        alert: "var(--alert)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      letterSpacing: {
        eyebrow: "0.15em",
        tightest: "-0.04em",
      },
      boxShadow: {
        "glow-amber": "0 0 0 1px rgba(245,166,35,0.30), 0 8px 30px -6px rgba(245,166,35,0.35)",
        "glow-teal": "0 0 0 1px rgba(45,212,191,0.25), 0 8px 30px -8px rgba(45,212,191,0.30)",
        card: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 40px -24px rgba(0,0,0,0.7)",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.55" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        "glow-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)", opacity: "0.55" },
          "50%": { transform: "translate3d(4%,-3%,0) scale(1.08)", opacity: "0.8" },
        },
        "live-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        "glow-drift": "glow-drift 16s ease-in-out infinite",
        "live-dot": "live-dot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
