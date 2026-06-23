import { NextRequest, NextResponse } from "next/server";

const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

export async function OPTIONS() {
  return NextResponse.json(null, { headers: corsHeaders });
}

function lastfmUrl(method: string, apiKey: string, extra: Record<string, string> = {}) {
  const params = new URLSearchParams({ method, api_key: apiKey, format: "json", ...extra });
  return `${LASTFM_API}?${params}`;
}

function isAlbumPlaceholder(url: string) {
  return url.includes("2a96cbd8b46e442fc41c2b86b821562f");
}

export async function GET(request: NextRequest) {
  const headers = { ...corsHeaders };
  const { searchParams } = new URL(request.url);

  if (searchParams.has("img")) {
    const imgUrl = searchParams.get("img")!;
    try {
      const res = await fetch(imgUrl);
      if (!res.ok) return new NextResponse(null, { status: 404, headers });
      const buffer = await res.arrayBuffer();
      return new NextResponse(buffer, {
        headers: {
          ...headers,
          "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch {
      return new NextResponse(null, { status: 404, headers });
    }
  }

  const apiKey = process.env.LASTFM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Last.fm API key not configured" }, { status: 500, headers });
  }

  const user = process.env.LASTFM_USER;
  if (!user) {
    return NextResponse.json({ error: "Last.fm user not configured" }, { status: 500, headers });
  }

  const method = searchParams.get("method") || "user.gettoptracks";
  const period = searchParams.get("period") || "1month";
  const limit = Number(searchParams.get("limit")) || 5;

  const dataUrl = lastfmUrl(method, apiKey, { user, period, limit: String(limit) });

  try {
    const res = await fetch(dataUrl);
    if (!res.ok) {
      return NextResponse.json({ error: "Last.fm API error" }, { status: res.status, headers });
    }
    const data = await res.json();

    if (method === "user.gettoptracks" && data.toptracks?.track) {
      const enriched = await Promise.all(
        data.toptracks.track.map(async (track: any) => {
          try {
            const infoRes = await fetch(
              lastfmUrl("track.getInfo", apiKey, {
                artist: track.artist.name,
                track: track.name,
                user,
              })
            );
            if (infoRes.ok) {
              const info = await infoRes.json();
              const album = info.track?.album;
              if (album?.image) {
                const realImages = album.image.filter(
                  (i: any) => i["#text"] && !isAlbumPlaceholder(i["#text"])
                );
                if (realImages.length > 0) {
                  return { ...track, image: album.image };
                }
              }
            }
          } catch {}
          return track;
        })
      );
      data.toptracks.track = enriched;
    }

    if (method === "user.gettopartists" && data.topartists?.artist) {
      const enriched = await Promise.all(
        data.topartists.artist.map(async (artist: any) => {
          try {
            const infoRes = await fetch(
              lastfmUrl("artist.getInfo", apiKey, { artist: artist.name, user })
            );
            if (infoRes.ok) {
              const info = await infoRes.json();
              const artistInfo = info.artist;
              if (artistInfo?.image) {
                const realImages = artistInfo.image.filter(
                  (i: any) => i["#text"] && !isAlbumPlaceholder(i["#text"])
                );
                if (realImages.length > 0) {
                  return { ...artist, image: artistInfo.image };
                }
              }
            }
          } catch {}
          return artist;
        })
      );
      data.topartists.artist = enriched;
    }

    return NextResponse.json(data, { headers });
  } catch {
    return NextResponse.json({ error: "Failed to fetch from Last.fm" }, { status: 500, headers });
  }
}
