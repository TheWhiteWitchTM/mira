import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export interface DocMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  draft?: boolean
}

export interface Doc extends DocMeta {
  body: string
}

function dirOf(kind: "posts" | "tutorials"): string {
  return path.join(process.cwd(), "content", kind)
}

function readDir(kind: "posts" | "tutorials"): Doc[] {
  const root = dirOf(kind)
  if (!fs.existsSync(root)) return []
  return fs
    .readdirSync(root)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.mdx?$/, "")
      const raw = fs.readFileSync(path.join(root, name), "utf8")
      const { data, content } = matter(raw)
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? "1970-01-01"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        draft: Boolean(data.draft),
        body: content,
      }
    })
    .filter((doc) => !doc.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}

export function getPosts(): Doc[] {
  return readDir("posts")
}

export function getPost(slug: string): Doc | undefined {
  return getPosts().find((post) => post.slug === slug)
}

export function getTutorials(): Doc[] {
  return readDir("tutorials")
}

export function getTutorial(slug: string): Doc | undefined {
  return getTutorials().find((doc) => doc.slug === slug)
}
