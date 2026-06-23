import DiscordWidget from "@/app/components/DiscordWidget";

export default function Home() {
  const userId = process.env.DISCORD_USERID ?? "";

  return (
    <main className="flex min-h-screen items-center justify-end p-8">
      <DiscordWidget userId={userId} showSpotify={false} />
    </main>
  );
}
