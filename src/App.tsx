import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import Sun from "lucide-react/dist/esm/icons/sun";
import Moon from "lucide-react/dist/esm/icons/moon";

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

// Data
import { skills, projects, experiences } from "./data/portfolioData";

// Styles
import "./App.css";

function App() {
  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      // Default to system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
  }, []);

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
    <div className="relative min-h-screen bg-surface-light-primary dark:bg-surface-dark-primary transition-colors duration-300">
      <PerformanceMonitor />
      <LoadingScreen isLoading={isLoading} />

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
        className="
          fixed top-4 right-4 sm:top-6 sm:right-6 z-50 
          w-12 h-12 sm:w-14 sm:h-14 
          flex items-center justify-center 
          rounded-xl sm:rounded-2xl 
          backdrop-blur-lg 
          border border-white/20 dark:border-white/10
          bg-white/80 dark:bg-gray-900/80 
          text-gray-700 dark:text-yellow-400 
          shadow-lg dark:shadow-xl 
          hover:shadow-xl dark:hover:shadow-2xl 
          hover:scale-110 
          transition-all duration-300 ease-out
          group
          before:absolute before:inset-0 before:rounded-xl sm:before:rounded-2xl 
          before:bg-gradient-to-r before:from-blue-500/20 before:to-purple-500/20 
          dark:before:from-yellow-400/20 dark:before:to-orange-500/20
          before:opacity-0 hover:before:opacity-100 
          before:transition-opacity before:duration-300
          active:scale-95
          touch-manipulation
        "
        aria-label="Toggle dark mode"
      >
        <div className="relative z-10 transition-transform duration-300 group-hover:rotate-12">
          <Sun
            size={20}
            className="sm:w-[22px] sm:h-[22px] text-yellow-500 drop-shadow-lg animate-pulse-slow hidden dark:block"
          />
          <Moon
            size={20}
            className="sm:w-[22px] sm:h-[22px] text-gray-600 drop-shadow-lg block dark:hidden"
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 dark:from-yellow-400/30 dark:to-orange-500/30 opacity-0 group-hover:opacity-70 transition-opacity duration-300 blur-xl" />

        {/* Floating particles effect (only in dark mode) */}
        <div className="hidden dark:block">
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-60" />
          <div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-60"
            style={{ animationDelay: "300ms" }}
          />
          <div
            className="absolute top-1 -left-2 w-1 h-1 bg-yellow-300 rounded-full animate-ping opacity-60"
            style={{ animationDelay: "700ms" }}
          />
        </div>
      </button>

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 touch-manipulation"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="sm:w-6 sm:h-6"
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
            scrollToSection={scrollToSection}
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
          <ContactSection visibleElements={visibleElements} />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
