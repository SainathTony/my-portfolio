declare module "portfolio-data" {
  export interface Skill {
    name: string;
    category: "frontend" | "backend" | "devops" | "tools" | "database";
    icon?: string;
  }

  export interface Project {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    tags: string[];
    gradient: string;
    icon: ?string;
  }

  export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | "Present";
    description: string[];
    technologies: string[];
    achievements: string[];
    logo?: string;
    period: string;
    color: string;
    icon?: string;
    highlights: string[];
  }

  export const skills: Skill[];
  export const projects: Project[];
  export const experiences: Experience[];
}
