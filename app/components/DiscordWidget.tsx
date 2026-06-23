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

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp * 1000;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
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

  const widgetClasses = [
    "p-0 w-full max-w-lg",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const timeAgo = presence?.updatedAt
    ? formatRelativeTime(presence.updatedAt)
    : null;

  if (loading) {
    return (
      <div className={widgetClasses}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-tertiary animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-28 rounded bg-tertiary animate-pulse" />
            <div className="h-3 w-20 rounded bg-tertiary animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !presence) {
    return (
      <div className={widgetClasses}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-tertiary flex items-center justify-center text-muted text-lg shrink-0">
            ?
          </div>
          <div className="flex-1">
            <p className="text-[13px] text-secondary">
              {error ? "Failed to load presence" : "No presence data"}
            </p>
            <p className="text-[11px] text-muted mt-0.5">
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={presence.id}
        className={`${widgetClasses} overflow-hidden`}
        initial={animated ? { opacity: 0, y: 20, scale: 0.96 } : undefined}
        animate={animated ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={
          animated
            ? { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
            : undefined
        }
      >
        {presence.banner && (
          <div
            className="relative -mx-5 -mt-5 mb-5 h-24 sm:h-28 bg-cover bg-center bg-[#0b0b0f]"
            style={{
              backgroundImage: `url(${normalizeDiscordCdnUrl(presence.banner)})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0b0b0f]/60" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img
              src={normalizeDiscordCdnUrl(presence.avatar)}
              alt={`${presence.username}'s avatar`}
              width={compact ? 52 : 64}
              height={compact ? 52 : 64}
              className="rounded-full object-cover ring-0"
              style={{ width: compact ? 52 : 64, height: compact ? 52 : 64 }}
            />
            <span className="absolute -bottom-0.5 -right-0.5">
              <StatusBadge
                status={presence.status}
                animated={animated}
                size={compact ? 16 : 18}
              />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[18px] font-bold text-primary truncate">
                {presence.displayName || presence.username}
              </h3>
              {presence.primaryGuild?.identityEnabled && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-tertiary text-[11px] font-medium text-secondary leading-none shrink-0">
                  {presence.primaryGuild.badge && (
                    <img
                      src={normalizeDiscordCdnUrl(
                        `https://cdn.discordapp.com/icons/${presence.primaryGuild.identityGuildId}/${presence.primaryGuild.badge}.png`
                      )}
                      alt=""
                      className="w-3.5 h-3.5 rounded-sm object-cover"
                    />
                  )}
                  {presence.primaryGuild.tag}
                </span>
              )}
            </div>
            {presence.displayName && presence.displayName !== presence.username && (
              <p className="text-[14px] text-secondary truncate">
                @{presence.username}
              </p>
            )}
          </div>
        </div>

        {customStatus && (
          <motion.div
            className="mt-4 px-4 py-2.5 rounded-lg bg-secondary border border-default"
            initial={animated ? { opacity: 0, height: 0 } : undefined}
            animate={animated ? { opacity: 1, height: "auto" } : undefined}
            transition={
              animated ? { duration: 0.3, ease: "easeOut" } : undefined
            }
          >
            <p className="text-[15px] text-secondary leading-snug">
              {customStatus.emoji && (
                <span className="mr-1">{customStatus.emoji}</span>
              )}
              {customStatus.text}
            </p>
          </motion.div>
        )}

        <div className="mt-4 space-y-2">
          <AnimatePresence mode="sync">
            {showSpotifySection && (
              <SpotifyCard
                key="spotify"
                spotify={presence.spotify!}
                animated={animated}
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
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
