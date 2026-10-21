import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import {EmojiBuilder} from "@/components/EmojiBuilder";
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Emoji builder',
	'Assemble an emoji in the browser on Mira\'s World.',
	'/tools/emoji',
)

export default function Emoji() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🤣Emoji Builder</h2>
			<span className={"font-flags"}>
			<EmojiBuilder/>
			</span>
		</PageContent>
	)
}