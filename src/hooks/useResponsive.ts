import { useState, useEffect } from "react";

interface ResponsiveData {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

const getBreakpoint = (width: number): ResponsiveData["breakpoint"] => {
  if (width >= breakpoints["2xl"]) return "2xl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
};

const getResponsiveData = (): ResponsiveData => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
    breakpoint: getBreakpoint(width),
  };
};

export const useResponsive = (): ResponsiveData => {
  const [responsiveData, setResponsiveData] = useState<ResponsiveData>(() =>
    typeof window !== "undefined"
      ? getResponsiveData()
      : {
          width: 1024,
          height: 768,
          isMobile: false,
          isTablet: false,
          isDesktop: true,
          breakpoint: "lg" as const,
        },
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setResponsiveData(getResponsiveData());
      }, 100); // Debounce resize events
    };

    window.addEventListener("resize", handleResize);

    // Initial measurement
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return responsiveData;
};
