import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Create main timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Hero section animations
    gsap.set(".hero-content > *", { y: 100, opacity: 0 });

    tl.to(".hero-content > *", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5,
    });

    // Section reveal animations
    gsap.utils.toArray<HTMLElement>(".section").forEach((section, index) => {
      const isEven = index % 2 === 0;

      gsap.fromTo(
        section.querySelectorAll(".animate-on-scroll"),
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
          },
        },
      );
    });

    // Floating elements parallax
    gsap.utils.toArray<HTMLElement>(".parallax-element").forEach((element) => {
      gsap.to(element, {
        y: "-20%",
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Skills progress bars animation
    gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((progress) => {
      const level = progress.getAttribute("data-level");

      gsap.fromTo(
        progress,
        {
          width: "0%",
        },
        {
          width: `${level}%`,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progress,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Project cards stagger animation
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Timeline items animation
    gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, index) => {
      const isLeft = index % 2 === 0;

      gsap.fromTo(
        item,
        {
          x: isLeft ? -100 : 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
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

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  const refreshScrollTrigger = () => {
    ScrollTrigger.refresh();
  };

  return { refreshScrollTrigger };
};
