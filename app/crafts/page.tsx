import type { Metadata } from "next";
import { ExperimentsShowcase } from "@/app/components/collection-showcases";
import { Reveal } from "@/app/components/reveal";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: "Crafts — Jaaseia Abenoja",
  description: "Visual design crafts and experiments by Jaaseia Abenoja.",
};

export default function CraftsPage() {
  return (
    <main className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <Reveal as="section" className="pt-5 sm:pt-8" delay={0.03}>
        <ExperimentsShowcase experiments={portfolio.experiments} />
      </Reveal>
    </main>
  );
}
