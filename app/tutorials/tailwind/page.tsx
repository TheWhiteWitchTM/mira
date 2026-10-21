import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import MDX from "./tailwind.mdx"
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Tailwind tutorial',
	'A short Tailwind CSS tutorial on Mira\'s World.',
	'/tutorials/tailwind',
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🌬️Tailwind Tutorial</h2>
			<MDX/>
	</PageContent>
	)
}