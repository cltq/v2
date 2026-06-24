import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/Navigation";
import GridBackground from "@/components/GridBackground";
import PageTransition from "@/app/components/PageTransition";
import ContextMenuGuard from "@/app/components/ContextMenuGuard";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fumi",
  description: "Fumi's Portfolio/Personal Website",
  icons: { icon: "/favicon.png" },
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
    <html
      lang="en"
      className={`${GeistMono.variable} h-svh overflow-hidden antialiased`}
    >
      <body className="relative h-full bg-[#0b0b0f] font-sans text-[#9ca3af] md:pl-[200px] max-md:pb-[calc(56px+env(safe-area-inset-bottom,0px))]">
        <GridBackground />
        <Navbar />
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex-1">
            <PageTransition>{children}</PageTransition>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
        <ContextMenuGuard />
      </body>
    </html>
  );
}
