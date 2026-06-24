"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTopTracks, fetchTopArtists } from "@/app/lib/lastfm/api";
import type { LastFmTrack, LastFmArtist, LastFmImage, TopItemType } from "@/app/lib/lastfm/types";

function TrackImage({ images }: { images: LastFmImage[] }) {
  const src = images?.find((i) => i["#text"])?.["#text"];
  if (!src) return <div className="w-12 h-12 rounded bg-zinc-800 shrink-0" />;
  return <img src={src} alt="" loading="lazy" className="w-12 h-12 rounded object-cover shrink-0" />;
}

function ArtistImage({ images }: { images: LastFmImage[] }) {
  const src = images?.find((i) => i["#text"])?.["#text"];
  if (!src) return <div className="w-12 h-12 rounded-full bg-zinc-800 shrink-0" />;
  return <img src={src} alt="" loading="lazy" className="w-12 h-12 rounded-full object-cover shrink-0" />;
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
            <span className="text-sm text-zinc-600 w-5 shrink-0 text-right">{i + 1}</span>
            <TrackImage images={track.image} />
            <div className="min-w-0 flex-1">
              <p className="text-base text-white truncate">{track.name}</p>
              <p className="text-sm text-zinc-500 truncate">{track.artist.name}</p>
            </div>
            <span className="text-sm text-zinc-600 shrink-0">{track.playcount}</span>
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
            <span className="text-sm text-zinc-600 w-5 shrink-0 text-right">{i + 1}</span>
            <ArtistImage images={artist.image} />
            <div className="min-w-0 flex-1">
              <p className="text-base text-white truncate">{artist.name}</p>
            </div>
            <span className="text-sm text-zinc-600 shrink-0">{artist.playcount}</span>
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
      <p className="text-base text-zinc-500 mb-3">Been listening to this month</p>
      <div className="inline-flex rounded-lg border border-white/10 p-0.5 mb-4">
        <button
          onClick={() => setType("tracks")}
          className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
            type === "tracks" ? "text-white bg-zinc-800" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          tracks
        </button>
        <button
          onClick={() => setType("artists")}
          className={`text-xs px-3 py-1 rounded-md transition-colors duration-200 ${
            type === "artists" ? "text-white bg-zinc-800" : "text-zinc-500 hover:text-zinc-300"
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
              <div className="w-10 h-10 rounded bg-zinc-800 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 w-28 rounded bg-zinc-800 animate-pulse" />
                <div className="h-2.5 w-20 rounded bg-zinc-800 animate-pulse" />
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
        className="mt-4 inline-block text-xs text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
      >
        tracked via last.fm
      </a>
    </div>
  );
}
