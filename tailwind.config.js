/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F3EEE3",
          raised: "#FAF7F0",
          shadow: "#E2D9C6",
          dot: "#D8CFBD",
        },
        rule: "#CBD9E3",
        margin: "#E3A497",
        ink: {
          DEFAULT: "#1D1B18",
          muted: "#5F594F",
          faint: "#8A8274",
        },
        vermilion: "#C8402A",
        fountain: "#2347A0",
        highlight: "#F2DE6B",
        sticky: "#F7E58C",
        tape: "#EFE6C8",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "Menlo", "monospace"],
        hand: ['"Kalam"', '"Comic Sans MS"', "cursive"],
      },
      maxWidth: {
        page: "1200px",
        prose: "64ch",
      },
      boxShadow: {
        sheet:
          "0 1px 0 rgba(0,0,0,.04), 0 10px 20px -12px rgba(74,58,34,.30)",
        lifted:
          "0 1px 0 rgba(0,0,0,.04), 0 18px 30px -14px rgba(74,58,34,.38)",
        sticky:
          "0 1px 1px rgba(0,0,0,.05), 0 12px 18px -10px rgba(74,58,34,.35)",
      },
      transitionTimingFunction: {
        paper: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
