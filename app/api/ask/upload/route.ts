import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const image = formData.get("image") as File | null;

  if (!image || image.size === 0) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const ext = image.name.split(".").pop() || "png";
  const blob = await put(
    `ask/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`,
    image,
    { access: "public" },
  );

  return NextResponse.json({ url: blob.url });
}
