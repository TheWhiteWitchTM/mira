import type { NextConfig } from "next"

// Custom domain serves at the root. A prefix is only for a local override.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

export default nextConfig
