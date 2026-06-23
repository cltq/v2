import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";
import SocialIcons from "@/app/components/SocialIcons";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="flex min-h-screen items-center justify-center gap-40 p-8">
      <div />
      <div className="flex flex-col items-center gap-6">
        <DiscordWidget userId={userId} showSpotify={false} />
        <HeroText />
        <SocialIcons />
      </div>
    </main>
  );
}
