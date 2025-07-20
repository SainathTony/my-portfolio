/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Secondary colors for accents
        secondary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        // Success colors
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        // Warning colors
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          950: "#451a03",
        },
        // Error colors
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          950: "#450a0a",
        },
        // Gradient colors for portfolio theme
        gradient: {
          blue: "#3b82f6",
          purple: "#8b5cf6",
          pink: "#ec4899",
          indigo: "#6366f1",
          cyan: "#06b6d4",
          emerald: "#10b981",
          yellow: "#f59e0b",
          orange: "#f97316",
          rose: "#f43f5e",
        },
        // Surface colors for backgrounds
        "surface-light-primary": "#ffffff",
        "surface-light-secondary": "#f8fafc",
        "surface-light-tertiary": "#f1f5f9",
        "surface-light-elevated": "#ffffff",
        "surface-light-overlay": "rgba(255, 255, 255, 0.9)",
        "surface-dark-primary": "#0f172a",
        "surface-dark-secondary": "#1e293b",
        "surface-dark-tertiary": "#334155",
        "surface-dark-elevated": "#1e293b",
        "surface-dark-overlay": "rgba(15, 23, 42, 0.9)",
        // Text colors
        "text-light-primary": "#0f172a",
        "text-light-secondary": "#475569",
        "text-light-tertiary": "#64748b",
        "text-light-muted": "#94a3b8",
        "text-light-inverse": "#ffffff",
        "text-dark-primary": "#f8fafc",
        "text-dark-secondary": "#cbd5e1",
        "text-dark-tertiary": "#94a3b8",
        "text-dark-muted": "#64748b",
        "text-dark-inverse": "#0f172a",
        // Border colors
        "border-light-primary": "#e2e8f0",
        "border-light-secondary": "#cbd5e1",
        "border-light-accent": "#3b82f6",
        "border-dark-primary": "#334155",
        "border-dark-secondary": "#475569",
        "border-dark-accent": "#60a5fa",
        // Hero section specific colors
        "hero-accent": "#6366f1",
        "hero-accent-light": "#a855f7",
        "hero-success": "#10b981",
        "hero-gradient-start": "#3b82f6",
        "hero-gradient-end": "#8b5cf6",
      },
      // Custom spacing
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        // Container max-widths as spacing utilities
        "container-sm": "1200px",
        "container-md": "1400px",
        "container-lg": "1600px",
        "container-xl": "1800px",
        // Custom spacing from CSS files
        15: "3.75rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
        36: "9rem",
        44: "11rem",
        52: "13rem",
        60: "15rem",
        68: "17rem",
        76: "19rem",
        84: "21rem",
        92: "23rem",
        100: "25rem",
        104: "26rem",
        112: "28rem",
        120: "30rem",
      },
      // Typography
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
        serif: [
          "Merriweather",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "Fira Code",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      // Animations
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-out": "fadeOut 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "slide-left": "slideLeft 0.6s ease-out",
        "slide-right": "slideRight 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "scale-out": "scaleOut 0.3s ease-out",
        "bounce-gentle": "bounceGentle 2s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "gradient-x": "gradient-x 4s ease infinite",
        "pulse-ring":
          "pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideLeft: {
          "0%": { transform: "translateX(30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        scaleOut: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.33)" },
          "40%, 50%": { opacity: "0" },
          "100%": { opacity: "0", transform: "scale(1.2)" },
        },
      },
      // Background gradients
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero-light":
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-hero-dark":
          "linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)",
        "gradient-primary": "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "gradient-success": "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        "gradient-warning": "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
        "gradient-error": "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      },
      // Box shadows
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        medium:
          "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        hard: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
        "dark-soft":
          "0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)",
        "dark-medium":
          "0 4px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
        "dark-hard":
          "0 10px 40px -10px rgba(0, 0, 0, 0.6), 0 4px 25px -5px rgba(0, 0, 0, 0.4)",
        // Hero section specific shadows
        "hero-card": "0 8px 32px rgba(0, 0, 0, 0.12)",
        "hero-card-dark": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "hero-button": "0 4px 20px rgba(59, 130, 246, 0.3)",
        "hero-button-dark": "0 4px 20px rgba(96, 165, 250, 0.4)",
      },
      // Backdrop blur
      backdropBlur: {
        xs: "2px",
      },
      // Z-index
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      // Border radius
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
      // Transition durations
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
        1200: "1200ms",
        1500: "1500ms",
      },
      // Scale
      scale: {
        102: "1.02",
        103: "1.03",
        115: "1.15",
        120: "1.20",
        125: "1.25",
      },
    },
  },
};
