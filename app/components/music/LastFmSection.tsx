"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTopTracks, fetchTopArtists } from "@/app/lib/lastfm/api";
import type { LastFmTrack, LastFmArtist, LastFmImage, TopItemType } from "@/app/lib/lastfm/types";

function TrackImage({ images }: { images: LastFmImage[] }) {
  const src = images?.find((i) => i["#text"])?.["#text"];
  if (!src) return <div className="h-12 w-12 shrink-0 rounded bg-zinc-800" />;
  return (
    <img src={src} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded object-cover" />
  );
}

function ArtistImage({ images }: { images: LastFmImage[] }) {
  const src = images?.find((i) => i["#text"])?.["#text"];
  if (!src) return <div className="h-12 w-12 shrink-0 rounded-full bg-zinc-800" />;
  return (
    <img src={src} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-full object-cover" />
  );
}

function TopTracksList({ tracks }: { tracks: LastFmTrack[] }) {
  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        {tracks.map((track, i) => (
          <motion.div
            key={track.name + track.artist.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="w-5 shrink-0 text-right text-sm text-zinc-600">{i + 1}</span>
            <TrackImage images={track.image} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base text-white">{track.name}</p>
              <p className="truncate text-sm text-zinc-500">{track.artist.name}</p>
            </div>
            <span className="shrink-0 text-sm text-zinc-600">{track.playcount}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function TopArtistsList({ artists }: { artists: LastFmArtist[] }) {
  return (
    <div className="space-y-2">
      <AnimatePresence mode="wait">
        {artists.map((artist, i) => (
          <motion.div
            key={artist.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="flex items-center gap-3"
          >
            <span className="w-5 shrink-0 text-right text-sm text-zinc-600">{i + 1}</span>
            <ArtistImage images={artist.image} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-base text-white">{artist.name}</p>
            </div>
            <span className="shrink-0 text-sm text-zinc-600">{artist.playcount}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function LastFmSection({ username }: { username: string }) {
  const [type, setType] = useState<TopItemType>("tracks");
  const [tracks, setTracks] = useState<LastFmTrack[]>([]);
  const [artists, setArtists] = useState<LastFmArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [tracksRes, artistsRes] = await Promise.all([
          fetchTopTracks("1month", 5),
          fetchTopArtists("1month", 5),
        ]);
        setTracks(tracksRes.toptracks.track);
        setArtists(artistsRes.topartists.artist);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <p className="mb-3 text-base text-zinc-500">Been listening to this month</p>
      <div className="mb-4 inline-flex rounded-lg border border-white/10 p-0.5">
        <button
          onClick={() => setType("tracks")}
          className={`rounded-md px-3 py-1 text-xs transition-colors duration-200 ${
            type === "tracks" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          tracks
        </button>
        <button
          onClick={() => setType("artists")}
          className={`rounded-md px-3 py-1 text-xs transition-colors duration-200 ${
            type === "artists" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          artists
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-4" />
              <div className="h-10 w-10 animate-pulse rounded bg-zinc-800" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3 w-28 animate-pulse rounded bg-zinc-800" />
                <div className="h-2.5 w-20 animate-pulse rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : type === "tracks" ? (
        <TopTracksList tracks={tracks} />
      ) : (
        <TopArtistsList artists={artists} />
      )}

      <a
        href={`https://www.last.fm/user/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-xs text-zinc-600 transition-colors duration-200 hover:text-zinc-400"
      >
        tracked via last.fm
      </a>
    </div>
  );
}
