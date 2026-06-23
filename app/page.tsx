import DiscordWidget from "@/app/components/DiscordWidget";
import HeroText from "@/app/components/HeroText";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="flex min-h-screen items-center justify-between p-8">
      <HeroText />
      <DiscordWidget userId={userId} showSpotify={false} />
    </main>
  );
}
