import React, { memo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code as CodeIcon,
  BarChart2,
  Rocket,
  Mail,
} from "lucide-react";

interface NavigationProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
}

const sections = [
  { id: "hero", label: "Home", icon: <Home size={20} /> },
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
      let timeoutId: NodeJS.Timeout;

      const handleScroll = () => {
        setIsScrolling(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setIsScrolling(false), 150);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timeoutId);
      };
    }, []);

    return (
      <>
        {/* Desktop Navigation - Right Side Vertical */}
        <motion.nav
          className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3 p-3 rounded-2xl 
          bg-white/10 bg-white/90 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl transition-all duration-300
          hover:shadow-2xl hover:bg-white/20 hover:bg-white/95 ${
            isScrolling ? "opacity-60 hover:opacity-100" : "opacity-100"
          }`}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
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
                  relative w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent
                  ${
                    isActive
                      ? "text-white bg-blue-500 shadow-lg scale-110"
                      : "text-gray-700 text-gray-700 hover:text-white hover:bg-blue-500/80 hover:text-white hover:bg-blue-500/80 hover:scale-105"
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
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap 
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
                      <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-0.5 w-2 h-2 rotate-45 bg-gray-800/95 border-r border-b border-white/10"></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            );
          })}
        </motion.nav>

        {/* Mobile Navigation - Bottom Horizontal */}
        <motion.nav
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center gap-2 px-4 py-3 rounded-2xl 
          bg-white/10 bg-white/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl transition-all duration-300
          ${isScrolling ? "opacity-60" : "opacity-100"}`}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
                relative min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                ${
                  isActive
                    ? "text-white bg-blue-500 shadow-lg scale-110"
                    : "text-gray-700 text-gray-700 hover:text-white hover:bg-blue-500/80 dark:hover:text-white active:bg-blue-500/80"
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
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-white rounded-full"
                    layoutId="activeMobileIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
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
