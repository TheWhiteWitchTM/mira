import { FlagBuilder } from "@/components/tools/FlagBuilder"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Flag builder",
  "Build a flag sequence from country codes and names. Nothing is uploaded.",
  "/tools/flags/",
)

export default function FlagsPage() {
  return (
    <div>
      <p className="kicker">Tools</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Flags</h1>
      <p className="mt-3 max-w-prose text-muted">Type 2-letter codes or country names. Spaces separate flags. Click a flag to copy it.</p>
      <FlagBuilder />
    </div>
  )
}
