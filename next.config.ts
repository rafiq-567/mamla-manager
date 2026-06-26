import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-icons",
      "date-fns",
      "lodash",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;