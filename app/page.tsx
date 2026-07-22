"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const DiscordWidget = dynamic(() => import("@/app/components/DiscordWidget"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-20 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    </div>
  ),
});

const InfiniteMarquee = dynamic(() => import("@/app/components/InfiniteMarquee"), {
  ssr: false,
});

import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";
import GitHubRepos from "@/app/components/GitHubRepos";
import Reveal from "@/app/components/Reveal";
import TechStack from "@/app/components/TechStack";
import GitHubContributions from "@/app/components/GitHubContributions";
import Footer from "@/components/Footer";
import AskModalController from "@/app/components/AskModalController";

export default function Home() {
  const githubUser = process.env.GITHUB_USERNAME ?? "";
  const githubBlacklist =
    process.env.GITHUB_BLACKLIST?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-svh flex-col items-center justify-center px-6 sm:px-8"
      >
        <div className="absolute top-12 left-0 w-full overflow-hidden pb-2 md:top-16">
          <InfiniteMarquee />
        </div>
        <div className="flex flex-col items-center gap-6">
          <DiscordWidget showSpotify={false} />
          <HeroText />
          <SocialIcons />
        </div>
        {/* Desktop: horizontal at center bottom */}
        <div className="fixed bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 text-xs text-zinc-400 md:flex">
          <span>scroll</span>
          <svg
            className="size-3"
            style={{ animation: "bounce-down 1.5s ease-in-out infinite" }}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" />
          </svg>
        </div>
        {/* Mobile: vertical on right */}
        <div className="fixed top-1/2 right-3 z-20 flex -translate-y-1/2 flex-col items-center gap-3 text-[11px] text-zinc-400 md:hidden">
          <svg
            className="size-3"
            style={{ animation: "bounce-down 1.5s ease-in-out infinite" }}
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" />
          </svg>
          <span className="tracking-widest uppercase" style={{ writingMode: "vertical-rl" }}>
            scroll
          </span>
        </div>
      </section>

      {/* Music */}
      {/* <section
        id="music"
        className="min-h-svh flex items-center justify-center px-8"
      >
        <Reveal className="flex flex-col gap-10 max-w-4xl w-full">
          <CurrentlyPlaying />
          <LastFmSection username="" />
        </Reveal>
      </section> */}

      {/* Development */}
      <section
        id="development"
        className="flex items-center justify-center px-4 pt-12 pb-16 sm:px-8"
      >
        <Reveal className="flex w-full max-w-4xl flex-col items-center gap-12 sm:gap-16">
          <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Development
          </h2>

          <div className="flex w-full flex-col items-center gap-3 sm:gap-4">
            <h3 className="text-xs font-medium tracking-wide text-zinc-400 uppercase sm:text-sm">
              Stacks
            </h3>
            <TechStack />
          </div>

          <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
            <h3 className="text-xs font-medium tracking-wide text-zinc-400 uppercase sm:text-sm">
              Contributions
            </h3>
            <GitHubContributions username={githubUser} />
          </div>

          <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
            <h3 className="text-xs font-medium tracking-wide text-zinc-400 uppercase sm:text-sm">
              Projects
            </h3>
            <GitHubRepos username={githubUser} blacklist={githubBlacklist} />
          </div>
        </Reveal>
      </section>

      <div className="h-32" />

      <Footer />

      <Suspense>
        <AskModalController />
      </Suspense>
    </div>
  );
}
