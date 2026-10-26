import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./tailwind.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	"Tailwind",
	"Tailwind CSS 4, the way this site is set up, including a layout that stacks on a phone.",
	"/tutorials/tailwind",
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>Tailwind</h1>
			<p>Utility classes, Tailwind 4, and a card that still works on a phone.</p>
			<MDX/>
	</PageContent>
	)
}