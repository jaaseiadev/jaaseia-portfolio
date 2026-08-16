import type { Metadata } from "next";
import { EducationShowcase } from "@/app/components/collection-showcases";
import { Reveal } from "@/app/components/reveal";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Education — Jaaseia Abenoja",
  description: "Education and training of computer science student Jaaseia Abenoja.",
};

export default function EducationPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal as="section" className="pt-5 sm:pt-8" delay={0.03}>
        <EducationShowcase education={portfolio.education} />
      </Reveal>
    </main>
  );
}
