// next.config.mjs
import nextMDX from '@next/mdx'  // ← default import (fixes named export error)

const withMDX = nextMDX({
  extension: /\.(md|mdx)$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

export default withMDX(nextConfig)