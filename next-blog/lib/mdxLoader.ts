import { notFound } from 'next/navigation';
import { mdxLoaders } from '@/next-blog/lib/mdx-registry';

export async function mdxLoader(slug: string) {
	const load = mdxLoaders[slug];
	if (!load) notFound();
	const { default: MDXContent } = await load();
	return MDXContent;
}