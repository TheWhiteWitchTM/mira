import Link from "next/link"
import { getPosts } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "Blog",
  "Build notes from Mira's World. Static Next.js, GitHub Pages, tools, and the freelance desk.",
  "/blog/",
)

export default function BlogPage() {
  const posts = getPosts()
  return (
    <div className="space-y-6">
      <header>
        <p className="kicker">Blog</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Notes from the lab</h1>
        <p className="mt-3 max-w-prose text-muted">
          Build notes. The feed is{" "}
          <a href={withBase("/feed.xml")} className="text-accent hover:text-accent-2">
            RSS
          </a>
          .
        </p>
      </header>
      <ul className="grid gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`} className="frame block p-4 hover:border-accent">
              <p className="text-xs text-muted">
                <time dateTime={post.date}>{post.date}</time>
                {post.tags.length ? ` · ${post.tags.join(" · ")}` : ""}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
