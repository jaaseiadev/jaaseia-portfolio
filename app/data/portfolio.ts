export type Project = {
  name: string;
  slug: string;
  description: string;
  overview: string[];
  highlights: string[];
  stack: string[];
  images: ProjectImage[];
  resources?: ProjectResource[];
  credits?: ProjectCredit[];
  githubUrl: string;
  liveUrl: string;
  label: string;
  category: ProjectCategory;
};

export type ProjectImage = {
  src: string;
  alt: string;
  kind?: "screenshot" | "logo";
};

export type ProjectResource = {
  label: string;
  url: string;
};

export type ProjectCredit = {
  label: string;
  value: string;
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

export type Experience = {
  role: string;
  company: string;
  employmentType: string;
  period: string;
  location: string;
  url: string;
};

export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  duration?: string;
  url: string;
};

export const portfolio = {
  name: "Jaaseia Gian R. Abenoja",
  firstName: "Jaaseia",
  remainingName: "Gian R. Abenoja",
  jobTitle: "Frontend Developer & Designer",
  initials: "JA",
  metaDescription:
    "Portfolio of Jaaseia Gian R. Abenoja, a computer science student and frontend developer focused on thoughtful web experiences and AI.",
  introduction:
    "I'm passionate about frontend engineering, artificial intelligence, and crafting thoughtful digital experiences.",
  availability: "Open to opportunities",
  profileImage: "/profile.jpg",
  email: "jaaseiacocabenoja@gmail.com",
  resumeUrl: "/resume/jaaseia-resume.pdf",
  githubUsername: "jaaseiadev",
  github: "https://github.com/jaaseiadev",
  linkedin: "https://linkedin.com/in/jaaseia",
  projects: [
    {
      name: "MathWiz",
      slug: "mathwiz",
      description:
        "A secure online mathematics competition platform for Mathletes, coaches, and school administrators.",
      overview: [
        "MathWiz, also known as Centipede, is a web-based competition platform built for Mathletes and coaches. It supports managed competitions, reusable problem banks, team and open modes, automated scoring, and integrity monitoring such as tab-switching logs.",
        "The web application uses Next.js for the frontend and Supabase with PostgreSQL for its backend and database. I worked on the frontend experience and UI/UX design as part of the project team.",
      ],
      highlights: [
        "Competition and reusable problem-bank management",
        "Team mode and open competition mode",
        "Automated scoring and live performance views",
        "Integrity monitoring for competition sessions",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
      images: [
        {
          src: "/mathwiz/Screenshot 2026-08-16 113707.png",
          alt: "MathWiz landing page with competition dashboard preview",
        },
        {
          src: "/crafts-mathwizlogo/mathwiz logo.png",
          alt: "MathWiz logo designed in orange and navy",
          kind: "logo",
        },
      ],
      resources: [
        {
          label: "Design specs",
          url: "https://github.com/anthony-celeres/centipede-docportal",
        },
      ],
      credits: [
        { label: "Adviser", value: "Mr. Rodney M. Maniego Jr." },
        {
          label: "Team",
          value: "Jaaseia Gian R. Abenoja · Anthony L. Celeres · Vj Formaran Mabansag",
        },
      ],
      githubUrl: "https://github.com/M1Vj/centipede",
      liveUrl: "https://mathwiz-arena.vercel.app/",
      label: "Competition platform",
      category: "group",
    },
    {
      name: "Tattoo Site Portfolio",
      slug: "tattoo-site-portfolio",
      description:
        "A tactile, sketchbook-inspired portfolio for tattoo artist Emir Casil Cortez.",
      overview: [
        "A custom portfolio website created for my friend, tattoo artist Emir Casil Cortez. The site presents his work through an interactive sketchbook-inspired layout that feels personal, tactile, and connected to the tattoo process.",
        "The experience is composed as a tilted paper sketchbook with a dark folder backing, textured surfaces, handwritten details, photo prints, and colored bookmark navigation.",
      ],
      highlights: [
        "Introduction and artist profile inside one continuous sketchbook",
        "Selected tattoo archive presented as tactile photo studies",
        "Colored bookmark navigation between portfolio sections",
        "Integrated booking information without leaving the experience",
      ],
      stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vinext",
        "Vite",
        "OpenAI Sites",
        "Cloudflare",
      ],
      images: [
        {
          src: "/tattoo/Screenshot 2026-08-16 112745.png",
          alt: "Tattoo artist portfolio opening page in a sketchbook layout",
        },
        {
          src: "/tattoo/Screenshot 2026-08-16 112802.png",
          alt: "Emir Casil Cortez artist profile page in the interactive sketchbook",
        },
      ],
      githubUrl: "https://github.com/jaaseiadev/tattoo-site-ni-emir",
      liveUrl: "https://tattoo-site-ni-emir.vercel.app/",
      label: "Client portfolio",
      category: "personal",
    },
    {
      name: "Decants ni Bro",
      slug: "decants-ni-bro",
      description:
        "The official storefront and operations platform for our real-world perfume decanting business.",
      overview: [
        "Decants ni Bro is a modern web application and the official platform for our real-world perfume decanting business. Customers can browse the current fragrance collection, sizes, prices, and availability through a focused public catalog.",
        "A comprehensive administrative dashboard supports inventory management, sales tracking, and business statistics behind the customer-facing experience.",
      ],
      highlights: [
        "Public fragrance catalog with availability and pricing",
        "Inventory and product administration",
        "Sales tracking and business statistics",
        "Responsive storefront for a real operating business",
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
      images: [
        {
          src: "/decants-ni-bro/Screenshot 2026-08-16 112924.png",
          alt: "Decants ni Bro fragrance catalog landing page",
        },
        {
          src: "/decants-ni-bro/Screenshot 2026-08-16 113028.png",
          alt: "Decants ni Bro current fragrance collection and pricing grid",
        },
      ],
      githubUrl: "https://github.com/jaaseiadev/decants-ni-bro",
      liveUrl: "https://decants-ni-bro.vercel.app/",
      label: "E-commerce platform",
      category: "personal",
    },
    {
      name: "Mahaplag Archive",
      slug: "mahaplag-archive",
      description:
        "A digital archive preserving Mahaplag’s history, local research, community stories, and geographic records.",
      overview: [
        "Created as Mahaplag celebrates its 68th Founding Anniversary, Mahaplag Archive brings together an interactive map of the municipality and its 28 barangays with local lore, historical records, research, DPWH records, hazard maps, biodiversity references, and a directory of local officials.",
        "Important records and community stories are often scattered across documents, websites, and personal collections. I created the archive to organize them in one accessible place for students, residents, and future generations before they are forgotten or lost.",
      ],
      highlights: [
        "Interactive map covering Mahaplag and all 28 barangays",
        "Local lore, historical records, research, and community stories",
        "DPWH records, biodiversity references, and officials directory",
        "GIS-based flood, landslide, and hazard-map exploration",
      ],
      stack: ["Next.js", "React", "Python", "GIS", "Tailwind CSS", "Supabase", "TypeScript"],
      images: [
        {
          src: "/mahaplag-archive/Screenshot 2026-08-16 113324.png",
          alt: "Mahaplag Archive collection of local history volumes",
        },
        {
          src: "/mahaplag-archive/Screenshot 2026-08-16 113403.png",
          alt: "Mahaplag Archive interactive three-dimensional flood hazard map",
        },
      ],
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
  experience: [
    {
      role: "Front-end AI Engineering Intern",
      company: "FlyRank AI",
      employmentType: "Internship",
      period: "Aug 2026 — Present · 1 mo",
      location: "Philippines · Remote",
      url: "https://www.linkedin.com/in/jaaseia/edit/forms/position/2992359171/",
    },
  ] satisfies Experience[],
  certificates: [
    {
      title: "Introduction to Python",
      issuer: "DataCamp",
      date: "Completed Aug 19, 2026",
      duration: "4 hours",
      url: "/certificates/Introduction%20to%20python/certificate.pdf",
    },
    {
      title: "Introduction to Data Science",
      issuer: "Cisco",
      date: "Issued Sep 2025",
      url: "https://www.credly.com/badges/d6e138b7-ed95-40df-ab90-fc73ca2b222d/linked_in_profile",
    },
  ] satisfies Certificate[],
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
