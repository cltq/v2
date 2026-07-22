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
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg`}
        style={{ width: iconSize, height: iconSize }}
      >
        <img
          src={albumArt}
          alt={`${spotify.album} album art`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 ring-inset" />
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`${compact ? "text-[13px]" : "text-[15px]"} truncate leading-tight font-semibold text-white`}
        >
          {spotify.song}
        </p>
        <p
          className={`${compact ? "text-[12px]" : "text-[14px]"} truncate leading-tight text-zinc-400`}
        >
          {spotify.artist}
        </p>
        {!compact && <p className="mt-0.5 truncate text-[13px] text-zinc-500">{spotify.album}</p>}
      </div>
    </div>
  );

  if (!animated) {
    if (spotify.trackUrl) {
      return (
        <a href={spotify.trackUrl} target="_blank" rel="noopener noreferrer" className="block">
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
        className="block transition-opacity duration-200 hover:opacity-80"
      >
        {motionCard}
      </a>
    );
  }

  return motionCard;
}
