import Image from "next/image";
import {
  EducationShowcase,
} from "@/app/components/collection-showcases";
import { ExperienceShowcase } from "@/app/components/experience-showcase";
import { GitHubActivitySection } from "@/app/components/github-activity";
import { ProjectsShowcase } from "@/app/components/projects-showcase";
import { Reveal } from "@/app/components/reveal";
import { SocialLinks } from "@/app/components/social-links";
import { portfolio } from "@/app/data/portfolio";

export default function Home() {
  return (
    <main id="top" className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
        <Reveal className="pb-4 pt-5 sm:pt-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Image
                src={portfolio.profileImage}
                alt={`Portrait of ${portfolio.name}`}
                width={80}
                height={80}
                priority
                className="size-12 rounded-full border border-border object-cover grayscale sm:size-14"
              />
              <h1 className="text-sm font-normal tracking-[-0.01em] sm:text-[15px]">
                {portfolio.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-muted">
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              {portfolio.availability}
            </div>
          </div>

          <p className="max-w-[540px] text-sm leading-6 text-muted sm:text-[15px] sm:leading-7">
            {portfolio.introduction}
          </p>
        </Reveal>

        <GitHubActivitySection
          profileUrl={portfolio.github}
          username={portfolio.githubUsername}
        />

        <Reveal as="section" id="work" className="projects-section" delay={0.05}>
          <ProjectsShowcase
            profileImage={portfolio.profileImage}
            projects={portfolio.projects}
          />
        </Reveal>

        <Reveal as="section" id="experience" className="section-shell" delay={0.05}>
          <ExperienceShowcase experience={portfolio.experience} />
        </Reveal>

        <Reveal as="section" id="education" className="section-shell" delay={0.05}>
          <EducationShowcase education={portfolio.education} />
        </Reveal>

        <Reveal as="section" id="contact" className="section-shell" delay={0.05}>
          <SocialLinks />
        </Reveal>
    </main>
  );
}
