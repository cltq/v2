import CurrentlyPlaying from "@/app/components/music/CurrentlyPlaying";
import LastFmSection from "@/app/components/music/LastFmSection";

export default function MusicPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 md:ml-[-100px]">
      <div className="flex flex-col gap-10 max-w-lg w-full">
        <CurrentlyPlaying />
        <LastFmSection />
      </div>
    </main>
  );
}
