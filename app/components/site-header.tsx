"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/app/components/theme-toggle";

const workLinks = [
  { label: "Uses", href: "/uses" },
  { label: "Projects", href: "/projects" },
  { label: "Crafts", href: "/crafts" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/education" },
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
  const [workOpen, setWorkOpen] = useState(false);
  const workMenuRef = useRef<HTMLDivElement>(null);
  const isWorkRoute = workLinks.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  useEffect(() => {
    if (!workOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!workMenuRef.current?.contains(event.target as Node)) {
        setWorkOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWorkOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [workOpen]);

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
            onMouseEnter={() => setWorkOpen(true)}
            onMouseLeave={() => setWorkOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setWorkOpen(false);
            }}
          >
            <button
              type="button"
              className="nav-link inline-flex items-center gap-1"
              data-active={isWorkRoute}
              aria-haspopup="menu"
              aria-expanded={workOpen}
              onClick={() => setWorkOpen((open) => !open)}
            >
              Work
              <ChevronDownIcon />
            </button>

            <div
              className="work-menu"
              data-open={workOpen}
              role="menu"
              aria-hidden={!workOpen}
            >
              {workLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  tabIndex={workOpen ? 0 : -1}
                  className="work-menu-link"
                  data-active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  onClick={() => setWorkOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
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
