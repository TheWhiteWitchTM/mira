import {categoriesMeta} from "@/next-blog/meta/categories-meta";
import {Feed} from "@/next-blog/ui/Feed";
import {Suspense} from "react";

type Props = {
	params: Promise<{ slug: string }>;      // ← Promise in Next.js 15+
};

export default async function ({params}: Props) {
	const { slug } = await params;
	const meta = categoriesMeta.find((category) => category.slug === slug);

	return (
		<div className={"prose dark:prose-invert"}>
			<h2>{meta?.emoji}{meta?.title}</h2>
			<Feed key={slug} category={slug}/>
		</div>
	)
}