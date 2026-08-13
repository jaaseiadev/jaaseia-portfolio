import type { Education } from "@/app/data/portfolio";

export function EducationItem({ item }: { item: Education }) {
  return (
    <article className="py-7 sm:py-8">
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
