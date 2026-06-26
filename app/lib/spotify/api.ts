import type { SpotifyData } from "@/app/lib/discord/types";

interface SpotifyApiResponse {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  progressMs: number;
  durationMs: number;
  trackUrl: string;
}

export async function fetchSpotify(signal?: AbortSignal): Promise<SpotifyData | null> {
  const res = await fetch("/api/spotify", {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    if (res.status === 204) return null;
    throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
  }
  const json: SpotifyApiResponse = await res.json();
  if (!json.isPlaying) return null;
  return {
    song: json.title,
    artist: json.artist,
    album: json.album,
    albumArt: json.albumImageUrl,
    progressMs: json.progressMs,
    duration: json.durationMs,
    trackUrl: json.trackUrl,
  };
}
