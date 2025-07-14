declare module "portfolio-data" {
  export interface Skill {
    name: string;
    level: number;
    category: "frontend" | "backend" | "devops" | "tools" | "design";
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
    icon:? string;
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
    logo?: string;
  }

  export const skills: Skill[];
  export const projects: Project[];
  export const experiences: Experience[];
}
