import type { Metadata } from "next";
import Feed from "./feed"
import Post from "./post"
import {PageContent} from "@/next-static/legacy/PageContent";
import {categoriesMeta} from "@/next-blog/meta/categories-meta";
import {postsMeta} from "@/next-blog/meta/posts-meta";
import {withBase} from "@/app/metadata";


type Props = {
	params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false

export function generateStaticParams() {
	return [
		...categoriesMeta.map((category) => ({ slug: [category.slug] })),
		...postsMeta.map((post) => ({ slug: post.slug.split('/') })),
	]
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
	const { slug: segments } = await params
	if (segments.length === 1) {
		const category = categoriesMeta.find((item) => item.slug === segments[0])
		if (!category) return {}
		const canonical = withBase(`/blog/${category.slug}/`)
		return {
			title: category.title,
			description: category.description,
			alternates: { canonical },
			openGraph: {
				title: category.title,
				description: category.description,
				url: canonical,
				type: 'website',
			},
		}
	}

	const slug = segments.join('/')
	const post = postsMeta.find((item) => item.slug === slug)
	if (!post) return {}
	const canonical = withBase(`/blog/${slug}/`)
	return {
		title: post.title,
		description: post.description,
		alternates: { canonical },
		openGraph: {
			title: post.title,
			description: post.description,
			url: canonical,
			type: 'article',
			publishedTime: post.date,
		},
	}
}

export default async function Page({params}:Props) {
	const { slug: segments } = await params;
	let feed = true;
	if (segments.length==2)
		feed=false

	return (
		<PageContent>
			{feed
				? <Feed slug={segments[0]}/>
				: <Post slug={segments[0]+"/"+segments[1]}/>
			}
		</PageContent>
	)
}