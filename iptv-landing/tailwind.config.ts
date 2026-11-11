import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#07080A",
          950: "#050608",
          900: "#0A0C10",
          850: "#0D1015",
          800: "#12161C",
        },
        surface: {
          DEFAULT: "#101318",
          hover: "#151A21",
          raised: "#1A2029",
        },
        gold: {
          DEFAULT: "#D9B98C",
          soft: "#F0DDC1",
          deep: "#B08A56",
        },
        mint: {
          DEFAULT: "#8BE9DC",
          deep: "#45C4B4",
        },
        ink: {
          DEFAULT: "#F4F0E6",
          soft: "#D9D4C8",
          muted: "#969DAA",
        },
        hairline: "rgba(244, 240, 230, 0.09)",
        "hairline-strong": "rgba(244, 240, 230, 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 40px 100px -60px rgba(0, 0, 0, 0.95)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
      },
    },
  },
  plugins: [],
};

export default config;
