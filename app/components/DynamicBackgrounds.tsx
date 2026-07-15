"use client";

import dynamic from "next/dynamic";

const DotsBackground = dynamic(() => import("@/components/DotsBackground"), { ssr: false });

export default function DynamicBackgrounds() {
  return <DotsBackground />;
}
