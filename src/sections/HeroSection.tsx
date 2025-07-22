import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Github from "lucide-react/dist/esm/icons/github";
import Linkedin from "lucide-react/dist/esm/icons/linkedin";
import Mail from "lucide-react/dist/esm/icons/mail";
import Phone from "lucide-react/dist/esm/icons/phone";
import Globe from "lucide-react/dist/esm/icons/globe";
import Code from "lucide-react/dist/esm/icons/code";
import Cpu from "lucide-react/dist/esm/icons/cpu";
import Database from "lucide-react/dist/esm/icons/database";
import Server from "lucide-react/dist/esm/icons/server";
import ArrowDown from "lucide-react/dist/esm/icons/arrow-down";
import Download from "lucide-react/dist/esm/icons/download";
import Workflow from "lucide-react/dist/esm/icons/workflow";
import { gsap } from "gsap/dist/gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import FloatingIcon from "../components/common/FloatingIcon";
import RevealAnimation from "../components/common/RevealAnimation";
import MyPic from "../assets/images/My_pic.png";
import Background from "../components/Background";

gsap.registerPlugin(TextPlugin);

// Tech stack icons
const techStack = [
  { icon: <Code className="w-5 h-5" />, name: "Frontend" },
  { icon: <Server className="w-5 h-5" />, name: "Backend" },
  { icon: <Database className="w-5 h-5" />, name: "Databases" },
  { icon: <Cpu className="w-5 h-5" />, name: "AI/ML" },
  { icon: <Workflow className="w-5 h-5" />, name: "CI/CD" },
];

interface HeroSectionProps {
  scrollToSection: (index: number) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: "https://github.com/SainathTony",
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/sainath-bottupally-754636156",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:bottupallysainath@gmail.com",
      label: "Email",
      color: "hover:text-red-500",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(".hero-content > *", { y: 100, opacity: 0 });
      gsap.set(".floating-icon", { scale: 0, rotation: 180 });

