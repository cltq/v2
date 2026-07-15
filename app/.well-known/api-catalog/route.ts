import { NextResponse } from "next/server";

const baseUrl = "https://applefumi.xyz";

export async function GET() {
  const body = {
    linkset: [
      {
        anchor: `${baseUrl}/api/discord`,
        "service-desc": [
          {
            href: `${baseUrl}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: baseUrl,
            type: "text/html",
          },
        ],
      },
      {
        anchor: `${baseUrl}/api/spotify`,
        "service-desc": [
          {
            href: `${baseUrl}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: baseUrl,
            type: "text/html",
          },
        ],
      },
    ],
  };

  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/linkset+json",
      "Content-Disposition": 'attachment; filename="api-catalog.json"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
