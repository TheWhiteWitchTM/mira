import type { Metadata } from "next"
import { PageContent } from "@/next-static/legacy/PageContent"
import { Unfurl } from "@/components/Unfurl"
import { pageMetadata } from "@/app/metadata"

export const metadata: Metadata = pageMetadata(
	"Unfurl",
	"Preview a link the way X, Bluesky, Discord, and Slack will show it, then copy the Open Graph tags. Nothing is uploaded.",
	"/tools/unfurl",
)

export default function UnfurlPage() {
	return (
		<PageContent variant="large">
			<div className="prose dark:prose-invert">
				<h1>Unfurl</h1>
				<p>
					A link card before you publish the page. Set the title, the description, and the image address. The four previews update as you type. Copy the tags into the head. The picture you drop stays in this browser.
				</p>
			</div>
			<Unfurl />
		</PageContent>
	)
}
