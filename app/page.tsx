import Image from "next/image";
import { EducationItem } from "@/app/components/education-item";
import { ExperimentCard } from "@/app/components/experiment-card";
import { GitHubActivitySection } from "@/app/components/github-activity";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/app/components/icons";
import { ProjectsShowcase } from "@/app/components/projects-showcase";
import { Reveal } from "@/app/components/reveal";
import { SectionHeading } from "@/app/components/section-heading";
import { ThemeToggle } from "@/app/components/theme-toggle";
import { portfolio } from "@/app/data/portfolio";

const socialIcons = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Email: MailIcon,
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
            <a className="nav-link" href="#about">
              About
            </a>
            <a
              className="nav-link"
              href={portfolio.resumeUrl}
            >
              Resume
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
                alt={`${portfolio.name} profile placeholder`}
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
          <SectionHeading
            title="Experiments & small things"
            description="Small explorations in interaction design, developer tooling, and interface craft."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {portfolio.experiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.name}
                experiment={experiment}
                index={index}
              />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" id="education" className="section-shell" delay={0.05}>
          <SectionHeading
            title="Where I learned"
            description="My academic foundation and the subjects that shaped how I approach technical work."
          />
          <div>
            {portfolio.education.map((item) => (
              <EducationItem key={`${item.school}-${item.degree}`} item={item} />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" id="about" className="section-shell" delay={0.05}>
          <SectionHeading title="A little more about me" />
          <div className="grid gap-10 sm:grid-cols-[1fr_0.7fr] sm:gap-14">
            <div className="space-y-5 text-[15px] leading-7 text-muted">
              {portfolio.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                Currently using
              </p>
              <ul className="space-y-2.5 text-sm" aria-label="Current skills">
                {portfolio.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5">
                    <span className="h-px w-3 bg-faint" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="contact" className="section-shell" delay={0.05}>
          <SectionHeading
            title="Find me online"
            description="Have a project in mind, a question, or just want to say hello? My inbox is open."
          />
          <div>
            {portfolio.socials.map((social) => {
              const Icon = socialIcons[social.label as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.label === "Email" ? undefined : "_blank"}
                  rel={social.label === "Email" ? undefined : "noreferrer"}
                  className="group flex items-center justify-between py-4 text-sm"
                >
                  <span className="flex items-center gap-3">
                    {Icon ? <Icon className="size-4 text-muted" /> : null}
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
