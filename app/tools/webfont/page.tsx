import { WebFontBuilder } from "@/components/tools/WebFontBuilder"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Web font builder",
  "Pick arrows and direction marks and copy the sequence. Nothing is uploaded.",
  "/tools/webfont/",
)

export default function WebFontPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">WebFont</h1>
      <p className="mt-3 max-w-prose text-muted">Arrows and direction marks. Type keywords, or click a symbol to copy it.</p>
      <WebFontBuilder />
    </div>
  )
}
