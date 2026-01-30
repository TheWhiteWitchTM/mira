import { notFound } from 'next/navigation';

export async function mdxLoader(slug: string) {
	try {
		const { default: MDXContent } = await import(`../../app/blog/${slug}/page.mdx`);
		return MDXContent
	} catch (e) {
		notFound();
	}
}