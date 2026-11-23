import type {
  AINote,
  CaseStudy,
  Link,
  Principle,
  ProofPoint,
  Role,
  ToolGroup,
} from "../types/portfolio";

/*
 * Every claim on the site comes from the résumé (Aug 2026).
 * If a number changes there, change it here — nothing else hard-codes facts.
 */

export const person = {
  name: "Sainath Bottupally",
  shortName: "Sainath B.",
  eyebrow: "Senior full-stack engineer · Applied AI · Hyderabad (IST)",
  email: "bottupallysainath@gmail.com",
  location: "Hyderabad, India · IST (UTC+5:30)",
};

export const links = {
  resume:
    "https://drive.google.com/file/d/16d3sVUelsEUdOzIqtfQZ8A9ukRbmh8rK/view?usp=sharing",
  linkedin: "https://www.linkedin.com/in/sainath-bottupally-754636156/",
  github: "https://github.com/SainathTony",
} satisfies Record<string, string>;

export const hero = {
  headlineStart: "I build AI agents into products that",
  headlineCircled: "already have users",
  marginNote: "not demos.",
  sub: "Six years of production engineering at ThoughtWorks and Everest Engineering. Lately: MCP servers and agentic workflows that connect LLMs to live business systems, end to end.",
};

export const proofPoints: ProofPoint[] = [
  { value: "10+ hrs", label: "saved per engineer, per week, by an MCP server I built" },
  { value: "40%", label: "operational efficiency gain on Fast GiG (AI automation + infra)" },
  { value: "2.5 wks", label: "to deliver the Canva × Amazon Nova app" },
  { value: "99.9%", label: "transaction success on high-volume systems at ThoughtWorks" },
];

/* -------------------------------- AI work -------------------------------- */

export const aiIntro = {
  title: "I start with the plumbing.",
  body: "Most AI features break in the wiring between the model and real systems. I come from backends and on-call rotations, so I give the model real systems to work with first, then make it hold up like any other production service.",
};

export const aiNotes: AINote[] = [
  {
    id: "mcp",
    title: "MCP servers",
    body: "A custom Model Context Protocol server that gives LLM agents direct access to internal data, so engineers stop copying context between apps.",
    metrics: ["10+ hrs / engineer / week saved", "25% less context-switching"],
    nodes: ["mcp", "data"],
  },
  {
    id: "agents",
    title: "Agentic workflows",
    body: "Fast GiG's agent layer runs administrative workflows on top of the same microservices the product uses, across Singapore and Malaysia.",
    metrics: ["40% ops efficiency (with infra work)"],
    nodes: ["agent", "workflows", "services"],
  },
  {
    id: "product",
    title: "AI inside the product",
    body: "A Canva app powered by Amazon Nova that does object replacement and image editing inside the design flow.",
    metrics: ["90% detection accuracy", "delivered in 2.5 weeks"],
    nodes: [],
  },
];

export const principles: Principle[] = [
  {
    title: "Let agents fetch their own context.",
    body: "Through tools like an MCP server, instead of people pasting it into a chat window.",
  },
  {
    title: "Hand the agent a real workflow.",
    body: "The agents I've built do admin work on the product's own services. A chat box is optional.",
  },
  {
    title: "Put a number on it before calling it done.",
    body: "Hours saved, detection accuracy, efficiency gained: if it can't be measured, it isn't finished.",
  },
  {
    title: "AI sits on a backend that already has to stay up.",
    body: "TDD, tracing and on-call habits from years of backend work come with me into every LLM feature.",
  },
];

/* ------------------------------- Case studies ------------------------------ */

export const caseStudies: CaseStudy[] = [
  {
    id: "fastgig",
    title: "Fast GiG",
    context: "Gig-work platform · Singapore & Malaysia · web + mobile",
    problem:
      "A two-market gig platform needed its internal data and admin workflows reachable by LLMs, not only by people.",
    built:
      "The microservices platform behind the web and mobile apps, plus an agentic AI layer on Model Context Protocol that lets LLMs read internal data and run admin workflows.",
    outcome:
      "40% gain in operational efficiency from AI automation and Node.js infra work, on a platform growing 20% year over year.",
    stack: ["Node.js", "MCP", "LLM agents", "React Native", "MongoDB", "Redis"],
    stamp: "IN PRODUCTION",
    ai: true,
    link: { label: "fastgig.sg", href: "https://www.fastgig.sg" },
  },
  {
    id: "canva-nova",
    title: "Canva × Amazon Nova",
    context: "Canva app · generative image editing",
    problem:
      "Bring generative image editing into Canva's design flow instead of a separate tool.",
    built:
      "A Canva app for object replacement and image manipulation, powered by Amazon Nova models.",
    outcome: "Delivered in 2.5 weeks at 90% object-detection accuracy.",
    stack: ["React", "Canva Apps SDK", "Express", "Amazon Nova"],
    stamp: "DELIVERED",
    ai: true,
  },
  {
    id: "mumr",
    title: "MuMR Housekeeping",
    context: "Hotel operations platform",
    problem:
      "Housekeeping depends on data that lives in property management systems, and every hotel runs a different one.",
    built:
      "I led development of the platform, with two-way integrations to RMS and MEWS, and owned it through its full lifecycle.",
    outcome:
      "Running in live hotel operations across properties on different property systems.",
    stack: ["RMS", "MEWS", "two-way PMS sync"],
    stamp: "IN PRODUCTION",
    ai: false,
  },
];

