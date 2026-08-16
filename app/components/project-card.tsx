"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiGlobe } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/app/data/portfolio";
import { useHydrated } from "@/app/components/use-hydrated";

type ProjectCardProps = {
  project: Project;
  index: number;
  view?: "list" | "cards";
};

export function ProjectCard({ project, index, view = "list" }: ProjectCardProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;
  const projectLinks = (
    <div className="flex shrink-0 items-center gap-3 text-muted">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} live site`}
        title="Live site"
        className="transition-colors hover:text-foreground"
      >
        <FiGlobe className="size-4" aria-hidden="true" />
      </a>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.name} GitHub repository`}
        title="GitHub repository"
        className="transition-colors hover:text-foreground"
      >
        <SiGithub className="size-4" aria-hidden="true" />
      </a>
    </div>
  );

  return (
    <motion.article
      key={hydrated ? "hydrated" : "server"}
      initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className={
        view === "list"
          ? "focus-item group relative py-4"
          : "focus-item group relative"
      }
    >
      {view === "cards" ? (
        <>
          <Link
            href={`/projects/${project.slug}`}
            className="block aspect-video rounded-xl border border-border bg-surface p-1"
            aria-label={`View ${project.name} project details`}
          >
            <span className="relative block size-full overflow-hidden rounded-lg bg-background">
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="(max-width: 639px) calc(100vw - 2.5rem), 300px"
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </span>
          </Link>

          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-sm font-medium tracking-[-0.02em] sm:text-[15px]">
              <Link href={`/projects/${project.slug}`} className="traveling-link">
                {project.name}
              </Link>
            </h3>

            {projectLinks}
          </div>

          <p className="mt-1.5 text-[12px] leading-[1.55] text-muted sm:text-[13px]">
            {project.description}
          </p>
        </>
      ) : (
        <>
          <div className="mb-1 flex items-start justify-between gap-3">
            <h3 className="text-base font-medium tracking-[-0.02em]">
              <Link href={`/projects/${project.slug}`} className="traveling-link">
                {project.name}
              </Link>
            </h3>
            {projectLinks}
          </div>

          <p className="max-w-[560px] text-[13px] leading-5 text-muted">{project.description}</p>
          <div className="pointer-events-none absolute inset-x-[-10px] inset-y-2 -z-10 rounded-lg bg-surface opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </>
      )}
    </motion.article>
  );
}
