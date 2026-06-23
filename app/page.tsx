import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";
import InfiniteMarquee from "@/app/components/InfiniteMarquee";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="relative flex min-h-screen flex-col md:ml-[-100px]">
      <div className="md:absolute md:left-[-100px] md:top-32 w-screen overflow-hidden pb-2 max-md:pl-14">
        <InfiniteMarquee />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 md:pt-32">
        <DiscordWidget userId={userId} showSpotify={false} />
        <HeroText />
        <SocialIcons />
      </div>
    </main>
  );
}
