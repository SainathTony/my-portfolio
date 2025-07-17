import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/PortfolioData';
import AnimatedBackground from './AnimatedBackground';

const LandingSection: React.FC = () => {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const techHighlights = [
    'Java & Spring Boot',
    'React & TypeScript',
    'Node.js & Express',
    'AWS & Docker',
    'MongoDB & MySQL'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % techHighlights.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleViewWork = () => {
    // Scroll to projects section or navigate
    console.log('View work clicked');
  };

  const handleGetInTouch = () => {
    window.location.href = `mailto:${portfolioData.personalInfo.email}`;
  };
  return (
    <section className="min-h-screen bg-gradient-to-br from-sage-50 via-neural-50 to-quantum-50 dark:from-forest-900 dark:via-neural-900 dark:to-quantum-900 flex items-center justify-center relative overflow-hidden transition-colors duration-500">
      <AnimatedBackground />

      {/* Main content */}
      <div className="text-center z-10 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-forest-800 dark:text-sage-200 mb-4 leading-tight">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block"
            >
              Hello, I'm
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="block font-medium bg-gradient-to-r from-forest-700 via-neural-600 to-quantum-600 dark:from-matrix-400 dark:via-neural-400 dark:to-quantum-400 bg-clip-text text-transparent"
            >
              {portfolioData.personalInfo.name}
            </motion.span>
          </h1>
          
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-2 mb-4 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 text-matrix-600 dark:text-matrix-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-forest-600 dark:text-sage-300 font-medium">{portfolioData.personalInfo.location}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-6 sm:mb-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-forest-600 dark:text-sage-300 font-light leading-relaxed mb-4 px-2 sm:px-0">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Senior Full Stack Developer
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-neural-600 dark:text-neural-400"
            >
              5+ years crafting scalable web & mobile solutions
            </motion.span>
          </p>
          
          {/* Dynamic Tech Stack Display */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6 text-sm sm:text-base"
          >
            <span className="text-forest-500 dark:text-sage-400 font-medium mb-2 sm:mb-0">Specializing in</span>
            <motion.span
              key={currentTechIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-neural-700 dark:text-neural-300 font-semibold bg-gradient-to-r from-matrix-100 to-mint-100 dark:from-matrix-800 dark:to-mint-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neural-200 dark:border-neural-700 text-sm sm:text-base"
            >
              {techHighlights[currentTechIndex]}
            </motion.span>
          </motion.div>
          
          {/* Bio Summary */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-forest-600 dark:text-sage-300 max-w-2xl mx-auto leading-relaxed mb-6 text-sm sm:text-base px-2 sm:px-0"
          >
            {portfolioData.bio.slice(0, 150)}...
          </motion.p>
          
          {/* Availability Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 px-2 sm:px-0"
          >
            {/* Availability Badge */}
            <div className="flex items-center gap-2 bg-mint-100 dark:bg-mint-900 px-3 sm:px-4 py-2 rounded-full border border-mint-200 dark:border-mint-700 text-sm sm:text-base">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-mint-500 rounded-full animate-pulse"></div>
              <span className="text-mint-700 dark:text-mint-300 font-medium">Available Now</span>
            </div>
            
            {/* Work Preference */}
            <div className="flex items-center gap-2 bg-neural-100 dark:bg-neural-900 px-3 sm:px-4 py-2 rounded-full border border-neural-200 dark:border-neural-700 text-sm sm:text-base">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-neural-600 dark:text-neural-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              <span className="text-neural-700 dark:text-neural-300 font-medium">Remote-First</span>
            </div>
            
            {/* Locations */}
            <div className="flex items-center gap-2 bg-quantum-100 dark:bg-quantum-900 px-3 sm:px-4 py-2 rounded-full border border-quantum-200 dark:border-quantum-700 text-sm sm:text-base">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-quantum-600 dark:text-quantum-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-quantum-700 dark:text-quantum-300 font-medium whitespace-nowrap">Hyderabad • Bangalore</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2 sm:px-0"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(13, 148, 136, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewWork}
            className="bg-gradient-to-r from-matrix-600 to-neural-600 hover:from-matrix-700 hover:to-neural-700 dark:from-matrix-500 dark:to-neural-500 dark:hover:from-matrix-600 dark:hover:to-neural-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 shadow-lg flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V8a2 2 0 00-2-2h-2z" />
            </svg>
            View Portfolio
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              borderColor: "#0d9488"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetInTouch}
            className="border-2 border-matrix-400 dark:border-matrix-500 text-forest-700 dark:text-sage-300 hover:bg-gradient-to-r hover:from-matrix-50 hover:to-mint-50 dark:hover:from-matrix-900 dark:hover:to-mint-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Hire Me
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          <motion.a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-forest-600 hover:text-neural-600 transition-colors duration-300 p-2 sm:p-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </motion.a>
          
          <motion.a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-forest-600 hover:text-neural-600 transition-colors duration-300 p-2 sm:p-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </motion.a>
          
          <motion.a
            href={`mailto:${portfolioData.personalInfo.email}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-forest-600 hover:text-neural-600 transition-colors duration-300 p-2 sm:p-0"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-6 h-10 border-2 border-matrix-400 dark:border-matrix-500 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-1 h-3 bg-matrix-400 dark:bg-matrix-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default LandingSection;