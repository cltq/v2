import { NextResponse } from "next/server";

const domains = ["https://applefumi.xyz", "https://w.vreni.xyz"];

export async function GET() {
  const body = {
    resource: domains[0],
    authorization_servers: domains,
    scopes_supported: ["read"],
    bearer_methods_supported: ["header"],
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
