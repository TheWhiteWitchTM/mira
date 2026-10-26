import Link from "next/link"
import { getTutorials } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Tutorials",
  "Reference pages for Markdown, Tailwind 4, and TypeScript. Written for people who already ship.",
  "/tutorials/",
)

export default function TutorialsPage() {
  const tutorials = getTutorials()
  return (
    <div className="space-y-6">
      <header>
        <p className="kicker">Tutorials</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Reference</h1>
        <p className="mt-3 max-w-prose text-muted">Keep these open while you write. They match the stack this site is on.</p>
      </header>
      <ul className="grid gap-3">
        {tutorials.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/tutorials/${doc.slug}/`} className="frame block p-4 hover:border-accent">
              <h2 className="text-xl font-semibold text-white">{doc.title}</h2>
              <p className="mt-2 text-sm text-muted">{doc.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
