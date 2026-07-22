import type { GitHubRepo } from "@/app/lib/github/types";

const BASE_URL = "https://api.github.com";

export async function fetchPublicRepos(username: string, limit: number = 6): Promise<GitHubRepo[]> {
  const url = `${BASE_URL}/users/${username}/repos?sort=updated&per_page=${limit * 2}`;
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const all: GitHubRepo[] = await res.json();
  return all.filter((r) => !r.fork).slice(0, limit);
}
