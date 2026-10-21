// Static export cannot use the Next image optimizer. Prefix public files for GitHub Pages.
export default function imageLoader({ src }: { src: string }) {
	if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src
	const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
	if (base && (src === base || src.startsWith(`${base}/`))) return src
	return `${base}${src.startsWith('/') ? src : `/${src}`}`
}
