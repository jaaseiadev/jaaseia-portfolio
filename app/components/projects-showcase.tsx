"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/app/components/project-card";
import { ViewSwitch, type CollectionView } from "@/app/components/view-switch";
import type { Project, ProjectCategory } from "@/app/data/portfolio";

type ProjectsShowcaseProps = {
  profileImage: string;
  projects: Project[];
};

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

export function ProjectsShowcase({ profileImage, projects }: ProjectsShowcaseProps) {
  const [category, setCategory] = useState<ProjectCategory>("personal");
  const [view, setView] = useState<CollectionView>("list");
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
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="editorial-heading">Projects.</h2>

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

          <ViewSwitch view={view} onChange={setView} label="Project view" />
        </div>
      </div>

      <div
        className={
          view === "list"
            ? "focus-list divide-y divide-border"
            : "focus-list grid gap-x-5 gap-y-8 sm:grid-cols-2"
        }
      >
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
