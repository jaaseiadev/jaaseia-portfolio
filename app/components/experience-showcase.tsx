import type { Experience } from "@/app/data/portfolio";

export function ExperienceShowcase({ experience }: { experience: Experience[] }) {
  return (
    <div>
      <h2 className="editorial-heading mb-3">Experience.</h2>
      <div className="focus-list divide-y divide-border">
        {experience.map((item) => (
          <a
            key={`${item.company}-${item.role}`}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="focus-item group block py-4"
          >
            <article className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div>
                <div className="flex items-start gap-2">
                  <h3 className="traveling-link text-sm font-medium">{item.role}</h3>
                  <span className="text-sm text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground">
                    ↗
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {item.company} · {item.employmentType}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[10px] leading-5 text-faint sm:text-right">
                <p>{item.period}</p>
                <p>{item.location}</p>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
}
