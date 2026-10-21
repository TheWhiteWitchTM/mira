import type { Metadata } from "next"
import {PageContent} from "@/next-static/legacy/PageContent";
import {ImageMagic} from "@/components/ImageMagic";
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Image Magic',
	'Remove a background and resize images in the browser. The pictures stay on this device.',
	'/tools/image-magic',
)

export default function () {
	return (
	<PageContent className={"prose dark:prose-invert"}>
		<h2 className={"m-0 p-0"}>🖼️Image Magic</h2>
		<ImageMagic/>
	</PageContent>
	)
}