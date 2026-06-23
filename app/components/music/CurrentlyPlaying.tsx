"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchDiscordSpotify } from "@/app/lib/discord/api";
import { SpotifyCard } from "@/app/components/discord/SpotifyCard";
import type { SpotifyData } from "@/app/lib/discord/types";

export default function CurrentlyPlaying() {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = process.env.DISCORD_USERID || "";
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        const data = await fetchDiscordSpotify(userId);
        setSpotify(data);
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
      <p className="text-sm text-zinc-500 mb-3">Currently playing song on Spotify</p>
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-zinc-800 animate-pulse shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-24 rounded bg-zinc-800 animate-pulse" />
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
  );
}
