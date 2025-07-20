# Portfolio Theme System Documentation

## Overview

This portfolio uses a comprehensive theme system built on Tailwind CSS v4 with full dark/light mode support. The system provides consistent theming across all components with extensive customization options.

## Theme Configuration

### Dark Mode Setup

- **Strategy**: `selector` (class-based)
- **Toggle**: Managed by `useTheme` hook
- **Persistence**: localStorage + system preference detection
- **Class Target**: `document.documentElement`

### Color Palette

#### Primary Colors

- **Primary**: Blue scale (50-950) - Main brand color
- **Secondary**: Purple scale (50-950) - Accent color
- **Success**: Green scale (50-950) - Success states
- **Warning**: Yellow scale (50-950) - Warning states
- **Error**: Red scale (50-950) - Error states

#### Semantic Colors

```css
/* Surface Colors */
surface-primary    /* Main backgrounds */
surface-secondary  /* Card backgrounds */
surface-tertiary   /* Input backgrounds */
surface-elevated   /* Modal/popover backgrounds */
surface-overlay    /* Backdrop overlays */

/* Text Colors */
text-primary       /* Main text */
text-secondary     /* Subheadings */
text-tertiary      /* Body text */
text-muted         /* Placeholder/disabled text */
text-inverse       /* Text on dark backgrounds */

/* Border Colors */
border-primary     /* Default borders */
border-secondary   /* Interactive borders */
border-accent      /* Highlighted borders */
```

## Theme Utilities

### Component Classes

#### Cards

```css
.card              /* Basic card */
.card-hover        /* Card with hover effects */
.card-interactive  /* Clickable card */
```

#### Buttons

```css
.btn-primary       /* Primary action button */
.btn-secondary     /* Secondary action button */
.btn-ghost         /* Text-only button */
```

#### Navigation

```css
.nav-link          /* Navigation link */
.nav-link-active   /* Active navigation link */
```

#### Forms

```css
.form-input        /* Text input */
.form-textarea     /* Textarea */
.form-label        /* Form label */
```

### Animation Classes

```css
.animate-fade-in-up    /* Slide up animation */
.animate-fade-in-down  /* Slide down animation */
.animate-fade-in-left  /* Slide left animation */
.animate-fade-in-right /* Slide right animation */
.glow-primary          /* Blue glow effect */
.glow-secondary        /* Purple glow effect */
```

### Layout Utilities

```css
.container-responsive  /* Responsive container */
.grid-responsive      /* Responsive grid */
.flex-center          /* Centered flex */
.flex-between         /* Space-between flex */
.section-padding      /* Standard section padding */
```

## Usage Examples

### Basic Card Component

```jsx
<div className="card-hover">
  <h3 className="text-primary">Card Title</h3>
  <p className="text-secondary">Card description</p>
  <button className="btn-primary">Action</button>
</div>
```

### Navigation Item

```jsx
<a className={`nav-link ${isActive ? "nav-link-active" : ""}`}>
  Navigation Item
</a>
```

### Form Input

```jsx
<div>
  <label className="form-label">Input Label</label>
  <input className="form-input" placeholder="Enter text..." />
</div>
```

### Responsive Text

```jsx
<h1 className="text-responsive-2xl text-primary">Responsive Heading</h1>
```

## Custom Gradients

### Background Gradients

```css
.gradient-primary     /* Blue to purple */
.gradient-secondary   /* Purple to pink */
.gradient-hero-light  /* Hero section (light theme) */
.gradient-hero-dark   /* Hero section (dark theme) */
```

### Using in Components

```jsx
<div className="bg-gradient-primary text-white p-6 rounded-xl">
  Gradient Background
</div>
```

## Theme Hook Usage

```tsx
import { useTheme } from "./hooks/useTheme";

function Component() {
  const { theme, isDarkMode, toggleDarkMode, setThemeMode } = useTheme();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
```

## Animation System

### Available Animations

- `fade-in` / `fade-out`
- `slide-up` / `slide-down` / `slide-left` / `slide-right`
- `scale-in` / `scale-out`
- `bounce-gentle`
- `pulse-slow`
- `spin-slow`
- `wiggle`
- `glow`

### Custom Durations

- `duration-400` (400ms)
- `duration-600` (600ms)
- `duration-800` (800ms)
- `duration-1200` (1200ms)
- `duration-1500` (1500ms)

## Responsive Design

### Breakpoint Strategy

- Mobile-first approach
- Standard Tailwind breakpoints (sm, md, lg, xl, 2xl)
- Responsive text utilities for consistent scaling

### Custom Spacing

- `18` (4.5rem) - Between standard sizes
- `88` (22rem) - Large component spacing
- `128` (32rem) - Section spacing

## Box Shadows

### Light Theme

- `shadow-soft` - Subtle elevation
- `shadow-medium` - Card elevation
- `shadow-hard` - Modal/popover elevation

### Dark Theme

- `shadow-dark-soft` - Subtle elevation
- `shadow-dark-medium` - Card elevation
- `shadow-dark-hard` - Modal/popover elevation

### Glow Effects

- `shadow-glow` - Primary glow
- `shadow-glow-lg` - Large primary glow

## Performance Considerations

1. **CSS Purging**: Only used classes are included in production
2. **Theme Persistence**: Prevents flash of unstyled content
3. **System Preference**: Respects user's OS preference
4. **Smooth Transitions**: 300ms duration for theme switching

## Migration Guide

### From Manual Dark Classes

```css
/* Before */
.bg-white.dark: bg-gray-900 /* After */ .surface-primary;
```

### From Hardcoded Colors

```css
/* Before */
.text-gray-900.dark: text-white /* After */ .text-primary;
```

### From Custom Animations

```css
/* Before */
@keyframes fadeIn { ... }

/* After */
.animate-fade-in
```

## Best Practices

1. **Always use semantic color classes** instead of hardcoded colors
2. **Leverage theme utilities** for consistent spacing and typography
3. **Test both themes** during development
4. **Use responsive utilities** for mobile-first design
5. **Prefer CSS classes** over inline styles for better performance

## Troubleshooting

### Dark Mode Not Working

- Ensure `dark` class is on `html` element
- Check `useTheme` hook implementation
- Verify Tailwind config has `darkMode: 'selector'`

### Colors Not Switching

- Use semantic color classes instead of hardcoded ones
- Check if custom CSS is overriding Tailwind classes
- Ensure components are receiving theme props correctly

### Performance Issues

- Check if unused CSS is being purged
- Minimize custom CSS in favor of utility classes
- Use `transition-colors` for smooth theme switching
