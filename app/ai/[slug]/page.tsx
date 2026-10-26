import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticle, getArticles } from "@/lib/content"
import { renderMdx } from "@/lib/mdx"
import { pageMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return getArticles().map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getArticle(slug)
  if (!doc) return {}
  return pageMetadata(doc.title, doc.description, `/ai/${doc.slug}/`, "article")
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getArticle(slug)
  if (!doc) notFound()
  const body = await renderMdx(doc.body)
  return (
    <article className="prose">
      <p className="kicker not-prose">
        <Link href="/ai/" className="hover:text-accent-2">
          AI
        </Link>
        {" · "}
        <time dateTime={doc.date}>{doc.date}</time>
      </p>
      <h1>{doc.title}</h1>
      <p className="lead">{doc.description}</p>
      {body}
    </article>
  )
}
