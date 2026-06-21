import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    // Points Turbopack to the actual root of your project
    root: '../',
  },
};

export default nextConfig;
