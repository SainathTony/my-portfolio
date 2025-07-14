export interface MouseState {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  speed: number;
  isIdle: boolean;
}

export interface CursorPoint {
  x: number;
  y: number;
  id: number;
}

export interface AIAssistantPosition {
  x: number;
  y: number;
}

export interface VisibleElements extends Set<string> {}

export type AnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "fade";

// types/data.ts
export interface Skill {
  name: string;
  level: number; // 1-100
  category: "frontend" | "backend" | "tools" | "other";
  icon?: string; // Making icon optional since SkillsSection doesn't require it
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  gradient: string;
}
