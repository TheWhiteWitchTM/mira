import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./markdown.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	"Markdown",
	"Markdown this site actually renders. The code fences are highlighted.",
	"/tutorials/markdown",
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>Markdown</h1>
			<p>A reference for the Markdown on this site. The colored fences are Shiki.</p>
			<MDX/>
	</PageContent>
	)
}