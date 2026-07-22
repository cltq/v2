import type {
  ApiResponse,
  DiscordPresence,
  DiscordProfile,
  DiscordStatusData,
  DiscordBadge,
  DiscordGuild,
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
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<DiscordPresence> {
  const url = `${getBaseUrl(baseUrl)}/`;
  const json = await fetchJson<ApiResponse<DiscordPresence>>(url, signal);
  return json.data;
}

export async function fetchDiscordProfile(
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<DiscordProfile> {
  const url = `${getBaseUrl(baseUrl)}/profile`;
  const json = await fetchJson<ApiResponse<DiscordProfile>>(url, signal);
  return json.data;
}

export async function fetchDiscordStatus(
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<DiscordStatusData> {
  const url = `${getBaseUrl(baseUrl)}/status`;
  const json = await fetchJson<ApiResponse<DiscordStatusData>>(url, signal);
  return json.data;
}

export async function fetchDiscordBadges(
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<{ badges: DiscordBadge[]; publicFlags: number }> {
  const url = `${getBaseUrl(baseUrl)}/badges`;
  const json = await fetchJson<
    ApiResponse<{ badges: DiscordBadge[]; publicFlags: number }>
  >(url, signal);
  return json.data;
}

export async function fetchDiscordGuild(
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<DiscordGuild> {
  const url = `${getBaseUrl(baseUrl)}/guild`;
  const json = await fetchJson<ApiResponse<DiscordGuild>>(url, signal);
  return json.data;
}

export async function fetchDiscordHealth(
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<{ status: string }> {
  const url = `${getBaseUrl(baseUrl)}/../health`;
  const json = await fetchJson<ApiResponse<{ status: string }>>(url, signal);
  return json.data;
}
