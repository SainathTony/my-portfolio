import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Rocket,
  Brain,
  BookOpen,
  Coffee,
  Heart,
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
  Puzzle,
  Lightbulb,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/Section";
import type { VisibleElements } from "../types/common";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  darkMode: boolean;
  visibleElements: VisibleElements;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: "5+",
      label: "Years of Experience",
      icon: <Award className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      description: "Building digital solutions",
    },
    {
      number: "20+",
      label: "Projects Completed",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      description: "Delivered successfully",
    },
    {
      number: "40+",
      label: "Technologies",
      icon: <Brain className="w-6 h-6" />,
      color: "from-emerald-500 to-teal-500",
      description: "Mastered & applied",
    },
    {
      number: "100%",
      label: "Client Satisfaction",
      icon: <Heart className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      description: "Commitment to excellence",
    },
  ];

  const journey = [
    {
      year: "2016",
      title: "The Spark",
      description:
        "Began my tech journey at IIIT Basar, writing my first “Hello, World!” in Computer Science.",
      icon: <Star className="w-5 h-5" />,
      color: "from-blue-500 to-purple-500",
    },
    {
      year: "2018",
      title: "First Breakthrough",
      description:
        "Landed remote internships at Qualzz and DTaiLabs, stepping into full-stack development.",
      icon: <Rocket className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "2020",
      title: "Turning Pro",
      description:
        "Graduated and joined ThoughtWorks, shaping real-world impact through projects with GAP.",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "from-emerald-500 to-blue-500",
    },
    {
      year: "2022",
      title: "Driving Innovation",
      description:
        "Led AI/ML initiatives and delivered value to global clients as a Software Craftsperson at Everest.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const personalInfo = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Fueled by Coffee",
      description: "And late-night coding sessions",
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Complex challenges, elegant solutions",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Player",
      description: "Collaboration drives innovation",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Lifelong Learner",
      description: "Always exploring new technologies",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate counters
      const stats = gsap.utils.toArray<HTMLElement>(".counter");
      stats.forEach((element) => {
        const target = element.textContent?.replace(/\D/g, "") || "0";
        const targetNum = parseInt(target);
        const hasPlus = element.textContent?.includes("+");
        const hasPercent = element.textContent?.includes("%");

        gsap.fromTo(
          element,
          { textContent: 0 },
          {
            textContent: targetNum,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              const current = Math.floor(
                gsap.getProperty(this.targets()[0], "textContent"),
              );
              let suffix = "";
              if (hasPlus) suffix = "+";
              if (hasPercent) suffix = "%";
              (this.targets()[0] as HTMLElement).textContent = current + suffix;
            },
          },
        );
      });

      // Floating animations
      const floatingElements =
        gsap.utils.toArray<HTMLElement>(".floating-card");
      floatingElements.forEach((element, index) => {
        gsap.to(element, {
          y: -15,
          duration: 2 + index * 0.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="about"
      className="section section-1 bg-gradient-to-br from-surface-light-secondary via-surface-light-tertiary to-surface-light-primary dark:from-surface-dark-primary dark:via-surface-dark-secondary dark:to-surface-dark-tertiary overflow-hidden"
    >
      <div className="content-container relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-secondary-500/5 to-gradient-pink/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 mb-8">
              <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                About Me
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6 leading-tight">
              Crafting Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-success-600">
                Experiences
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-text-light-secondary dark:text-text-dark-tertiary max-w-4xl mx-auto leading-relaxed">
              I'm Sainath Bottupally, a passionate Full Stack Developer and
              AI/ML Engineer who transforms complex problems into elegant
              solutions.
            </p>
          </motion.div>

          {/* Stats Section */}
          <div ref={counterRef} className="mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="floating-card group relative"
                >
                  <div className="relative p-8 rounded-3xl bg-surface-light-elevated/80 dark:bg-surface-dark-elevated/80 backdrop-blur-sm border border-border-light-primary dark:border-border-dark-primary hover:bg-surface-light-elevated/90 dark:hover:bg-surface-dark-elevated/90 transition-all duration-300 hover:shadow-hard hover:-translate-y-2">
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10 text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {stat.icon}
                      </div>

                      <div className="counter text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-2">
                        {stat.number}
                      </div>

                      <div className="text-lg font-semibold text-text-light-secondary dark:text-text-dark-secondary mb-1">
                        {stat.label}
                      </div>

                      <div className="text-sm text-text-light-tertiary dark:text-text-dark-muted">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-text-light-primary dark:text-text-dark-primary mb-6">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Journey
                </span>
              </h3>
              <p className="text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto">
                From curious beginner to seasoned professional
              </p>
            </motion.div>

            <div className="relative">
              {/* Animated Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-1 hidden lg:block">
                <div className="relative h-full">
                  {/* Background line */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 via-emerald-500/20 to-orange-500/20 rounded-full"></div>

                  {/* Animated progress line */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 via-emerald-500 to-orange-500 rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                  />

                  {/* Timeline dots */}
                  {journey.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-surface-light-primary dark:bg-surface-dark-elevated border-4 border-current z-10"
                      style={{
                        left: `${(index / (journey.length - 1)) * 100}%`,
                        marginLeft:
                          index === 0
                            ? "0"
                            : index === journey.length - 1
                              ? "-24px"
                              : "-12px",
                        color:
                          index === 0
                            ? "#3b82f6"
                            : index === 1
                              ? "#8b5cf6"
                              : index === 2
                                ? "#10b981"
                                : "#f97316",
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    />
                  ))}
                </div>
              </div>

              {/* Timeline Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="relative group"
                  >
                    {/* Mobile Timeline Line */}
                    {index < journey.length - 1 && (
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-blue-500/30 to-purple-500/30 rounded-full lg:hidden"></div>
                    )}

                    <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10">
                        {/* Year Badge */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-gray-800/90 dark:to-gray-900/90 border-2 border-white/50 dark:border-gray-700/50 flex items-center justify-center shadow-lg">
                          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            {item.year}
                          </span>
                        </div>

                        {/* Icon */}
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {item.icon}
                        </div>

                        {/* Title */}
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          {item.title}
                        </h4>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                          {item.description}
                        </p>

                        {/* Progress Indicator */}
                        <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${((index + 1) / journey.length) * 100}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + index * 0.1,
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                              {Math.round(((index + 1) / journey.length) * 100)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connection Arrow for Desktop */}
                    {index < journey.length - 1 && (
                      <motion.div
                        className="absolute top-20 -right-4 w-8 h-8 hidden lg:block"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Journey Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm"
              >
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Journey Highlights
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Started with curiosity
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Gained professional experience
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Leading innovation today
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Personal Insights */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Beyond{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Code
                </span>
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                What drives me as a developer and person
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 dark:bg-gray-800/80 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {info.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="relative p-12 rounded-3xl bg-gradient-to-br from-white/90 to-blue-50/90 dark:from-gray-800/90 dark:to-indigo-900/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

                <div className="relative z-10 flex items-center space-x-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      <BookOpen className="w-10 h-10" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      IIIT Basar
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                      Bachelor of Technology - Computer Science Engineering
                    </p>
                    <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-500">
                      <span className="text-lg font-semibold">GPA: 8.0/10</span>
                      <span>•</span>
                      <span>2016 - 2020</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="relative max-w-5xl mx-auto p-16 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-xl"></div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Let's Build{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Something Amazing
                  </span>
                </h3>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Ready to transform your ideas into reality? I'm excited to
                  collaborate on projects that make a real difference.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      Get In Touch
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>

                  <motion.button
                    className="px-12 py-5 bg-white/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl text-lg hover:bg-white/40 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
