import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Code, 
  Star, 
  Eye, 
  Calendar,
  Users,
  Zap,
  Award,
  ArrowRight,
  Monitor,
  Smartphone,
  Globe
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import type { VisibleElements } from '../types/common';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  gradient: string;
}

interface ProjectsSectionProps {
  darkMode: boolean;
  projects: Project[];
  visibleElements: VisibleElements;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode, projects, visibleElements }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const enhancedProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'A comprehensive full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics. Built for scalability and performance.',
      detailedDescription: 'Advanced e-commerce platform featuring microservices architecture, real-time notifications, AI-powered recommendations, and comprehensive admin dashboard.',
      tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      category: 'full-stack',
      duration: '6 months',
      teamSize: '4 developers',
      role: 'Lead Developer',
      features: [
        'Real-time inventory tracking',
        'Secure payment gateway integration',
        'AI-powered product recommendations',
        'Advanced analytics dashboard',
        'Multi-vendor support',
        'Mobile-responsive design'
      ],
      metrics: {
        users: '10K+',
        performance: '98%',
        uptime: '99.9%'
      },
      icon: '🛒',
      gradient: 'from-blue-500 to-cyan-500',
      images: ['project1-1.jpg', 'project1-2.jpg'],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/sainath/ecommerce',
      status: 'live',
      awards: ['Best E-commerce Solution 2023']
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Interactive dashboard leveraging machine learning for predictive analytics and business intelligence. Features real-time data visualization and automated reporting.',
      detailedDescription: 'Comprehensive analytics platform with ML-driven insights, automated reporting, and interactive data visualization for enterprise decision-making.',
      tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI', 'Redis'],
      category: 'ai-ml',
      duration: '4 months',
      teamSize: '3 developers',
      role: 'Full Stack Developer',
      features: [
        'Predictive analytics with ML models',
        'Real-time data processing',
        'Interactive chart library',
        'Automated report generation',
        'Custom alert system',
        'Multi-tenant architecture'
      ],
      metrics: {
        dataPoints: '1M+',
        accuracy: '94%',
        responseTime: '<100ms'
      },
      icon: '📊',
      gradient: 'from-purple-500 to-pink-500',
      images: ['project2-1.jpg', 'project2-2.jpg'],
      liveUrl: 'https://analytics-demo.com',
      githubUrl: 'https://github.com/sainath/analytics',
      status: 'live',
      awards: ['Innovation Award 2023']
    },
    {
      title: 'Social Media Management Tool',
      description: 'Comprehensive social media management platform for scheduling posts, analyzing engagement, and managing multiple accounts from a unified dashboard.',
      detailedDescription: 'All-in-one social media management solution with advanced scheduling, analytics, team collaboration, and automated content optimization.',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'AWS S3', 'GraphQL'],
      category: 'web-app',
      duration: '5 months',
      teamSize: '5 developers',
      role: 'Frontend Lead',
      features: [
        'Multi-platform post scheduling',
        'Advanced analytics and insights',
        'Team collaboration tools',
        'Content calendar management',
        'Automated hashtag suggestions',
        'Performance tracking'
      ],
      metrics: {
        accounts: '50K+',
        postsScheduled: '500K+',
        engagement: '+150%'
      },
      icon: '📱',
      gradient: 'from-green-500 to-emerald-500',
      images: ['project3-1.jpg', 'project3-2.jpg'],
      liveUrl: 'https://socialmedia-demo.com',
      githubUrl: 'https://github.com/sainath/social-media',
      status: 'live',
      awards: ['Best SaaS Product 2023']
    },
    {
      title: 'Smart Home IoT Dashboard',
      description: 'Real-time IoT device management system with automated controls, energy monitoring, and intelligent scheduling for smart home ecosystems.',
      detailedDescription: 'Comprehensive IoT platform for smart home automation with real-time monitoring, intelligent controls, and energy optimization algorithms.',
      tech: ['Vue.js', 'Express', 'MQTT', 'InfluxDB', 'Docker', 'Raspberry Pi'],
      category: 'iot',
      duration: '3 months',
      teamSize: '2 developers',
      role: 'Solo Developer',
      features: [
        'Real-time device monitoring',
        'Automated scheduling system',
        'Energy consumption tracking',
        'Mobile app integration',
        'Voice control support',
        'Security system integration'
      ],
      metrics: {
        devices: '100+',
        energySaved: '30%',
        responseTime: '<50ms'
      },
      icon: '🏠',
      gradient: 'from-orange-500 to-red-500',
      images: ['project4-1.jpg', 'project4-2.jpg'],
      liveUrl: 'https://smarthome-demo.com',
      githubUrl: 'https://github.com/sainath/smart-home',
      status: 'development',
      awards: []
    },
    {
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting platform built on blockchain technology with cryptographic verification and real-time result tracking.',
      detailedDescription: 'Decentralized voting system ensuring transparency, security, and immutability through blockchain technology and smart contracts.',
      tech: ['React', 'Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'MetaMask'],
      category: 'blockchain',
      duration: '4 months',
      teamSize: '3 developers',
      role: 'Blockchain Developer',
      features: [
        'Cryptographic vote verification',
        'Smart contract integration',
        'Real-time result tracking',
        'Voter anonymity protection',
        'Transparent audit trail',
        'Mobile wallet support'
      ],
      metrics: {
        votes: '25K+',
        security: '100%',
        transparency: 'Full'
      },
      icon: '🗳️',
      gradient: 'from-indigo-500 to-purple-500',
      images: ['project5-1.jpg', 'project5-2.jpg'],
      liveUrl: 'https://blockchain-voting-demo.com',
      githubUrl: 'https://github.com/sainath/blockchain-voting',
      status: 'live',
      awards: ['Blockchain Innovation Award 2023']
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, interactive portfolio showcasing professional work with advanced animations, 3D elements, and responsive design.',
      detailedDescription: 'Professional portfolio website featuring advanced animations, 3D graphics, and storytelling design to showcase development skills.',
      tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
      category: 'portfolio',
      duration: '2 months',
      teamSize: '1 developer',
      role: 'Designer & Developer',
      features: [
        'Interactive 3D backgrounds',
        'Smooth scroll animations',
        'Responsive design',
        'Dark/light mode toggle',
        'Performance optimized',
        'SEO friendly'
      ],
      metrics: {
        pageSpeed: '98/100',
        accessibility: '100/100',
        performance: 'A+'
      },
      icon: '💼',
      gradient: 'from-teal-500 to-blue-500',
      images: ['portfolio-1.jpg', 'portfolio-2.jpg'],
      liveUrl: 'https://sainath-portfolio.com',
      githubUrl: 'https://github.com/sainath/portfolio',
      status: 'live',
      awards: []
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Globe className="w-4 h-4" /> },
    { id: 'full-stack', name: 'Full Stack', icon: <Code className="w-4 h-4" /> },
    { id: 'ai-ml', name: 'AI/ML', icon: <Zap className="w-4 h-4" /> },
    { id: 'web-app', name: 'Web Apps', icon: <Monitor className="w-4 h-4" /> },
    { id: 'iot', name: 'IoT', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'blockchain', name: 'Blockchain', icon: <Award className="w-4 h-4" /> }
  ];

  const displayProjects = projects.length > 0 ? projects : enhancedProjects;
  const filteredProjects = selectedCategory === 'all' 
    ? displayProjects 
    : displayProjects.filter(project => (project as any).category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Project cards animation
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotationY: 45
        }, {
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
          }
        });
      });

      // Project card hover effects
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        const element = card as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -20,
            rotationY: 5,
            rotationX: 5,
            duration: 0.4,
            ease: "power2.out"
          });
        });
        
        element.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'from-green-500 to-emerald-500';
      case 'development': return 'from-yellow-500 to-orange-500';
      case 'planning': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'live': return 'Live';
      case 'development': return 'In Development';
      case 'planning': return 'Planning';
      default: return 'Completed';
    }
  };

  return (
    <Section 
      ref={sectionRef}
      id="projects" 
      className="section section-4 py-20 bg-gradient-to-br from-indigo-50/30 via-white to-pink-50/20 dark:from-indigo-900/10 dark:via-gray-900 dark:to-pink-900/10"
    >
      <div className="w-full px-4">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500/10 to-indigo-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20 mb-4">
                Creative Solutions
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Projects</span>
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
              <span className="text-pink-600 dark:text-pink-400 font-medium"> impactful digital solutions</span> that
              <span className="text-indigo-600 dark:text-indigo-400 font-medium"> drive innovation</span>.
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
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
              className="grid lg:grid-cols-2 gap-8"
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
                    stiffness: 100 
                  }}
                  className="project-card group relative"
                  style={{ perspective: '1000px' }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative p-8 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor((project as any).status || 'completed')} text-white shadow-lg`}>
                        {getStatusText((project as any).status || 'completed')}
                      </div>
                    </div>

                    {/* Project Icon & Title */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${project.gradient} p-4 text-white text-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {project.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-indigo-600 transition-all duration-300">
                          {project.title}
                        </h3>
                        {(project as any).role && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {(project as any).role}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    {(project as any).duration && (
                      <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{(project as any).duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{(project as any).teamSize}</span>
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    {(project as any).features && (
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-500" />
                          Key Features
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(project as any).features.slice(0, 4).map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    {(project as any).metrics && (
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        {Object.entries((project as any).metrics).map(([key, value], idx) => (
                          <div key={idx} className="text-center p-3 rounded-xl bg-gray-100/50 dark:bg-gray-700/50">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">{value as string}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        {(project as any).liveUrl && (
                          <motion.button
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-medium hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-4 h-4" />
                            <span>Live Demo</span>
                          </motion.button>
                        )}
                        
                        {(project as any).githubUrl && (
                          <motion.button
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm border border-white/30 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 font-medium hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </motion.button>
                        )}
                      </div>

                      <motion.button
                        onClick={() => setActiveProject(activeProject === index ? null : index)}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Awards */}
                    {(project as any).awards && (project as any).awards.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
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
                              {(project as any).detailedDescription || project.description}
                            </p>
                            
                            {(project as any).features && (
                              <div>
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
                                <div className="grid md:grid-cols-2 gap-3">
                                  {(project as any).features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-center space-x-3">
                                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    </div>
                                  ))}
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
            className="mt-20 text-center"
          >
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                  {filteredProjects.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Projects Completed
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20">
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  15+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Technologies Used
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  100K+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Users Impacted
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  5
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">
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