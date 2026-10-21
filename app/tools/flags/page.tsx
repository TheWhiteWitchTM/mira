import type { Metadata } from "next";
import {PageContent} from "@/next-static/legacy/PageContent";
import {FlagBuilder} from "@/components/FlagBuilder";
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Flag builder',
	'Build a flag in the browser on Mira\'s World.',
	'/tools/flags',
)

export default function () {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h2>🏳️‍Flag Builder</h2>
			<span className={"font-flags"}>
				<FlagBuilder/>
			</span>
	</PageContent>
	)
}