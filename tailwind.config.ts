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
          dark: "#08090D",
          navy: "#101B2D",
          gold: "#C6A15B",
          goldLight: "#E8D5A3",
          bronze: "#98713A",
          parchment: "#D5C39A",
          parchmentDark: "#8C7954",
          burgundy: "#541C2A",
          purple: "#483568",
          emerald: "#1A472A",
          emeraldGlow: "#10B981",
          sapphire: "#0E1A40",
          cyanGlow: "#38BDF8",
          crimson: "#740001",
          amberGlow: "#F59E0B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Georgia", "serif"],
        decorative: ["var(--font-cinzel-decorative)", "Cinzel", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        magical: "0 0 25px rgba(198, 161, 91, 0.25)",
        "magical-lg": "0 0 50px rgba(198, 161, 91, 0.4)",
        emerald: "0 0 30px rgba(16, 185, 129, 0.3)",
        sapphire: "0 0 30px rgba(56, 189, 248, 0.3)",
        crimson: "0 0 30px rgba(185, 28, 28, 0.35)",
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "shimmer-gold": "shimmerGold 6s linear infinite",
        "flicker-candle": "candleFlicker 2.5s ease-in-out infinite alternate",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        candleFlicker: {
          "0%": { opacity: "0.85", transform: "scale(0.97)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
          "100%": { opacity: "0.9", transform: "scale(1)" },
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
