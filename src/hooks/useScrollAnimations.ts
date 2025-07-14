import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Helper function to safely query elements with proper type narrowing
const safeQueryAll = (selector: string, context: Document | HTMLElement | Element = document): HTMLElement[] => {
  try {
    const elements = context.querySelectorAll<HTMLElement>(selector);
    return Array.from(elements);
  } catch (error) {
    console.warn(`Could not find elements with selector: ${selector}`, error);
    return [];
  }
};

export const useScrollAnimations = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create a GSAP context for easier cleanup
    ctx.current = gsap.context(() => {
      // Create main timeline
      const tl = gsap.timeline();
      timelineRef.current = tl;

      // Hero section animations
      const heroElements = safeQueryAll(".hero-content > *");
      if (heroElements.length > 0) {
        gsap.set(heroElements, { y: 100, opacity: 0 });

        tl.to(heroElements, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Section reveal animations
      safeQueryAll(".section").forEach((section, index) => {
        const isEven = index % 2 === 0;
        const animatedElements = safeQueryAll(".animate-on-scroll", section);
        
        if (animatedElements.length > 0) {
          gsap.fromTo(animatedElements,
            {
              y: 80,
              opacity: 0,
              x: isEven ? -50 : 50,
            },
            {
              y: 0,
              opacity: 1,
              x: 0,
              duration: 1.5,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true
              },
            }
          );
        }
      });

      // Floating elements parallax
      safeQueryAll(".parallax-element").forEach((element) => {
        gsap.to(element, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          },
        });
      });

      // Skills progress bars animation
      safeQueryAll(".skill-progress").forEach((progress) => {
        const level = progress.getAttribute("data-level");
        if (!level) return;

        gsap.fromTo(progress,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: progress,
              start: "top 85%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true
            },
          }
        );
      });

      // Project cards stagger animation
      safeQueryAll(".project-card").forEach((card) => {
        gsap.fromTo(card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
              invalidateOnRefresh: true
            },
          }
        );
      });

      // Contact form animations
      const contactForm = document.querySelector(".contact-form");
      if (contactForm) {
        const formElements = safeQueryAll("input, textarea, button", contactForm);
        if (formElements.length > 0) {
          gsap.fromTo(formElements,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contactForm,
                start: "top 85%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true
              },
            }
          );
        }
      }
    });

    // Timeline items animation
    safeQueryAll(".timeline-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true
          },
          delay: index * 0.1,
        },
      );
    });

    // Text reveal animations
    gsap.utils.toArray<HTMLElement>(".text-reveal").forEach((text) => {
      const chars = text.textContent?.split("") || [];
      text.innerHTML = chars
        .map((char) =>
          char === " " ? "&nbsp;" : `<span class="char">${char}</span>`,
        )
        .join("");

      gsap.fromTo(
        text.querySelectorAll(".char"),
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.05,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Cleanup function
    return () => {
      if (ctx.current) {
        ctx.current.revert(); // This will kill all GSAP animations and ScrollTriggers
        ctx.current = null;
      }
      timelineRef.current = null;
    };
  }, []);

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  return { refreshScrollTrigger };
};
