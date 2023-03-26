type Commit = {
  sha: string;
  author: { email: string; name: string };
  message: string;
  url: string;
  createdAt?: Date;
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
      <ul>
        {lastCommits.map(({ sha, author, message, createdAt, url }) => (
          <li key={`${sha}-${createdAt}`}>
            {author.name} - <a href={url}>{sha}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
