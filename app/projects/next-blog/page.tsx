import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "@/blog/next-blog/introduction/page.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'NEXT-blog',
	'NEXT-blog is a static blog built with NEXT-static, ready for GitHub Pages.',
	'/projects/next-blog',
)
export default function () {
	return(
		<PageContent className={"prose dark:prose-invert"}>
			<h2>📃NEXT-blog</h2>
			<Intro/>
	</PageContent>
	)
}