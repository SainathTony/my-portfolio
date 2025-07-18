import type { Experience, Project, Skill } from "portfolio-data";
import ReactPng from "../assets/icons/React.png";
import AngularPng from "../assets/icons/Angular.png";
import BootstrapPng from "../assets/icons/Bootstrap.png";
import TailwindCssPng from "../assets/icons/Tailwind CSS.png";
import MaterialUiPng from "../assets/icons/Material UI.png";
import Html5Png from "../assets/icons/HTML5.png";
import Css3Png from "../assets/icons/CSS3.png";
import JavaScriptPng from "../assets/icons/JavaScript.png";
import TypeScriptPng from "../assets/icons/TypeScript.png";
import JavaPng from "../assets/icons/Java.png";
import PythonPng from "../assets/icons/Python.png";
import SpringPng from "../assets/icons/Spring.png";
import DjangoPng from "../assets/icons/Django.png";
import FastApiPng from "../assets/icons/FastAPI.png";
import ExpressPng from "../assets/icons/Express.png";
import NestPng from "../assets/icons/Nest.png";
import GraphQlPng from "../assets/icons/GraphQL.png";
import AwsPng from "../assets/icons/AWS.png";
import JenkinsPng from "../assets/icons/Jenkins.png";
import DockerPng from "../assets/icons/Docker.png";
import GradlePng from "../assets/icons/Gradle.png";
import HashiCorpVaultPng from "../assets/icons/HashiCorp Vault.png";
import GitPng from "../assets/icons/Git.png";
import GitHubPng from "../assets/icons/GitHub.png";
import PostmanPng from "../assets/icons/Postman.png";
import JestPng from "../assets/icons/Jest.png";
import JUnitPng from "../assets/icons/JUnit.png";
import NpmPng from "../assets/icons/NPM.png";
import YarnPng from "../assets/icons/Yarn.png";
import AndroidStudioPng from "../assets/icons/Android Studio.png";
import FigmaPng from "../assets/icons/Figma.png";
import MongoDbPng from "../assets/icons/MongoDB.png";
import MySqlPng from "../assets/icons/MySQL.png";
import PostgresSqlPng from "../assets/icons/PostgresSQL.png";
import GrafanaPng from "../assets/icons/Grafana.png";
import SplunkPng from "../assets/icons/Splunk.png";
import EverestLogo from "../assets/images/everest.png";
import ThoughtWorksLogo from "../assets/images/thoughtworks.jpg";
import DtailabsLogo from "../assets/images/DTaiLabs.jpg";
import QualzzLogo from "../assets/images/Qualzz.png";

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "backend", icon: JavaPng },
  { name: "Python", category: "backend", icon: PythonPng },
  { name: "JavaScript", category: "frontend", icon: JavaScriptPng },
  { name: "TypeScript", category: "frontend", icon: TypeScriptPng },
  { name: "HTML5", category: "frontend", icon: Html5Png },
  { name: "CSS3", category: "frontend", icon: Css3Png },

  { name: "Bootstrap", category: "frontend", icon: BootstrapPng },
  { name: "Tailwind CSS", category: "frontend", icon: TailwindCssPng },
  { name: "Material UI", category: "frontend", icon: MaterialUiPng },

  // Frameworks

  { name: "Spring", category: "backend", icon: SpringPng },
  { name: "React", category: "frontend", icon: ReactPng },
  { name: "Angular", category: "frontend", icon: AngularPng },
  { name: "Django", category: "backend", icon: DjangoPng },
  { name: "FastAPI", category: "backend", icon: FastApiPng },
  { name: "Express", category: "backend", icon: ExpressPng },
  { name: "Nest", category: "backend", icon: NestPng },

  // DevOps
  { name: "AWS", category: "devops", icon: AwsPng },
  { name: "Jenkins", category: "devops", icon: JenkinsPng },
  { name: "Docker", category: "devops", icon: DockerPng },
  { name: "Gradle", category: "devops", icon: GradlePng },
  { name: "HashiCorp Vault", category: "devops", icon: HashiCorpVaultPng },

  // Tools
  { name: "Git", category: "tools", icon: GitPng },
  { name: "GitHub", category: "tools", icon: GitHubPng },
  { name: "Postman", category: "tools", icon: PostmanPng },
  { name: "Jest", category: "tools", icon: JestPng },
  { name: "JUnit", category: "tools", icon: JUnitPng },
  { name: "NPM", category: "tools", icon: NpmPng },
  { name: "Yarn", category: "tools", icon: YarnPng },
  { name: "GraphQL", category: "backend", icon: GraphQlPng },
  { name: "Android Studio", category: "tools", icon: AndroidStudioPng },
  { name: "Figma", category: "tools", icon: FigmaPng },

  // Database
  { name: "MongoDB", category: "database", icon: MongoDbPng },
  { name: "MySQL", category: "database", icon: MySqlPng },
  { name: "PostgresSQL", category: "database", icon: PostgresSqlPng },
  { name: "Grafana", category: "database", icon: GrafanaPng },
  { name: "Splunk", category: "database", icon: SplunkPng },
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
    icon: "assets/icons/",
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
    icon: "assets/icons/",
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
    icon: "assets/icons/",
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
    icon: "assets/icons/",
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
    icon: EverestLogo,
    highlights: [],
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
    icon: ThoughtWorksLogo,
    highlights: [],
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
    icon: DtailabsLogo,
    highlights: [],
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
    icon: QualzzLogo,
    highlights: [],
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
