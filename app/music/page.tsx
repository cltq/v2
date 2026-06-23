import CurrentlyPlaying from "@/app/components/music/CurrentlyPlaying";
import LastFmSection from "@/app/components/music/LastFmSection";

export default function MusicPage() {
  return (
    <main className="p-8 flex flex-col gap-10 max-w-lg">
      <CurrentlyPlaying />
      <LastFmSection />
    </main>
  );
}
