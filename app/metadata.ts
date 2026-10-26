import type { Metadata } from 'next'

export const siteOrigin = 'https://thewhitewitchtm.github.io'
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
export const siteUrl = `${siteOrigin}${basePath}`

export function withBase(path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${basePath}${normalized}`
}
export const siteName = "Mira's World"
const defaultTitle = "Mira's World — projects, tools, and a dev blog by The White Witch"
const defaultDescription = "Mira's World, by The White Witch. A card for the lab: browser tools, tutorials, a dev blog, and the desk of projects. The pages are static."

export const baseMetadata: Metadata = {
	metadataBase: new URL(siteOrigin),
	title: {
		default: defaultTitle,
		template: `%s | ${siteName}`,
	},
	description: defaultDescription,
	keywords: [
		"Mira's World",
		'The White Witch',
		"Mira",
		"LibreSky",
		"SociallyDead",
		"MAGIC",
		"RETRO MAGIC",
		"Blogy",
		"Vesper",
		"Cinder",
		"Emoji Games",
		'open source',
		'dev blog',
		'Next.js',
		'static site',
		'GitHub Pages',
		'TypeScript',
		'React',
	],
	authors: [{ name: 'Mira', url: siteUrl || siteOrigin }],
	creator: 'Mira',
	applicationName: siteName,
	category: 'technology',
	openGraph: {
		title: defaultTitle,
		description: defaultDescription,
		url: withBase('/'),
		siteName,
		images: [
			{
				url: withBase('/banner.jpg'),
				width: 720,
				height: 1280,
				alt: "Mira, smiling, red hair in a ponytail, black jacket, pointing.",
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: defaultTitle,
		description: defaultDescription,
		site: '@TheWhiteWitchTM',
		creator: '@TheWhiteWitchTM',
		images: [withBase('/banner.jpg')],
	},
	icons: {
		icon: [
			{ url: withBase('/icon.svg'), type: 'image/svg+xml' },
			{ url: withBase('/favicon.ico') },
		],
		apple: withBase('/apple-touch-icon.png'),
	},
	alternates: {
		canonical: withBase('/'),
		types: {
			'application/rss+xml': withBase('/feed.xml'),
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
	const canonical = withBase(path.endsWith('/') ? path : `${path}/`)
	return {
		title,
		description,
		alternates: { canonical },
		openGraph: {
			title,
			description,
			url: canonical,
			type: 'website',
			images: [
				{
					url: withBase('/banner.jpg'),
					width: 720,
					height: 1280,
					alt: "Mira, smiling, red hair in a ponytail, black jacket, pointing.",
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [withBase('/banner.jpg')],
		},
	}
}
