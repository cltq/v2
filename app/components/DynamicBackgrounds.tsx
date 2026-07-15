"use client";

import dynamic from "next/dynamic";

const DotsBackground = dynamic(() => import("@/components/DotsBackground"), { ssr: false });
const GridBackground = dynamic(() => import("@/components/GridBackground"), { ssr: false });

export default function DynamicBackgrounds() {
  return (
    <>
      <DotsBackground />
      <GridBackground />
    </>
  );
}
