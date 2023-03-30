/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#282828",
        accent: "#fb923c",
        onBackground: "#fefce8",
        onBackgroundVariant: "#fefce8bf",
        link: "#60a5fa",
        linkAccent: "#38bdf8",
        codeBackground: "#444444",
        codeBackgroundVariant: "#555555",
      },
    },
  },
  plugins: [],
};
