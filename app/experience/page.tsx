import type { Metadata } from "next";
import { ExperienceShowcase } from "@/app/components/experience-showcase";
import { Reveal } from "@/app/components/reveal";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Experience — Jaaseia Abenoja",
  description: "Professional experience of frontend AI engineer Jaaseia Abenoja.",
};

export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal as="section" className="pt-5 sm:pt-8" delay={0.03}>
        <ExperienceShowcase experience={portfolio.experience} />
      </Reveal>
    </main>
  );
}
