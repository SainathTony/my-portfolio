export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  tags: string[];
  gradient: string;
  icon: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  logo?: string;
  achievements: string[];
  period: string;
  color: string;
  icon: string;
  highlights: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  resume?: string;
}

// Re-export types for easier imports
export type { Skill as SkillType };
export type { Project as ProjectType };
export type { Experience as ExperienceType };
export type { ContactInfo as ContactInfoType };
export type { PersonalInfo as PersonalInfoType };

export interface Navigation {
  activeSection: number;
  isScrolling: boolean;
}

export interface Theme {
  isDark: boolean;
}
