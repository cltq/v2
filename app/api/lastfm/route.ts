import { NextRequest, NextResponse } from "next/server";

const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";

export async function GET(request: NextRequest) {
  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Last.fm API key not configured" }, { status: 500 });
  }

  const user = process.env.LASTFM_USER;
  if (!user) {
    return NextResponse.json({ error: "Last.fm user not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const method = searchParams.get("method") || "user.gettoptracks";
  const period = searchParams.get("period") || "1month";
  const limit = searchParams.get("limit") || "5";

  const url = `${LASTFM_API}?method=${method}&user=${user}&period=${period}&limit=${limit}&api_key=${apiKey}&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Last.fm API error" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch from Last.fm" }, { status: 500 });
  }
}
