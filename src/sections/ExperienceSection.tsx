import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import type { VisibleElements } from '../types/common';
import { Award, Code, TrendingUp } from 'lucide-react';
import type { Experience } from 'portfolio-data';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSectionProps {
  darkMode?: boolean;
  experiences?: Experience[];
  visibleElements?: VisibleElements;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  darkMode = false,
  experiences = [],
  visibleElements = {},
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const gsapContext = useRef<gsap.Context | null>(null);
  // GSAP animations setup
  useEffect(() => {
    if (!sectionRef.current) return;

    gsapContext.current = gsap.context(() => {
      // Animate timeline line
      const timelineLine = sectionRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.from(timelineLine, {
          scrollTrigger: {
            trigger: timelineLine,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 1.5,
          ease: 'power3.out',
        });
      }

      // Animate experience cards
      const cards = gsap.utils.toArray<HTMLElement>('.experience-card');
      cards.forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: idx * 0.1,
          ease: 'power2.out',
        });
      });
    }, sectionRef);

    return () => {
      gsapContext.current?.revert();
    };
  }, [experiences]);

  // Handle card hover with GSAP animations
  const handleCardHover = useCallback((index: number, isHovered: boolean) => {
    const card = document.querySelector(`.experience-card-${index}`);
    if (!card) return;

    gsap.to(card, {
      y: isHovered ? -10 : 0,
      scale: isHovered ? 1.02 : 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    
    setHoveredCard(isHovered ? index : null);
  }, []);

  const renderExperienceCard = (exp: Experience, index: number) => {
    const isHovered = hoveredCard === index;
    
    return (
      <div
        key={index}
        className={`experience-card experience-card-${index} relative mb-12`}
        onMouseEnter={() => handleCardHover(index, true)}
        onMouseLeave={() => handleCardHover(index, false)}
      >
        <div className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${exp.color} opacity-5 pointer-events-none`}
              />
            )}
          </AnimatePresence>

          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${exp.color} p-4 text-white text-2xl flex items-center justify-center shadow-lg`}>
                  {exp.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.location}</p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{exp.description}</p>

            {exp.achievements?.length > 0 && (
              <div className="mt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
                  Key Achievements
                </h4>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start">
                      <Award className="w-4 h-4 mt-1 mr-2 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exp.technologies && exp.technologies.length > 0 && (
              <div className="mt-6">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-500" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section
      ref={sectionRef}
      id="experience"
      className="py-20 bg-gradient-to-br from-purple-50/30 via-white to-emerald-50/20 dark:from-purple-900/10 dark:via-gray-900 dark:to-emerald-900/10"
    >
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300">
              Professional Journey
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            A timeline of my professional experience and achievements
          </motion.p>
        </div>

        <div className="relative px-4 sm:px-6">
          {/* Timeline line */}
          <div className="absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 transform -translate-x-1/2 timeline-line"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="relative w-full">
                {/* Timeline dot */}
                <div className="absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                
                {/* Card container */}
                <div className={`relative w-full md:max-w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8 md:pl-0' : 'md:ml-auto md:pl-8 md:pr-0'
                }`}>
                  {renderExperienceCard(exp, index)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
