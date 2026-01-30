import { notFound } from 'next/navigation';

export async function mdxLoader(slug: string) {
	try {
		const mod = await import(`../../app/blog/${slug}/page.mdx`);
		return mod.default
	} catch (e) {
		notFound();
	}
}