import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="prose dark:prose-invert px-6 py-10">
			<h1>Page not found</h1>
			<p>That address is not on Mira's World.</p>
			<p>
				<Link href="/">Back home</Link>
				{' · '}
				<Link href="/blog/">Blog</Link>
				{' · '}
				<Link href="/tools/">Tools</Link>
			</p>
		</div>
	)
}
