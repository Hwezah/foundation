export default {
  content: [
    "./index.html",
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this matches your folder structure
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      screens: {
        custom748: "748px",
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        "marquee-hover": "marquee 10s linear infinite paused", // optional for hover effect
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: {
          50: "#e5f1f4",
          100: "#cce3e9",
          200: "#99c7d4",
          300: "#66abba",
          400: "#338fa4",
          500: "#0a6f89", // slightly lighter than your base
          600: "#05596d",
          700: "#044355",
          800: "#033040",
          900: "#022b3a", // your original color
          950: "#01151d",
        },
        accent: {
          50: "#FAF5F0",
          100: "#F4ECE1",
          200: "#E8D6BF",
          300: "#DDC2A2",
          400: "#D2AF84",
          500: "#C69963",
          600: "#B78343",
          700: "#926835",
          800: "#6C4D28",
          900: "#4B351B",
          950: "#382814",
        },
      },
    },
  },
  plugins: [],
};
