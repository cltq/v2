export type DiscordStatus = "online" | "idle" | "dnd" | "offline";

export type WidgetTheme = "dark" | "light" | "auto";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface DiscordAvatar {
  href: string;
  blurhash?: string;
}

export interface DiscordCustomStatus {
  text: string;
  emoji?: {
    name: string;
    id?: string;
    animated?: boolean;
  } | null;
}

export interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  albumArt?: string;
  cover?: string;
  startedAt?: number;
  endsAt?: number;
  progressMs?: number;
  duration?: number;
  trackId?: string;
}

export interface ActivityTimestamps {
  start?: number;
  end?: number;
}

export interface ActivityEmoji {
  name: string;
  id?: string;
  animated?: boolean;
}

export interface ActivityParty {
  size?: number;
  max?: number;
}

export interface ActivityAssets {
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
  large_image?: string;
  large_text?: string;
  small_image?: string;
  small_text?: string;
}

export interface ActivityData {
  id: string;
  name: string;
  type: number | string;
  details?: string;
  state?: string;
  applicationId?: string;
  icon?: string;
  largeImage?: string;
  largeText?: string;
  smallImage?: string;
  smallText?: string;
  assets?: ActivityAssets;
  timestamps?: ActivityTimestamps;
  emoji?: ActivityEmoji;
  party?: ActivityParty;
}

export interface DiscordPrimaryGuild {
  identityGuildId: string;
  identityEnabled: boolean;
  tag: string;
  badge: string;
}

export interface DiscordPresence {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner?: string;
  status: DiscordStatus;
  globalName?: string;
  customStatus?: string | DiscordCustomStatus | null;
  spotify?: SpotifyData | null;
  activities: ActivityData[];
  primaryGuild?: DiscordPrimaryGuild;
  updatedAt: number;
}

export interface DiscordWidgetProps {
  userId?: string;
  theme?: WidgetTheme;
  showSpotify?: boolean;
  showActivities?: boolean;
  showCustomStatus?: boolean;
  animated?: boolean;
  compact?: boolean;
  className?: string;
  apiBaseUrl?: string;
}
