import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./tailwind.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	"Tailwind",
	"Tailwind CSS 4 the way this site is set up. Spacing, type, a card that stacks on a phone, and the dark theme.",
	"/tutorials/tailwind",
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>Tailwind</h1>
			<p>
				Utility classes, on Tailwind 4, the way Mira&apos;s World is built. The card at the end is the same shape as the one on the home page.
			</p>
			<MDX/>
	</PageContent>
	)
}