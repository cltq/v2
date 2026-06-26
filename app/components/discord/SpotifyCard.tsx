"use client";

import { motion } from "framer-motion";
import type { SpotifyData } from "@/app/lib/discord/types";

interface SpotifyCardProps {
  spotify: SpotifyData;
  animated?: boolean;
  compact?: boolean;
}

export function SpotifyCard({ spotify, animated = true, compact = false }: SpotifyCardProps) {
  const albumArt = spotify.albumArt || spotify.cover || "";

  const iconSize = compact ? 28 : 64;

  const content = (
    <div className={`flex items-start ${compact ? "gap-2" : "gap-3"}`}>
      <div className={`relative shrink-0 rounded-lg overflow-hidden`}
        style={{ width: iconSize, height: iconSize }}
      >
        <img
            src={albumArt}
          alt={`${spotify.album} album art`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
      </div>

      <div className="flex-1 min-w-0">
        <p className={`${compact ? "text-[13px]" : "text-[15px]"} font-semibold text-white truncate leading-tight`}>
          {spotify.song}
        </p>
        <p className={`${compact ? "text-[12px]" : "text-[14px]"} text-zinc-400 truncate leading-tight`}>
          {spotify.artist}
        </p>
        {!compact && (
          <p className="text-[13px] text-zinc-500 truncate mt-0.5">
            {spotify.album}
          </p>
        )}
      </div>
    </div>
  );

  if (!animated) {
    if (spotify.trackUrl) {
      return (
        <a
          href={spotify.trackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      );
    }
    return content;
  }

  const motionCard = (
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

  if (spotify.trackUrl) {
    return (
      <a
        href={spotify.trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:opacity-80 transition-opacity duration-200"
      >
        {motionCard}
      </a>
    );
  }

  return motionCard;
}
