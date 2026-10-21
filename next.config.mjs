import nextMDX from '@next/mdx'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      'remark-gfm',  // string name — works great
    ],
    rehypePlugins: [
      'rehype-slug',                    // string
      'rehype-autolink-headings',       // string
      [
        '@shikijs/rehype', {
        theme: 'nord',
        keepBackground: true,
        defaultLang: 'plaintext',
        }
      ],
    ],
  },
})

// GitHub project pages serve this repo at /mira/. `npm run build` sets GITHUB_PAGES.
const basePath = process.env.GITHUB_PAGES === 'true' ? '/mira' : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
  },
  // GitHub Pages resolves /blog/ to /blog/index.html.
  trailingSlash: true,
}

export default withMDX(nextConfig)