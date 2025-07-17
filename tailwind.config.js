/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nature-inspired base colors
        sage: {
          50: '#f6f8f6',
          100: '#e8ece8',
          200: '#d1dbd1',
          300: '#a8bba8',
          400: '#7d9a7d',
          500: '#5a7a5a',
          600: '#486148',
          700: '#3c4f3c',
          800: '#334033',
          900: '#2b362b',
        },
        
        // AI-centric electric blues with nature harmony
        neural: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        // Warm earth tones with tech sophistication
        earth: {
          50: '#faf8f5',
          100: '#f2ede6',
          200: '#e6d8c8',
          300: '#d4c2a5',
          400: '#c2a882',
          500: '#a68a5a',
          600: '#8b6f3f',
          700: '#6d5530',
          800: '#4a3a22',
          900: '#2d2316',
        },
        
        // AI-inspired purple gradients
        quantum: {
          50: '#faf7ff',
          100: '#f3ecff',
          200: '#e9d8ff',
          300: '#d8b8ff',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c2d8a',
          800: '#5b1a6b',
          900: '#3b0d47',
        },
        
        // Tech-forward cyan with natural balance
        matrix: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        
        // Sophisticated mint for AI accent
        mint: {
          50: '#f7fefc',
          100: '#e6fff9',
          200: '#c7f7f0',
          300: '#a0ede3',
          400: '#6bdcc9',
          500: '#4ade80',
          600: '#22c55e',
          700: '#16a34a',
          800: '#15803d',
          900: '#14532d',
        },
        
        // Deep forest for grounding
        forest: {
          50: '#f6f8f6',
          100: '#e8f0e8',
          200: '#d1e0d1',
          300: '#a8c5a8',
          400: '#7fa67f',
          500: '#5d875d',
          600: '#4a6e4a',
          700: '#3d5a3d',
          800: '#2f452f',
          900: '#243724',
        },
        
        // AI accent orange for highlights
        glow: {
          50: '#fff8f0',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Merriweather', 'ui-serif', 'Georgia'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'neural-pulse': 'neuralPulse 3s ease-in-out infinite',
        'matrix-rain': 'matrixRain 4s linear infinite',
        'ai-rotate': 'aiRotate 8s linear infinite',
        'data-flow': 'dataFlow 6s ease-in-out infinite',
        'quantum-shift': 'quantumShift 5s ease-in-out infinite',
        'digital-breath': 'digitalBreath 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(56, 189, 248, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.6)',
            transform: 'scale(1.05)'
          },
        },
        neuralPulse: {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scale(1)',
            boxShadow: '0 0 0px rgba(168, 85, 247, 0.4)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.2)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.8)'
          },
        },
        matrixRain: {
          '0%': { 
            transform: 'translateY(-100vh)',
            opacity: '0'
          },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { 
            transform: 'translateY(100vh)',
            opacity: '0'
          },
        },
        aiRotate: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        dataFlow: {
          '0%': { 
            transform: 'translateX(-100px)',
            opacity: '0'
          },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.6' },
          '100%': { 
            transform: 'translateX(100px)',
            opacity: '0'
          },
        },
        quantumShift: {
          '0%, 100%': { 
            transform: 'translateX(0) translateY(0) rotate(0deg)',
            borderRadius: '50%'
          },
          '25%': { 
            transform: 'translateX(10px) translateY(-10px) rotate(90deg)',
            borderRadius: '25%'
          },
          '50%': { 
            transform: 'translateX(0) translateY(-20px) rotate(180deg)',
            borderRadius: '10%'
          },
          '75%': { 
            transform: 'translateX(-10px) translateY(-10px) rotate(270deg)',
            borderRadius: '25%'
          },
        },
        digitalBreath: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.6',
            filter: 'brightness(1)'
          },
          '50%': { 
            transform: 'scale(1.15)',
            opacity: '0.9',
            filter: 'brightness(1.2)'
          },
        },
      }
    },
  },
  plugins: [],
}