import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "@/blog/next-static/introduction/page.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'NEXT-static',
	'NEXT-static turns a Next.js app into static pages for GitHub Pages.',
	'/projects/next-static',
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>⚡NEXT-static</h2>
			<Intro/>
	</PageContent>
	)
}