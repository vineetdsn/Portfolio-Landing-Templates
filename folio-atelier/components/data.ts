export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  colorTheme: "mint" | "coral" | "sky" | "lavender";
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  previewUrl: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconType: "web" | "mobile" | "backend" | "uiux";
  iconBg: string;
  description: string;
  skills: string[];
  deliverables: string[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  badgeColor: string;
  description: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details: string;
}

export const PROFILE_DATA = {
  name: "Alex Morgan",
  title: "Full-Stack Developer",
  pronouns: "He/Him",
  tagline: "I build digital products that are fast, scalable and thoughtfully designed.",
  location: "San Francisco, CA · Available Worldwide",
  email: "alex.morgan.dev@example.com",
  website: "alexmorgan.dev",
  linkedin: "linkedin.com/in/alexmorgan-dev",
  github: "github.com/alexmorgan-dev",
  twitter: "x.com/alexmorgan_dev",
  edition: "2025 Edition",
  bio: "I'm a full-stack developer who loves turning ideas into real-world web and mobile applications. I enjoy solving complex problems, writing clean resilient code, and creating smooth user experiences.",
  motto: "Code. Create. Elevate.",
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    iconType: "web",
    iconBg: "#DCFCE7", // light green
    description: "Building responsive and performant websites using modern stacks.",
    skills: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Server Actions"],
    deliverables: ["Full-Stack Web Apps", "SEO & Core Web Vitals", "PWA Architecture", "Design Systems"],
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    iconType: "mobile",
    iconBg: "#EDE9FE", // light purple
    description: "Cross-platform mobile apps with clean UI and smooth performance.",
    skills: ["React Native", "Expo", "Flutter", "iOS & Android", "Offline Sync"],
    deliverables: ["Native iOS/Android Builds", "Fluid Gestures & Animations", "Push Notifications", "App Store Release"],
  },
  {
    id: "backend-dev",
    title: "Backend Development",
    iconType: "backend",
    iconBg: "#FEF3C7", // light yellow
    description: "RESTful APIs, databases and scalable server-side applications.",
    skills: ["Node.js", "PostgreSQL", "Prisma ORM", "Redis", "Docker", "GraphQL"],
    deliverables: ["High-throughput Microservices", "Authentication & RBAC", "Database Optimization", "CI/CD Pipelines"],
  },
  {
    id: "uiux-design",
    title: "UI/UX Design",
    iconType: "uiux",
    iconBg: "#FEE2E2", // light coral
    description: "Designing intuitive and beautiful interfaces that users love.",
    skills: ["Figma", "Design Tokens", "Wireframing", "Prototyping", "User Research"],
    deliverables: ["Interactive Prototypes", "Component Libraries", "Accessibility (WCAG)", "Design Handoff"],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "tasky",
    name: "Tasky",
    category: "Productivity",
    colorTheme: "mint",
    description: "Task management app to organize your work smartly.",
    longDescription: "A high-velocity workspace dashboard featuring real-time collaborative kanban boards, markdown task docs, natural language task scheduling, and offline-first IndexedDB synchronization.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Zustand"],
    metrics: "42% faster task completion rate · 10k+ active users",
    previewUrl: "https://tasky-workspace.demo",
    githubUrl: "https://github.com/alexmorgan-dev/tasky",
  },
  {
    id: "shopease",
    name: "ShopEase",
    category: "E-Commerce",
    colorTheme: "coral",
    description: "Modern e-commerce platform with secure checkout.",
    longDescription: "Next-gen storefront with instant sub-100ms algorithmic search, headless Shopify integration, personalized merchandising recommendation engine, and multi-currency Stripe billing.",
    tags: ["React 19", "Node.js", "Stripe API", "PostgreSQL", "Redis"],
    metrics: "99.98% checkout uptime · 3.2x mobile conversion lift",
    previewUrl: "https://shopease-market.demo",
    githubUrl: "https://github.com/alexmorgan-dev/shopease",
  },
  {
    id: "fintrack",
    name: "FinTrack",
    category: "Finance",
    colorTheme: "sky",
    description: "Personal finance tracker to manage income & expenses.",
    longDescription: "Automated financial intelligence suite connecting live bank feeds via Plaid, cash-flow projection charts, categorized receipt parsing with OCR, and real-time net-worth tracking.",
    tags: ["TypeScript", "Next.js", "Plaid API", "Chart.js", "Tailwind"],
    metrics: "$12M+ tracked volume · Zero security incidents",
    previewUrl: "https://fintrack-finance.demo",
    githubUrl: "https://github.com/alexmorgan-dev/fintrack",
  },
  {
    id: "wanderly",
    name: "Wanderly",
    category: "Travel",
    colorTheme: "lavender",
    description: "Explore places, plan trips and discover amazing deals.",
    longDescription: "AI-assisted itinerary generator with interactive Mapbox routes, crowd-sourced hidden gem recommendations, split-expense calculations, and offline downloadable city guides.",
    tags: ["React Native", "Mapbox GL", "Node.js", "OpenAI API", "Expo"],
    metrics: "4.9/5 App Store Rating · 25,000+ custom itineraries",
    previewUrl: "https://wanderly-travel.demo",
    githubUrl: "https://github.com/alexmorgan-dev/wanderly",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: "2023 — Present",
    role: "Full-Stack Developer",
    company: "Freelance / Independent",
    badgeColor: "#10B981", // green
    description: "Building production web & mobile applications for global startups and high-growth businesses. Leading full-cycle architecture from design to deployment.",
  },
  {
    period: "2022 — 2023",
    role: "Junior Developer",
    company: "Vortex Digital Labs",
    badgeColor: "#3B82F6", // blue
    description: "Developed frontend components in React/TypeScript, implemented responsive design systems, and authored REST endpoints with automated unit testing.",
  },
  {
    period: "2021",
    role: "Web Development Intern",
    company: "Pixelcraft Studio",
    badgeColor: "#EC4899", // pink
    description: "Collaborated on client e-commerce interfaces, tuned page speed by 45%, and optimized cross-browser CSS compatibility.",
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: "2022 — 2026",
    degree: "BS Software Engineering",
    institution: "Metropolitan Institute of Tech",
    details: "Focused on Distributed Systems, Cloud Architecture, Human-Computer Interaction, and Algorithms.",
  },
  {
    period: "2020 — 2022",
    degree: "FSc Pre-Engineering",
    institution: "St. Jude Academic College",
    details: "Graduated with High Distinction in Mathematics, Physics, and Analytical Logic.",
  },
];

export const SKILLS_DATA = [
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Firebase", category: "backend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Git", category: "tools" },
  { name: "Figma", category: "design" },
  { name: "UI/UX", category: "design" },
  { name: "Docker", category: "tools" },
  { name: "GraphQL", category: "backend" },
];
