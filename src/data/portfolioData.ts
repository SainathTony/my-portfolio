import type { Experience, Project, Skill } from "portfolio-data";


export const skills: Skill[] = [
  { name: "Java", level: 90, category: "backend" },
  { name: "Spring Boot", level: 90, category: "backend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "Tailwind CSS", level: 85, category: "design" },
  { name: "AWS", level: 80, category: "devops" },
  { name: "Docker", level: 75, category: "devops" },
  { name: "GitHub Actions", level: 70, category: "devops" },
  { name: "MongoDB", level: 80, category: "tools" },
  { name: "MySQL", level: 75, category: "tools" },
  { name: "Redis", level: 70, category: "tools" },
  { name: "Jenkins", level: 70, category: "devops" },
  { name: "Postman", level: 80, category: "tools" },
];

export const projects: Project[] = [
  {
    id: "amazon-nova-canva",
    title: "Amazon Nova Canva App",
    description:
      "A Canva extension for image generation, object replacement, and background removal with AI/ML support. Delivered with 90% object manipulation accuracy in 2.5 weeks.",
    technologies: ["React", "AI/ML", "Canva SDK"],
    imageUrl: "/images/projects/amazon-nova-canva.jpg",
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    tags: ["AI", "Design Tool", "Canva"],
    gradient: "from-blue-500 to-cyan-500",
    icon: "",
  },
  {
    id: "mindvalley-nextgen",
    title: "Mindvalley States & NextGen",
    description:
      "Built a native Android app for immersive mental enhancement programs with advanced animation and transitions. Revamped the UI to align with brand guidelines.",
    technologies: ["Android", "Java", "UI Animation"],
    imageUrl: "/images/projects/mindvalley-nextgen.jpg",
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    tags: ["Android", "UI", "Wellness"],
    gradient: "from-pink-500 to-indigo-500",
    icon: "",
  },
  {
    id: "fastgig",
    title: "Fast GiG – Web & Mobile Platform",
    description:
      "A React Native platform for part-time job seekers in Singapore. Included backend optimization and weekly payout automation.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    imageUrl: "/images/projects/fastgig.jpg",
    githubUrl: undefined,
    liveUrl: undefined,
    featured: true,
    tags: ["Jobs", "Mobile", "Singapore"],
    gradient: "from-green-500 to-emerald-500",
    icon: "",
  },
  {
    id: "gap-ecommerce",
    title: "GAP E-Commerce Platform",
    description:
      "Maintained user profile module, secured financial data, and facilitated legacy-to-modern migration using feature flags and CI/CD.",
    technologies: ["Java", "Spring Boot", "Jenkins"],
    imageUrl: "/images/projects/gap-ecommerce.jpg",
    githubUrl: undefined,
    liveUrl: undefined,
    featured: false,
    tags: ["E-Commerce", "Spring Boot", "CI/CD"],
    gradient: "from-yellow-500 to-orange-500",
    icon: "",
  },
];

export const experiences: Experience[] = [
  {
    id: "everest",
    role: "Senior Software Engineer",
    company: "Everest Engineering",
    location: "Hyderabad, India",
    startDate: "Aug 2022",
    endDate: "Present",
    description: [
      "Developed scalable web applications using React, Node.js, and Spring Boot.",
      "Led performance optimization, modern UI/UX implementation, and AI/ML integration.",
      "Mentored junior developers and performed code reviews.",
      "Enhanced system reliability and observability.",
    ],
    technologies: ["React", "Node.js", "Spring Boot", "AI/ML"],
    logo: "/images/companies/everest.png",
    achievements: [],
    period: "Aug 2022 - Present",
    color: "from-blue-500 to-cyan-500",
    icon: "",
  },
  {
    id: "thoughtworks",
    role: "Application Developer",
    company: "ThoughtWorks",
    location: "Hyderabad, India",
    startDate: "Dec 2020",
    endDate: "Aug 2022",
    description: [
      "Built microservice-based backend systems with Spring Boot using TDD.",
      "Worked on enterprise-grade apps with CI pipelines and fault-tolerant architecture.",
      "Used Splunk, Grafana, and New Relic for monitoring.",
      "Participated in on-call rotations, reducing incident response time by 35%.",
    ],
    technologies: ["Java", "Spring Boot", "Splunk", "Grafana", "CI/CD"],
    logo: "/images/companies/thoughtworks.png",
    achievements: [],
    period: "Dec 2020 - Aug 2022",
    color: "from-green-500 to-emerald-500",
    icon: "",
  },
  {
    id: "dtailabs",
    role: "Full Stack Developer Intern",
    company: "DTaiLabs",
    location: "Hyderabad, India",
    startDate: "Dec 2019",
    endDate: "Dec 2020",
    description: [
      "Built a full-stack hiring platform with Angular, Node.js, and MongoDB.",
      "Designed UI using PrimeNG and responsive design principles.",
      "Deployed on Vercel using CI/CD pipelines.",
    ],
    technologies: ["Angular", "Node.js", "MongoDB", "PrimeNG"],
    logo: "/images/companies/dtailabs.png",
    achievements: [],
    period: "Dec 2019 - Dec 2020",
    color: "from-blue-500 to-cyan-500",
    icon: "",
  },
  {
    id: "qualzz",
    role: "Remote Full Stack Developer Intern",
    company: "Qualzz",
    location: "Canada (Remote)",
    startDate: "Oct 2018",
    endDate: "Jun 2019",
    description: [
      "Designed a feedback analytics platform with real-time data visualization.",
      "Used Angular for frontend and Spring Boot + MongoDB for backend.",
      "Deployed with auto-scaling on AWS and setup monitoring.",
    ],
    technologies: ["Angular", "Spring Boot", "MongoDB", "AWS"],
    logo: "/images/companies/qualzz.png",
    achievements: [],
    period: "Oct 2018 - Jun 2019",
    color: "from-blue-500 to-cyan-500",
    icon: "",
  },
];


export const aboutMe = {
  name: "Your Name",
  title: "Senior Frontend Developer",
  bio: "Passionate frontend developer with 5+ years of experience in building modern web applications. I specialize in React, TypeScript, and modern JavaScript frameworks. I love creating beautiful, performant, and accessible user interfaces that provide great user experiences.",
  location: "San Francisco, CA",
  email: "your.email@example.com",
  social: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    // Add more social links as needed
  },
  skills: {
    programming: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "Django"],
    tools: ["Git", "Docker", "VS Code", "Figma", "Postman"],
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      year: "2018",
      description:
        "Specialized in Web Development and Human-Computer Interaction",
    },
  ],
};
