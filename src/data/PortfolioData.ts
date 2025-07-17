// types/portfolio.ts
export interface PersonalInfo {
    name: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  }
  
  export interface Education {
    institute: string;
    degree: string;
    duration: string;
    gpa: string;
  }
  
  export interface TechnicalSkills {
    languages: string[];
    backend: string[];
    frontend: string[];
    uiux: string[];
    devops_cloud: string[];
    databases: string[];
    testing_monitoring: string[];
    practices: string[];
  }
  
  export interface ExperienceItem {
    title: string;
    company: string;
    location: string;
    duration: string;
    summary: string;
  }
  
  export interface Project {
    name: string;
    description: string;
  }
  
  export interface WorkPreference {
    mode: string;
    locations: string[];
    availability: string;
    immediateStart: boolean;
  }

  export interface PortfolioData {
    personalInfo: PersonalInfo;
    bio: string;
    education: Education;
    technicalSkills: TechnicalSkills;
    experience: ExperienceItem[];
    projects: Project[];
    languagesSpoken: string[];
    workPreference: WorkPreference;
    careerFocus: string;
  }
  
  export const portfolioData: PortfolioData = {
    personalInfo: {
      name: "Sainath Bottupally",
      location: "Hyderabad, India",
      email: "bottupallysainath@gmail.com",
      phone: "+91 8096149910",
      linkedin: "https://www.linkedin.com/in/sainath-bottupally-754636156/",
      github: "https://github.com/SainathTony"
    },
    bio: "Senior Full Stack Developer with 5+ years of experience building scalable web and mobile applications. Expert in Java, Spring Boot, React, Node.js, and AWS with strong remote collaboration skills. Proven track record in TDD, CI/CD, microservices, and cloud deployments. Currently seeking immediate opportunities with focus on remote work.",
    education: {
      institute: "IIIT Basar",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      duration: "June 2016 – May 2020",
      gpa: "8.0/10"
    },
    technicalSkills: {
      languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS", "C"],
      backend: ["Spring Boot", "Node.js", "Express", "NestJS", "Django", "Flask"],
      frontend: ["React", "Angular", "React Native", "Android (Native)"],
      uiux: ["Tailwind CSS", "Material UI", "PrimeNG", "Bootstrap", "React Native Elements"],
      devops_cloud: ["AWS", "Docker", "Vercel", "Jenkins", "GitHub Actions", "CI/CD"],
      databases: ["MongoDB", "MySQL", "Redis", "GraphQL"],
      testing_monitoring: ["JUnit", "Jest", "Postman", "Splunk", "New Relic", "Grafana"],
      practices: ["Agile", "Scrum", "TDD", "DSA", "OOPS", "Generative AI"]
    },
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Everest Engineering",
        location: "Hyderabad",
        duration: "Aug 2022 – Present",
        summary: "Built scalable apps using React, Node.js, Spring Boot; integrated AI/ML models; mentored team; optimized system reliability."
      },
      {
        title: "Application Developer",
        company: "ThoughtWorks",
        location: "Hyderabad",
        duration: "Dec 2020 – Aug 2022",
        summary: "Developed microservices with Java and Spring Boot, implemented CI/CD, ensured performance during high traffic, reduced incident response time."
      },
      {
        title: "Full Stack Developer Intern",
        company: "DTaiLabs",
        location: "Hyderabad",
        duration: "Dec 2019 – Dec 2020",
        summary: "Built hiring platform using Angular and Node.js, deployed with Vercel and CI/CD pipelines."
      },
      {
        title: "Remote Full Stack Developer Intern",
        company: "Qualzz (Canada)",
        location: "Remote",
        duration: "Oct 2018 – Jun 2019",
        summary: "Developed real-time analytics platform using Angular, Spring Boot, and MongoDB, deployed on AWS."
      }
    ],
    projects: [
      {
        name: "Amazon Nova Canva App",
        description: "Canva extension for image generation and background editing with 90% object manipulation accuracy using AI/ML."
      },
      {
        name: "Mindvalley States & NextGen",
        description: "High-performance Android app with immersive animations and updated branding UI."
      },
      {
        name: "Fast GiG – Web & Mobile Platform",
        description: "React Native job-seeking platform with weekly payouts and optimized backend in Node.js."
      },
      {
        name: "GAP E-Commerce Platform",
        description: "Maintained secure user profile modules, transitioned tech stack, and integrated CI pipelines."
      }
    ],
    languagesSpoken: ["English (Fluent)", "Hindi (Fluent)", "Telugu (Native)", "Marathi (Proficient)"],
    workPreference: {
      mode: "Remote-First",
      locations: ["Remote", "Hyderabad", "Bangalore"],
      availability: "Immediate",
      immediateStart: true
    },
    careerFocus: "Seeking challenging opportunities in high-growth companies with modern tech stacks and collaborative remote culture."
  };
  