export const alsoBuilt: { title: string; note: string; link?: Link }[] = [
  {
    title: "Mindvalley States & NextGen",
    note: "Native Android app with complex animation; UI revamp for NextGen.",
    link: { label: "mindvalleystates.com", href: "https://www.mindvalleystates.com" },
  },
  {
    title: "GAP e-commerce (via ThoughtWorks)",
    note: "User-profile module, financial-data security, legacy-to-modern migration behind feature flags.",
  },
];

/* -------------------------------- Experience ------------------------------- */

export const roles: Role[] = [
  {
    id: "everest",
    company: "Everest Engineering",
    title: "Software Craftsperson",
    location: "Hyderabad",
    when: "Aug '22 → now",
    summary:
      "Product engineering for global clients, with most of my recent work on AI integration.",
    bullets: [
      "Built a custom MCP server that gives LLM agents access to internal data, cutting cross-app context switching by 25% and saving 10+ hours per engineer per week.",
      "Architected Fast GiG's microservices platform and its agentic AI layer for Singapore and Malaysia; AI automation plus Node.js infra work improved operational efficiency by 40%.",
      "Built React, Node.js and Spring Boot applications for high-traffic products, and used Splunk and Grafana to tighten observability and cut critical-incident response time.",
    ],
    stack: ["TypeScript", "Node.js", "React", "Spring Boot", "MCP", "LLM agents"],
  },
  {
    id: "thoughtworks",
    company: "ThoughtWorks",
    title: "Application Developer",
    location: "Hyderabad",
    when: "Dec '20 → Aug '22",
    summary: "Backend engineer on GAP's e-commerce platform.",
    bullets: [
      "Built Java / Spring Boot microservices that handled millions of requests during peak traffic seasons; built them test-first and fault-tolerant, with a 99.9% success rate on high-volume transactions.",
      "Cut API latency by 20% by tracing bottlenecks in Splunk and New Relic; on-call work cut incident response time by 35%.",
      "Helped move GAP's user-profile module off a legacy stack behind feature flags and tightened security on financial data; CI/CD work raised deployment frequency by 50%.",
    ],
    stack: ["Java", "Spring Boot", "Microservices", "Splunk", "New Relic", "Jenkins"],
  },
];

export const earlier = {
  when: "2018 → 2020",
  text: "Full-stack intern at DTaiLabs (a hiring platform on Angular, Node.js and MongoDB) and, remotely, at Qualzz in Canada (feedback analytics on Spring Boot and AWS).",
};

export const education = {
  when: "2016 → 2020",
  text: "B.Tech, Computer Science and Engineering — IIIT Basar.",
};

/* --------------------------------- Toolbox --------------------------------- */

export const aiTools: ToolGroup = {
  name: "AI & agents",
  items: [
    "LLM orchestration",
    "Agentic workflows",
    "MCP servers",
    "Prompt engineering",
    "Amazon Nova",
  ],
};

export const toolGroups: ToolGroup[] = [
  { name: "Languages", items: ["TypeScript", "Java", "Python"] },
  { name: "Backend", items: ["Node.js", "Spring Boot", "Microservices", "GraphQL"] },
  { name: "Frontend & mobile", items: ["React", "Angular", "React Native", "Native Android"] },
  { name: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { name: "Cloud & delivery", items: ["AWS", "Terraform", "AWS CDK", "Docker", "Jenkins", "CI/CD"] },
  {
    name: "Reliability & practice",
    items: ["Splunk", "Grafana", "New Relic", "TDD", "System design", "Spec-driven development"],
  },
];

/* ---------------------------------- About ---------------------------------- */

export const about = {
  paragraphs: [
    "I started at IIIT Basar, then spent nearly two years at ThoughtWorks keeping GAP's e-commerce backends up through peak retail seasons. That's where I learned to care about the unglamorous parts: tests, on-call, logs.",
    "At Everest Engineering, most of my work now is connecting LLMs to products that already have users, like giving agents access to a gig platform's internal data through MCP. I'm based in Hyderabad and used to working across time zones.",
  ],
  languages: "Telugu is my first language; I also speak Hindi, English and Marathi.",
  askMeAbout: ["MCP servers", "agents in production", "Spring Boot at peak traffic"],
};

/* --------------------------------- Contact --------------------------------- */

export const contact = {
  title: "Building agents that have to hold up in production?",
  titleEnd: "I'd like to hear about it.",
  body: "Email is the fastest way to reach me.",
};
