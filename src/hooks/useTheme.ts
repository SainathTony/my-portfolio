import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  // Initialize theme from localStorage or default to system preference
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'dark';
    
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    return 'system';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Get the actual dark mode state based on theme preference
  const getIsDarkMode = (currentTheme: Theme): boolean => {
    if (currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return currentTheme === 'dark';
  };

  const [isDarkMode, setIsDarkMode] = useState(() => getIsDarkMode(theme));

  // Apply theme to document
  const applyTheme = useCallback((newTheme: Theme) => {
    const isDark = getIsDarkMode(newTheme);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setIsDarkMode(isDark);
  }, []);

  // Handle system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setIsDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  // Apply theme on mount and theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme, applyTheme]);

  const toggleDarkMode = useCallback(() => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDarkMode]);

  const setThemeMode = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    isDarkMode,
    toggleDarkMode,
    setThemeMode,
  };
};