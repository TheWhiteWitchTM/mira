import { EmojiBuilder } from "@/components/tools/EmojiBuilder"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Emoji builder",
  "Search and assemble emoji in the browser. Nothing is uploaded.",
  "/tools/emoji/",
)

export default function EmojiPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Emoji</h1>
      <p className="mt-3 max-w-prose text-muted">Type a description. Separate sequences with commas. Skin tones: light, medium-light, medium, medium-dark, dark.</p>
      <EmojiBuilder />
    </div>
  )
}
