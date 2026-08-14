"use client";

import { motion, useReducedMotion } from "framer-motion";
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
    <div className="flex shrink-0 gap-3 text-xs font-medium">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noreferrer"
        className="text-muted transition-colors hover:text-foreground"
      >
        GitHub ↗
      </a>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex gap-1 text-foreground"
      >
        Live site
        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
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
          ? "group relative py-4"
          : "group relative flex min-h-72 flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6"
      }
    >
      <div className="mb-1 flex items-start justify-between gap-3">
        <h3 className="text-base font-medium tracking-[-0.02em]">{project.name}</h3>
        {view === "list" ? projectLinks : null}
      </div>

      <p className="max-w-[560px] text-[13px] leading-5 text-muted">{project.description}</p>

      {view === "cards" ? (
        <div className="mt-auto flex flex-col gap-4 pt-6">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-faint" aria-label="Technology stack">
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          {projectLinks}
        </div>
      ) : null}
      {view === "list" ? (
        <div className="pointer-events-none absolute inset-x-[-10px] inset-y-2 -z-10 rounded-lg bg-surface opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      ) : null}
    </motion.article>
  );
}
