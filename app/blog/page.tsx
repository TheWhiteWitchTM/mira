import type { Metadata } from "next";
import {Blog} from "@/next-blog/ui/Blog";
import {PageContent} from "@/next-static/legacy/PageContent";
import {pageMetadata, withBase} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Blog',
	'Blog feeds from Mira: projects, AI, and notes from the dev desk.',
	'/blog',
)

export default function BlogHome() {
	return (
			<PageContent>
				<span className={"prose dark:prose-invert"}>
				<h1>
					Blog
				</h1>
				<p>
					<a href={withBase("/feed.xml")}>RSS feed</a>
				</p>
				</span>
				<Blog/>
			</PageContent>
	)
}