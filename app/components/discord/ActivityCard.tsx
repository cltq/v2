"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ActivityData } from "@/app/lib/discord/types";
import { normalizeDiscordCdnUrl } from "@/app/lib/discord/url";

interface ActivityCardProps {
  activity: ActivityData;
  animated?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  "0": "Playing",
  "1": "Streaming",
  "2": "Listening",
  "3": "Watching",
  "4": "Custom",
  "5": "Competing",
  Playing: "Playing",
  Streaming: "Streaming",
  Listening: "Listening",
  Watching: "Watching",
  Custom: "Custom",
  Competing: "Competing",
};

const TYPE_COLORS: Record<string, string> = {
  "0": "#5865F2",
  "1": "#9146FF",
  "2": "#1DB954",
  "3": "#FF73FA",
  "5": "#FAA61A",
  Playing: "#5865F2",
  Streaming: "#9146FF",
  Listening: "#1DB954",
  Watching: "#FF73FA",
  Competing: "#FAA61A",
};

function ActivityIcon({ activity }: { activity: ActivityData }) {
  const a = activity as unknown as Record<string, string | undefined>;
  const iconUrl = String(
    activity.icon ||
    activity.largeImage ||
    a["large_image"] ||
    activity.assets?.largeImage ||
    activity.assets?.large_image ||
    ""
  );
  const smallImageUrl = String(
    activity.smallImage ||
    a["small_image"] ||
    activity.assets?.smallImage ||
    activity.assets?.small_image ||
    ""
  );
  const largeText = String(
    activity.largeText ||
    a["large_text"] ||
    activity.assets?.largeText ||
    activity.assets?.large_text ||
    activity.name
  );
  const smallText = String(
    activity.smallText ||
    a["small_text"] ||
    activity.assets?.smallText ||
    activity.assets?.small_text ||
    ""
  );
  const largeImage = normalizeDiscordCdnUrl(iconUrl);
  const smallImage = normalizeDiscordCdnUrl(smallImageUrl);
  const [imgError, setImgError] = useState(false);
  const fallbackColor = TYPE_COLORS[String(activity.type)] || "#5865F2";

  if (largeImage && !imgError) {
    return (
      <div className="relative w-16 h-16 shrink-0">
        <img
          src={largeImage}
          alt={largeText}
          className="w-full h-full rounded-lg object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        {smallImage && (
          <img
            src={smallImage}
            alt={smallText}
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-solid border-zinc-700"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
      </div>
    );
  }

  return (
    <div
      className="relative w-16 h-16 shrink-0 rounded-lg flex items-center justify-center text-white text-xl font-bold"
      style={{ backgroundColor: fallbackColor }}
    >
      <span className="select-none">
        {activity.emoji?.name || activity.name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}

export function ActivityCard({ activity, animated = true }: ActivityCardProps) {
  const label = TYPE_LABELS[activity.type] ?? "Activity";

  const content = (
    <div className="flex items-start gap-3">
      <ActivityIcon activity={activity} />

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-zinc-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-[15px] font-semibold text-white truncate mt-0.5">
          {activity.emoji && (
            <span className="mr-1">
              {activity.emoji.animated ? (
                <img
                  src={`https://cdn.discordapp.com/emojis/${activity.emoji.id}.gif`}
                  alt={activity.emoji.name}
                  className="w-4 h-4 inline align-text-bottom"
                />
              ) : (
                <span className="inline-block align-text-bottom">
                  {activity.emoji.name}
                </span>
              )}
            </span>
          )}
          {activity.name}
        </p>
        {activity.details && (
          <p className="text-[14px] text-zinc-400 truncate mt-0.5">
            {activity.details}
          </p>
        )}
        {activity.state && (
          <p className="text-[14px] text-zinc-400 truncate">
            {activity.state}
          </p>
        )}
        {activity.timestamps?.end && (
          <p className="text-[13px] text-zinc-500 mt-0.5 tabular-nums">
            {formatActivityTime(activity.timestamps.end)}
          </p>
        )}
        {activity.party && (
          <p className="text-[13px] text-zinc-500 mt-0.5">
            {activity.party.size}/{activity.party.max}
          </p>
        )}
      </div>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

function formatActivityTime(endTimestamp: number): string {
  const remaining = endTimestamp - Date.now();
  if (remaining <= 0) return "Ended";

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }
  return `${minutes}m remaining`;
}

export function ActivityCycle({
  activities,
  animated = true,
}: {
  activities: ActivityData[];
  animated?: boolean;
}) {
  if (activities.length === 0) return null;

  if (activities.length === 1) {
    return <ActivityCard activity={activities[0]} animated={animated} />;
  }

  return (
    <div className="space-y-2">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} animated={animated} />
      ))}
    </div>
  );
}
