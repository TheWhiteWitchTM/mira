import Link from "next/link"
import { getLongform } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Articles",
  "Long-form writing from Mira's World. The blog is the notebook. This shelf is for the pieces that need room.",
  "/articles/",
)

export default function ArticlesPage() {
  const pieces = getLongform()
  return (
    <div className="space-y-6">
      <header>
        <p className="kicker">Long form</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Articles</h1>
        <p className="mt-3 max-w-prose text-muted">
          The blog is the notebook. This shelf is for the longer pieces.
        </p>
      </header>
      {pieces.length ? (
        <ul className="grid gap-3">
          {pieces.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/articles/${doc.slug}/`} className="frame block p-4 hover:border-accent">
                <p className="text-xs text-muted">
                  <time dateTime={doc.date}>{doc.date}</time>
                  {doc.tags.length ? ` · ${doc.tags.join(" · ")}` : ""}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">{doc.title}</h2>
                <p className="mt-2 text-sm text-muted">{doc.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="frame max-w-prose p-4 text-sm text-muted">Nothing on this shelf yet. The long pieces will land here.</p>
      )}
    </div>
  )
}
