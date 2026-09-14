"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useHydrated } from "@/app/components/use-hydrated";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const shouldAnimate = hydrated && !reduceMotion;

  if (pathname === "/") {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial={
        shouldAnimate
          ? { opacity: 0, filter: "blur(12px)", y: 8, scale: 0.995 }
          : false
      }
      animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: shouldAnimate ? "filter, opacity, transform" : "auto" }}
    >
      {children}
    </motion.div>
  );
}
