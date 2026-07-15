import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</robots.txt>; rel="robots", </sitemap.xml>; rel="sitemap"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/discord/:path*",
        destination: "https://api.applefumi.xyz/v2/discord/:path*",
      },
      {
        source: "/api/spotify",
        destination: "https://spotify.applefumi.xyz/api/spotify",
      },
    ];
  },
  env: {
    DISCORD_USERID: process.env.DISCORD_USERID,
  },
  allowedDevOrigins: ['192.168.1.34', '192.168.1.35', '192.168.1.44'],
};

export default nextConfig;

