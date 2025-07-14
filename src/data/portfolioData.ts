import type { Skill, Project, Experience } from '../types/common';

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 90, category: 'frontend', icon: 'react' },
  { name: 'TypeScript', level: 85, category: 'frontend', icon: 'typescript' },
  { name: 'JavaScript', level: 90, category: 'frontend', icon: 'javascript' },
  { name: 'HTML5', level: 90, category: 'frontend', icon: 'html5' },
  { name: 'CSS3', level: 85, category: 'frontend', icon: 'css3' },
  { name: 'Tailwind CSS', level: 85, category: 'frontend', icon: 'tailwind' },
  { name: 'SASS/SCSS', level: 80, category: 'frontend', icon: 'sass' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'backend', icon: 'nodejs' },
  { name: 'Express', level: 80, category: 'backend', icon: 'express' },
  { name: 'Python', level: 80, category: 'backend', icon: 'python' },
  { name: 'Django', level: 75, category: 'backend', icon: 'django' },
  
  // Tools (moved DevOps to tools)
  { name: 'Docker', level: 80, category: 'tools', icon: 'docker' },
  { name: 'Git', level: 85, category: 'tools', icon: 'git' },
  { name: 'GitHub Actions', level: 75, category: 'tools', icon: 'github' },
  
  // More tools
  { name: 'VS Code', level: 90, category: 'tools', icon: 'vscode' },
  { name: 'Figma', level: 80, category: 'tools', icon: 'figma' },
  { name: 'Postman', level: 80, category: 'tools', icon: 'postman' },
  
  // Design skills moved to other
  { name: 'UI/UX Design', level: 80, category: 'other', icon: 'uiux' },
  { name: 'Responsive Design', level: 85, category: 'other', icon: 'responsive' }
];

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A modern and responsive portfolio website built with React and TypeScript.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: 'project1',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication and payment processing.',
    tech: ['Node.js', 'Express', 'MongoDB', 'React', 'Redux'],
    icon: 'project2',
    gradient: 'from-green-500 to-blue-600'
  }
];

export const experiences: Experience[] = [
  {
    title: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    period: '2020 - Present',
    description: 'Leading frontend development efforts',
    achievements: [
      'Implemented new features using React and TypeScript',
      'Improved application performance by 40%',
      'Mentored junior developers'
    ],
    icon: 'tech-innovations',
    color: 'text-blue-600'
  },
  {
    title: 'Full Stack Developer',
    company: 'Web Solutions LLC',
    location: 'New York, NY',
    period: '2018 - 2020',
    description: 'Developed and maintained web applications',
    achievements: [
      'Built RESTful APIs with Node.js and Express',
      'Designed and implemented database schemas',
      'Improved application security'
    ],
    icon: 'web-solutions',
    color: 'text-green-600'
  }
];

export const aboutMe = {
  name: 'Your Name',
  title: 'Senior Frontend Developer',
  bio: 'Passionate frontend developer with 5+ years of experience in building modern web applications. I specialize in React, TypeScript, and modern JavaScript frameworks. I love creating beautiful, performant, and accessible user interfaces that provide great user experiences.',
  location: 'San Francisco, CA',
  email: 'your.email@example.com',
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    // Add more social links as needed
  },
  skills: {
    programming: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3'],
    frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Django'],
    tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman'],
  },
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      year: '2018',
      description: 'Specialized in Web Development and Human-Computer Interaction'
    }
  ]
};
