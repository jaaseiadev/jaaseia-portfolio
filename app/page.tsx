import Image from "next/image";
import {
  EducationShowcase,
  ExperimentsShowcase,
} from "@/app/components/collection-showcases";
import { GitHubActivitySection } from "@/app/components/github-activity";
import {
  FacebookIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/app/components/icons";
import { ProjectsShowcase } from "@/app/components/projects-showcase";
import { Reveal } from "@/app/components/reveal";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { portfolio } from "@/app/data/portfolio";

const socialIcons = {
  GitHub: {
    icon: GitHubIcon,
    color: "text-[#181717] dark:text-[#f0f0f0]",
  },
  LinkedIn: {
    icon: LinkedInIcon,
    color: "text-[#0A66C2]",
  },
  Facebook: {
    icon: FacebookIcon,
    color: "text-[#1877F2]",
  },
  Email: {
    icon: MailIcon,
    color: "text-[#EA4335]",
  },
};

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      <header className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
        <nav
          aria-label="Primary navigation"
          className="flex h-20 items-center justify-end"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <a className="nav-link" href="#work">
              Work
            </a>
            <a
              className="nav-link"
              href={portfolio.resumeUrl}
            >
              Education
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main id="top" className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
        <Reveal className="pb-4 pt-12 sm:pt-16">
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

        <Reveal as="section" id="craft" className="section-shell" delay={0.05}>
          <ExperimentsShowcase experiments={portfolio.experiments} />
        </Reveal>

        <Reveal as="section" id="education" className="section-shell" delay={0.05}>
          <EducationShowcase education={portfolio.education} />
        </Reveal>

        <Reveal as="section" id="contact" className="section-shell" delay={0.05}>
          <h2 className="editorial-heading mb-3">Socials.</h2>
          <div className="divide-y divide-border">
            {portfolio.socials.map((social) => {
              const socialIcon = socialIcons[social.label as keyof typeof socialIcons];
              const Icon = socialIcon?.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noreferrer"}
                  className="group flex items-center justify-between py-3 text-sm"
                >
                  <span className="flex items-center gap-3">
                    {Icon ? <Icon className={`size-4 ${socialIcon.color}`} /> : null}
                    {social.label}
                  </span>
                  <span className="flex items-center gap-3 text-muted">
                    <span className="hidden transition-colors group-hover:text-foreground sm:inline">
                      {social.handle}
                    </span>
                    <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </main>

      <footer className="mx-auto w-full max-w-[680px] px-5 pb-8 pt-8 sm:px-8 sm:pb-12">
        <div className="flex flex-col gap-2 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {portfolio.name}
          </p>
          <p>Designed with restraint. Built with care.</p>
        </div>
      </footer>
    </div>
  );
}
