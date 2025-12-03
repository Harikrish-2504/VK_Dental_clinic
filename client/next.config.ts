import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "vkvimplantclinic.com",
        port: "",
        pathname: "/backend/api/uploads/**",
      },
      {
        protocol: "https",
        hostname: "vkvimplantclinic.com",
        port: "",
        pathname: "/backend/api/uploads/**",
      },
    ],
    domains: ["localhost"], // keep your localhost support
  },
};

export default nextConfig;
