// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // <- important
    "./app/**/*.{js,ts,jsx,tsx,mdx}",   // (optional if you also build from /app)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        muted: "var(--muted)",
        primary: { DEFAULT: "var(--primary)", 600: "var(--primary-600)" },
        ring: "var(--ring)",
        success: "var(--success)",
        error: "var(--error)",
      },
      boxShadow: { card: "0 6px 20px rgba(0,0,0,0.06)" },
      borderRadius: { xl: "1rem" },
    },
  },
  plugins: [],
};
export default config;

