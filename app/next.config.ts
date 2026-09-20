import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The app reads Markdown from ../content at request time.
  outputFileTracingRoot: path.join(__dirname, ".."),
  // The depth map now lives under Concepts; keep older links working.
  async redirects() {
    return [{ source: "/depth-map", destination: "/concepts/depth-map", permanent: false }];
  },
};

export default nextConfig;
