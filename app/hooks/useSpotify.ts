"use client";

import { useEffect, useState } from "react";
import type { SpotifyData } from "@/app/lib/discord/types";
import { fetchSpotify } from "@/app/lib/spotify/api";

interface UseSpotifyReturn {
  spotify: SpotifyData | null;
  loading: boolean;
  error: Error | null;
}

export function useSpotify(pollInterval = 15000): UseSpotifyReturn {
  const [spotify, setSpotify] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const abortController = new AbortController();

    async function load() {
      try {
        const data = await fetchSpotify(abortController.signal);
        if (!cancelled) {
          setSpotify(data);
          setError(null);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    const timer = setInterval(() => {
      if (!cancelled) load();
    }, pollInterval);

    return () => {
      cancelled = true;
      abortController.abort();
      clearInterval(timer);
    };
  }, [pollInterval]);

  return { spotify, loading, error };
}
