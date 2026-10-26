import { PostMeter } from "@/components/tools/PostMeter"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Post Meter",
  "Paste a social caption and see how it fits X, Bluesky, LinkedIn, and Threads. Count graphemes, wrap URLs, split a thread. Nothing is uploaded.",
  "/tools/post-meter/",
)

export default function PostMeterPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Post Meter</h1>
      <p className="mt-3 max-w-prose text-muted">
        Paste the caption before you post it. X counts URLs as 23 characters. Bluesky counts graphemes. LinkedIn is long. Threads sits in the middle. Split a thread when you go over. Nothing leaves this browser.
      </p>
      <PostMeter />
    </div>
  )
}
