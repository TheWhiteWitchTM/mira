import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],  // ← string for serialization
    rehypePlugins: [
      'rehype-slug',
      'rehype-autolink-headings',
      ['rehype-pretty-code', {  // ← minimal plain object, no functions
        theme: {
          dark: 'one-dark-pro',
          light: 'github-light',
        },
        keepBackground: false,
        defaultLang: 'plaintext',
        // NO onVisit* functions → use CSS for highlights if needed
      }],
    ],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
}

export default withMDX(nextConfig)