export default {
  content: [
    "./index.html",
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
      animation: {
        marquee: "marquee 10s linear infinite",
        "marquee-hover": "marquee 10s linear infinite paused", // optional for hover effect
      },
    },
  },
  plugins: [],
};
