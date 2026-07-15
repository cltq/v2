import { NextResponse } from "next/server";

const baseUrl = "https://applefumi.xyz";

export async function GET() {
  const body = {
    resource: baseUrl,
    authorization_servers: [baseUrl],
    scopes_supported: ["read"],
    bearer_methods_supported: ["header"],
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
