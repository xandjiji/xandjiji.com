type Commit = {
  sha: string;
  author: { email: string; name: string };
  message: string;
  url: string;
  createdAt?: Date;
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

export default async function LastCommits() {
  const lastCommits: Commit[] = await fetch(
    "https://api.github.com/users/xandjiji/events"
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
        .map((commit: Commit) => {
          const [, , , , owner, repo] = commit.url.split("/");
          return {
            ...commit,
            url: `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
          };
        })
    );

  return (
    <main>
      <ul className="grid gap-4">
        {lastCommits.map(({ sha, author, message, createdAt, url }) => (
          <li key={`${sha}-${createdAt}`}>
            <p className="w-fit backticks">{message}</p>
            <span className="text-xs">
              <a href={url} className="shrink-0 text-xs">
                {sha.slice(0, 7)}
              </a>{" "}
              <span>{author.name}</span>{" "}
              {createdAt ? ` - ${getReadableTimeAgo(createdAt)}` : ""}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
