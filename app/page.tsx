"use client";

import dynamic from "next/dynamic";

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

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="relative h-full max-md:flex max-md:flex-col max-md:items-center max-md:justify-center md:grid md:place-items-center">
      <div className="absolute top-12 left-0 w-full overflow-hidden pb-2 md:top-16">
        <InfiniteMarquee />
      </div>
      <div className="flex flex-col items-center gap-6 max-md:w-full max-md:px-8 md:p-8">
        <DiscordWidget userId={userId} showSpotify={false} />
        <HeroText />
        <SocialIcons />
      </div>
    </main>
  );
}
