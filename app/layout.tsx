import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import ContextMenuGuard from "@/app/components/ContextMenuGuard";
import WebMCP from "@/app/components/WebMCP";
import DynamicBackgrounds from "@/app/components/DynamicBackgrounds";
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
      className={`${GeistMono.variable} h-svh antialiased`}
    >
      <body className="relative h-full bg-[#0b0b0f] font-sans text-[#9ca3af] md:pt-[72px]">
        <DynamicBackgrounds />
        {/* <Navbar /> */}
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex-1 overflow-y-auto max-md:overflow-hidden">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </div>
        <ContextMenuGuard />
        <WebMCP />
      </body>
    </html>
  );
}
