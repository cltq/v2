"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useDiscordPresence } from "@/app/hooks/useDiscordPresence";
import { StatusBadge } from "@/app/components/discord/StatusBadge";
import { SpotifyCard } from "@/app/components/discord/SpotifyCard";
import { ActivityCycle } from "@/app/components/discord/ActivityCard";
import type { DiscordWidgetProps } from "@/app/lib/discord/types";
import { normalizeDiscordCdnUrl } from "@/app/lib/discord/url";

function parseCustomStatus(
  cs: string | { text?: string; emoji?: { name?: string } | null } | null | undefined
): { text: string; emoji?: string } | null {
  if (!cs) return null;
  if (typeof cs === "string") {
    return cs ? { text: cs } : null;
  }
  const text = cs.text || "";
  if (!text) return null;
  return {
    text,
    emoji: cs.emoji?.name || undefined,
  };
}

export default function DiscordWidget({
  userId: userIdProp,
  showSpotify = true,
  showActivities = true,
  showCustomStatus = true,
  animated = true,
  compact = false,
  className = "",
  apiBaseUrl,
}: DiscordWidgetProps) {
  const userId = (userIdProp || process.env.DISCORD_USERID || "").trim();
  const { presence, loading, error } = useDiscordPresence(userId, {
    apiBaseUrl,
  });

  if (loading) {
    return (
      <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 animate-pulse shrink-0" />
          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-20 rounded bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !presence) {
    return (
      <div className={`flex flex-col md:flex-row gap-4 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-lg shrink-0">
            ?
          </div>
          <div>
            <p className="text-[13px] text-zinc-400">
              {error ? "Failed to load presence" : "No presence data"}
            </p>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              {error?.message ?? "User may not exist"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const customStatus = showCustomStatus
    ? parseCustomStatus(presence.customStatus)
    : null;

  const showSpotifySection = showSpotify && presence.spotify;
  const showActivitySection =
    showActivities && presence.activities.length > 0;
  const hasPresence = customStatus || showSpotifySection || showActivitySection;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={presence.id}
        className={`flex flex-col md:flex-row md:items-center gap-x-6 gap-y-2 ${className}`}
        initial={animated ? { opacity: 0, y: 20 } : undefined}
        animate={animated ? { opacity: 1, y: 0 } : undefined}
        transition={
          animated
            ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            : undefined
        }
      >
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <img
              src={normalizeDiscordCdnUrl(presence.avatar)}
              alt={`${presence.username}'s avatar`}
              width={compact ? 40 : 44}
              height={compact ? 40 : 44}
              className="rounded-full object-cover"
              style={{ width: compact ? 40 : 44, height: compact ? 40 : 44 }}
            />
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusBadge
                status={presence.status}
                animated={animated}
                size={compact ? 12 : 13}
              />
            </span>
          </div>

          <div>
            <p className="text-[14px] font-medium text-white leading-tight">
              {presence.displayName || presence.username}
            </p>
            {presence.displayName && presence.displayName !== presence.username && (
              <p className="text-[12px] text-zinc-500 leading-tight">
                @{presence.username}
              </p>
            )}
          </div>
        </div>

        {hasPresence && (
          <div className="flex flex-col gap-1 min-w-0 max-w-56">
            {customStatus && (
              <p className="text-[13px] text-zinc-400 leading-tight truncate">
                {customStatus.emoji && <span className="mr-1">{customStatus.emoji}</span>}
                {customStatus.text}
              </p>
            )}
            <AnimatePresence mode="sync">
              {showSpotifySection && (
                <SpotifyCard
                  key="spotify"
                  spotify={presence.spotify!}
                  animated={animated}
                  compact
                />
              )}
            </AnimatePresence>
            <AnimatePresence mode="sync">
              {showActivitySection && (
                <motion.div
                  key="activities"
                  initial={animated ? { opacity: 0 } : undefined}
                  animate={animated ? { opacity: 1 } : undefined}
                  transition={
                    animated ? { duration: 0.3, delay: 0.1 } : undefined
                  }
                >
                  <ActivityCycle
                    activities={presence.activities}
                    animated={animated}
                    compact
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
