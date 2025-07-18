
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  Star,
  Building,
  ChevronRight,
} from "lucide-react";
import type { VisibleElements } from "../types/common";
import type { Experience } from "portfolio-data";

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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const displayExperiences = experiences.length > 0 ? experiences : [];

  // GSAP Timeline Animation
  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Animate the timeline path
      const timelinePath = timelineRef.current?.querySelector('.timeline-path');
      if (timelinePath) {
        gsap.fromTo(timelinePath,
          {
            scaleY: 0,
            transformOrigin: "top center"
          },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            delay: 0.5
          }
        );
      }

      // Animate milestone cards
      displayExperiences.forEach((_, index) => {
        const card = document.querySelector(`.milestone-card-${index}`);
        const marker = document.querySelector(`.milestone-marker-${index}`);

        if (card && marker) {
          gsap.fromTo([marker, card],
            {
              opacity: 0,
              y: 50,
              scale: 0.8
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: 0.8 + (index * 0.3),
              ease: "back.out(1.7)",
              stagger: 0.1
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isInView, displayExperiences]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`min-h-screen py-20 px-4 ${darkMode
          ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/10'
          : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20'
        }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className={`inline-block px-6 py-3 rounded-full text-base font-semibold mb-6 ${darkMode
                ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                : 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 border border-indigo-500/20'
              }`}
            whileHover={{ scale: 1.05 }}
          >
            Professional Journey
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-6">
            Professional Roadmap
          </h2>

          <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
            Explore my professional evolution from junior developer to tech leadership,
            highlighting key milestones and achievements along the way.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Animated Timeline Path */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 md:transform md:-translate-x-1/2">
            <div
              className="timeline-path w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg relative overflow-hidden"
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-400/50 via-purple-400/50 to-pink-400/50 rounded-full animate-pulse"></div>

              {/* Flowing animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Experience Milestones */}
          <div className="space-y-16 md:space-y-24">
            {displayExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className={`milestone-card-${index} relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  } group`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Timeline Marker */}
                <div className={`milestone-marker-${index} absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 z-20`}>
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${experience.color} p-3 text-white shadow-xl flex items-center justify-center relative`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <img src={experience.icon} />

                    {/* Pulse ring */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${experience.color} opacity-30 animate-ping`}></div>

                    {/* Index badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-800 shadow-md">
                      {index + 1}
                    </div>
                  </motion.div>
                </div>

                {/* Experience Card */}
                <motion.div
                  className={`ml-28 md:ml-0 md:w-5/12 ${index % 2 === 0
                      ? 'md:mr-auto md:pr-16'
                      : 'md:ml-auto md:pl-16'
                    }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`p-8 rounded-3xl backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode
                        ? `bg-white/90 dark:bg-gray-800/90 border-white/20 dark:border-gray-700/50 hover:border-white/40 dark:hover:border-gray-700/70`
                        : `bg-white/90 border-white/20 hover:border-white/40`
                      }`}
                    onClick={() => setSelectedExperience(selectedExperience === index ? null : index)}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <motion.h3
                          className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                            }`}
                          layoutId={`title-${index}`}
                        >
                          {experience.role}
                        </motion.h3>

                        <div className={`flex items-center gap-2 mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          <Building className="w-4 h-4" />
                          <span className="font-semibold">{experience.company}</span>
                        </div>

                        <div className={`flex flex-wrap items-center gap-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{experience.startDate} - {experience.endDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className={`text-gray-400 transition-transform duration-300 ${selectedExperience === index ? 'rotate-90' : ''
                          }`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                      {experience.description}
                    </p>

                    {/* Key Highlights */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: selectedExperience === index ? 'auto' : 0,
                        opacity: selectedExperience === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-6">
                        <h4 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                          <Star className="w-5 h-5 mr-2 text-yellow-500" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {experience.highlights.map((highlight, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className={`flex items-start gap-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                                }`}
                            >
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${experience.color} text-white shadow-sm font-medium`}
                          whileHover={{ scale: 1.05, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className={`grid md:grid-cols-3 gap-8 p-8 rounded-3xl backdrop-blur-sm border ${darkMode
              ? 'bg-white/90 dark:bg-gray-800/90 border-white/20 dark:border-gray-700/50'
              : 'bg-white/90 border-white/20'
            }`}>
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                {displayExperiences.length}+
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Career Milestones
              </div>
            </div>

            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                5+
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Years Experience
              </div>
            </div>

            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-pink-400' : 'text-pink-600'
                }`}>
                50+
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Projects Delivered
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
