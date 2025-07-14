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

const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

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
        timeoutId = setTimeout(() => setIsScrolling(false), 100);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(timeoutId);
      };
    }, []);

    return (
      <motion.nav
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 p-2 rounded-2xl 
        bg-gray-900/80 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300
        hover:shadow-2xl hover:bg-gray-900/90 ${isScrolling ? "opacity-40 hover:opacity-100" : "opacity-100"}`}
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        aria-label="Page navigation"
        onMouseEnter={() => setIsHovered(null)}
      >
        {sections.map((section, index) => {
          const isActive = activeSection === index;
          const isHoveredItem = isHovered === index;

          return (
            <div
              key={section.id}
              className="relative group"
              role="presentation"
              onMouseEnter={() => setIsHovered(index)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="relative py-2 px-1">
                <motion.button
                  onClick={() => scrollToSection(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`
                  w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900/80 bg-transparent
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label={`Go to ${section.label} section`}
                  aria-current={isActive ? "page" : undefined}
                  whileHover={{ scale: 1.1 }}
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

                <AnimatePresence>
                  {(isHoveredItem || isActive) && (
                    <motion.span
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap 
                      bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl"
                      initial={{ opacity: 0, y: -5, pointerEvents: "none" }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        pointerEvents: "auto",
                      }}
                      exit={{
                        opacity: 0,
                        y: -5,
                        pointerEvents: "none",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                        duration: 0.2,
                      }}
                    >
                      {section.label}
                      <span className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 rotate-45 bg-gray-800"></span>
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.span
                    className="absolute right-0 w-1 h-1/2 bg-gradient-to-b from-primary-400 to-accent-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </motion.nav>
    );
  },
);

Navigation.displayName = "Navigation";

export default Navigation;
