/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#171717",
        accent: "#fb923c",
        onBackground: "#fefce8",
        onBackgroundFaded: "#fefce8bf",
        link: "#60a5fa",
        linkAccent: "#38bdf8",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      addUtilities({
        ".code": {
          "font-family": "var(--next-mono-font)",
        },
      });
    },
  ],
};
