import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette (optional)
        primary: "#1E3A8A", // Blue
        secondary: "#EF4444", // Red
      },
      animation: {
        background: "background 15s ease infinite", // Custom background animation
      },
      keyframes: {
        background: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem', // Custom spacing (example)
      },
    },
  },
  plugins: [],
} satisfies Config;
