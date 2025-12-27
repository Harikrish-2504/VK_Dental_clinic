import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "vkvimplantclinic.com",
        port: "",
        pathname: "/backend/uploads/**", // Match any path under this
      },
      {
        protocol: "https",
        hostname: "vkvimplantclinic.com",
        port: "",
        pathname: "/backend/uploads/**", // Match any path under this
      },
    ],
    // domains: ["localhost"], // This can be kept for localhost support if needed
  },
};

export default nextConfig;
