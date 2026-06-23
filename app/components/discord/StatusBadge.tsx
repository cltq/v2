"use client";

import { motion } from "framer-motion";
import type { DiscordStatus } from "@/app/lib/discord/types";

interface StatusBadgeProps {
  status: DiscordStatus;
  animated?: boolean;
  size?: number;
}

const STATUS_COLORS: Record<DiscordStatus, string> = {
  online: "#3BA55D",
  idle: "#FAA61A",
  dnd: "#ED4245",
  offline: "#747F8D",
};

const STATUS_LABELS: Record<DiscordStatus, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

const STATUS_ICONS: Record<DiscordStatus, ((s: number) => React.ReactNode) | null> = {
  online: null,
  idle: (s) => (
    <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 24 24" fill="white">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ),
  dnd: (s) => (
    <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth={3.5} strokeLinecap="round">
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  ),
  offline: (s) => (
    <svg width={s * 0.55} height={s * 0.55} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  ),
};

export function StatusBadge({
  status,
  animated = true,
  size = 16,
}: StatusBadgeProps) {
  const color = STATUS_COLORS[status];
  const iconSize = size * 0.55;
  const StatusIcon = STATUS_ICONS[status];

  if (!animated) {
    return (
      <span
        className="relative inline-flex shrink-0"
        style={{ width: size + 4, height: size + 4 }}
        aria-label={STATUS_LABELS[status]}
      >
        <span
          className="absolute rounded-full flex items-center justify-center"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {StatusIcon?.(iconSize)}
        </span>
      </span>
    );
  }

  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size + 4, height: size + 4 }}
      aria-label={STATUS_LABELS[status]}
    >
      <motion.span
        className="absolute rounded-full flex items-center justify-center"
        style={{
          backgroundColor: color,
          width: size,
          height: size,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: status === "online" ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {StatusIcon?.(iconSize)}
      </motion.span>
      {status === "online" && (
        <motion.span
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            opacity: 0.4,
          }}
          animate={{
            scale: [1, 1.8],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </span>
  );
}

export function statusTransition(
  prevStatus: DiscordStatus,
  nextStatus: DiscordStatus
) {
  const colors = STATUS_COLORS;
  return {
    backgroundColor: [colors[prevStatus], colors[nextStatus]],
    transition: { duration: 0.3, ease: "easeInOut" },
  };
}
