"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/app/components/project-card";
import type { Project, ProjectCategory } from "@/app/data/portfolio";

type ProjectsShowcaseProps = {
  profileImage: string;
  projects: Project[];
};

type ProjectView = "list" | "cards";

const categoryLabels: Record<ProjectCategory, string> = {
  personal: "Personal",
  group: "Group",
};

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <path d="M4 5h12M4 10h12M4 15h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CardsIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="size-4">
      <rect x="3" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="3" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProjectsShowcase({ profileImage, projects }: ProjectsShowcaseProps) {
  const [category, setCategory] = useState<ProjectCategory>("personal");
  const [view, setView] = useState<ProjectView>("list");
  const [menuOpen, setMenuOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const visibleProjects = projects.filter((project) => project.category === category);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <div>
      <div className="mb-7 flex items-center justify-between gap-3 sm:mb-8">
        <h2 className="project-heading">projects.</h2>

        <div className="flex items-center gap-2">
          <div className="project-filter-wrap" ref={filterRef}>
            <button
              type="button"
              className="project-filter"
              aria-label="Project category"
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Image
                src={profileImage}
                alt=""
                width={20}
                height={20}
                className="size-4 rounded-full object-cover grayscale"
              />
              <span>{categoryLabels[category]}</span>
              <ChevronDownIcon />
            </button>

            {menuOpen ? (
              <div className="project-filter-menu" role="listbox" aria-label="Project category">
                {(Object.keys(categoryLabels) as ProjectCategory[]).map((option) => (
                  <button
                    type="button"
                    role="option"
                    aria-selected={category === option}
                    className="project-filter-option"
                    data-selected={category === option}
                    key={option}
                    onClick={() => {
                      setCategory(option);
                      setMenuOpen(false);
                    }}
                  >
                    {categoryLabels[option]}
                    <span aria-hidden="true">{category === option ? "✓" : ""}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="project-view-switch" role="group" aria-label="Project view">
            <button
              type="button"
              className="project-view-button"
              data-active={view === "list"}
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <ListIcon />
            </button>
            <button
              type="button"
              className="project-view-button"
              data-active={view === "cards"}
              aria-label="Cards view"
              aria-pressed={view === "cards"}
              onClick={() => setView("cards")}
            >
              <CardsIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={view === "list" ? "divide-y divide-border" : "grid gap-3 sm:grid-cols-2"}>
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            index={index}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}
