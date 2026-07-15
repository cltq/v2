"use client";

import { useEffect } from "react";

export default function WebMCP() {
  useEffect(() => {
    const mcp = (navigator as unknown as Record<string, unknown>).modelContext as
      | { registerTool?: (tool: unknown) => void }
      | undefined;

    if (!mcp?.registerTool) return;

    const controller = new AbortController();

    mcp.registerTool({
      name: "get-discord-presence",
      description: "Get the current Discord presence and activity status",
      inputSchema: {
        type: "object",
        properties: {
          userId: {
            type: "string",
            description: "Discord user ID (defaults to configured user)",
          },
        },
      },
      execute: async (input: { userId?: string }) => {
        const userId = input?.userId || process.env.NEXT_PUBLIC_DISCORD_USERID || "";
        const res = await fetch(`/api/discord/users/${userId}`);
        return res.json();
      },
      signal: controller.signal,
    });

    mcp.registerTool({
      name: "get-spotify-now-playing",
      description: "Get the currently playing Spotify track",
      inputSchema: {
        type: "object",
        properties: {},
      },
      execute: async () => {
        const res = await fetch("/api/spotify");
        return res.json();
      },
      signal: controller.signal,
    });

    mcp.registerTool({
      name: "navigate",
      description: "Navigate to a page on the site",
      inputSchema: {
        type: "object",
        properties: {
          path: {
            type: "string",
            description: "Page path to navigate to (e.g. /music, /projects)",
          },
        },
        required: ["path"],
      },
      execute: async (input: { path: string }) => {
        window.location.href = input.path;
        return { navigated: input.path };
      },
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  return null;
}
