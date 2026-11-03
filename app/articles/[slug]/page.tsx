import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLongform, getLongformDoc } from "@/lib/content"
import { sectionLinks } from "@/lib/headings"
import { renderMdx } from "@/lib/mdx"
import { pageMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return getLongform().map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getLongformDoc(slug)
  if (!doc) return {}
  return pageMetadata(doc.title, doc.description, `/articles/${doc.slug}/`, "article")
}

export default async function LongformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getLongformDoc(slug)
  if (!doc) notFound()
  const body = await renderMdx(doc.body)
  const sections = sectionLinks(doc.body)
  return (
    <article className="prose">
      <p className="kicker not-prose">
        <Link href="/articles/" className="hover:text-accent-2">
          Articles
        </Link>
        {" · "}
        <time dateTime={doc.date}>{doc.date}</time>
        {doc.tags.length ? ` · ${doc.tags.join(" · ")}` : ""}
      </p>
      <h1>{doc.title}</h1>
      {doc.description ? <p className="lead">{doc.description}</p> : null}
      {sections.length ? (
        <nav className="not-prose frame mb-8 p-4" aria-label="On this page">
          <p className="kicker">On this page</p>
          <ul className="section-index">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-paper hover:text-accent">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
      {body}
    </article>
  )
}
