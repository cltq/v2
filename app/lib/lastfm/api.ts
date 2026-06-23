import type { LastFmTopTracksResponse, LastFmTopArtistsResponse, LastFmPeriod } from "@/app/lib/lastfm/types";

const BASE_URL = "/api/lastfm";

export async function fetchTopTracks(
  period: LastFmPeriod = "1month",
  limit: number = 5
): Promise<LastFmTopTracksResponse> {
  const url = `${BASE_URL}?method=user.gettoptracks&period=${period}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch top tracks");
  return res.json();
}

export async function fetchTopArtists(
  period: LastFmPeriod = "1month",
  limit: number = 5
): Promise<LastFmTopArtistsResponse> {
  const url = `${BASE_URL}?method=user.gettopartists&period=${period}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch top artists");
  return res.json();
}
