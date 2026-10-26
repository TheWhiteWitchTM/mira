import type { Metadata } from "next"
import { PageContent } from "@/next-static/legacy/PageContent"
import { CallingCard } from "@/components/CallingCard"
import { pageMetadata } from "@/app/metadata"

export const metadata: Metadata = pageMetadata(
	"Calling Card",
	"Draw a share image for a post or a profile. Wide or square. Nothing is uploaded.",
	"/tools/calling-card",
)

export default function CallingCardPage() {
	return (
		<PageContent variant="large">
			<div className="prose dark:prose-invert">
				<h1>Calling Card</h1>
				<p>
					A picture for the post, with your name on it. Pick a line, an accent, and one emoji. Download the PNG. The work stays in this browser.
				</p>
			</div>
			<CallingCard />
		</PageContent>
	)
}
