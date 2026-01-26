"use client"

import {PageContent} from "@/next-static/ui/PageContent";
import {ImageMagic} from "@/components/ImageMagic";

export default function () {
	return (
	<PageContent className={"prose dark:prose-invert"}>
		<ImageMagic/>
	</PageContent>
	)
}