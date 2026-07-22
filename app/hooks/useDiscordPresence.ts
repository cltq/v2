"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { DiscordPresence } from "@/app/lib/discord/types";
import { fetchDiscordPresence, getBaseUrl } from "@/app/lib/discord/api";
import { SSEManager } from "@/app/lib/discord/sse";

interface UseDiscordPresenceOptions {
  apiBaseUrl?: string;
  pollInterval?: number;
}

interface UseDiscordPresenceReturn {
  presence: DiscordPresence | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDiscordPresence(
  userId: string,
  options: UseDiscordPresenceOptions = {},
): UseDiscordPresenceReturn {
  const [presence, setPresence] = useState<DiscordPresence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const sseRef = useRef<SSEManager<DiscordPresence> | null>(null);
  const userIdRef = useRef<string>(userId);
  userIdRef.current = userId;

  const baseUrl = options.apiBaseUrl;

  const fetchInitial = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const data = await fetchDiscordPresence(userIdRef.current, baseUrl, signal);
        setPresence(data);
        setError(null);
        return data;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return null;
        setError(err instanceof Error ? err : new Error(String(err)));
        return null;
      }
    },
    [baseUrl],
  );

  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchInitial();
    setLoading(false);
  }, [fetchInitial]);

  useEffect(() => {
    let aborted = false;
    const abortController = new AbortController();

    setLoading(true);
    setError(null);

    fetchInitial(abortController.signal).then(() => {
      if (!aborted) {
        setLoading(false);
      }
    });

    const sse = new SSEManager<DiscordPresence | { success: boolean; data: DiscordPresence }>();
    sseRef.current = sse;

    const sseUrl = `${getBaseUrl(baseUrl)}/users/${userId}/live`;

    sse.connect(sseUrl, {
      onMessage: (data) => {
        const presenceData = "data" in data ? data.data : data;
        setPresence(presenceData);
        setError(null);
      },
      onError: () => {},
    });

    const pollInterval = options.pollInterval ?? 5000;
    const pollTimer = setInterval(() => {
      if (!aborted) {
        fetchInitial(abortController.signal);
      }
    }, pollInterval);

    return () => {
      aborted = true;
      abortController.abort();
      sse.destroy();
      sseRef.current = null;
      clearInterval(pollTimer);
    };
  }, [userId, baseUrl, fetchInitial, options.pollInterval]);

  return { presence, loading, error, refetch };
}
