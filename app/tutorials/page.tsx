import Link from "next/link"
import { getTutorials } from "@/lib/content"
import { sectionLinks } from "@/lib/headings"
import { pageMetadata } from "@/lib/metadata"

const order = ["tailwind", "markdown", "javascript", "typescript"]

export const metadata = pageMetadata(
  "Tutorials",
  "Tailwind, Markdown, JavaScript, and TypeScript.",
  "/tutorials/",
)

export default function TutorialsPage() {
  const tutorials = getTutorials().slice().sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  return (
    <div className="space-y-6">
      <header>
        <p className="kicker">Tutorials</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Tutorials</h1>
        <p className="mt-3 max-w-prose text-muted">Tailwind, Markdown, JavaScript, and TypeScript.</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tutorials.map((doc) => {
          const sections = sectionLinks(doc.body)
          return (
            <li key={doc.slug}>
              <article className="frame h-full p-4">
                <h2 className="text-xl font-semibold text-white">
                  <Link href={`/tutorials/${doc.slug}/`} className="hover:text-accent">
                    {doc.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{doc.description}</p>
                {sections.length ? (
                  <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <Link href={`/tutorials/${doc.slug}/#${section.id}`} className="text-paper hover:text-accent">
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
