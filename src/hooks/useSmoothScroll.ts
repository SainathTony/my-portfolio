import { useEffect, useCallback } from "react";
import { useLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollToOptions = {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  force?: boolean;
  onComplete?: () => void;
};

export const useSmoothScroll = () => {
  // Initialize Lenis with options
  const lenis = useLenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
  });

  // Setup GSAP ScrollTrigger integration
  useEffect(() => {
    if (!lenis) return;

    // Update ScrollTrigger on scroll
    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    // Setup GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, [lenis]);

  // Scroll to target function
  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options?: ScrollToOptions) => {
      if (!lenis) return;

      // Convert string selector to HTMLElement if needed
      if (typeof target === "string") {
        const element = document.querySelector(target);
        if (element && element instanceof HTMLElement) {
          lenis.scrollTo(element, options);
        }
      } else {
        lenis.scrollTo(target, options);
      }
    },
    [lenis],
  );

  return { scrollTo, lenis };
};
