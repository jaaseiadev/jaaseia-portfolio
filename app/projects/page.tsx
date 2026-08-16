import type { Metadata } from "next";
import { ProjectsShowcase } from "@/app/components/projects-showcase";
import { Reveal } from "@/app/components/reveal";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Projects — Jaaseia Abenoja",
  description: "Selected web development and design projects by Jaaseia Abenoja.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal as="section" className="pt-5 sm:pt-8" delay={0.03}>
        <ProjectsShowcase profileImage={portfolio.profileImage} projects={portfolio.projects} />
      </Reveal>
    </main>
  );
}
