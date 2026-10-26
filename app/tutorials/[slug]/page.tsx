import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTutorial, getTutorials } from "@/lib/content"
import { sectionLinks } from "@/lib/headings"
import { renderMdx } from "@/lib/mdx"
import { pageMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return getTutorials().map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getTutorial(slug)
  if (!doc) return {}
  return pageMetadata(doc.title, doc.description, `/tutorials/${doc.slug}/`)
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getTutorial(slug)
  if (!doc) notFound()
  const body = await renderMdx(doc.body)
  const sections = sectionLinks(doc.body)
  return (
    <article className="prose">
      <p className="kicker not-prose">Tutorial</p>
      <h1>{doc.title}</h1>
      <p className="lead">{doc.description}</p>
      {sections.length ? (
        <nav className="not-prose frame mb-8 p-4" aria-label="On this page">
          <p className="kicker">On this page</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
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
