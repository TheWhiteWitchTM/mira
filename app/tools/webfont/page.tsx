import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import {WebfontBuilder} from "@/components/WebFontBuilder";
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Web font builder',
	'Turn a set of characters into a web font in the browser.',
	'/tools/webfont',
)

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🔤WebFont Builder</h2>
			<WebfontBuilder/>
		</PageContent>
	)
}