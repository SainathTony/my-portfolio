import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  MapPin,
  Star,
  Building,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Users,
  TrendingUp,
  Zap,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const displayExperiences = experiences.length > 0 ? experiences : [];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || displayExperiences.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayExperiences.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, displayExperiences.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayExperiences.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayExperiences.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.from(".experience-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate carousel container
      gsap.from(".carousel-container", {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate stats
      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (displayExperiences.length === 0) {
    return (
      <section
        ref={sectionRef}
        id="experience"
        className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/10"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No experiences to display
          </p>
        </div>
      </section>
    );
  }

  const currentExperience = displayExperiences[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="experience-header text-center mb-16">
          <motion.span
            className="inline-block px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-6"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Professional Journey
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-6">
            Career Highlights
          </h2>

          <p className="text-xl leading-relaxed max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
            Explore my professional journey through interactive experience cards
            showcasing key achievements and growth.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="carousel-container relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Previous experience"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:scale-110 transition-all duration-300 shadow-lg"
            aria-label="Next experience"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Experience Card */}
          <div className="relative rounded-3xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${currentExperience.color} opacity-10 rounded-3xl`}
                />

                {/* Glass Card */}
                <div className="relative p-6 md:p-8 lg:p-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-3xl shadow-2xl">
                  {/* Company Logo and Header */}
                  <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                    <div className="flex items-center space-x-4 md:space-x-6">
                      <div
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${currentExperience.color} p-3 md:p-4 flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <img
                          src={currentExperience.icon}
                          alt={currentExperience.company}
                          className="w-10 h-10 md:w-12 md:h-12 object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                          {currentExperience.role}
                        </h3>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Building className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                          <span className="text-lg md:text-xl font-semibold truncate">
                            {currentExperience.company}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Experience Number */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                        {currentIndex + 1}
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                        of {displayExperiences.length}
                      </span>
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">
                        {currentExperience.startDate} -{" "}
                        {currentExperience.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">
                        {currentExperience.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 flex-shrink-0" />
                      <span className="font-medium text-sm md:text-base">
                        {currentExperience.period}
                      </span>
                    </div>
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                          Key Achievements
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                          {currentExperience.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-3">
                          {currentExperience.highlights.map(
                            (highlight, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                                <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                  {highlight}
                                </span>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <Zap className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0" />
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentExperience.technologies.map((tech, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                              className={`px-3 py-1 text-sm rounded-full bg-gradient-to-r ${currentExperience.color} text-white shadow-sm font-medium hover:scale-105 transition-transform cursor-default`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-white/50 to-gray-50/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
                        <h4 className="w-full text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
                          Impact
                          <TrendingUp className="w-5 h-5 ml-2 text-green-500 flex-shrink-0" />
                        </h4>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                              {currentExperience.highlights.length}+
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Key Achievements
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                              {currentExperience.technologies.length}+
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Technologies
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      {/* <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full py-3 md:py-4 px-6 rounded-2xl bg-gradient-to-r ${currentExperience.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                      >
                        <span>Learn More</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.button> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {displayExperiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
                aria-label={`Go to experience ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Indicator */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div
                className={`w-2 h-2 rounded-full ${isAutoPlaying ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span>{isAutoPlaying ? "Auto-playing" : "Paused"}</span>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          <div className="stat-item text-center p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {displayExperiences.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Career Positions
            </div>
          </div>

          <div className="stat-item text-center p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              5+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Years Experience
            </div>
          </div>

          <div className="stat-item text-center p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg">
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
              8+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Projects Delivered
            </div>
          </div>

          <div className="stat-item text-center p-6 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              20+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
