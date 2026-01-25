import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'My Awesome App',
		short_name: 'Awesome',
		description: 'A Next.js PWA example',
		start_url: '/',
		display: 'standalone',
		background_color: '#000000',
		theme_color: '#ffffff',
		icons: [
			{
				src: '/icon.svg',
				sizes: 'any',
				type: 'image/svg+xml',
			},
		],
	}
}