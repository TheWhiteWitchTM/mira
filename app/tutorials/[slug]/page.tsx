import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTutorial, getTutorials } from "@/lib/content"
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
  return (
    <article className="prose">
      <p className="kicker not-prose">Tutorial</p>
      <h1>{doc.title}</h1>
      <p className="lead">{doc.description}</p>
      {body}
    </article>
  )
}
