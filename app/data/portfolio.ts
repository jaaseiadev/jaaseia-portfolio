export type Project = {
  name: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl: string;
  label: string;
  category: ProjectCategory;
};

export type ProjectCategory = "personal" | "group";

export type Experiment = {
  name: string;
  description: string;
  tag: string;
  url: string;
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  details: string;
};

export const portfolio = {
  name: "Alex Morgan",
  initials: "AM",
  metaDescription:
    "A minimal portfolio for a developer and designer focused on thoughtful digital products.",
  introduction:
    "I'm a developer and designer who turns complex ideas into clear, useful experiences—with a focus on strong systems, accessible interfaces, and the details that make software feel considered.",
  availability: "Open to opportunities",
  profileImage: "/profile-placeholder.svg",
  email: "hello@example.com",
  resumeUrl: "#education",
  githubUsername: "jaaseiadev",
  github: "https://github.com/jaaseiadev",
  linkedin: "https://linkedin.com/in/jaaseia",
  projects: [
    {
      name: "Northstar",
      description:
        "A focused project-planning workspace that helps small teams move from fuzzy ideas to clear weekly priorities.",
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      githubUrl: "https://github.com/yourusername/northstar",
      liveUrl: "https://example.com",
      label: "Productivity / 2026",
      category: "personal",
    },
    {
      name: "Papertrail",
      description:
        "A calm reading and annotation experience for saving articles, connecting ideas, and building a personal knowledge archive.",
      stack: ["React", "Tailwind CSS", "Supabase"],
      githubUrl: "https://github.com/yourusername/papertrail",
      liveUrl: "https://example.com",
      label: "Knowledge tools / 2025",
      category: "group",
    },
    {
      name: "Signal",
      description:
        "An accessible dashboard that turns noisy product analytics into a small set of clear, actionable signals.",
      stack: ["Next.js", "D3.js", "Motion"],
      githubUrl: "https://github.com/yourusername/signal",
      liveUrl: "https://example.com",
      label: "Data visualization / 2025",
      category: "personal",
    },
  ] satisfies Project[],
  experiments: [
    {
      name: "Type Scale Lab",
      description: "An interactive tool for testing fluid editorial type systems.",
      tag: "UI Tool",
      url: "https://example.com",
    },
    {
      name: "Command Menu",
      description: "A tiny, keyboard-first command interface with careful motion.",
      tag: "Interaction",
      url: "https://example.com",
    },
    {
      name: "Quiet Weather",
      description: "A minimal weather view designed around what matters right now.",
      tag: "Prototype",
      url: "https://example.com",
    },
    {
      name: "Grid Notes",
      description: "A playful study of modular layouts and spatial organization.",
      tag: "CSS Study",
      url: "https://example.com",
    },
  ] satisfies Experiment[],
  education: [
    {
      school: "Example University",
      degree: "B.Sc. in Computer Science",
      period: "2022 — 2026",
      location: "City, Country",
      details:
        "Focused on software engineering, human-computer interaction, and information systems. Add honors, activities, or relevant coursework here.",
    },
    {
      school: "Independent Study",
      degree: "Product Design & Frontend Engineering",
      period: "Ongoing",
      location: "Self-directed",
      details:
        "Continuous study through building, reading, open-source work, and close observation of well-made digital products.",
    },
  ] satisfies Education[],
  socials: [
    {
      label: "GitHub",
      handle: "@yourusername",
      url: "https://github.com/yourusername",
    },
    {
      label: "LinkedIn",
      handle: "/in/yourusername",
      url: "https://linkedin.com/in/yourusername",
    },
    {
      label: "Email",
      handle: "hello@example.com",
      url: "mailto:hello@example.com",
    },
  ],
};
