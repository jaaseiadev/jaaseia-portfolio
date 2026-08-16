import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { BsOpenai } from "react-icons/bs";
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiFigma,
  SiGithub,
  SiGoogle,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from "react-icons/si";
import { Reveal } from "@/app/components/reveal";

export const metadata: Metadata = {
  title: "Uses — Jaaseia Abenoja",
  description: "The programming languages, tools, software, and hardware Jaaseia uses.",
};

type Tool = {
  name: string;
  icon?: IconType;
  iconSrc?: string;
};

const toolGroups: { title: string; tools: Tool[] }[] = [
  {
    title: "Languages",
    tools: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C", icon: SiC },
      { name: "C++", icon: SiCplusplus },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    title: "Design",
    tools: [{ name: "Figma", icon: SiFigma }],
  },
  {
    title: "Frontend",
    tools: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "shadcn/ui", icon: SiShadcnui },
      { name: "Google Stitch", icon: SiGoogle },
      { name: "Three.js", icon: SiThreedotjs },
    ],
  },
  {
    title: "Backend & database",
    tools: [
      { name: "Supabase", icon: SiSupabase },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    title: "Developer tools",
    tools: [
      { name: "GitHub", icon: SiGithub },
      { name: "Docker", icon: SiDocker },
    ],
  },
  {
    title: "AI",
    tools: [
      {
        name: "Antigravity",
        iconSrc: "https://antigravity.google/assets/image/brand/antigravity-icon__full-color.png",
      },
      { name: "Codex", icon: BsOpenai },
    ],
  },
];

const hardware = [
  { label: "Monitor", value: "ViewSonic 24-inch · 144 Hz" },
  { label: "Processor", value: "AMD Ryzen 5 3500" },
  { label: "Graphics", value: "NVIDIA GeForce RTX 3070" },
  { label: "Memory", value: "16 GB RAM" },
  { label: "Storage", value: "512 GB SSD · 1 TB HDD" },
];

export default function UsesPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal className="pb-2 pt-5 sm:pt-8">
        <h1 className="editorial-heading">Software.</h1>
      </Reveal>

      <div className="divide-y divide-border pt-3">
        {toolGroups.map((group, index) => (
          <Reveal
            as="section"
            key={group.title}
            delay={index * 0.025}
            className="grid gap-2 py-3 sm:grid-cols-[120px_1fr] sm:items-start sm:gap-3"
          >
            <h2 className="text-[11px] leading-5 text-muted">
              <span className="mr-1 font-mono text-[10px] text-faint">{String(index + 1).padStart(2, "0")}</span>
              {group.title}
            </h2>
            <div className="flex flex-wrap items-start gap-1.5">
              {group.tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--foreground)_8%,transparent)] px-2.5 py-1.5 font-mono text-[10px] font-medium leading-none text-foreground"
                  >
                    {Icon ? (
                      <Icon className="size-3 shrink-0 opacity-80" aria-hidden="true" />
                    ) : (
                      // The Antigravity mark comes from Google's official press assets.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tool.iconSrc}
                        alt=""
                        className="size-3 shrink-0 object-contain grayscale brightness-0 dark:invert"
                        aria-hidden="true"
                      />
                    )}
                    <span>{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal as="section" className="pt-7" delay={0.05}>
        <h2 className="editorial-heading pb-2">Hardware.</h2>
        <dl className="divide-y divide-border">
          {hardware.map((item, index) => (
            <div
              key={item.label}
              className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-3"
            >
              <dt className="text-[11px] text-muted">
                <span className="mr-1 font-mono text-[10px] text-faint">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </dt>
              <dd className="font-mono text-[10px] leading-5 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </main>
  );
}
