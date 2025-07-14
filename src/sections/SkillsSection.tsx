import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  Smartphone, 
  Palette, 
  Settings,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Section from '../components/Section';
import type { VisibleElements } from '../types/common';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string;
}

interface SkillsSectionProps {
  darkMode: boolean;
  skills: Skill[];
  visibleElements: VisibleElements;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode, skills, visibleElements }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    { 
      id: 'frontend', 
      name: 'Frontend', 
      icon: <Code className="w-6 h-6" />, 
      color: 'from-blue-500 to-cyan-500',
      description: 'User Interface & Experience'
    },
    { 
      id: 'backend', 
      name: 'Backend', 
      icon: <Server className="w-6 h-6" />, 
      color: 'from-green-500 to-emerald-500',
      description: 'Server & Database Logic'
    },
    { 
      id: 'tools', 
      name: 'Tools & DevOps', 
      icon: <Settings className="w-6 h-6" />, 
      color: 'from-purple-500 to-pink-500',
      description: 'Development Tools & Cloud'
    },
    { 
      id: 'other', 
      name: 'Specialized', 
      icon: <Cpu className="w-6 h-6" />, 
      color: 'from-orange-500 to-red-500',
      description: 'AI/ML & Design'
    }
  ];

  const enhancedSkills = [
    // Frontend
    { name: 'React', level: 95, category: 'frontend' as const, specialty: 'Advanced Hooks & Context' },
    { name: 'TypeScript', level: 90, category: 'frontend' as const, specialty: 'Type Safety Expert' },
    { name: 'Next.js', level: 88, category: 'frontend' as const, specialty: 'SSR & Static Generation' },
    { name: 'Tailwind CSS', level: 92, category: 'frontend' as const, specialty: 'Utility-First Design' },
    { name: 'JavaScript ES6+', level: 95, category: 'frontend' as const, specialty: 'Modern JS Features' },
    { name: 'HTML5 & CSS3', level: 98, category: 'frontend' as const, specialty: 'Semantic & Responsive' },
    
    // Backend
    { name: 'Node.js', level: 88, category: 'backend' as const, specialty: 'Express & Fastify' },
    { name: 'Python', level: 85, category: 'backend' as const, specialty: 'Django & FastAPI' },
    { name: 'PostgreSQL', level: 82, category: 'backend' as const, specialty: 'Complex Queries' },
    { name: 'MongoDB', level: 80, category: 'backend' as const, specialty: 'NoSQL Design' },
    { name: 'GraphQL', level: 75, category: 'backend' as const, specialty: 'API Optimization' },
    { name: 'REST APIs', level: 92, category: 'backend' as const, specialty: 'RESTful Design' },
    
    // Tools & DevOps
    { name: 'AWS', level: 85, category: 'tools' as const, specialty: 'Cloud Architecture' },
    { name: 'Docker', level: 88, category: 'tools' as const, specialty: 'Containerization' },
    { name: 'Git & GitHub', level: 95, category: 'tools' as const, specialty: 'Version Control' },
    { name: 'CI/CD', level: 80, category: 'tools' as const, specialty: 'Automated Deployment' },
    { name: 'Kubernetes', level: 70, category: 'tools' as const, specialty: 'Orchestration' },
    { name: 'Terraform', level: 75, category: 'tools' as const, specialty: 'Infrastructure as Code' },
    
    // Specialized
    { name: 'Machine Learning', level: 78, category: 'other' as const, specialty: 'TensorFlow & PyTorch' },
    { name: 'Data Analysis', level: 82, category: 'other' as const, specialty: 'Pandas & NumPy' },
    { name: 'UI/UX Design', level: 85, category: 'other' as const, specialty: 'Figma & Adobe XD' },
    { name: 'Testing', level: 88, category: 'other' as const, specialty: 'Jest & Cypress' }
  ];

  const displaySkills = skills.length > 0 ? skills : enhancedSkills;

  const filteredSkills = activeCategory === 'all' 
    ? displaySkills 
    : displaySkills.filter(skill => skill.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skill cards stagger animation
      gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.fromTo(card, {
          y: 50,
          opacity: 0,
          scale: 0.8,
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });

      // Progress bars animation
      gsap.utils.toArray('.skill-progress').forEach((progress) => {
        const level = (progress as HTMLElement).getAttribute('data-level');
        
        gsap.fromTo(progress, {
          width: "0%",
        }, {
          width: `${level}%`,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progress,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        });
      });

      // 3D hover effect for skill cards
      gsap.utils.toArray('.skill-card').forEach((card) => {
        const element = card as HTMLElement;
        
        element.addEventListener('mouseenter', () => {
          gsap.to(card, {
            rotationY: 10,
            rotationX: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        element.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-emerald-500 to-green-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getSkillLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    return 'Learning';
  };

  return (
    <Section 
      ref={sectionRef}
      id="skills" 
      className="section section-2 py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/10"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-4">
                Technical Expertise
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600">Technologies</span>
              </h2>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed"
            >
              A comprehensive toolkit built through years of hands-on experience,
              <span className="text-purple-600 dark:text-purple-400 font-medium"> continuous learning</span>, and
              <span className="text-blue-600 dark:text-blue-400 font-medium"> real-world application</span>.
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <motion.button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
              } backdrop-blur-sm border border-white/20 dark:border-gray-700/50`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Skills
            </motion.button>
            
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
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

          {/* Skills Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${activeCategory}`}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  className="skill-card group relative p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:shadow-xl"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{ perspective: '1000px' }}
                >
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${getSkillColor(skill.level)} text-white`}>
                        {skillCategories.find(cat => cat.id === skill.category)?.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {getSkillLabel(skill.level)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(skill.level / 20)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`skill-progress h-full rounded-full bg-gradient-to-r ${getSkillColor(skill.level)} transition-all duration-300 relative overflow-hidden`}
                        data-level={skill.level}
                        style={{ width: '0%' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  {/* Specialty */}
                  {(skill as any).specialty && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <TrendingUp className="w-4 h-4" />
                      <span>{(skill as any).specialty}</span>
                    </div>
                  )}

                  {/* Hover Effect */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>

                  {/* 3D Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Skills Summary */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredSkills.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Technologies Mastered
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Math.round(filteredSkills.reduce((acc, skill) => acc + skill.level, 0) / filteredSkills.length)}%
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Average Proficiency
                </div>
              </div>
              
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  5+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;