import { useState, useRef, useEffect, useCallback } from 'react';

interface UseIntersectionObserverConfig {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  debounceDelay?: number;
  root?: Element | null;
}

interface UseIntersectionObserverReturn {
  visibleElements: Set<string>;
  isElementVisible: (id: string) => boolean;
  observeElement: (element: Element) => void;
  unobserveElement: (element: Element) => void;
  getVisibilityRatio: (id: string) => number;
}

export const useIntersectionObserver = (
  config: UseIntersectionObserverConfig = {}
): UseIntersectionObserverReturn => {
  const {
    rootMargin = '-10% 0px -10% 0px',
    threshold = [0.1, 0.3, 0.7],
    triggerOnce = true,
    debounceDelay = 100,
    root = null
  } = config;

  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observedElements = useRef<Set<Element>>(new Set());
  const visibilityRatios = useRef<Map<string, number>>(new Map());

  const debouncedUpdate = useCallback((callback: () => void): void => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    debounceTimeoutRef.current = setTimeout(callback, debounceDelay);
  }, [debounceDelay]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]): void => {
    const updates: string[] = [];
    const ratioUpdates: Array<{ id: string; ratio: number }> = [];
    
    entries.forEach(entry => {
      const animateId = entry.target.getAttribute('data-animate-id');
      
      if (animateId) {
        // Store visibility ratio
        ratioUpdates.push({ id: animateId, ratio: entry.intersectionRatio });
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          updates.push(animateId);
          
          // If triggerOnce is true, stop observing this element
          if (triggerOnce && intersectionObserverRef.current) {
            intersectionObserverRef.current.unobserve(entry.target);
            observedElements.current.delete(entry.target);
          }
        }
      }
    });

    // Update visibility ratios
    ratioUpdates.forEach(({ id, ratio }) => {
      visibilityRatios.current.set(id, ratio);
    });

    if (updates.length > 0) {
      debouncedUpdate(() => {
        setVisibleElements(prev => {
          const newSet = new Set(prev);
          updates.forEach(id => newSet.add(id));
          return newSet;
        });
      });
    }
  }, [triggerOnce, debouncedUpdate]);

  const observeElement = useCallback((element: Element): void => {
    if (intersectionObserverRef.current && !observedElements.current.has(element)) {
      intersectionObserverRef.current.observe(element);
      observedElements.current.add(element);
    }
  }, []);

  const unobserveElement = useCallback((element: Element): void => {
    if (intersectionObserverRef.current && observedElements.current.has(element)) {
      intersectionObserverRef.current.unobserve(element);
      observedElements.current.delete(element);
    }
  }, []);

  const isElementVisible = useCallback((id: string): boolean => {
    return visibleElements.has(id);
  }, [visibleElements]);

  const getVisibilityRatio = useCallback((id: string): number => {
    return visibilityRatios.current.get(id) || 0;
  }, []);

  // Initialize observer
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root,
      rootMargin,
      threshold
    };

    intersectionObserverRef.current = new IntersectionObserver(
      handleIntersection, 
      observerOptions
    );

    // Observe all existing elements with data-animate-id
    const elementsToObserve = document.querySelectorAll('[data-animate-id]');
    elementsToObserve.forEach(element => {
      observeElement(element);
    });

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      observedElements.current.clear();
      visibilityRatios.current.clear();
    };
  }, [root, rootMargin, threshold, handleIntersection, observeElement]);

  // Re-observe elements when triggerOnce changes
  useEffect(() => {
    if (!triggerOnce && intersectionObserverRef.current) {
      const elementsToObserve = document.querySelectorAll('[data-animate-id]');
      elementsToObserve.forEach(element => {
        if (!observedElements.current.has(element)) {
          observeElement(element);
        }
      });
    }
  }, [triggerOnce, observeElement]);

  return { 
    visibleElements, 
    isElementVisible, 
    observeElement, 
    unobserveElement,
    getVisibilityRatio
  };
};