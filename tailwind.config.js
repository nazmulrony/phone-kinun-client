/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#EEF1F8",
        light: "#ffffff",
        dark: "#1f1f1f1",
      },
      fontFamily: {
        lato: "'Lato', 'sans-serif'",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#14b8a6",
          "secondary": "#EEF1F8",
          "accent": "#3730a3",
          "neutral": "#191D24",
          "base-100": "#ffffff",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#f97316",
          "error": "#e11d48",
        },
      },
      false,
    ],
  },
}
