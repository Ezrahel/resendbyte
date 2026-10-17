import type { NextConfig } from "next";
import path from "node:path";

const apiInternalUrl = process.env.API_INTERNAL_URL || "http://localhost:3001";
const workspaceRoot = path.resolve(process.cwd(), "../..");

const nextConfig: NextConfig = {
  turbopack: { root: workspaceRoot },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiInternalUrl}/api/v1/:path*`,
      },
      {
        source: "/api/auth/:path*",
        destination: `${apiInternalUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
