import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Sun, Moon } from "lucide-react";

// Components
import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";
import PerformanceMonitor from "./components/PerformanceMonitor";
import HeroSection from "./sections/HeroSection";

// Lazy-loaded components for better performance
const CursorTrail = lazy(() => import("./components/CursorTrail"));
const AboutSection = lazy(() => import("./sections/AboutSection"));
const SkillsSection = lazy(() => import("./sections/SkillsSection"));
const ExperienceSection = lazy(() => import("./sections/ExperienceSection"));
const ProjectsSection = lazy(() => import("./sections/ProjectsSection"));
const ContactSection = lazy(() => import("./sections/ContactSection"));

// Hooks
import { useMouseTracking } from "./hooks/useMouseTracking";
import { useScrollHandler } from "./hooks/useScrollHandler";
import { useIntersectionObserver } from "./hooks/useIntersectionObserver";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import { useResponsive } from "./hooks/useResponsive";
import { usePerformance, getAnimationConfig } from "./hooks/usePerformance";
import { useTheme } from "./hooks/useTheme";

// Data
import { skills, projects, experiences } from "./data/portfolioData";

// Styles
import "./App.css";

function App() {
  // Theme management
  const { isDarkMode, toggleDarkMode } = useTheme();

  const [activeSection, setActiveSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Performance and responsive hooks
  const responsive = useResponsive();
  const performance = usePerformance();
  getAnimationConfig(performance.deviceType, performance.prefersReducedMotion);

  // Custom hooks with performance considerations
  const { cursorTrail, mouseState } = useMouseTracking();
  const { visibleElements } = useIntersectionObserver();
  const { scrollTo } = useSmoothScroll();
  useScrollAnimations();
  useScrollHandler(setActiveSection, mouseState);

  // Adaptive loading based on device performance
  const enableAdvancedFeatures =
    performance.deviceType !== "low" && !performance.prefersReducedMotion;

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback(
    (index: number): void => {
      const sectionNames = [
        "home",
        "about",
        "skills",
        "experience",
        "projects",
        "contact",
      ];
      const targetSection = sectionNames[index];

      // Try to find section by ID first
      const sectionElement = document.getElementById(targetSection);
      if (sectionElement) {
        const offsetTop = sectionElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      } else if (scrollTo) {
        scrollTo(`#${targetSection}`, { offset: -80, duration: 1.5 });
      } else {
        // Final fallback using class selector
        const sections = document.querySelectorAll(".section");
        const targetSectionEl = sections[index];
        if (targetSectionEl) {
          const offsetTop =
            targetSectionEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    },
    [scrollTo],
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="app-container relative min-h-screen bg-surface-light-primary dark:bg-surface-dark-primary transition-colors duration-300">
      <PerformanceMonitor />
      <LoadingScreen isLoading={isLoading} darkMode={isDarkMode} />

      {/* Background Elements - Conditionally render based on performance */}
      {enableAdvancedFeatures && (
        <div className="fixed inset-0 -z-10">
          <Suspense
            fallback={
              <div className="fixed inset-0 bg-gradient-to-br from-surface-dark-primary via-blue-900 to-purple-900"></div>
            }
          >
            {/* <ThreeJSBackground
              darkMode={darkMode}
              scrollProgress={scrollMetrics?.scrollProgress || 0}
            /> */}
          </Suspense>
        </div>
      )}

      {/* Cursor Trail - Only on desktop non-touch devices */}
      {enableAdvancedFeatures &&
        !performance.isTouchDevice &&
        responsive.isDesktop && (
          <Suspense fallback={null}>
            <CursorTrail cursorTrail={cursorTrail} mouseState={mouseState} />
          </Suspense>
        )}

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}

      <Navigation
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      <main className="relative z-10">
        <HeroSection scrollToSection={scrollToSection} />

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <AboutSection
            darkMode={isDarkMode}
            visibleElements={visibleElements}
          />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <SkillsSection skills={skills} visibleElements={visibleElements} />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <ExperienceSection
            darkMode={isDarkMode}
            experiences={experiences}
            visibleElements={visibleElements}
          />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <ProjectsSection
            darkMode={isDarkMode}
            projects={projects}
            visibleElements={visibleElements}
          />
        </Suspense>

        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full"></div>
            </div>
          }
        >
          <ContactSection
            darkMode={isDarkMode}
            visibleElements={visibleElements}
          />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
