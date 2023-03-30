import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "commits",
  description: "Check out my latest commits to see what I've been up to",
};

type Commit = {
  sha: string;
  author: { email: string; name: string };
  message: string;
  url: string;
  createdAt?: Date;
  repo: { name: string; url: string };
};

const MILLISECONDS_IN = {
  MINUTES: 60 * 1000,
  HOURS: 60 * 60 * 1000,
  DAYS: 24 * 60 * 60 * 1000,
  MONTHS: 30 * 24 * 60 * 60 * 1000,
};

const amountByUnits = (
  milliseconds: number,
  unit: keyof typeof MILLISECONDS_IN
) => {
  const amount = Math.floor(milliseconds / MILLISECONDS_IN[unit]);
  return amount > 0 ? amount : false;
};

const getReadableTimeAgo = (pastDate: Date) => {
  const timeDiff = +new Date() - +pastDate;

  let amount = amountByUnits(timeDiff, "MONTHS");
  if (amount) {
    return `${amount} ${amount > 1 ? "months" : "month"} ago`;
  }

  amount = amountByUnits(timeDiff, "DAYS");
  if (amount) {
    return `${amount} ${amount > 1 ? "days" : "day"} ago`;
  }

  amount = amountByUnits(timeDiff, "HOURS");
  if (amount) {
    return `${amount} ${amount > 1 ? "hours" : "hour"} ago`;
  }

  amount = amountByUnits(timeDiff, "MINUTES");
  if (amount) {
    return `${amount} ${amount > 1 ? "minutes" : "minute"} ago`;
  }
};

const Slash = () => (
  <span role="none" className="text-onBackgroundVariant mx-1.5">
    /
  </span>
);

export default async function LastCommits() {
  const lastCommits: Commit[] = await fetch(
    "https://api.github.com/users/xandjiji/events/public",
    { next: { revalidate: MILLISECONDS_IN.HOURS * 6 } }
  )
    .then((res) => res.json())
    .then((data: any[]) =>
      data
        .filter(({ type }) => type === "PushEvent")
        .map(({ payload, created_at }) =>
          payload.commits.map((commit: Commit) => ({
            ...commit,
            createdAt: created_at ? new Date(created_at) : undefined,
          }))
        )
        .flat()
        .filter(({ author }) => author.email === "xandjiji@gmail.com")
        .map((commit: Commit): Commit => {
          const [, , , , owner, repo] = commit.url.split("/");
          return {
            ...commit,
            url: `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
            repo: { name: repo, url: `https://github.com/${owner}/${repo}` },
          };
        })
    );

  return (
    <main>
      <ul className="grid gap-6">
        {lastCommits.map(({ sha, author, message, createdAt, url, repo }) => (
          <li key={`${sha}-${createdAt}`}>
            <p className="w-fit backticks">{message}</p>
            <span className="text-xs">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 text-xs"
              >
                {repo.name}
              </a>

              <Slash />

              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 text-xs"
              >
                {sha.slice(0, 7)}
              </a>

              <Slash />

              {!!createdAt && (
                <time
                  className="text-onBackgroundVariant"
                  dateTime={createdAt.toISOString()}
                >
                  {getReadableTimeAgo(createdAt)}
                </time>
              )}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
