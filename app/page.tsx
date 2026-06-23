import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";
import InfiniteMarquee from "@/app/components/InfiniteMarquee";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="flex min-h-screen flex-col md:ml-[-100px]">
      <div className="pt-32 -mb-32">
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
