import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./markdown.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	"Markdown",
	"Write a post for this site. Headings, lists, links, images, highlighted code, tables, and the MDX this blog actually runs.",
	"/tutorials/markdown",
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>Markdown</h1>
			<p>
				The posts on this site are Markdown files. This page is the version that renders here, with the fences colored by Shiki. Write the post, open the page, and fix what the preview gets wrong.
			</p>
			<MDX/>
	</PageContent>
	)
}