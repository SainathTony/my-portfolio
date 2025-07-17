import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 sm:p-3 bg-white dark:bg-forest-800 border-2 border-matrix-200 dark:border-matrix-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          // Sun icon
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-glow-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        ) : (
          // Moon icon
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 text-neural-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;