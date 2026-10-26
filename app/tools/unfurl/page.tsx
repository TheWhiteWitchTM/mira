import { Unfurl } from "@/components/tools/Unfurl"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Unfurl",
  "Preview a link the way X, Bluesky, Discord, and Slack will show it, then copy the Open Graph tags. Nothing is uploaded.",
  "/tools/unfurl/",
)

export default function UnfurlPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Unfurl</h1>
      <p className="mt-3 max-w-prose text-muted">
        A link card before you publish the page. Set the title, the description, and the image address. The four previews update as you type. Copy the tags into the head. The picture you drop stays in this browser.
      </p>
      <Unfurl />
    </div>
  )
}
