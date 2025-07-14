// Performance optimization utilities
export class PerformanceMonitor {
  private static observers: { [key: string]: IntersectionObserver } = {};
  private static resizeObserver: ResizeObserver | null = null;

  // Lazy loading for components
  static observeElement(
    element: HTMLElement,
    callback: () => void,
    options?: IntersectionObserverInit,
  ) {
    const observerId = Math.random().toString(36).substring(7);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
            delete this.observers[observerId];
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    );

    observer.observe(element);
    this.observers[observerId] = observer;

    return observerId;
  }

  // Debounced resize handler
  static observeResize(callback: () => void, delay: number = 250) {
    let timeoutId: NodeJS.Timeout;

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(callback, delay);
      });
    }

    return this.resizeObserver;
  }

  // GPU acceleration utilities
  static enableGPUAcceleration(element: HTMLElement) {
    element.style.transform = "translateZ(0)";
    element.style.willChange = "transform, opacity";
  }

  static disableGPUAcceleration(element: HTMLElement) {
    element.style.transform = "";
    element.style.willChange = "auto";
  }

  // Memory cleanup
  static cleanup() {
    Object.values(this.observers).forEach((observer) => observer.disconnect());
    this.observers = {};

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }
}

// Preload critical resources
export const preloadImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = path;
    document.head.appendChild(link);
  });
};

// Optimized animation frame handler
export const createAnimationFrameHandler = (callback: () => void) => {
  let rafId: number;
  let isRunning = false;

  const tick = () => {
    if (isRunning) {
      callback();
      rafId = requestAnimationFrame(tick);
    }
  };

  return {
    start() {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    },
    stop() {
      isRunning = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    },
  };
};

// Device performance detection
export const getDevicePerformance = (): "high" | "medium" | "low" => {
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

  if (!gl) return "low";

  const renderer = gl.getParameter(gl.RENDERER) || "";
  // const vendor = gl.getParameter(gl.VENDOR) || '';

  // Basic performance heuristics
  const hasHighPerformanceGPU = /nvidia|amd|intel iris|apple/i.test(
    renderer.toLowerCase(),
  );
  const memoryInfo = (performance as any).memory;
  const hasEnoughMemory =
    !memoryInfo || memoryInfo.usedJSHeapSize < 100 * 1024 * 1024; // 100MB

  if (
    hasHighPerformanceGPU &&
    hasEnoughMemory &&
    navigator.hardwareConcurrency >= 4
  ) {
    return "high";
  } else if (hasEnoughMemory && navigator.hardwareConcurrency >= 2) {
    return "medium";
  }

  return "low";
};

// Responsive breakpoints
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const useResponsive = () => {
  const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width >= breakpoints["2xl"]) return "2xl";
    if (width >= breakpoints.xl) return "xl";
    if (width >= breakpoints.lg) return "lg";
    if (width >= breakpoints.md) return "md";
    if (width >= breakpoints.sm) return "sm";
    return "xs";
  };

  return {
    isMobile: window.innerWidth < breakpoints.md,
    isTablet:
      window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg,
    isDesktop: window.innerWidth >= breakpoints.lg,
    breakpoint: getBreakpoint(),
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Reduce motion preference
export const prefersReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Touch device detection
export const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
