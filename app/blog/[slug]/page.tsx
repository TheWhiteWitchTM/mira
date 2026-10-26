import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/content"
import { renderMdx } from "@/lib/mdx"
import { pageMetadata } from "@/lib/metadata"

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return pageMetadata(post.title, post.description, `/blog/${post.slug}/`, "article")
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const body = await renderMdx(post.body)
  return (
    <article className="prose">
      <p className="kicker not-prose">
        <time dateTime={post.date}>{post.date}</time>
        {post.tags.length ? ` · ${post.tags.join(" · ")}` : ""}
      </p>
      <h1>{post.title}</h1>
      {body}
    </article>
  )
}
