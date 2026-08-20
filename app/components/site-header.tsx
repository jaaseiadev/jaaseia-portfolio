"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotionConfig } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/app/components/theme-toggle";

const workLinks = [
  { label: "Uses", href: "/uses" },
  { label: "Projects", href: "/projects" },
  { label: "Crafts", href: "/crafts" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
];

const extrasLinks = [
  { label: "Certificates", href: "/certificates" },
];

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-3">
      <path
        d="m6 8 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotionConfig();
  const [workOpen, setWorkOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const workTriggerRef = useRef<HTMLButtonElement>(null);
  const extrasMenuRef = useRef<HTMLDivElement>(null);
  const isWorkRoute = workLinks.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  const isExtrasRoute = extrasLinks.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  useEffect(() => {
    if (!workOpen && !extrasOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!workMenuRef.current?.contains(target)) {
        setWorkOpen(false);
      }
      if (!extrasMenuRef.current?.contains(target)) {
        setExtrasOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (workOpen) workTriggerRef.current?.focus();
        setWorkOpen(false);
        setExtrasOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [extrasOpen, workOpen]);

  return (
    <header className="mx-auto w-full max-w-[680px] px-5 sm:px-8">
      <nav aria-label="Primary navigation" className="flex h-20 items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/"
            className="nav-link"
            data-active={pathname === "/"}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          <div
            ref={workMenuRef}
            className="work-menu-wrap"
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") {
                setExtrasOpen(false);
                setWorkOpen(true);
              }
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") setWorkOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setWorkOpen(false);
            }}
          >
            <button
              ref={workTriggerRef}
              type="button"
              className="nav-link inline-flex items-center gap-1"
              data-active={isWorkRoute}
              aria-haspopup="menu"
              aria-expanded={workOpen}
              aria-controls={workOpen ? "work-menu" : undefined}
              onClick={() => {
                setExtrasOpen(false);
                setWorkOpen((open) => !open);
              }}
            >
              Work
              <motion.span
                className="inline-flex"
                animate={{ rotate: workOpen ? 180 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ChevronDownIcon />
              </motion.span>
            </button>

            {workOpen && <span aria-hidden="true" className="work-menu-hover-bridge" />}

            <AnimatePresence initial={false}>
              {workOpen && (
                <motion.div
                  id="work-menu"
                  className="work-menu work-menu-motion"
                  role="menu"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0, x: "-50%" }
                      : { opacity: 0, x: "-50%", y: -5, scale: 0.97 }
                  }
                  animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0, x: "-50%" }
                      : { opacity: 0, x: "-50%", y: -4, scale: 0.98 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.01 : 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="work-menu-nub"
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1, rotate: 45 }}
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, rotate: 45 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.16,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  {workLinks.map((item, index) => (
                    <motion.div
                      key={item.href}
                      role="none"
                      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -2 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.14,
                        delay: prefersReducedMotion ? 0 : index * 0.02,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        role="menuitem"
                        className="work-menu-link"
                        data-active={
                          pathname === item.href || pathname.startsWith(`${item.href}/`)
                        }
                        onClick={() => setWorkOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            ref={extrasMenuRef}
            className="work-menu-wrap"
            onMouseEnter={() => {
              setWorkOpen(false);
              setExtrasOpen(true);
            }}
            onMouseLeave={() => setExtrasOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setExtrasOpen(false);
            }}
          >
            <button
              type="button"
              className="nav-link inline-flex items-center gap-1"
              data-active={isExtrasRoute}
              aria-haspopup="menu"
              aria-expanded={extrasOpen}
              onClick={() => {
                setWorkOpen(false);
                setExtrasOpen((open) => !open);
              }}
            >
              Extras
              <motion.span
                className="inline-flex"
                animate={{ rotate: extrasOpen ? 180 : 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ChevronDownIcon />
              </motion.span>
            </button>

            <div
              className="work-menu"
              data-open={extrasOpen}
              role="menu"
              aria-hidden={!extrasOpen}
            >
              {extrasLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  tabIndex={extrasOpen ? 0 : -1}
                  className="work-menu-link"
                  data-active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  onClick={() => setExtrasOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/resume.pdf"
                download
                role="menuitem"
                tabIndex={extrasOpen ? 0 : -1}
                className="work-menu-link"
                onClick={() => setExtrasOpen(false)}
              >
                Download Resume
              </a>
            </div>
          </div>

          <Link
            href="/contact"
            className="nav-link"
            data-active={pathname === "/contact"}
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </div>

        <ThemeToggle />
      </nav>
    </header>
  );
}
