import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          foreground: "var(--primary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        ring: "var(--ring)",
        link: "var(--link)",
        // 固定品牌色（不随深色模式变化，用于需要固定色值的场景）
        brand: {
          red: "#C0392B",
          gold: "#D4A017",
          dark: "#1A1A2E",
          rice: "#F8F6F0",
          blue: "#2C5F8A",
        },
      },
      fontFamily: {
        // 正文：中文优先 Noto Sans SC，英文 Inter
        sans: [
          "var(--font-noto-sans-sc)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        // 标题：中文 Noto Serif SC，英文 Playfair Display
        serif: [
          "var(--font-noto-serif-sc)",
          "var(--font-playfair)",
          "Georgia",
          "serif",
        ],
        // 纯英文展示标题
        display: [
          "var(--font-playfair)",
          "var(--font-noto-serif-sc)",
          "Georgia",
          "serif",
        ],
        // 纯英文正文
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
        lg: "calc(var(--radius) + 4px)",
        xl: "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        card: "0 2px 8px rgba(26, 26, 46, 0.08)",
        "card-hover": "0 8px 24px rgba(26, 26, 46, 0.14)",
        banner: "0 4px 16px rgba(192, 57, 43, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
