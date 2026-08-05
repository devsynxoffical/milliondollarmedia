import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/halo",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