      // Main entrance animation
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title with typewriter effect
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          socialRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          ".floating-icon",
          {
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)",
          },
          "-=0.8",
        );

      // Continuous animations
      gsap.to(".pulse-ring", {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Floating icons data
  const floatingIcons = [
    { icon: <Code size={24} />, delay: 0, className: "top-[10%] left-[10%]" },
    {
      icon: <Server size={24} />,
      delay: 0.5,
      className: "top-[20%] right-[15%]",
    },
    {
      icon: <Database size={24} />,
      delay: 1,
      className: "bottom-[25%] left-[20%]",
    },
    {
      icon: <Cpu size={24} />,
      delay: 1.5,
      className: "bottom-[15%] right-[25%]",
    },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="section pt-10 relative flex items-center justify-center min-h-screen bg-gradient-to-br from-surface-light-primary via-surface-light-secondary to-surface-light-tertiary dark:from-surface-dark-primary dark:via-surface-dark-secondary dark:to-surface-dark-tertiary overflow-hidden transition-colors duration-500"
    >
      {/* Enhanced Background with Liquid Animations - Removed to optimize bundle size */}
      <Background />     
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map((item, index) => (
          <FloatingIcon
            key={index}
            icon={item.icon}
            delay={item.delay}
            className={`floating-icon text-black/90 dark:text-white/90  ${item.className}`}
          />
        ))}

        {/* Additional gradient overlays for depth */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/15 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/15 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="hero-content relative px-4 sm:px-6 lg:px-8">
        <div className="hero-container max-w-7xl mx-auto">
          {/* Greeting Badge */}
          <div className="mb-4 w-full flex justify-center">
            <motion.span
              className="inline-flex items-center px-6 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-hero-success/20 to-hero-gradient-start/20 backdrop-blur-sm border border-border-light-primary dark:border-border-dark-primary text-success-700 dark:text-success-300 hover:shadow-hero-button dark:hover:shadow-hero-button-dark transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex h-4 w-4 mr-4">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-success-500"></span>
              </span>
              Available for exciting opportunities
            </motion.span>
          </div>

          {/* Main Heading */}
          <div className="mb-4">
            <h1
              ref={titleRef}
              className="text-xl text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-light-primary dark:text-text-dark-primary leading-tight opacity-0"
            >
              {/* <img src={MyPic} className="w-10 h-10 rounded-md inline-block"/> */}
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hero-gradient-start via-hero-accent to-hero-success animate-gradient-x">
                Sainath Bottupally
              </span>
              <motion.span
                className="inline-block ml-6"
                animate={{
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2,
                }}
              >
                <img src={MyPic} className="w-10 h-10 rounded-md inline-block" />
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-4">
            <h2
              ref={subtitleRef}
              className="text-lg text-center sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-text-light-secondary dark:text-text-dark-secondary font-light opacity-0"
            >
              <span className="text-transparent text-center bg-clip-text bg-gradient-to-r from-hero-gradient-start to-hero-accent font-semibold">
                Full Stack Developer
              </span>{" "}
              &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-hero-success to-hero-gradient-end font-medium">
                AI/ML Engineer
              </span>
            </h2>
          </div>

          {/* Tech Stack */}
          <RevealAnimation
            delay={500}
            direction="up"
            appearOnMount={true}
            className="mb-4"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 py-4 sm:py-6">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center px-3 py-1.5 rounded-full bg-surface-light-elevated/90 dark:bg-surface-dark-elevated/90 backdrop-blur-sm shadow-soft text-base font-medium text-text-light-primary dark:text-text-dark-primary border border-border-light-primary dark:border-border-dark-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    y: -3,
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <span className="mr-3 text-primary-500">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </RevealAnimation>

          {/* Description */}
          <div className="mb-6">
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg md:text-xl text-center text-text-light-secondary dark:text-text-dark-tertiary max-w-4xl mx-auto leading-relaxed opacity-0"
            >
              Crafting exceptional digital experiences through the intersection
              of
              <span className="text-primary-600 dark:text-primary-400 font-medium">
                {" "}
                cutting-edge technology
              </span>{" "}
              and
              <span className="text-secondary-600 dark:text-secondary-400 font-medium">
                {" "}
                innovative design
              </span>
              . Specializing in scalable web applications, AI/ML integration,
              and cloud architecture.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-4 opacity-0"
          >
            <motion.button
              onClick={() => scrollToSection(1)}
              className="group relative px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-gradient-to-r from-hero-gradient-start to-hero-gradient-end text-white shadow-hero-button hover:shadow-hero-card transition-all duration-500 transform hover:scale-105 w-full sm:w-auto min-h-[48px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex items-center">
                Explore My Journey
                <ArrowDown className="ml-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-hero-gradient-end via-hero-accent to-hero-gradient-start opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>

            <motion.button
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/16d3sVUelsEUdOzIqtfQZ8A9ukRbmh8rK/view?usp=sharing",
                  "_blank",
                )
              }
              className="group px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-xl sm:rounded-2xl bg-surface-light-primary/10 dark:bg-surface-dark-primary/10 backdrop-blur-sm border-2 border-border-light-secondary dark:border-border-dark-secondary text-text-light-primary dark:text-text-dark-primary hover:bg-surface-light-primary/20 dark:hover:bg-surface-dark-primary/20 hover:border-hero-gradient-start dark:hover:border-hero-accent transition-all duration-300 transform hover:shadow-hero-card dark:hover:shadow-hero-card-dark w-full sm:w-auto min-h-[48px]"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                <Download className="mr-3 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </span>
            </motion.button>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 justify-center items-center max-w-6xl mx-auto">
            {/* Phone */}
            <RevealAnimation
              delay={825}
              direction="up"
              appearOnMount={true}
              className="w-full"
            >
              <motion.div
                className="flex items-center p-4 rounded-xl bg-surface-light-elevated/90 dark:bg-surface-dark-elevated/90 backdrop-blur-sm shadow-hero-card dark:shadow-hero-card-dark hover:shadow-hero-button dark:hover:shadow-hero-button-dark transition-all w-full border border-border-light-primary dark:border-border-dark-primary hover:border-hero-gradient-start dark:hover:border-hero-accent"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
              >
                <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 mr-4">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
                    Phone
                  </p>
                  <a
                    href="tel:+918096149910"
                    className="text-base font-medium text-text-light-primary dark:text-text-dark-primary hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    +91 8096149910
                  </a>
                </div>
              </motion.div>
            </RevealAnimation>

            {/* Email */}
            <RevealAnimation
              delay={850}
              direction="up"
              appearOnMount={true}
              className="w-full"
            >
              <motion.div
                className="flex items-center p-4 rounded-xl bg-surface-light-elevated/90 dark:bg-surface-dark-elevated/90 backdrop-blur-sm shadow-hero-card dark:shadow-hero-card-dark hover:shadow-hero-button dark:hover:shadow-hero-button-dark transition-all w-full border border-border-light-primary dark:border-border-dark-primary hover:border-hero-gradient-start dark:hover:border-hero-accent"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
              >
                <div className="p-3 rounded-lg bg-secondary-100 dark:bg-secondary-900/50 text-secondary-600 dark:text-secondary-400 mr-4">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
                    Email
                  </p>
                  <a
                    href="mailto:bottupallysainath@gmail.com"
                    className="text-base font-medium text-text-light-primary dark:text-text-dark-primary hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                  >
                    bottupallysainath@gmail.com
                  </a>
                </div>
              </motion.div>
            </RevealAnimation>

            {/* Availability */}
            <RevealAnimation
              delay={875}
              direction="up"
              appearOnMount={true}
              className="w-full"
            >
              <motion.div
                className="flex items-center p-4 rounded-xl bg-surface-light-elevated/90 dark:bg-surface-dark-elevated/90 backdrop-blur-sm shadow-hero-card dark:shadow-hero-card-dark hover:shadow-hero-button dark:hover:shadow-hero-button-dark transition-all w-full border border-border-light-primary dark:border-border-dark-primary hover:border-hero-gradient-start dark:hover:border-hero-accent"
                whileHover={{
                  y: -5,
                  scale: 1.02,
                }}
              >
                <div className="p-3 rounded-lg bg-success-100 dark:bg-success-900/50 text-success-600 dark:text-success-400 mr-4">
                  <div className="relative">
                    <span className="absolute top-0 right-0 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                    </span>
                    <Globe size={20} />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
                    Status
                  </p>
                  <p className="text-base font-medium text-text-light-primary dark:text-text-dark-primary">
                    Available for work
                  </p>
                </div>
              </motion.div>
            </RevealAnimation>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="mt-8 opacity-0">
            <div className="flex justify-center space-x-4 sm:space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-2xl bg-surface-light-primary/10 dark:bg-surface-dark-primary/10 backdrop-blur-sm border border-border-light-primary dark:border-border-dark-primary text-text-light-secondary dark:text-text-dark-secondary hover:bg-surface-light-primary/20 dark:hover:bg-surface-dark-primary/20 transition-all duration-300 ${link.color}`}
                  aria-label={link.label}
                  whileHover={{ y: -5, scale: 1.1, rotateY: 15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    {link.icon}
                    <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-text-light-tertiary dark:text-text-dark-tertiary">
                📍 Hyderabad, India | 🌍 Open to Remote Opportunities
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-4 flex justify-center">
            <motion.button
              onClick={() => scrollToSection(1)}
              className="group flex flex-col items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors duration-300"
              aria-label="Discover my story"
              whileHover={{ y: 5 }}
            >
              <motion.span
                className="text-sm font-medium mb-3 opacity-70"
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.span>
              <motion.div
                className="w-8 h-12 border-2 border-current rounded-full p-1 relative overflow-hidden"
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-1 h-3 bg-current rounded-full mx-auto"
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
