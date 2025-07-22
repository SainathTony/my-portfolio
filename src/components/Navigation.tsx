import React, { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "lucide-react/dist/esm/icons/home";
import User from "lucide-react/dist/esm/icons/user";
import CodeIcon from "lucide-react/dist/esm/icons/code";
import BarChart2 from "lucide-react/dist/esm/icons/bar-chart-2";
import Rocket from "lucide-react/dist/esm/icons/rocket";
import Mail from "lucide-react/dist/esm/icons/mail";

interface NavigationProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
}

const sections = [
  { id: "home", label: "Home", icon: <Home size={20} /> },
  { id: "about", label: "About", icon: <User size={20} /> },
  { id: "skills", label: "Skills", icon: <CodeIcon size={20} /> },
  { id: "experience", label: "Experience", icon: <BarChart2 size={20} /> },
  { id: "projects", label: "Projects", icon: <Rocket size={20} /> },
  { id: "contact", label: "Contact", icon: <Mail size={20} /> },
];

const Navigation: React.FC<NavigationProps> = memo(
  ({ activeSection, scrollToSection }) => {
    const [isHovered, setIsHovered] = useState<number | null>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        scrollToSection(index);
      }
    };

    // Hide navigation on scroll
    useEffect(() => {
      let timeoutId: number;

      const handleScroll = () => {
        setIsScrolling(true);
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => setIsScrolling(false), 150);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.clearTimeout(timeoutId);
      };
    }, []);

    return (
      <>
        {/* Desktop Navigation - Right Side Vertical */}
        <motion.nav
          className={`fixed right-2 lg:right-4 z-50 hidden md:flex flex-col items-center justify-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl lg:rounded-2xl 
          bg-surface-light-primary/90 dark:bg-surface-dark-primary/90 backdrop-blur-xl border border-border-light-primary/20 dark:border-border-dark-primary/10 shadow-xl transition-all duration-300
          hover:shadow-2xl hover:bg-surface-light-elevated/95 dark:hover:bg-surface-dark-elevated/95 max-h-[calc(100vh-4rem)] overflow-y-auto ${
            isScrolling ? "opacity-60 hover:opacity-100" : "opacity-100"
          }`}
          style={{
            top: "50%",
          }}
          initial={{ x: 80, y: "-50%", opacity: 0 }}
          animate={{ x: 0, y: "-50%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label="Page navigation"
        >
          {sections.map((section, index) => {
            const isActive = activeSection === index;
            const isHoveredItem = isHovered === index;

            return (
              <div
                key={section.id}
                className="relative group"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <motion.button
                  onClick={() => scrollToSection(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`
                  relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center text-base lg:text-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent
                  ${
                    isActive
                      ? "text-white bg-blue-500 shadow-lg scale-110"
                      : "text-text-light-primary dark:text-text-dark-primary hover:text-white hover:bg-blue-500/80 hover:scale-105"
                  }`}
                  aria-label={`Go to ${section.label} section`}
                  aria-current={isActive ? "page" : undefined}
                  whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{section.label}</span>
                  <span
                    className={`transition-transform duration-300 ${
                      isActive || isHoveredItem ? "scale-110" : "scale-100"
                    }`}
                  >
                    {section.icon}
                  </span>
                </motion.button>

                {/* Tooltip - appears to the left */}
                <AnimatePresence>
                  {isHoveredItem && !isActive && (
                    <motion.div
                      className="absolute right-full mr-2 lg:mr-3 top-1/2 -translate-y-1/2 px-2 lg:px-3 py-1.5 lg:py-2 rounded-md lg:rounded-lg text-xs lg:text-sm font-medium whitespace-nowrap 
                      bg-gray-800/95 text-white shadow-xl border border-white/10 z-[60]"
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.15,
                      }}
                    >
                      {section.label}
                      {/* Arrow pointing to button */}
                      <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-0.5 w-2 h-2 rotate-45 bg-surface-dark-elevated/95 border-r border-b border-border-dark-primary/10"></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -right-3 top-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg"
                    initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
                    animate={{ opacity: 1, scale: 1, y: "-50%" }}
                    exit={{ opacity: 0, scale: 0.8, y: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    }}
                  />
                )}
              </div>
            );
          })}
        </motion.nav>

        {/* Mobile Navigation - Bottom Horizontal */}
        <motion.nav
          className={`fixed bottom-2 sm:bottom-4 z-50 md:hidden flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl 
          bg-surface-light-primary/95 dark:bg-surface-dark-primary/95 backdrop-blur-xl border border-border-light-primary/20 dark:border-border-dark-primary/10 shadow-xl transition-all duration-300
          ${isScrolling ? "opacity-60" : "opacity-100"} 
          w-fit`}
          style={{
            left: "50%",
          }}
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label="Page navigation"
        >
          {sections.map((section, index) => {
            const isActive = activeSection === index;

            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`
                relative min-w-[48px] min-h-[48px] w-12 h-12 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 touch-manipulation
                ${
                  isActive
                    ? "text-white bg-blue-500 shadow-lg scale-110"
                    : "text-text-light-primary dark:text-text-dark-primary hover:text-white hover:bg-blue-500/80 active:bg-blue-500/80"
                }`}
                aria-label={`Go to ${section.label} section`}
                aria-current={isActive ? "page" : undefined}
                whileHover={{ scale: isActive ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">{section.label}</span>
                {section.icon}

                {/* Mobile active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-2 h-0.5 bg-white rounded-full"
                    initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
                    animate={{ opacity: 1, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, scale: 0.8, x: "-50%" }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.nav>
      </>
    );
  },
);

Navigation.displayName = "Navigation";

export default Navigation;
