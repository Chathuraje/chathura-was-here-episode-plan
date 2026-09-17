import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The app reads Markdown from ../content at request time.
  outputFileTracingRoot: path.join(__dirname, ".."),
  turbopack: { root: __dirname },
};

export default nextConfig;
