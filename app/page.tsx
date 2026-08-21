import {
  EducationShowcase,
} from "@/app/components/collection-showcases";
import { ExperienceShowcase } from "@/app/components/experience-showcase";
import { GitHubActivitySection } from "@/app/components/github-activity";
import { PortfolioIntro } from "@/app/components/portfolio-intro";
import { ProjectsShowcase } from "@/app/components/projects-showcase";
import { Reveal } from "@/app/components/reveal";
import { SocialLinks } from "@/app/components/social-links";
import { portfolio } from "@/app/data/portfolio";

export default function Home() {
  return (
    <main id="top" className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
        <PortfolioIntro
          availability={portfolio.availability}
          firstName={portfolio.firstName}
          fullName={portfolio.name}
          introduction={portfolio.introduction}
          jobTitle={portfolio.jobTitle}
          profileImage={portfolio.profileImage}
          remainingName={portfolio.remainingName}
        />

        <GitHubActivitySection
          profileUrl={portfolio.github}
          resumeUrl={portfolio.resumeUrl}
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
