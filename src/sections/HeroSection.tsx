import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Globe, Code, Cpu, Database, Server, ArrowDown, Download } from 'lucide-react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import FloatingIcon from '../components/common/FloatingIcon';
import RevealAnimation from '../components/common/RevealAnimation';

gsap.registerPlugin(TextPlugin);

// Tech stack icons
const techStack = [
  { icon: <Code className="w-5 h-5" />, name: 'Frontend' },
  { icon: <Server className="w-5 h-5" />, name: 'Backend' },
  { icon: <Cpu className="w-5 h-5" />, name: 'AI/ML' },
  { icon: <Database className="w-5 h-5" />, name: 'Databases' },
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
    { icon: <Github size={20} />, url: 'https://github.com/sainath', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/sainath-bottupally', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: <Mail size={20} />, url: 'mailto:sainath.bottupally@gmail.com', label: 'Email', color: 'hover:text-red-500' },
  ];
  
  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer", 
    "Cloud Architect",
    "Tech Innovator"
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
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(socialRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(".floating-icon", {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.8");
      
      // Continuous animations
      gsap.to(".pulse-ring", {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power2.out"
      });
      
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // Floating icons data
  const floatingIcons = [
    { icon: <Code size={24} />, delay: 0, className: 'top-[10%] left-[10%]' },
    { icon: <Server size={24} />, delay: 0.5, className: 'top-[20%] right-[15%]' },
    { icon: <Database size={24} />, delay: 1, className: 'bottom-[25%] left-[20%]' },
    { icon: <Cpu size={24} />, delay: 1.5, className: 'bottom-[15%] right-[25%]' },
  ];

  const handleContactClick = () => {
    scrollToSection(5); // Assuming contact section is at index 5
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="section relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {floatingIcons.map((item, index) => (
          <FloatingIcon 
            key={index} 
            icon={item.icon} 
            delay={item.delay}
            className={`floating-icon ${item.className}`}
          />
        ))}
        
        {/* Animated background shapes */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="hero-content w-full px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="w-full text-center">
          {/* Greeting Badge */}
          <div className="mb-8">
            <motion.span 
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-sm border border-white/20 text-emerald-700 dark:text-emerald-300 hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex h-3 w-3 mr-3">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Available for exciting opportunities
            </motion.span>
          </div>

          {/* Main Heading */}
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white leading-tight opacity-0"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 animate-gradient-x">
                Sainath
              </span>
              <motion.span 
                className="inline-block ml-4"
                animate={{ 
                  rotate: [0, 14, -8, 14, -4, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2
                }}
              >
                👋
              </motion.span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-8">
            <h2 
              ref={subtitleRef}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 font-light opacity-0"
            >
              Senior{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                Full Stack Developer
              </span>
              {" "}&{" "}
              <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 font-medium">
                AI/ML Engineer
              </span>
            </h2>
          </div>

          {/* Tech Stack */}
          <RevealAnimation 
            delay={500}
            direction="up"
            appearOnMount={true}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -3, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                >
                  <span className="mr-2 text-indigo-500">{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </RevealAnimation>

          {/* Description */}
          <div className="mb-12">
            <p 
              ref={descriptionRef}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed opacity-0"
            >
              Crafting exceptional digital experiences through the intersection of
              <span className="text-blue-600 dark:text-blue-400 font-medium"> cutting-edge technology</span> and
              <span className="text-purple-600 dark:text-purple-400 font-medium"> innovative design</span>.
              Specializing in scalable web applications, AI/ML integration, and cloud architecture.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-6 mb-16 opacity-0">
            <motion.button 
              onClick={() => scrollToSection(1)}
              className="group relative px-10 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white transition-all duration-500 transform hover:shadow-2xl hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                Explore My Journey
                <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
            
            <motion.button 
              onClick={handleContactClick}
              className="group px-10 py-4 text-lg font-semibold rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-gray-800 dark:text-gray-200 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                Download Resume
              </span>
            </motion.button>
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
            {/* Location */}
            <RevealAnimation 
              delay={800}
              direction="up"
              appearOnMount={true}
              className="flex items-center justify-center md:justify-start"
            >
              <motion.div 
                className="flex items-center p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all w-full max-w-xs"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-3">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Hyderabad, India</p>
                </div>
              </motion.div>
            </RevealAnimation>

            {/* Availability */}
            <RevealAnimation 
              delay={850}
              direction="up"
              appearOnMount={true}
              className="flex items-center justify-center md:justify-end"
            >
              <motion.div 
                className="flex items-center p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all w-full max-w-xs"
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 mr-3">
                  <div className="relative">
                    <span className="absolute top-0 right-0 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <Globe size={20} />
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Available for work</p>
                </div>
              </motion.div>
            </RevealAnimation>
          </div>

          {/* Social Links */}
          <div ref={socialRef} className="mt-12 opacity-0">
            <div className="flex justify-center space-x-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-gray-700 dark:text-gray-300 hover:bg-white/20 transition-all duration-300 ${link.color}`}
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📍 Hyderabad, India | 🌍 Open to Remote Opportunities
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16">
            <motion.button 
              onClick={() => scrollToSection(1)}
              className="group flex flex-col items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
              aria-label="Discover my story"
              whileHover={{ y: 5 }}
            >
              <motion.span 
                className="text-sm font-medium mb-3 opacity-70"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Discover My Story
              </motion.span>
              <motion.div 
                className="w-8 h-12 border-2 border-current rounded-full p-1 relative overflow-hidden"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div 
                  className="w-1 h-3 bg-current rounded-full mx-auto"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
