import { useState, useRef, useEffect, useCallback } from "react";

interface ScrollHandlerConfig {
  parallaxBaseSpeed?: number;
  speedMultiplierCap?: number;
  throttleDelay?: number;
  scrollEndDelay?: number;
}

interface ScrollMetrics {
  scrollY: number;
  scrollDirection: "up" | "down" | "none";
  scrollSpeed: number;
  isScrolling: boolean;
  scrollProgress: number; // 0 to 1
}

interface MouseState {
  speed: number;
  [key: string]: any;
}

export const useScrollHandler = (
  setActiveSection: React.Dispatch<React.SetStateAction<number>>,
  mouseState: React.MutableRefObject<MouseState>,
  config: ScrollHandlerConfig = {},
): ScrollMetrics => {
  const {
    parallaxBaseSpeed = 0.1,
    speedMultiplierCap = 3,
    scrollEndDelay = 150,
  } = config;

  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({
    scrollY: 0,
    scrollDirection: "none",
    scrollSpeed: 0,
    isScrolling: false,
    scrollProgress: 0,
  });

  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(Date.now());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef<boolean>(false);

  const detectActiveSection = useCallback((): number => {
    const sections = document.querySelectorAll(".section");
    const viewportCenter = window.innerHeight / 2;

    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
        return i;
      }
    }
    return 0;
  }, []);

  const calculateScrollProgress = useCallback((): number => {
    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScroll = scrollHeight - viewportHeight;

    return maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
  }, []);

  const updateParallaxLayers = useCallback(
    (scrollY: number, mouseSpeed: number): void => {
      const speedMultiplier = Math.min(mouseSpeed * 50, speedMultiplierCap);

      // Update parallax layers with performance optimization
      const parallaxLayers = document.querySelectorAll(".parallax-layer");
      parallaxLayers.forEach((layer, index) => {
        const layerSpeed =
          parallaxBaseSpeed * (index + 1) * (1 + speedMultiplier);
        const yPos = -(scrollY * layerSpeed);

        // Use transform3d for better GPU acceleration
        (layer as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
      });

      // Update background shapes with optimized transforms
      const shapes = document.querySelectorAll(".bg-shape");
      shapes.forEach((shape, index) => {
        const shapeSpeed =
          parallaxBaseSpeed * 0.5 * (1 + speedMultiplier * 0.5);
        const rotation = scrollY * 0.02 * (1 + speedMultiplier * 0.3);
        const yPos = scrollY * shapeSpeed;

        // Combine transforms for better performance
        (shape as HTMLElement).style.transform =
          `translate3d(0, ${yPos}px, 0) rotate(${rotation + index * 45}deg)`;
      });
    },
    [parallaxBaseSpeed, speedMultiplierCap],
  );

  const calculateScrollMetrics = useCallback(
    (currentScrollY: number): ScrollMetrics => {
      const currentTime = Date.now();
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaTime = currentTime - lastScrollTime.current;

      const scrollSpeed = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0;
      const scrollDirection: "up" | "down" | "none" =
        deltaY > 5 ? "down" : deltaY < -5 ? "up" : "none";

      const scrollProgress = calculateScrollProgress();

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;

      return {
        scrollY: currentScrollY,
        scrollDirection,
        scrollSpeed,
        isScrolling: true,
        scrollProgress,
      };
    },
    [calculateScrollProgress],
  );

  const handleScrollEnd = useCallback((): void => {
    setScrollMetrics((prev) => ({
      ...prev,
      isScrolling: false,
      scrollSpeed: 0,
      scrollDirection: "none",
    }));
  }, []);

  const handleScroll = useCallback((): void => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const newMetrics = calculateScrollMetrics(currentScrollY);

        // Update active section
        const activeSection = detectActiveSection();
        setActiveSection(activeSection);

        // Update scroll metrics
        setScrollMetrics(newMetrics);

        // Update parallax effects
        updateParallaxLayers(currentScrollY, mouseState.current.speed);

        // Reset scroll end timer
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(handleScrollEnd, scrollEndDelay);

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [
    calculateScrollMetrics,
    detectActiveSection,
    setActiveSection,
    updateParallaxLayers,
    handleScrollEnd,
    scrollEndDelay,
    mouseState,
  ]);

  useEffect(() => {
    // Add optimized scroll listener
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: false,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return scrollMetrics;
};
