import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ArrowRight,
  Github,
  ExternalLink,
  Code2,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";
import type { Project } from "portfolio-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSectionProps {
  projects: Project[];
  visibleElements: VisibleElements;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const displayProjects = projects.length > 0 ? projects : [];
  const featuredProjects = displayProjects.filter(
    (project) => project.featured,
  );
  const otherProjects = displayProjects.filter((project) => !project.featured);

  return (
    <Section
      ref={sectionRef}
      id="projects"
      className="section section-4 bg-gradient-to-br from-indigo-50/30 via-white to-pink-50/20 dark:from-indigo-900/10 dark:via-gray-900 dark:to-pink-900/10"
    >
      <div className="grid-container">
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
                <span className="inline-block px-8 py-4 rounded-full text-lg font-bold bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-pink-600 dark:text-pink-400 border-2 border-pink-500/30 shadow-lg">
                  Creative Portfolio
                </span>
                <Sparkles className="w-8 h-8 text-yellow-500 ml-3" />
              </div>
              <h2 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-8 tracking-tight">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 animate-pulse">
                  Projects
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              From concept to reality - explore my journey through
              <span className="text-pink-600 dark:text-pink-400 font-bold">
                {" "}
                innovative solutions
              </span>{" "}
              and
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {" "}
                cutting-edge technology
              </span>
              .
            </motion.p>
          </div>

          {/* Featured Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="flex items-center justify-center mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent flex-1 max-w-xs"></div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mx-8 flex items-center">
                <Star className="w-8 h-8 text-yellow-500 mr-3" />
                Featured Works
                <Star className="w-8 h-8 text-yellow-500 ml-3" />
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent flex-1 max-w-xs"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, rotateY: 15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 80,
                  }}
                  className="project-card group relative"
                  style={{ perspective: "1000px" }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-800/95 dark:to-gray-900/95 backdrop-blur-lg border-2 border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-3xl transition-all duration-700 overflow-hidden transform group-hover:scale-[1.02] group-hover:-rotate-1 z-10">
                    {/* Featured Badge */}
                    <div className="absolute top-4 right-4 z-30">
                      <div className="">⭐</div>
                    </div>

                    {/* Project Header */}
                    <div className="relative z-20 flex items-start space-x-6 mb-8">
                      {project.icon ? (
                        <img
                          className={`w-20 h-20 rounded-2xl p-4 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                          src={project.icon}
                        />
                      ) : (
                        <div
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${project.gradient} p-4 text-white text-4xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <Code2 className="w-10 h-10" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-500">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/30 group-hover:bg-white/30 group-hover:text-white group-hover:border-white/50 transition-all duration-500"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative z-20">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium group-hover:text-white/90 group-hover:drop-shadow-sm transition-all duration-500">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="relative z-20 mb-8">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center group-hover:text-white group-hover:drop-shadow-sm transition-all duration-500">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 mr-3 group-hover:bg-white transition-all duration-500"></span>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 rounded-xl text-sm font-bold bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 border-2 border-gray-200/50 dark:border-gray-600/50 shadow-md backdrop-blur-sm group-hover:bg-white group-hover:text-gray-900 group-hover:border-white group-hover:shadow-lg transition-all duration-300"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="relative z-20 flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50 group-hover:border-white/30 transition-all duration-500">
                      <div className="flex space-x-4">
                        {project.liveUrl && (
                          <motion.button
                            className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-bold hover:shadow-xl transition-all duration-300 text-base transform hover:scale-105"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              window.open(project.liveUrl, "_blank")
                            }
                          >
                            <ExternalLink className="w-5 h-5" />
                            <span>Live Demo</span>
                          </motion.button>
                        )}

                        {project.githubUrl && (
                          <motion.button
                            className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gray-800/80 dark:bg-white/80 text-white dark:text-gray-800 font-bold hover:shadow-xl transition-all duration-300 text-base backdrop-blur-sm"
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                            <span>View Code</span>
                          </motion.button>
                        )}
                      </div>

                      <motion.button
                        onClick={() =>
                          setActiveProject(
                            activeProject === index ? null : index,
                          )
                        }
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 group-hover:text-white/80 transition-colors font-semibold"
                        whileHover={{ x: 8 }}
                      >
                        <span className="text-base">Details</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Hover Effects */}
                    <AnimatePresence>
                      {hoveredProject === index && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500 to-blue-500 opacity-15 pointer-events-none z-0"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400 to-blue-400 opacity-20 blur-xl pointer-events-none z-0"
                          />
                        </>
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
                              {project.description}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Projects Section */}
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <div className="flex items-center justify-center mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent flex-1 max-w-xs"></div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mx-8">
                  More Projects
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent flex-1 max-w-xs"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                    }}
                    className="group relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} p-3 text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Code2 className="w-6 h-6" />
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white group-hover:drop-shadow-lg transition-all duration-300">
                      {project.title}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-white/90 group-hover:drop-shadow-sm transition-all duration-300">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-white group-hover:text-gray-900 transition-all duration-300">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {project.liveUrl && (
                        <motion.button
                          className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 group-hover:text-white font-medium text-sm transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          View Live →
                        </motion.button>
                      )}
                      {project.githubUrl && (
                        <motion.button
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 group-hover:text-white font-medium text-sm transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="relative p-12 rounded-3xl bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-indigo-500/5 border-2 border-pink-500/20 dark:border-pink-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 opacity-50"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
                  Project Impact
                </h3>
                <div className="grid md:grid-cols-4 gap-8">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl font-black text-pink-600 dark:text-pink-400 mb-2">
                      8+
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      Projects Built
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                      20+
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      Technologies
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
                      100K+
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      Users Reached
                    </div>
                  </motion.div>

                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-5xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
                      5
                    </div>
                    <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                      Awards Won
                    </div>
                  </motion.div>
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
