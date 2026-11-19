import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hogwarts: {
          charcoal: "#101116",
          dark: "#101116",
          navy: "#111827",
          gold: "#D6B56D",
          goldLight: "#F0DFB6",
          goldDark: "#9E7B35",
          ivory: "#F4EBDD",
          parchment: "#D7C7A5",
          parchmentMuted: "#B8A782",
          burgundy: "#57242D",
          bronze: "#A47D45",
          purple: "#3D2B52",
          emerald: "#143A27",
          emeraldGlow: "#10B981",
          sapphire: "#12203E",
          cyanGlow: "#38BDF8",
          crimson: "#6E1B26",
          amberGlow: "#F59E0B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        decorative: ["var(--font-cinzel-decorative)", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        magical: "0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(214, 181, 109, 0.15)",
        "magical-lg": "0 12px 45px rgba(0, 0, 0, 0.8), 0 0 35px rgba(214, 181, 109, 0.25)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(244, 235, 221, 0.1)",
        emerald: "0 8px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(16, 185, 129, 0.2)",
        sapphire: "0 8px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.2)",
        crimson: "0 8px 30px rgba(0, 0, 0, 0.7), 0 0 25px rgba(239, 68, 68, 0.2)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "shimmer-gold": "shimmerGold 6s linear infinite",
        "flicker-candle": "candleFlicker 2.5s ease-in-out infinite alternate",
        "spin-slow": "spin 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        candleFlicker: {
          "0%": { opacity: "0.88", transform: "scale(0.98)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
          "100%": { opacity: "0.92", transform: "scale(1)" },
        },
        shimmerGold: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
