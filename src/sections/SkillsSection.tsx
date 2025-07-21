import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";
import type { Skill } from "portfolio-data";

gsap.registerPlugin(ScrollTrigger);

interface SkillsSectionProps {
  skills: Skill[];
  visibleElements: VisibleElements;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  visibleElements,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displaySkills = skills.length > 0 ? skills : [];

  const filteredSkills =
    activeCategory === "all"
      ? displaySkills
      : displaySkills.filter((skill) => skill.category === activeCategory);

  const categories = [
    { key: "all", label: "All Skills", count: displaySkills.length },
    {
      key: "frontend",
      label: "Frontend",
      count: displaySkills.filter((s) => s.category === "frontend").length,
    },
    {
      key: "backend",
      label: "Backend",
      count: displaySkills.filter((s) => s.category === "backend").length,
    },
    {
      key: "devops",
      label: "DevOps",
      count: displaySkills.filter((s) => s.category === "devops").length,
    },
    {
      key: "tools",
      label: "Tools",
      count: displaySkills.filter((s) => s.category === "tools").length,
    },
    {
      key: "database",
      label: "Database",
      count: displaySkills.filter((s) => s.category === "database").length,
    },
  ];

  useEffect(() => {
    if (visibleElements.skills && sectionRef.current) {
      const skillCards = sectionRef.current.querySelectorAll(".skill-card");
      const categoryButtons =
        sectionRef.current.querySelectorAll(".category-btn");

      // Animate category buttons
      gsap.fromTo(
        categoryButtons,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Animate skill cards
      gsap.fromTo(
        skillCards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  }, [visibleElements.skills, filteredSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  };

  const skillCardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.6,
      },
    },
    hover: {
      y: -8,
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <Section
      id="skills"
      title="Skills & Technologies"
      subtitle="Technologies I work with"
      ref={sectionRef}
      className="min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`category-btn px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-full font-medium transition-all duration-300 touch-manipulation ${
                activeCategory === category.key
                  ? "bg-primary-500 text-white shadow-soft shadow-primary-500/25"
                  : "bg-surface-light-tertiary dark:bg-surface-dark-elevated text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light-secondary dark:hover:bg-surface-dark-tertiary"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">
                ({category.count})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                className="skill-card group relative bg-surface-light-elevated dark:bg-surface-dark-elevated rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 shadow-soft hover:shadow-medium transition-all duration-300 border border-border-light-primary dark:border-border-dark-primary cursor-pointer"
                variants={skillCardVariants}
                whileHover="hover"
                layout
                layoutId={skill.name}
                style={{ perspective: "1000px" }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-secondary-500/5 to-gradient-pink/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div className="relative flex items-center justify-center mb-2 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-surface-light-tertiary dark:bg-surface-dark-tertiary rounded-md sm:rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-md sm:rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm ${skill.icon ? "hidden" : ""}`}
                    >
                      {skill.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Floating animation dots */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
                </div>

                {/* Skill Name */}
                <h3 className="text-xs sm:text-sm font-semibold text-text-light-primary dark:text-text-dark-primary text-center group-hover:text-primary-500 transition-colors duration-300 line-clamp-2">
                  {skill.name}
                </h3>

                {/* Category Badge */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-primary-500 text-white">
                    {skill.category}
                  </span>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary-500/20 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-surface-light-tertiary dark:bg-surface-dark-elevated rounded-full">
            <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-tertiary">
              Total Skills: {displaySkills.length}
            </span>
            <div className="w-1 h-1 bg-text-light-tertiary dark:bg-text-dark-tertiary rounded-full" />
            <span className="text-sm font-medium text-text-light-secondary dark:text-text-dark-tertiary">
              Showing: {filteredSkills.length}
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default SkillsSection;
