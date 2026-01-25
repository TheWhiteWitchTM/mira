import { notFound } from 'next/navigation';

export async function mdxLoader(slug: string) {
	try {
		return await import(`../../app/blog/${slug}/page.mdx`);
	} catch (e) {
		console.error(e);
			notFound();
	}
}