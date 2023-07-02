/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      background: {
        feBackground: "url('/images/frontend/background.png')",
      },
      height: {
        800: "800px",
        480: "480px",
        600: "600px",
      },
      rotate: {
        135: "135deg",
      },
      width: {
        645: "645px",
      },
      right: {
        528: "528px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
