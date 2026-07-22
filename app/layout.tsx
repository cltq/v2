import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import PageTransition from "@/app/components/PageTransition";
import ContextMenuGuard from "@/app/components/ContextMenuGuard";
import WebMCP from "@/app/components/WebMCP";
import DynamicBackgrounds from "@/app/components/DynamicBackgrounds";
import SectionSideNav from "@/app/components/SectionSideNav";
import TitleUpdater from "@/app/components/TitleUpdater";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  description: "Fumi/Maple's Portfolio/Personal Website",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "Maple",
    description: "Fumi/Maple's Portfolio/Personal Website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple",
    description: "Fumi/Maple's Portfolio/Personal Website",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistMono.variable} h-svh antialiased`}>
      <head>
        <title>fumi</title>
      </head>
      <body className="relative h-full bg-black font-sans text-[#9ca3af] md:pt-[72px]">
        <DynamicBackgrounds />
        <SectionSideNav />
        <div className="relative z-10 flex h-full flex-col">
          <div id="scroll-container" className="flex-1 overflow-y-auto">
            <PageTransition>{children}</PageTransition>
          </div>
        </div>
        <ContextMenuGuard />
        <WebMCP />
        <SpeedInsights />
        <Analytics />
        <TitleUpdater />
      </body>
    </html>
  );
}
