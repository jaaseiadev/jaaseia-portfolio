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
  name: "Jaaseia Gian R. Abenoja",
  initials: "JA",
  metaDescription:
    "Portfolio of Jaaseia Gian R. Abenoja, a computer science student and frontend developer focused on thoughtful web experiences and AI.",
  introduction:
    "I'm a fourth-year Computer Science student at Visayas State University, passionate about frontend engineering, artificial intelligence, and crafting thoughtful digital experiences.",
  availability: "Open to opportunities",
  profileImage: "/profile.jpg",
  email: "jaaseiacocabenoja@gmail.com",
  resumeUrl: "#education",
  githubUsername: "jaaseiadev",
  github: "https://github.com/jaaseiadev",
  linkedin: "https://linkedin.com/in/jaaseia",
  projects: [
    {
      name: "MathWiz",
      description:
        "A secure, web-based mathematics competition platform for Mathletes and coaches. I worked as the frontend developer and UI/UX designer.",
      stack: ["Next.js", "Frontend Development", "UI/UX Design"],
      githubUrl: "https://github.com/M1Vj/centipede",
      liveUrl: "https://mathwiz-arena.vercel.app/",
      label: "Competition platform",
      category: "group",
    },
    {
      name: "Tattoo Site Portfolio",
      description:
        "A custom tattoo artist portfolio created for a client to showcase their work and online presence.",
      stack: ["Web Development", "Frontend Development"],
      githubUrl: "https://github.com/jaaseiadev/tattoo-site-ni-emir",
      liveUrl: "https://tattoo-site-ni-emir.vercel.app/",
      label: "Client portfolio",
      category: "personal",
    },
    {
      name: "Decants ni Bro",
      description:
        "The official platform for our perfume decanting business, with a public fragrance catalog and an admin dashboard for inventory, sales, and business analytics.",
      stack: ["Next.js", "Web Development", "Frontend Development"],
      githubUrl: "https://github.com/jaaseiadev/decants-ni-bro",
      liveUrl: "https://decants-ni-bro.vercel.app/",
      label: "E-commerce platform",
      category: "personal",
    },
    {
      name: "Mahaplag Archive",
      description:
        "A civic, cultural, and ecological web atlas for Mahaplag, Leyte, featuring interactive barangay maps, local archives, hazard layers, biodiversity data, and community submissions.",
      stack: ["Next.js", "Web Development", "Interactive Maps"],
      githubUrl: "https://github.com/jaaseiadev/mahaplag.archive",
      liveUrl: "https://mahaplag-archive.vercel.app/",
      label: "Civic web atlas",
      category: "personal",
    },
  ] satisfies Project[],
  experiments: [
    {
      name: "MathWiz Logo",
      description:
        "The original logo I created for MathWiz, our online mathematics competition platform for Mathletes and coaches.",
      tag: "Logo Design",
      url: "https://mathwiz-arena.vercel.app/",
    },
  ] satisfies Experiment[],
  education: [
    {
      school: "Visayas State University",
      degree: "Bachelor of Science in Computer Science",
      period: "Aug 2023 — Aug 2027",
      location: "Baybay City, Leyte",
      details:
        "Currently a fourth-year student building a foundation in computer science, software development, frontend engineering, and artificial intelligence.",
    },
    {
      school: "ICOT-P E2PS",
      degree: "Computer Programming Training",
      period: "Sep 2022 — Apr 2023",
      location: "Philippines",
      details:
        "Studied programming and computational problem-solving using JavaScript and HTML.",
    },
  ] satisfies Education[],
  socials: [
    {
      label: "GitHub",
      handle: "@jaaseiadev",
      url: "https://github.com/jaaseiadev",
    },
    {
      label: "LinkedIn",
      handle: "/in/jaaseia",
      url: "https://www.linkedin.com/in/jaaseia/",
    },
    {
      label: "Facebook",
      handle: "Jaaseia Abenoja",
      url: "https://www.facebook.com/profile.php?id=61591232685542",
    },
    {
      label: "Email",
      handle: "jaaseiacocabenoja@gmail.com",
      url: "mailto:jaaseiacocabenoja@gmail.com",
    },
  ],
};
