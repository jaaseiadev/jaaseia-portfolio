import { ArrowLink } from "@/app/components/arrow-link";
import { GitHubIcon } from "@/app/components/icons";
import { Reveal } from "@/app/components/reveal";
import { getGitHubActivity } from "@/app/data/github";

type GitHubActivityProps = {
  profileUrl: string;
  username: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  timeZone: "UTC",
});

const currentMonth = new Date().getUTCMonth();
const monthLabels = Array.from({ length: 12 }, (_, offset) =>
  monthFormatter.format(new Date(Date.UTC(2024, currentMonth + offset, 1))),
);

export async function GitHubActivitySection({
  profileUrl,
  username,
}: GitHubActivityProps) {
  const activity = await getGitHubActivity(username);

  return (
    <Reveal as="section" id="activity" delay={0.05}>
      <div className="py-5 sm:py-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-surface">
              <GitHubIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-medium">{activity?.login ?? username}</p>
              <p className="mt-0.5 text-xs text-faint">Last 365 days</p>
            </div>
          </div>

          {activity ? (
            <div className="text-right">
              <p className="font-mono text-lg leading-none tracking-[-0.04em]">
                {activity.totalContributions.toLocaleString("en")}
              </p>
              <p className="mt-1.5 text-[11px] text-faint">contributions</p>
            </div>
          ) : null}
        </div>

        {activity ? (
          <>
            <div
              className="contribution-heatmap"
              style={{
                gridTemplateColumns: `repeat(${activity.weeks.length}, minmax(0, 1fr))`,
              }}
              role="img"
              aria-label={`${activity.totalContributions.toLocaleString("en")} GitHub contributions in the last year`}
            >
              {activity.weeks.map((week, weekIndex) => (
                <div className="contribution-week" key={weekIndex}>
                  {week.days.map((day) => (
                    <span
                      className="contribution-day"
                      data-level={day.level}
                      key={day.date}
                      style={{ gridRow: day.weekday + 1 }}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${dateFormatter.format(new Date(`${day.date}T00:00:00Z`))}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="contribution-months" aria-hidden="true">
              {monthLabels.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-[11px] text-faint">Less to more activity</p>
              <ArrowLink href={activity.profileUrl} external>
                View GitHub profile
              </ArrowLink>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Contribution data is unavailable right now.</p>
            <ArrowLink href={profileUrl} external>
              View GitHub profile
            </ArrowLink>
          </div>
        )}
      </div>
    </Reveal>
  );
}
