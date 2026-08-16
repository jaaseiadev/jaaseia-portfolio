import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { FiGlobe } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Reveal } from "@/app/components/reveal";
import { portfolio, type Project } from "@/app/data/portfolio";

function getProject(slug: string) {
  return portfolio.projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  const title = `${project.name} — Jaaseia Abenoja`;

  return {
    title,
    description: project.description,
    openGraph: {
      title,
      description: project.description,
    },
    twitter: {
      card: "summary",
      title,
      description: project.description,
    },
  };
}

function ProjectLink({
  href,
  children,
  icon,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="traveling-link inline-flex items-center gap-1.5 text-xs font-medium text-foreground"
    >
      {icon}
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  return (
    <Reveal as="section" className="mt-4" delay={0.04}>
      <h2 className="sr-only">Project screenshots</h2>
      <div className="grid gap-2">
        {project.images.map((image, index) => {
          const isLogo = image.kind === "logo";

          return (
            <figure
              key={image.src}
              className={
                isLogo
                  ? "relative aspect-[3/1] overflow-hidden rounded-xl border border-border bg-[#0c1224]"
                  : "relative aspect-video overflow-hidden rounded-xl border border-border bg-surface"
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                preload={index === 0}
                sizes="(max-width: 680px) calc(100vw - 2.5rem), 616px"
                className={isLogo ? "object-contain p-6 sm:p-8" : "object-cover object-top"}
              />
            </figure>
          );
        })}
      </div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-[680px] px-5 pb-10 sm:px-8">
      <Reveal className="pt-5 sm:pt-8">
        <div className="border-b border-border pb-4">
          <h1 className="text-2xl font-medium tracking-[-0.04em] text-foreground sm:text-3xl">
            {project.name}
          </h1>
          <p className="mt-1.5 text-[13px] leading-5 text-muted">{project.description}</p>

          <div className="mt-3 flex gap-4">
            <ProjectLink href={project.liveUrl} icon={<FiGlobe className="size-3.5" aria-hidden="true" />}>
              Live site
            </ProjectLink>
            <ProjectLink href={project.githubUrl} icon={<SiGithub className="size-3.5" aria-hidden="true" />}>
              GitHub
            </ProjectLink>
          </div>
        </div>
      </Reveal>

      <ProjectGallery project={project} />

      <Reveal as="section" className="mt-4" delay={0.06}>
        <div>
          <h2 className="editorial-heading">About the project.</h2>
          <div className="mt-2 space-y-1.5 text-[13px] leading-5 text-muted">
            {project.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-3 border-t border-border pt-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
              Key capabilities
            </h2>
            <ul className="mt-2 grid gap-y-1 text-[12px] leading-5 text-muted">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-faint" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-3 border-t border-border pt-3">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">Tech stack</h2>
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((technology) => (
              <li
                key={technology}
                className="rounded-full bg-[color-mix(in_srgb,var(--foreground)_7%,transparent)] px-2.5 py-1 font-mono text-[10px] text-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>

          {project.credits ? (
            <dl className="mt-3 divide-y divide-border border-t border-border">
              {project.credits.map((credit) => (
                <div key={credit.label} className="grid gap-1 py-2.5 sm:grid-cols-[64px_1fr]">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    {credit.label}
                  </dt>
                  <dd className="text-[11px] leading-4 text-muted">{credit.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.resources ? (
            <div className="mt-3 flex flex-wrap gap-4 border-t border-border pt-3">
              {project.resources.map((resource) => (
                <ProjectLink key={resource.url} href={resource.url}>
                  {resource.label}
                </ProjectLink>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>
    </main>
  );
}
