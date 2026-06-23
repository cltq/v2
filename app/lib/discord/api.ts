import type {
  ApiResponse,
  DiscordPresence,
  SpotifyData,
  ActivityData,
  DiscordAvatar,
  DiscordCustomStatus,
} from "@/app/lib/discord/types";

const DEFAULT_BASE = "/api/discord";

export function getBaseUrl(customBase?: string): string {
  if (customBase) return customBase;
  return DEFAULT_BASE;
}

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, {
    signal,
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchDiscordPresence(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<DiscordPresence> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}`;
  const json = await fetchJson<ApiResponse<DiscordPresence>>(url, signal);
  return json.data;
}

export async function fetchDiscordProfile(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<{
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/profile`;
  const json = await fetchJson<ApiResponse<{
    id: string;
    username: string;
    displayName: string;
    avatar: string;
  }>>(url, signal);
  return json.data;
}

export async function fetchDiscordActivities(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<ActivityData[]> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/activities`;
  const json = await fetchJson<ApiResponse<ActivityData[]>>(url, signal);
  return json.data;
}

export async function fetchDiscordSpotify(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<SpotifyData | null> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/spotify`;
  const json = await fetchJson<ApiResponse<SpotifyData | null>>(url, signal);
  return json.data;
}

export async function fetchDiscordCustomStatus(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<DiscordCustomStatus | null> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/status`;
  const json = await fetchJson<ApiResponse<DiscordCustomStatus | null>>(url, signal);
  return json.data;
}

export async function fetchDiscordAvatar(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<DiscordAvatar> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/avatar`;
  const json = await fetchJson<ApiResponse<DiscordAvatar>>(url, signal);
  return json.data;
}

export async function fetchDiscordPresenceSummary(
  userId: string,
  baseUrl?: string,
  signal?: AbortSignal
): Promise<DiscordPresence> {
  const url = `${getBaseUrl(baseUrl)}/users/${userId}/presence`;
  const json = await fetchJson<ApiResponse<DiscordPresence>>(url, signal);
  return json.data;
}

export async function fetchDiscordHealth(
  baseUrl?: string,
  signal?: AbortSignal
): Promise<{ status: string }> {
  const url = `${getBaseUrl(baseUrl)}/health`;
  const json = await fetchJson<ApiResponse<{ status: string }>>(url, signal);
  return json.data;
}
