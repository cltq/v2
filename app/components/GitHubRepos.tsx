"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchPublicRepos } from "@/app/lib/github/api";
import type { GitHubRepo } from "@/app/lib/github/types";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Lua: "#000080",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PHP: "#4F5D95",
  Zig: "#ec915c",
};

function RepoCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const color = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#9ca3af") : "#9ca3af";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="group flex flex-col justify-between rounded-xl border border-white/10 p-5 transition-all duration-200 hover:border-white/60 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
    >
      <div>
        <p className="truncate text-[15px] font-medium text-white transition-colors duration-200 group-hover:text-white">
          {repo.name}
        </p>
        <p className="mt-1.5 line-clamp-2 min-h-[2.6em] text-[13px] text-zinc-500">
          {repo.description ?? "No description"}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-4 text-[12px] text-zinc-600">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
              <path d="M12 12v3" />
            </svg>
            {repo.forks_count}
          </span>
        )}
        {repo.topics.length > 0 && (
          <span className="ml-auto flex gap-1 overflow-hidden">
            {repo.topics.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] whitespace-nowrap text-zinc-500"
              >
                {t}
              </span>
            ))}
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function GitHubRepos({
  username,
  blacklist = [],
}: {
  username: string;
  blacklist?: string[];
}) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    fetchPublicRepos(username, 12)
      .then((all) => setRepos(all.filter((r) => !blacklist.includes(r.name)).slice(0, 6)))
      .catch(() => setRepos([]))
      .finally(() => setLoading(false));
  }, [username, blacklist]);

  if (!username) {
    return (
      <div>
        <p className="text-sm text-zinc-500">Configure GITHUB_USERNAME to show repos</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-white/10 p-5">
              <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
              <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
              <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <RepoCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      )}
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-zinc-600 transition-colors duration-200 hover:text-zinc-400"
      >
        view all on github
      </a>
    </div>
  );
}
