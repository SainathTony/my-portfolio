import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building,
  Users,
  Award,
  TrendingUp,
  Code,
  Server,
  Database,
  Globe,
  ArrowRight,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  icon: string;
  color: string;
}

interface ExperienceSectionProps {
  darkMode: boolean;
  experiences: Experience[];
  visibleElements: VisibleElements;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  darkMode,
  experiences,
  visibleElements,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeExperience, setActiveExperience] = useState<number>(0);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(
    null,
  );

  const enhancedExperiences = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Innovations Inc.",
      location: "Hyderabad, India",
      period: "2022 - Present",
      duration: "2+ years",
      type: "Full-time",
      description:
        "Leading development of scalable web applications and mentoring junior developers in modern technologies. Architecting cloud-native solutions with focus on performance and user experience.",
      achievements: [
        "Led development of microservices architecture reducing system latency by 40%",
        "Mentored 5+ junior developers in React, Node.js, and cloud technologies",
        "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
        "Designed and built real-time analytics dashboard processing 1M+ events/day",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "AWS",
        "Docker",
        "PostgreSQL",
      ],
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
      companyLogo: "🏢",
      highlights: [
        "Team Lead",
        "Architecture Design",
        "Performance Optimization",
      ],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "Hyderabad, India",
      period: "2020 - 2022",
      duration: "2 years",
      type: "Full-time",
      description:
        "Developed and maintained multiple client-facing applications using modern web technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
      achievements: [
        "Built responsive web applications serving 10K+ daily active users",
        "Integrated third-party APIs and payment gateways for e-commerce platforms",
        "Implemented automated testing reducing bug reports by 60%",
        "Optimized database queries improving application performance by 35%",
      ],
      technologies: [
        "JavaScript",
        "Python",
        "Django",
        "React",
        "MongoDB",
        "Redis",
      ],
      icon: "💡",
      color: "from-green-500 to-emerald-500",
      companyLogo: "🌟",
      highlights: [
        "Full Stack Development",
        "API Integration",
        "Database Optimization",
      ],
    },
    {
      title: "Software Developer Intern",
      company: "StartupHub Technologies",
      location: "Hyderabad, India",
      period: "2019 - 2020",
      duration: "1 year",
      type: "Internship",
      description:
        "Gained hands-on experience in software development lifecycle. Contributed to various projects and learned industry best practices in agile development environment.",
      achievements: [
        "Developed REST APIs for mobile application backend",
        "Created responsive UI components using modern CSS frameworks",
        "Participated in code reviews and agile development processes",
        "Built automated scripts for data migration and processing",
      ],
      technologies: [
        "HTML",
        "CSS",
        "JavaScript",
        "Node.js",
        "Express",
        "MySQL",
      ],
      icon: "🌱",
      color: "from-purple-500 to-pink-500",
      companyLogo: "🚀",
      highlights: [
        "Learning & Growth",
        "Team Collaboration",
        "Agile Development",
      ],
    },
  ];

  const displayExperiences =
    experiences.length > 0 ? experiences : enhancedExperiences;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        ".timeline-line",
        {
          height: "0%",
        },
        {
          height: "100%",
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        },
      );

      // Experience cards animation
      gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        const isLeft = index % 2 === 0;

        gsap.fromTo(
          item,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Timeline dots animation
      gsap.utils.toArray(".timeline-dot").forEach((dot, index) => {
        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: dot,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.2,
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExperienceHover = (index: number, isEntering: boolean) => {
    setHoveredExperience(isEntering ? index : null);

    if (isEntering) {
      gsap.to(`.experience-card-${index}`, {
        scale: 1.02,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(`.experience-card-${index}`, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <Section
      ref={sectionRef}
      id="experience"
      className="section section-3 py-20 bg-gradient-to-br from-purple-50/30 via-white to-emerald-50/20 dark:from-purple-900/10 dark:via-gray-900 dark:to-emerald-900/10"
    >
      <div className="content-container">
        <div className="w-full max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6">
                Professional Journey
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                Work{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600">
                  Experience
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
              A timeline of growth, innovation, and meaningful contributions to
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {" "}
                technology
              </span>{" "}
              and
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {" "}
                teams
              </span>
              .
            </motion.p>
          </div>

          {/* Timeline Container */}
          <div className="experience-timeline relative">
            {/* Central Timeline Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 rounded-full timeline-line"
              style={{ height: "0%" }}
            ></div>

            {/* Experience Items */}
            <div className="space-y-24">
              {displayExperiences.map((exp, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    className={`timeline-item relative flex items-center ${
                      isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                    onMouseEnter={() => handleExperienceHover(index, true)}
                    onMouseLeave={() => handleExperienceHover(index, false)}
                  >
                    {/* Timeline Dot */}
                    <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-r ${(exp as any).color} shadow-lg`}
                      >
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 scale-50"></div>
                      </div>
                      <div
                        className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${(exp as any).color} animate-ping opacity-20`}
                      ></div>
                    </div>

                    {/* Experience Card */}
                    <div
                      className={`experience-card-${index} flex-1 ${isLeft ? "lg:pr-16" : "lg:pl-16"} lg:w-1/2`}
                    >
                      <div className="relative p-10 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                        {/* Company Logo & Period */}
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center space-x-5">
                            <div
                              className={`w-18 h-18 rounded-3xl bg-gradient-to-r ${(exp as any).color} p-5 text-white text-3xl flex items-center justify-center shadow-lg`}
                            >
                              {(exp as any).companyLogo || exp.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {exp.title}
                              </h3>
                              <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                                {exp.company}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div
                              className={`px-4 py-2 rounded-full text-base font-semibold bg-gradient-to-r ${(exp as any).color} text-white mb-3`}
                            >
                              {(exp as any).duration || exp.period}
                            </div>
                            <div className="text-base text-gray-500 dark:text-gray-400">
                              {(exp as any).type || "Full-time"}
                            </div>
                          </div>
                        </div>

                        {/* Location & Period */}
                        <div className="flex items-center space-x-8 mb-8 text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5" />
                            <span className="text-lg">{exp.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5" />
                            <span className="text-lg">{exp.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        {(exp as any).highlights && (
                          <div className="mb-8">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                              <Award className="w-5 h-5 mr-3 text-yellow-500" />
                              Key Highlights
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {(exp as any).highlights.map(
                                (highlight: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                                  >
                                    {highlight}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        {(exp as any).technologies && (
                          <div className="mb-8">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                              <Code className="w-5 h-5 mr-3 text-blue-500" />
                              Technologies Used
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {(exp as any).technologies.map(
                                (tech: string, idx: number) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                                  >
                                    {tech}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        )}

                        {/* Achievements */}
                        <div>
                          <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-5 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-3 text-emerald-500" />
                            Key Achievements
                          </h4>
                          <div className="space-y-4">
                            {exp.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="flex items-start space-x-4"
                              >
                                <div className="w-3 h-3 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                                  {achievement}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <AnimatePresence>
                          {hoveredExperience === index && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${(exp as any).color} opacity-5 pointer-events-none`}
                            />
                          )}
                        </AnimatePresence>

                        {/* Decorative Arrow */}
                        <div
                          className={`absolute top-1/2 transform -translate-y-1/2 ${
                            isLeft ? "-right-4" : "-left-4"
                          } w-8 h-8`}
                        >
                          <div
                            className={`w-0 h-0 border-l-8 border-r-8 border-t-8 ${
                              isLeft
                                ? "border-l-transparent border-r-white dark:border-r-gray-800 border-t-transparent"
                                : "border-r-transparent border-l-white dark:border-l-gray-800 border-t-transparent"
                            } transform rotate-45`}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Side Content (for larger screens) */}
                    <div
                      className={`hidden lg:block flex-1 ${isLeft ? "lg:pl-16" : "lg:pr-16"} lg:w-1/2`}
                    >
                      <div className="text-center">
                        <div className={`text-6xl mb-4 opacity-20`}>
                          {exp.icon}
                        </div>
                        <div className="text-lg font-bold text-gray-400 dark:text-gray-600">
                          {exp.period}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Career Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  5+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  3
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Companies
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  50+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Projects Delivered
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-3">
                  15+
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  Team Members Mentored
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ExperienceSection;
