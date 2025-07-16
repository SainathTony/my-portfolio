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

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, visibleElements }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displaySkills = skills.length > 0 ? skills : [];

  const filteredSkills =
    activeCategory === "all"
      ? displaySkills
      : displaySkills.filter((skill) => skill.category === activeCategory);

  const categories = [
    { key: "all", label: "All Skills", count: displaySkills.length },
    { key: "frontend", label: "Frontend", count: displaySkills.filter(s => s.category === "frontend").length },
    { key: "backend", label: "Backend", count: displaySkills.filter(s => s.category === "backend").length },
    { key: "devops", label: "DevOps", count: displaySkills.filter(s => s.category === "devops").length },
    { key: "tools", label: "Tools", count: displaySkills.filter(s => s.category === "tools").length },
    { key: "database", label: "Database", count: displaySkills.filter(s => s.category === "database").length },
  ];

  useEffect(() => {
    if (visibleElements.skills && sectionRef.current) {
      const skillCards = sectionRef.current.querySelectorAll('.skill-card');
      const categoryButtons = sectionRef.current.querySelectorAll('.category-btn');
      
      // Animate category buttons
      gsap.fromTo(categoryButtons, 
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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate skill cards
      gsap.fromTo(skillCards,
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
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [visibleElements.skills, filteredSkills]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const skillCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      rotateX: -15,
      scale: 0.9
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
        duration: 0.6
      }
    },
    hover: {
      y: -8,
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
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
          className="flex flex-wrap justify-center gap-3 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`category-btn px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.key
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 cursor-pointer"
                variants={skillCardVariants}
                whileHover="hover"
                layout
                layoutId={skill.name}
                style={{ perspective: "1000px" }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <div className="relative flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {skill.icon ? (
                      <img 
                        src={skill.icon} 
                        alt={skill.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm ${skill.icon ? 'hidden' : ''}`}>
                      {skill.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Floating animation dots */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300" />
                </div>

                {/* Skill Name */}
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center group-hover:text-blue-500 transition-colors duration-300">
                  {skill.name}
                </h3>

                {/* Category Badge */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                    {skill.category}
                  </span>
                </div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/20 transition-all duration-300" />
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
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-100 dark:bg-gray-800 rounded-full">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Skills: {displaySkills.length}
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Showing: {filteredSkills.length}
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default SkillsSection;