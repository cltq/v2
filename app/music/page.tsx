import CurrentlyPlaying from "@/app/components/music/CurrentlyPlaying";
import LastFmSection from "@/app/components/music/LastFmSection";

export default function MusicPage() {
  const lastfmUser = process.env.LASTFM_USER ?? "";

  return (
    <main className="flex min-h-dvh items-center justify-center p-8 md:ml-[-100px]">
      <div className="flex flex-col gap-10 max-w-4xl w-full">
        <CurrentlyPlaying />
        <LastFmSection username={lastfmUser} />
      </div>
    </main>
  );
}
