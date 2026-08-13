export type CollectionView = "list" | "cards";

type ViewSwitchProps = {
  view: CollectionView;
  onChange: (view: CollectionView) => void;
  label: string;
};

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

export function ViewSwitch({ view, onChange, label }: ViewSwitchProps) {
  return (
    <div className="project-view-switch" role="group" aria-label={label}>
      <button
        type="button"
        className="project-view-button"
        data-active={view === "list"}
        aria-label="List view"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
      >
        <ListIcon />
      </button>
      <button
        type="button"
        className="project-view-button"
        data-active={view === "cards"}
        aria-label="Cards view"
        aria-pressed={view === "cards"}
        onClick={() => onChange("cards")}
      >
        <CardsIcon />
      </button>
    </div>
  );
}
