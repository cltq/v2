import { NextResponse } from "next/server";

export async function GET() {
  const body = {
    serverInfo: {
      name: "fumi-site",
      version: "1.0.0",
    },
    endpoint: "/mcp",
    capabilities: {
      tools: {},
      resources: {},
    },
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
