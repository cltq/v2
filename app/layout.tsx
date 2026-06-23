import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/Navigation";
import GridBackground from "@/components/GridBackground";
import PageTransition from "@/app/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "fumi",
  description: "Personal site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-[#0b0b0f] font-sans text-[#9ca3af] md:pl-[200px]">
        <GridBackground />
        <Navbar />
        <div className="relative z-10">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
