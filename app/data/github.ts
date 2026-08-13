import "server-only";

export type ContributionDay = {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
  weekday: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GitHubActivity = {
  login: string;
  profileUrl: string;
  totalContributions: number;
  weeks: ContributionWeek[];
};

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

type GitHubResponse = {
  data?: {
    user: {
      login: string;
      url: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: Array<{
            contributionDays: Array<{
              contributionCount: number;
              contributionLevel: ContributionLevel;
              date: string;
              weekday: number;
            }>;
          }>;
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const levelValue: Record<ContributionLevel, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const contributionQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      url
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function getGitHubActivity(
  username: string,
): Promise<GitHubActivity | null> {
  const token = process.env.GITHUB_TOKEN;

  if (!token || !username || username === "yourusername") {
    return null;
  }

  const now = new Date();
  const to = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );
  const from = new Date(to.getTime() - 365 * 24 * 60 * 60 * 1000);

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-activity",
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: {
          login: username,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      console.error(`GitHub activity request failed (${response.status}).`);
      return null;
    }

    const payload = (await response.json()) as GitHubResponse;
    const user = payload.data?.user;

    if (!user || payload.errors?.length) {
      console.error("GitHub activity request returned no contribution data.");
      return null;
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    return {
      login: user.login,
      profileUrl: user.url,
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) => ({
        days: week.contributionDays.map((day) => ({
          count: day.contributionCount,
          date: day.date,
          level: levelValue[day.contributionLevel],
          weekday: day.weekday,
        })),
      })),
    };
  } catch {
    console.error("GitHub activity request could not be completed.");
    return null;
  }
}
