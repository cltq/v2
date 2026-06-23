export interface LastFmImage {
  "#text": string;
  size: string;
}

export interface LastFmTrack {
  name: string;
  artist: {
    name: string;
    url: string;
  };
  url: string;
  image: LastFmImage[];
  playcount: string;
}

export interface LastFmArtist {
  name: string;
  url: string;
  image: LastFmImage[];
  playcount: string;
}

export interface LastFmTopTracksResponse {
  toptracks: {
    track: LastFmTrack[];
  };
}

export interface LastFmTopArtistsResponse {
  topartists: {
    artist: LastFmArtist[];
  };
}

export interface LastFmNowPlaying {
  recenttracks: {
    track: Array<{
      name: string;
      artist: { name: string };
      album: { "#text": string };
      image: LastFmImage[];
      "@attr"?: { nowplaying: string };
    }>;
  };
}

export type LastFmPeriod = "overall" | "7day" | "1month" | "3month" | "6month" | "12month";

export type TopItemType = "tracks" | "artists";
