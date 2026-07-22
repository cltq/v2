import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const formData = await request.formData();
  const name = (formData.get("name") as string)?.trim() || "Anonymous";
  const message = (formData.get("message") as string)?.trim();
  const image = formData.get("image") as File | null;

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  let imageUrl: string | undefined;

  if (image && image.size > 0) {
    const ext = image.name.split(".").pop() || "png";
    const blob = await put(`ask/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`, image, {
      access: "public",
    });
    imageUrl = blob.url;
  }

  const embed: Record<string, unknown> = {
    title: "New Question",
    description: message,
    color: 0xffffff,
    author: { name },
    timestamp: new Date().toISOString(),
  };

  if (imageUrl) {
    embed.image = { url: imageUrl };
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ embeds: [embed] }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "Failed to send webhook", detail: text }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
