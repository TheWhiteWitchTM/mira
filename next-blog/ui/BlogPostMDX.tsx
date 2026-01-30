import {Suspense} from "react";
import {mdxLoader} from "@/next-blog/lib/mdxLoader";

interface BlogPostMDXProps {
	slug: string
}
export async function BlogPostMDX({ slug }: BlogPostMDXProps) {
	const MDX = await mdxLoader(slug)
	return(
		<Suspense key={slug} fallback={"Loading..."}>
			<MDX/>
		</Suspense>
	)
}