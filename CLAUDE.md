# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern React portfolio website built with TypeScript, Vite, and advanced animations. The project features 3D graphics (Three.js), interactive animations (Framer Motion, GSAP), and a sophisticated design system.

## Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Lint code
yarn lint

# Format code
yarn format
```

## Architecture

### Core Structure
- **App.tsx**: Main application component managing global state (dark mode, active section, loading state) and rendering all sections
- **src/sections/**: Individual portfolio sections (Hero, About, Skills, Experience, Projects, Contact)
- **src/components/**: Reusable UI components including 3D background, navigation, and interactive elements
- **src/data/portfolioData.ts**: Centralized data store for skills, projects, experiences, and personal information
- **src/types/**: TypeScript type definitions for consistent data structures

### Key Features
- **3D Background**: Three.js integration via `ThreeJSBackground` component
- **Interactive Animations**: Framer Motion for section animations, GSAP for advanced effects
- **Custom Hooks**: Mouse tracking, scroll handling, and intersection observer utilities
- **Responsive Design**: Tailwind CSS with custom styling in `src/styles/`
- **Dark/Light Mode**: Toggle functionality with CSS custom properties

### State Management
The app uses React's built-in state management:
- Global state in `App.tsx` for theme, active section, and loading states
- Custom hooks for mouse tracking, scroll position, and element visibility
- Props drilling for component communication

### Data Flow
All portfolio content is centralized in `src/data/portfolioData.ts` and follows strict TypeScript interfaces defined in `src/types/common.ts`. The data structure includes skills with levels and categories, projects with tech stacks, and detailed experience records.

### Styling System
- Tailwind CSS for utility-first styling
- Custom CSS files in `src/styles/` for animations and component-specific styles
- CSS custom properties for theme switching
- Responsive design with mobile-first approach

## Key Dependencies

- **React 19**: Core framework with latest features
- **TypeScript**: Type safety and development experience
- **Vite**: Build tool and development server
- **Three.js + React Three Fiber**: 3D graphics and animations
- **Framer Motion**: Component animations and transitions
- **GSAP**: Advanced animations and timeline control
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Development Notes

The project structure follows a feature-based organization with clear separation between components, sections, hooks, and utilities. All interactive elements respect the dark/light theme system and maintain accessibility standards.