"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTopTracks, fetchTopArtists } from "@/app/lib/lastfm/api";
import type { LastFmTrack, LastFmArtist, LastFmImage, TopItemType } from "@/app/lib/lastfm/types";

function toHttps(url: string): string {
  return url.replace(/^http:\/\//i, "https://");
}

function getBestImage(images: LastFmImage[]): string {
  const sizes = ["extralarge", "large", "medium", "small"];
  for (const size of sizes) {
    const img = images.find((i) => i.size === size);
    if (img && img["#text"]) return img["#text"];
  }
  return "";
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
            <span className="text-xs text-zinc-600 w-4 shrink-0 text-right">{i + 1}</span>
            {track.image && (
              <img
                src={toHttps(getBestImage(track.image))}
                alt=""
                className="w-10 h-10 rounded object-cover shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white truncate">{track.name}</p>
              <p className="text-xs text-zinc-500 truncate">{track.artist.name}</p>
            </div>
            <span className="text-xs text-zinc-600 shrink-0">{track.playcount}</span>
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
            <span className="text-xs text-zinc-600 w-4 shrink-0 text-right">{i + 1}</span>
            {artist.image && (
              <img
                src={toHttps(getBestImage(artist.image))}
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white truncate">{artist.name}</p>
            </div>
            <span className="text-xs text-zinc-600 shrink-0">{artist.playcount}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function LastFmSection() {
  const [type, setType] = useState<TopItemType>("tracks");
  const [tracks, setTracks] = useState<LastFmTrack[]>([]);
  const [artists, setArtists] = useState<LastFmArtist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (type === "tracks") {
          const res = await fetchTopTracks("1month", 5);
          setTracks(res.toptracks.track);
        } else {
          const res = await fetchTopArtists("1month", 5);
          setArtists(res.topartists.artist);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [type]);

  return (
    <div>
      <p className="text-sm text-zinc-500 mb-2">Been listening to this month</p>
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setType("tracks")}
          className={`text-xs px-2 py-0.5 rounded transition-colors duration-200 ${
            type === "tracks" ? "text-white bg-zinc-800" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          tracks
        </button>
        <button
          onClick={() => setType("artists")}
          className={`text-xs px-2 py-0.5 rounded transition-colors duration-200 ${
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
    </div>
  );
}
