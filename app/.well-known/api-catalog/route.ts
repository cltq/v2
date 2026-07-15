import { NextResponse } from "next/server";

const domains = ["https://applefumi.xyz", "https://w.vreni.xyz"];

export async function GET() {
  const body = {
    linkset: [
      {
        anchor: `${domains[0]}/api/discord`,
        "service-desc": [
          {
            href: `${domains[0]}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: domains[0],
            type: "text/html",
          },
        ],
      },
      {
        anchor: `${domains[0]}/api/spotify`,
        "service-desc": [
          {
            href: `${domains[0]}/.well-known/api-catalog`,
            type: "application/linkset+json",
          },
        ],
        "service-doc": [
          {
            href: domains[0],
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
