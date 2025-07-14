import { useState, useEffect, useCallback } from "react";

interface PerformanceMetrics {
  deviceType: "high" | "medium" | "low";
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
  supportedFeatures: {
    webgl: boolean;
    intersectionObserver: boolean;
    resizeObserver: boolean;
    requestIdleCallback: boolean;
  };
  memoryInfo?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

const detectDevicePerformance = (): "high" | "medium" | "low" => {
  // Check WebGL capability
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

  if (!gl) return "low";

  const renderer = gl.getParameter(gl.RENDERER) || "";
  // const vendor = gl.getParameter(gl.VENDOR) || '';

  // High-performance indicators
  const hasHighPerformanceGPU = /nvidia|amd|intel iris|apple m1|apple m2/i.test(
    renderer.toLowerCase(),
  );
  const memoryInfo = (performance as any).memory;
  const hasEnoughMemory =
    !memoryInfo || memoryInfo.usedJSHeapSize < 100 * 1024 * 1024; // 100MB
  const hasMultipleCores = navigator.hardwareConcurrency >= 4;

  // Connection speed (if available)
  const connection = (navigator as any).connection;
  const hasGoodConnection =
    !connection ||
    connection.effectiveType === "4g" ||
    connection.downlink > 10;

  if (
    hasHighPerformanceGPU &&
    hasEnoughMemory &&
    hasMultipleCores &&
    hasGoodConnection
  ) {
    return "high";
  } else if (hasEnoughMemory && navigator.hardwareConcurrency >= 2) {
    return "medium";
  }

  return "low";
};

const checkSupportedFeatures = () => ({
  webgl: !!window.WebGLRenderingContext,
  intersectionObserver: "IntersectionObserver" in window,
  resizeObserver: "ResizeObserver" in window,
  requestIdleCallback: "requestIdleCallback" in window,
});

const getMemoryInfo = () => {
  const memoryInfo = (performance as any).memory;
  return memoryInfo
    ? {
        usedJSHeapSize: memoryInfo.usedJSHeapSize,
        totalJSHeapSize: memoryInfo.totalJSHeapSize,
        jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
      }
    : undefined;
};

export const usePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(() => ({
    deviceType: "medium",
    prefersReducedMotion: false,
    isTouchDevice: false,
    supportedFeatures: checkSupportedFeatures(),
    memoryInfo: getMemoryInfo(),
  }));

  const updateMetrics = useCallback(() => {
    setMetrics({
      deviceType: detectDevicePerformance(),
      prefersReducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches,
      isTouchDevice: "ontouchstart" in window || navigator.maxTouchPoints > 0,
      supportedFeatures: checkSupportedFeatures(),
      memoryInfo: getMemoryInfo(),
    });
  }, []);

  useEffect(() => {
    updateMetrics();

    // Listen for changes in motion preferences
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => updateMetrics();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Periodic memory monitoring (every 30 seconds)
    const memoryInterval = setInterval(() => {
      const newMemoryInfo = getMemoryInfo();
      if (newMemoryInfo) {
        setMetrics((prev) => ({ ...prev, memoryInfo: newMemoryInfo }));
      }
    }, 30000);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      clearInterval(memoryInterval);
    };
  }, [updateMetrics]);

  return metrics;
};

// Animation configuration based on device performance
export const getAnimationConfig = (
  deviceType: "high" | "medium" | "low",
  prefersReducedMotion: boolean,
) => {
  if (prefersReducedMotion) {
    return {
      enableAnimations: false,
      duration: 0,
      stagger: 0,
      particles: false,
      blur: false,
      shadows: false,
    };
  }

  switch (deviceType) {
    case "high":
      return {
        enableAnimations: true,
        duration: 1,
        stagger: 0.1,
        particles: true,
        blur: true,
        shadows: true,
        quality: "high",
      };

    case "medium":
      return {
        enableAnimations: true,
        duration: 0.8,
        stagger: 0.15,
        particles: true,
        blur: false,
        shadows: true,
        quality: "medium",
      };

    case "low":
    default:
      return {
        enableAnimations: true,
        duration: 0.5,
        stagger: 0.2,
        particles: false,
        blur: false,
        shadows: false,
        quality: "low",
      };
  }
};
