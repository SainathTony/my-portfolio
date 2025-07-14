import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Code,
  Star,
  Calendar,
  Users,
  Zap,
  Award,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe,
  Github,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";
import type { Project } from "portfolio-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  darkMode: boolean;
  projects: Project[];
  visibleElements: VisibleElements;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  darkMode,
  projects,
  visibleElements,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Projects", icon: <Globe className="w-4 h-4" /> },
    {
      id: "full-stack",
      name: "Full Stack",
      icon: <Code className="w-4 h-4" />,
    },
    { id: "ai-ml", name: "AI/ML", icon: <Zap className="w-4 h-4" /> },
    { id: "web-app", name: "Web Apps", icon: <Monitor className="w-4 h-4" /> },
    { id: "iot", name: "IoT", icon: <Smartphone className="w-4 h-4" /> },
    {
      id: "blockchain",
      name: "Blockchain",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const displayProjects = projects.length > 0 ? projects : [];
  const filteredProjects =
    selectedCategory === "all"
      ? displayProjects
      : displayProjects.filter(
          (project) => (project as any).category === selectedCategory,
        );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Project cards animation
      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotationY: 45,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Project card hover effects
      cards.forEach((card, index) => {
        const element = card as HTMLElement;

        element.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -20,
            rotationY: 5,
            rotationX: 5,
            duration: 0.4,
            ease: "power2.out",
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "from-green-500 to-emerald-500";
      case "development":
        return "from-yellow-500 to-orange-500";
      case "planning":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "Live";
      case "development":
        return "In Development";
      case "planning":
        return "Planning";
      default:
        return "Completed";
    }
  };

  return (
    <Section
      ref={sectionRef}
      id="projects"
      className="section section-4 py-20 bg-gradient-to-br from-indigo-50/30 via-white to-pink-50/20 dark:from-indigo-900/10 dark:via-gray-900 dark:to-pink-900/10"
    >
      <div className="grid-container">
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 mb-6">
                Creative Solutions
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                Featured{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">
                  Projects
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              Transforming ideas into
              <span className="text-pink-600 dark:text-pink-400 font-medium">
                {" "}
                impactful digital solutions
              </span>{" "}
              that
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                {" "}
                drive innovation
              </span>
              .
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-lg ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70"
                } backdrop-blur-sm border border-white/20 dark:border-gray-700/50`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="projects-grid"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${(project as any).title}-${selectedCategory}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="project-card group relative"
                  style={{ perspective: "1000px" }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative p-10 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-8 right-8 z-10">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getStatusColor((project as any).status || "completed")} text-white shadow-lg`}
                      >
                        {getStatusText((project as any).status || "completed")}
                      </div>
                    </div>

                    {/* Project Icon & Title */}
                    <div className="flex items-center space-x-5 mb-8">
                      <div
                        className={`w-18 h-18 rounded-3xl bg-gradient-to-r ${project.gradient} p-5 text-white text-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-indigo-600 transition-all duration-300">
                          {project.title}
                        </h3>
                        {(project as any).role && (
                          <p className="text-base text-gray-500 dark:text-gray-400 font-medium">
                            {(project as any).role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    {(project as any).duration && (
                      <div className="flex items-center space-x-8 mb-6 text-base text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-5 h-5" />
                          <span>{(project as any).duration}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5" />
                          <span>{(project as any).teamSize}</span>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    {(project as any).features && (
                      <div className="mb-8">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <Star className="w-5 h-5 mr-3 text-yellow-500" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {(project as any).features
                            .slice(0, 4)
                            .map((feature: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-3 text-base text-gray-600 dark:text-gray-400"
                              >
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${project.gradient} text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {(project as any).metrics && (
                      <div className="mb-8 grid grid-cols-3 gap-5">
                        {Object.entries((project as any).metrics).map(
                          ([key, value], idx) => (
                            <div
                              key={idx}
                              className="text-center p-4 rounded-2xl bg-gray-100/50 dark:bg-gray-700/50"
                            >
                              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {value as string}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                {key}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        {(project as any).liveUrl && (
                          <motion.button
                            className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300 text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-5 h-5" />
                            <span>Live Demo</span>
                          </motion.button>
                        )}

                        {(project as any).githubUrl && (
                          <motion.button
                            className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-medium hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300 text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                            <span>Code</span>
                          </motion.button>
                        )}
                      </div>

                      <motion.button
                        onClick={() =>
                          setActiveProject(
                            activeProject === index ? null : index,
                          )
                        }
                        className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-base font-medium">
                          Learn More
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Awards */}
                    {(project as any).awards &&
                      (project as any).awards.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <Award className="w-5 h-5 text-yellow-500" />
                            <span className="text-base font-medium text-gray-900 dark:text-white">
                              {(project as any).awards[0]}
                            </span>
                          </div>
                        </div>
                      )}

                    {/* Hover Gradient Overlay */}
                    <AnimatePresence>
                      {hoveredProject === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-5 pointer-events-none`}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Expanded Details Modal */}
                  <AnimatePresence>
                    {activeProject === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setActiveProject(null)}
                      >
                        <motion.div
                          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-2xl"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                              {project.title}
                            </h3>
                            <button
                              onClick={() => setActiveProject(null)}
                              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-6">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                              {(project as any).detailedDescription ||
                                project.description}
                            </p>

                            {(project as any).features && (
                              <div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                  Features
                                </h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {(project as any).features.map(
                                    (feature: string, idx: number) => (
                                      <div
                                        key={idx}
                                        className="flex items-center space-x-3"
                                      >
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-gray-700 dark:text-gray-300">
                                          {feature}
                                        </span>
                                      </div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Projects Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20 hover:bg-pink-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-3">
                  {filteredProjects.length}+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  15+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Technologies Used
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  100K+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Users Impacted
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-3">
                  5
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Awards Won
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectsSection;
