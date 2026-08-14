"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Experiment } from "@/app/data/portfolio";
import { useHydrated } from "@/app/components/use-hydrated";

type ExperimentCardProps = {
  experiment: Experiment;
  index: number;
  view?: "list" | "cards";
};

export function ExperimentCard({ experiment, index, view = "cards" }: ExperimentCardProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;

  return (
    <motion.a
      key={hydrated ? "hydrated" : "server"}
      href={experiment.url}
      target="_blank"
      rel="noreferrer"
      initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={shouldAnimate && view === "cards" ? { y: -2 } : undefined}
      className={
        view === "cards"
          ? "group relative min-h-32 rounded-xl border border-border bg-surface p-5"
          : "group flex items-start justify-between gap-5 py-4"
      }
    >
      {view === "cards" ? (
        <>
          <div className="pr-7">
            <h3 className="text-sm font-medium">{experiment.name}</h3>
            <p className="mt-1 text-xs leading-5 text-muted">{experiment.description}</p>
          </div>
          <span className="absolute right-5 top-5 text-sm text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
            ↗
          </span>
        </>
      ) : (
        <>
          <div>
            <h3 className="text-sm font-medium">{experiment.name}</h3>
            <p className="mt-1 max-w-[520px] text-xs leading-5 text-muted">
              {experiment.description}
            </p>
          </div>
          <span className="text-sm text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
            ↗
          </span>
        </>
      )}
    </motion.a>
  );
}
