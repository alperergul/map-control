/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 4px 16px 0px #0000001A",
      },
      colors: {
        "widget-bg": "#F2F9FF",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
        "3xl": "1780px",
      },
    },
  },
  plugins: [],
};
