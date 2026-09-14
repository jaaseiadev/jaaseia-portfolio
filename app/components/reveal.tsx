"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHydrated } from "@/app/components/use-hydrated";

type RevealProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  as?: "div" | "section";
};

export function Reveal({
  children,
  className,
  id,
  delay = 0,
  as = "div",
}: RevealProps) {
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  const shouldAnimate = hydrated && !reduceMotion;

  return (
    <Component
      id={id}
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
      whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
