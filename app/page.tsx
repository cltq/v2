"use client";

import dynamic from "next/dynamic";
import CurrentlyPlaying from "@/app/components/music/CurrentlyPlaying";
import LastFmSection from "@/app/components/music/LastFmSection";

const DiscordWidget = dynamic(() => import("@/app/components/DiscordWidget"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse shrink-0" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-zinc-800 animate-pulse" />
          <div className="h-3 w-20 rounded bg-zinc-800 animate-pulse" />
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
import Footer from "@/components/Footer";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";
  const githubUser = process.env.GITHUB_USERNAME ?? "";
  const githubBlacklist = process.env.GITHUB_BLACKLIST?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-svh flex flex-col items-center justify-center max-md:px-8 md:px-8"
      >
        <div className="absolute top-12 left-0 w-full overflow-hidden pb-2 md:top-16">
          <InfiniteMarquee />
        </div>
        <div className="flex flex-col items-center gap-6">
          <DiscordWidget userId={userId} showSpotify={false} />
          <HeroText />
          <SocialIcons />
        </div>
      </section>

      {/* Music */}
      <section
        id="music"
        className="min-h-svh flex items-center justify-center px-8"
      >
        <Reveal className="flex flex-col gap-10 max-w-4xl w-full">
          <CurrentlyPlaying />
          <LastFmSection username="" />
        </Reveal>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="flex items-center justify-center px-16 pt-4 pb-2"
      >
        <Reveal className="flex flex-col items-center gap-15 max-w-4xl w-full">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Projects
          </h2>
          <GitHubRepos username={githubUser} blacklist={githubBlacklist} />
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
