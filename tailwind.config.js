/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9e6",
          100: "#dbefca",
          200: "#c0e0a9",
          300: "#98bf64",
          400: "#7bab45",
          500: "#4F7942",
          600: "#436838",
          700: "#1E5631",
          800: "#112f1a",
          900: "#051b0d",
        },
        secondary: {
          50: "#fcf9f4",
          100: "#f8f1e9",
          200: "#f0e3ce",
          300: "#e9d3b3",
          400: "#e1c398",
          500: "#D4A373",
          600: "#c48e57",
          700: "#b47946",
          800: "#8e5d35",
          900: "#68432c",
        },
        accent: {
          50: "#f9fbf2",
          100: "#f2f7e5",
          200: "#E9EDC9",
          300: "#dce3ad",
          400: "#c9d387",
          500: "#b0bd60",
          600: "#949e4a",
          700: "#767e3b",
          800: "#595f2d",
          900: "#3e4220",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-out",
        carousel: "carousel 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        carousel: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
}
