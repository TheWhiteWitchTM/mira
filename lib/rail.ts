export interface RailLink {
  title: string
  href: string
  external?: boolean
}

export interface RailCard {
  id: string
  kicker: string
  title: string
  text: string
  image?: string
  alt?: string
  width?: number
  height?: number
  href?: string
  external?: boolean
  links: RailLink[]
}

/** The right rail follows the page. Home opens on the lab still. */
export function railIdForPath(pathname: string, ids: readonly string[]): string {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`
  const take = (id: string, fallback: string) => (ids.includes(id) ? id : fallback)

  const post = path.match(/^\/blog\/([^/]+)\/$/)
  if (post) return take(`post:${post[1]}`, "blog")

  const longform = path.match(/^\/articles\/([^/]+)\/$/)
  if (longform) return take(`longform:${longform[1]}`, "articles")

  const article = path.match(/^\/ai\/([^/]+)\/$/)
  if (article) return take(`ai:${article[1]}`, "ai")

  const tutorial = path.match(/^\/tutorials\/([^/]+)\/$/)
  if (tutorial) return take(`tutorial:${tutorial[1]}`, "tutorials")

  const tool = path.match(/^\/tools\/([^/]+)\/$/)
  if (tool) return take(`tool:${tool[1]}`, "tools")

  if (path.startsWith("/blog/")) return "blog"
  if (path.startsWith("/articles/")) return "articles"
  if (path.startsWith("/ai/")) return "ai"
  if (path.startsWith("/tutorials/")) return "tutorials"
  if (path.startsWith("/tools/")) return "tools"
  if (path.startsWith("/projects/")) return "projects"
  if (path.startsWith("/about/")) return "about"
  if (path.startsWith("/ukraine/")) return "ukraine"
  if (path.startsWith("/cards/")) return "cards"
  return "lab"
}
