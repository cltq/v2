import { NextResponse } from "next/server";

const domains = ["https://applefumi.xyz", "https://w.vreni.xyz"];

export async function GET() {
  const body = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "discord-presence",
        type: "skill-md",
        description: "Discord presence and activity widget for real-time status display",
        url: `${domains[0]}/.well-known/agent-skills/discord-presence`,
        digest: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
      {
        name: "spotify-now-playing",
        type: "skill-md",
        description: "Spotify now-playing card showing current track and artist",
        url: `${domains[0]}/.well-known/agent-skills/spotify-now-playing`,
        digest: "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      },
    ],
  };

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
