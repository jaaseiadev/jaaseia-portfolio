import type { Education } from "@/app/data/portfolio";

type EducationItemProps = {
  item: Education;
  view?: "list" | "cards";
};

export function EducationItem({ item, view = "list" }: EducationItemProps) {
  return (
    <article
      className={
        view === "cards"
          ? "rounded-xl border border-border bg-surface p-5 sm:p-6"
          : "py-6 sm:py-7"
      }
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="text-sm font-medium">{item.degree}</h3>
          <p className="mt-1 text-sm text-muted">{item.school}</p>
        </div>
        <div className="mt-2 shrink-0 text-left font-mono text-[10px] leading-5 text-faint sm:mt-0 sm:text-right">
          <p>{item.period}</p>
          <p>{item.location}</p>
        </div>
      </div>
      <p className="mt-4 max-w-[560px] text-sm leading-6 text-muted">{item.details}</p>
    </article>
  );
}
