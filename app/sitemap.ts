import type { MetadataRoute } from 'next'
import { categoriesMeta } from '@/next-blog/meta/categories-meta'
import { postsMeta } from '@/next-blog/meta/posts-meta'
import { siteUrl } from '@/app/metadata'

export const dynamic = 'force-static'

function loc(path: string): string {
	const joined = `${siteUrl}${path}`
	return joined.endsWith('/') ? joined : `${joined}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPaths = [
		'',
		'/blog',
		'/tools',
		"/tools/unfurl",
		"/tools/calling-card",
		"/tools/emoji",
		"/tools/flags",
		"/tools/webfont",
		"/tools/image-magic",
		"/tutorials/tailwind",
		"/tutorials/markdown",
	]

	return [
		...staticPaths.map((path) => ({
			url: loc(path),
			changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
			priority: path === '' ? 1 : 0.7,
		})),
		...categoriesMeta.map((category) => ({
			url: loc(`/blog/${category.slug}`),
			lastModified: category.latest,
			changeFrequency: 'weekly' as const,
			priority: 0.6,
		})),
		...postsMeta.map((post) => ({
			url: loc(`/blog/${post.slug}`),
			lastModified: post.date,
			changeFrequency: 'yearly' as const,
			priority: 0.5,
		})),
	]
}
