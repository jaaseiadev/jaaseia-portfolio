"use client";

import { useState } from "react";
import { EducationItem } from "@/app/components/education-item";
import { ExperimentCard } from "@/app/components/experiment-card";
import { ViewSwitch, type CollectionView } from "@/app/components/view-switch";
import type { Education, Experiment } from "@/app/data/portfolio";

function CollectionHeader({
  title,
  view,
  onViewChange,
}: {
  title: string;
  view: CollectionView;
  onViewChange: (view: CollectionView) => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="editorial-heading">{title}.</h2>
      <ViewSwitch view={view} onChange={onViewChange} label={`${title} view`} />
    </div>
  );
}

export function ExperimentsShowcase({ experiments }: { experiments: Experiment[] }) {
  const [view, setView] = useState<CollectionView>("list");

  return (
    <div>
      <CollectionHeader title="Crafts" view={view} onViewChange={setView} />
      <div className={view === "cards" ? "grid gap-3 sm:grid-cols-2" : "divide-y divide-border"}>
        {experiments.map((experiment, index) => (
          <ExperimentCard
            key={experiment.name}
            experiment={experiment}
            index={index}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}

export function EducationShowcase({ education }: { education: Education[] }) {
  const [view, setView] = useState<CollectionView>("list");

  return (
    <div>
      <CollectionHeader title="Education" view={view} onViewChange={setView} />
      <div className={view === "cards" ? "grid gap-3 sm:grid-cols-2" : "divide-y divide-border"}>
        {education.map((item) => (
          <EducationItem
            key={`${item.school}-${item.degree}`}
            item={item}
            view={view}
          />
        ))}
      </div>
    </div>
  );
}
