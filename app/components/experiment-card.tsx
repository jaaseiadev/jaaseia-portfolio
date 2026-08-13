"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Experiment } from "@/app/data/portfolio";
import { useHydrated } from "@/app/components/use-hydrated";

type ExperimentCardProps = {
  experiment: Experiment;
  index: number;
};

export function ExperimentCard({ experiment, index }: ExperimentCardProps) {
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
      whileHover={shouldAnimate ? { y: -2 } : undefined}
      className="group flex min-h-40 flex-col justify-between rounded-lg border border-border bg-surface p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
          {experiment.tag}
        </span>
        <span className="text-sm text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
          ↗
        </span>
      </div>
      <div>
        <h3 className="text-sm font-medium">{experiment.name}</h3>
        <p className="mt-2 text-xs leading-5 text-muted">{experiment.description}</p>
      </div>
    </motion.a>
  );
}
