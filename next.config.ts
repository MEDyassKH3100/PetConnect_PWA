import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // Désactiver le cache en développement
  ...(process.env.NODE_ENV === "development" && {
    onDemandEntries: {
      maxInactiveAge: 0,
      pagesBufferLength: 0,
    },
  }),
};

export default nextConfig;
