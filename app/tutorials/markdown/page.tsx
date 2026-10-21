import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./markdown.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Markdown tutorial',
	'A short Markdown tutorial on Mira\'s World.',
	'/tutorials/markdown',
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>📃Markdown Tutorial</h2>
			<MDX/>
	</PageContent>
	)
}