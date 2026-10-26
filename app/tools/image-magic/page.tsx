import { ImageMagic } from "@/components/tools/ImageMagic"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Image Magic",
  "Remove a background, resize, and export an icon set. The work stays in this browser.",
  "/tools/image-magic/",
)

export default function ImageMagicPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Image Magic</h1>
      <p className="mt-3 max-w-prose text-muted">Drop a picture. Remove the background, resize for a post, or export a favicon set. The file never leaves this browser.</p>
      <ImageMagic />
    </div>
  )
}
