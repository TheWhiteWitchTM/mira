import Link from "next/link"
import { getArticle } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "AI",
  "History of AI, the modern stack, Grok, Grok Build, Grok Bot, Grok Imagine, and how to brief a model.",
  "/ai/",
)

const sections: { kicker: string; slugs: string[] }[] = [
  { kicker: "The field", slugs: ["history", "modern"] },
  { kicker: "Grok", slugs: ["grok", "grok-build", "grok-bot", "grok-imagine"] },
  { kicker: "Practice", slugs: ["a-good-prompt"] },
]

export default function AiPage() {
  return (
    <div className="space-y-8">
      <header className="flex items-start gap-4">
        <img
          src={withBase("/avatar.jpg")}
          alt=""
          width={512}
          height={512}
          className="size-14 shrink-0 rounded-full object-cover ring-1 ring-accent/70"
        />
        <div>
          <p className="kicker">AI</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">The shelf</h1>
          <p className="mt-3 max-w-prose text-muted">
            Reference pages from the work. The field first, then the Grok products I use, then how to brief a model. Written 26 October 2026. The model numbers will move. The shape of the stack will not, for a while.
          </p>
        </div>
      </header>

      {sections.map((section) => (
        <section key={section.kicker}>
          <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-accent">{section.kicker}</h2>
          <ul className="mt-3 grid gap-3">
            {section.slugs.map((slug) => {
              const doc = getArticle(slug)
              if (!doc) return null
              return (
                <li key={slug}>
                  <Link href={`/ai/${doc.slug}/`} className="frame block p-4 hover:border-accent">
                    <h3 className="text-xl font-semibold text-white">{doc.title}</h3>
                    <p className="mt-2 text-sm text-muted">{doc.description}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      <section>
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-accent">Cards</h2>
        <Link href="/cards/" className="frame mt-3 block p-4 hover:border-accent">
          <h3 className="text-xl font-semibold text-white">Business cards</h3>
          <p className="mt-2 text-sm text-muted">The person and the lab. 85 × 55 mm. The portrait is a crop of the photograph. The type is set in the page.</p>
        </Link>
      </section>
    </div>
  )
}
