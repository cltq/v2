"use client";

import { motion } from "framer-motion";
import type { SpotifyData } from "@/app/lib/discord/types";
import { normalizeDiscordCdnUrl } from "@/app/lib/discord/url";

interface SpotifyCardProps {
  spotify: SpotifyData;
  animated?: boolean;
}

export function SpotifyCard({ spotify, animated = true }: SpotifyCardProps) {
  const albumArtSrc = spotify.albumArt || spotify.cover || "";
  const albumArt = normalizeDiscordCdnUrl(albumArtSrc);

  const content = (
    <div className="flex items-start gap-3">
      <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
        <img
            src={albumArt}
          alt={`${spotify.album} album art`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-white truncate">
          {spotify.song}
        </p>
        <p className="text-[14px] text-zinc-400 truncate">
          {spotify.artist}
        </p>
        <p className="text-[13px] text-zinc-500 truncate mt-0.5">
          {spotify.album}
        </p>
      </div>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      key={`${spotify.song}-${spotify.artist}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {content}
    </motion.div>
  );
}
