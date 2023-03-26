import { Octokit } from "octokit";

const githubClient = new Octokit();

type Commit = {
  sha: string;
  author: { email: string; name: string };
  message: string;
  url: string;
  createdAt?: Date;
};

export default async function LastCommits() {
  const result = await githubClient.request(
    "GET /users/{username}/events/public",
    { username: "xandjiji" }
  );

  const lastCommits = result.data
    .filter(({ type }) => type === "PushEvent")
    .map(({ payload, created_at }) =>
      (payload as typeof payload & { commits: Commit[] }).commits.map(
        (commit) =>
          created_at ? { ...commit, createdAt: new Date(created_at) } : commit
      )
    )
    .flat()
    .filter(({ author }) => author.email === "xandjiji@gmail.com");

  return <main>This is the last commits</main>;
}
