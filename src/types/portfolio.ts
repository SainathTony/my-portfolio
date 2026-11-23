export interface Link {
  label: string;
  href: string;
}

export interface ProofPoint {
  /** The number, highlighted */
  value: string;
  /** What it means, in plain words */
  label: string;
}

export interface Principle {
  title: string;
  body: string;
}

export interface AINote {
  id: "mcp" | "agents" | "product";
  title: string;
  body: string;
  metrics: string[];
  /** Which diagram nodes light up when this note is hovered */
  nodes: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  problem: string;
  built: string;
  outcome: string;
  stack: string[];
  stamp: "IN PRODUCTION" | "SHIPPED" | "DELIVERED";
  ai: boolean;
  link?: Link;
}

export interface Role {
  id: string;
  company: string;
  title: string;
  location: string;
  /** Short handwritten date for the margin, e.g. "Aug '22 → now" */
  when: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface ToolGroup {
  name: string;
  items: string[];
}
