import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FAF6F0",
          100: "#F4EBDD",
          200: "#E9D7BC",
          300: "#DDBF97",
          400: "#CE9F6A",
          500: "#B88242", // Warm Teak Gold
          600: "#9A662C",
          700: "#7A4E20",
          800: "#5D3A18", // Deep Walnut
          900: "#422810",
          950: "#261507",
        },
        sand: {
          50: "#FDFCF7",
          100: "#F8F5EC",
          200: "#EDE7D7",
          300: "#DFD6BF",
          400: "#C8BBA0",
          500: "#A99878",
        },
        charcoal: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#070B14",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(66, 40, 16, 0.08), 0 20px 25px -5px rgba(0, 0, 0, 0.04)',
        'luxury-hover': '0 20px 40px -15px rgba(66, 40, 16, 0.16), 0 25px 30px -5px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px -5px rgba(184, 130, 66, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
};
export default config;
