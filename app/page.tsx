import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";
import InfiniteMarquee from "@/app/components/InfiniteMarquee";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="relative grid h-full place-items-center">
      <div className="absolute top-12 left-0 w-full overflow-hidden pb-2 md:top-16">
        <InfiniteMarquee />
      </div>
      <div className="flex flex-col items-center gap-6 p-8">
        <DiscordWidget userId={userId} showSpotify={false} />
        <HeroText />
        <SocialIcons />
      </div>
    </main>
  );
}
