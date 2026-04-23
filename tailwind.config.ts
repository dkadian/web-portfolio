import type { Config } from "tailwindcss";

export default {
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
        muted: "var(--muted-foreground)",
        card: "var(--card)",
        border: "var(--border)",
        accent: "var(--accent)",
        "terminal-bg": "var(--terminal-bg)",
        syntax: {
          keyword: "var(--syntax-keyword)",
          string: "var(--syntax-string)",
          function: "var(--syntax-function)",
          variable: "var(--syntax-variable)",
          comment: "var(--syntax-comment)",
          number: "var(--syntax-number)",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(var(--accent-rgb), 0.5)",
        "glow-sm": "0 0 10px rgba(var(--accent-rgb), 0.3)",
      },
      fontFamily: {
        sans: ["var(--font-courier)"],
        mono: ["var(--font-typewriter)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
