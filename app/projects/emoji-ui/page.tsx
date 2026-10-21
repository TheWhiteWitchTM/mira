import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import Intro from "@/blog/emoji-ui/introduction/page.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Emoji UI',
	'Emoji UI is a small set of interface components drawn with emoji.',
	'/projects/emoji-ui',
)


export default function () {
	return(
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🤣Emoji-UI</h2>
			<Intro/>
	</PageContent>
	)
}