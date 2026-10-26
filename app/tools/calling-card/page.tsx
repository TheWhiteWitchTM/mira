import { CallingCard } from "@/components/tools/CallingCard"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Calling Card",
  "Draw a share image for a post or a profile. Wide or square. Nothing is uploaded.",
  "/tools/calling-card/",
)

export default function CallingCardPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Calling Card</h1>
      <p className="mt-3 max-w-prose text-muted">
        A picture for the post, with your name on it. Pick a line, an accent, and one emoji. Download the PNG. The work stays in this browser.
      </p>
      <CallingCard />
    </div>
  )
}
