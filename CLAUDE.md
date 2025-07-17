# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` (runs on http://localhost:3000)
- **Build for production**: `npm run build`
- **Run tests**: `npm test`
- **Eject from Create React App**: `npm run eject` (one-way operation)

## Project Architecture

This is a personal portfolio website built with:
- **Framework**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animation**: Framer Motion for smooth transitions
- **State Management**: React Context API for theme management
- **Build Tool**: Create React App with react-scripts

### Key Components Structure

```
src/
├── components/
│   ├── AnimatedBackground.tsx    # Dynamic background effects
│   ├── LandingSection.tsx       # Main portfolio content
│   └── ThemeToggle.tsx          # Light/dark mode switch
├── contexts/
│   └── ThemeContext.tsx         # Global theme state management
├── data/
│   └── PortfolioData.ts         # Portfolio content data
├── App.tsx                      # Main app component
└── index.css                    # Global styles and Tailwind imports
```

### Theme System

The application uses a sophisticated theme system with:
- **Context Provider**: `ThemeContext` manages light/dark mode state
- **Persistence**: Theme preference saved to localStorage
- **System Integration**: Respects user's OS dark mode preference
- **Tailwind Integration**: Uses `class` dark mode with custom color palette

### Custom Design System

Tailwind configuration includes extensive custom color palette:
- **sage**: Nature-inspired base colors
- **neural**: AI-centric electric blues
- **earth**: Warm earth tones with tech sophistication
- **quantum**: AI-inspired purple gradients
- **matrix**: Tech-forward cyan with natural balance
- **mint**: Sophisticated mint for AI accent
- **forest**: Deep forest for grounding
- **glow**: AI accent orange for highlights

Custom animations include `fade-in`, `slide-up`, and `float` for smooth UX.

### Key Features

- **Responsive Design**: Mobile-first approach with touch optimization
- **Accessibility**: Reduced motion support and proper semantic structure
- **Performance**: Optimized fonts (Inter, Merriweather) and smooth scrolling
- **SEO**: Comprehensive meta tags for portfolio visibility

## Development Notes

- **TypeScript**: Strict typing enabled throughout
- **Testing**: Uses @testing-library/react for component testing
- **Styling**: Tailwind utilities with custom CSS for special cases
- **Fonts**: Google Fonts integration for Inter and Merriweather
- **Mobile**: iOS-specific optimizations to prevent input zoom