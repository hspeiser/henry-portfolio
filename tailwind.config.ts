import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "#ffffff", // Force white text
        primary: {
          DEFAULT: "#ffffff", // Force white text
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#ffffff", // White instead of teal
          foreground: "#ffffff", // Force white text
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "#ffffff", // Force white text
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#ffffff", // Force white text
        },
        accent: {
          DEFAULT: "#ffffff", // White instead of teal
          foreground: "#ffffff", // Force white text
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "#ffffff", // Force white text
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "#ffffff", // Force white text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 3s infinite ease-in-out",
        float: "float 6s infinite ease-in-out",
        "scan-line": "scan-line 8s linear infinite",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

