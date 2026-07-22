"use client";

import { motion } from "framer-motion";

export default function GitHubContributions({ username }: { username: string }) {
  if (!username) return null;

  const params = new URLSearchParams({
    username,
    bg_color: "000000",
    color: "9ca3af",
    line: "27272a",
    point: "ffffff",
    area_color: "000000",
    area: "true",
    hide_border: "true",
    hide_title: "true",
    custom_title: "Contributions",
    radius: "8",
    height: "300",
    days: "30",
  });

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={`https://github-readme-activity-graph.vercel.app/graph?${params.toString()}`}
          alt={`${username}'s contribution graph`}
          className="w-full rounded-xl"
        />
      </motion.div>

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-zinc-600 transition-colors duration-200 hover:text-zinc-400"
      >
        view full profile on github
      </a>
    </div>
  );
}
