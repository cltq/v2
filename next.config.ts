import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/discord/:path*",
        destination: "https://api.applefumi.xyz/v2/discord/:path*",
      },
    ];
  },
  env: {
    DISCORD_USERID: process.env.DISCORD_USERID,
  },
  allowedDevOrigins: ['192.168.1.34'],
};

export default nextConfig;
