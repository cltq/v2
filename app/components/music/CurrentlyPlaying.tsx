"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchDiscordPresence } from "@/app/lib/discord/api";
import { SpotifyCard } from "@/app/components/discord/SpotifyCard";
import type { SpotifyData } from "@/app/lib/discord/types";

export default function CurrentlyPlaying() {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchDiscordPresence();
        setSpotify(data.spotify ?? null);
      } catch {
        setSpotify(null);
      } finally {
        setLoading(false);
      }
    };

    fetch();
    const interval = setInterval(fetch, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p className="mb-3 text-base text-zinc-500">Currently playing song on Spotify</p>
      <div className="rounded-xl border border-white/10 p-4">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 shrink-0 animate-pulse rounded-lg bg-zinc-800" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />
              <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
            </div>
          </div>
        ) : spotify ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SpotifyCard spotify={spotify} />
          </motion.div>
        ) : (
          <p className="text-sm text-zinc-500">Not playing anything right now</p>
        )}
      </div>
    </div>
  );
}
