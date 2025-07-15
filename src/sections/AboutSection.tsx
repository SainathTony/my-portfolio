import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Lightbulb,
  Target,
  Award,
  Users,
  Rocket,
  Brain,
  Mail,
  Phone,
  MapPin,
  BookOpen,
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

const AboutSection: React.FC<AboutSectionProps> = ({
  darkMode,
  visibleElements,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      number: "5+",
      label: "Years Experience",
      icon: <Award className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Projects Delivered",
      icon: <Rocket className="w-6 h-6" />,
    },
    {
      number: "10+",
      label: "Technologies Mastered",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      number: "25+",
      label: "Happy Clients",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const coreValues = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description:
        "Writing maintainable, scalable, and efficient code that stands the test of time.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Constantly exploring new technologies and methodologies to solve complex problems.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description:
        "Building strong relationships with teams and stakeholders to achieve common goals.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Delivering high-quality solutions that exceed expectations and drive business value.",
      color: "from-orange-500 to-red-500",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats counter animation
      const stats = gsap.utils.toArray<HTMLDivElement>(".stat-number");
      stats.forEach((element) => {
        const target =
          (element as HTMLElement).textContent?.replace(/\D/g, "") || "0";
        const targetNum = parseInt(target);

        gsap.fromTo(
          element,
          {
            textContent: 0,
          },
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
              (this.targets()[0] as HTMLElement).textContent =
                current + (target.includes("+") ? "+" : "");
            },
          },
        );
      });

      // Floating animation for value cards
      const valueCards = gsap.utils.toArray<HTMLDivElement>(".value-card");
      valueCards.forEach((card, index) => {
        gsap.to(card, {
          y: "-10px",
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
      className="section section-1 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"
    >
      <div className="content-container">
        <div className="w-full max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-3 rounded-full text-base font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 mb-6">
                Get to know me
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                My{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600">
                  Story
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full text-center text-xl md:text-2xl text-gray-600 dark:text-gray-400 mx-auto leading-relaxed"
            >
              From curious beginner to seasoned developer, my journey has been
              shaped by
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {" "}
                passion
              </span>
              ,
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                {" "}
                persistence
              </span>
              , and the
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                {" "}
                pursuit of excellence
              </span>
              .
            </motion.p>
          </div>

          {/* Personal Story */}
          <div ref={storyRef} className="mb-6">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 relative">
                    The Journey of
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      Innovation
                    </span>
                  </h3>
                </div>

                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  <div className="relative pl-6 border-l-2 border-blue-500/30 mb-0">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                    <p>
                      My story began at{" "}
                      <strong className="text-blue-600 dark:text-blue-400">
                        IIIT Basar
                      </strong>{" "}
                      with a simple "Hello, World!" that sparked an{" "}
                      <strong className="text-gray-800 dark:text-gray-200">
                        unquenchable curiosity
                      </strong>{" "}
                      for technology. What started as late-night coding sessions
                      evolved into a career dedicated to crafting digital
                      experiences that matter.
                    </p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-purple-500/30 mb-0">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-purple-500 rounded-full"></div>
                    <p>
                      Through years of building{" "}
                      <strong className="text-gray-800 dark:text-gray-200">
                        scalable applications
                      </strong>{" "}
                      and leading development teams, I've discovered that the
                      most rewarding projects are those that solve real problems
                      and create genuine value for users.
                    </p>
                  </div>

                  <div className="relative pl-6 border-l-2 border-emerald-500/30">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-emerald-500 rounded-full"></div>
                    <p>
                      Today, I'm passionate about leveraging{" "}
                      <strong className="text-gray-800 dark:text-gray-200">
                        AI/ML technologies
                      </strong>{" "}
                      and modern cloud architectures to build the next
                      generation of intelligent applications that push the
                      boundaries of what's possible.
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                  <div className="flex items-center space-x-4 p-5 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300">
                    <Mail className="w-6 h-6 text-blue-500" />
                    <span className="text-base font-medium">
                      bottupallysainath@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-5 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300">
                    <Phone className="w-6 h-6 text-green-500" />
                    <span className="text-base font-medium">
                      +91 8096149910
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 p-5 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-purple-500" />
                    <span className="text-base font-medium">
                      Hyderabad, India
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/95 transition-all duration-300"
                    >
                      <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                        {stat.icon}
                      </div>
                      <div className="stat-number text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {stat.number}
                      </div>
                      <div className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Education Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-16 p-10 rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/95 transition-all duration-300"
                >
                  <div className="flex items-center space-x-6">
                    <BookOpen className="w-10 h-10 text-blue-500" />
                    <div className="pl-4">
                      <div className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                        IIIT Basar
                      </div>
                      <div className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                        B.Tech CSE • GPA: 8.0/10
                      </div>
                      <div className="text-base text-gray-500 dark:text-gray-500">
                        2016-2020
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
              </motion.div>
            </div>
          </div>

          {/* Core Values */}
          <div ref={valuesRef} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Core{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Values
                </span>
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                The principles that guide my work and drive me to deliver
                exceptional results.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="value-card group relative p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/95 transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div
                    className={`relative z-10 text-white p-4 rounded-2xl bg-gradient-to-br ${value.color} mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}
                  >
                    {value.icon}
                  </div>

                  <h4 className="relative z-10 text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h4>

                  <p className="relative z-10 text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
          >
            <div className="relative max-w-5xl mx-auto p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 blur-xl"></div>

              <div className="relative z-10">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Innovate
                  </span>{" "}
                  Together?
                </h3>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                  I'm passionate about collaborating with forward-thinking teams
                  to create solutions that make a real impact. Let's turn your
                  vision into reality.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <motion.button
                    className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start a Conversation
                  </motion.button>

                  <motion.button
                    className="px-12 py-5 bg-white/30 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-semibold rounded-2xl hover:bg-white/40 transition-all duration-300 text-lg"
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
