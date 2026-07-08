import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";
import InfiniteMarquee from "@/app/components/InfiniteMarquee";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="relative flex min-h-170 flex-col">
      <div className="w-screen overflow-hidden pb-2 pt-12 md:pt-16">
        <InfiniteMarquee />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <DiscordWidget userId={userId} showSpotify={false} />
        <HeroText />
        <SocialIcons />
      </div>
    </main>
  );
}
