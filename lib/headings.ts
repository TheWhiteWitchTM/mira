export interface HeadingLink {
  title: string
  id: string
}

function headingId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/ /g, "-")
}

/** `##` headings in document order. Ids match rehype-slug, and fenced samples are skipped. */
export function sectionLinks(body: string): HeadingLink[] {
  const seen = new Map<string, number>()
  const sections: HeadingLink[] = []
  let fence: "`" | "~" | null = null

  for (const line of body.split("\n")) {
    const ticks = /^(```+|~~~+)/.exec(line.trim())
    if (ticks) {
      const mark = ticks[1][0] as "`" | "~"
      fence = !fence ? mark : mark === fence ? null : fence
      continue
    }
    if (fence) continue

    const match = /^(#{2,6})\s+(.+?)\s*#*$/.exec(line)
    if (!match) continue
    const title = match[2].trim()
    const base = headingId(title) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`
    if (match[1].length === 2) sections.push({ title, id })
  }

  return sections
}
