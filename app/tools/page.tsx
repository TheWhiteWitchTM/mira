import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"
import { toolGroups } from "@/lib/tools"

export const metadata = pageMetadata(
  "Tools",
  "Browser tools on Mira's World: link cards, a calling card, a post meter, emoji, flags, web fonts, and Image Magic. Nothing is uploaded.",
  "/tools/",
)

export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <header>
        <p className="kicker">Tools</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">In the browser</h1>
        <p className="mt-3 max-w-prose text-muted">Three shelves. Posts, marks, and pictures. Nothing is uploaded.</p>
        <nav className="shelf-jump" aria-label="Shelves">
          {toolGroups.map((group, index) => (
            <span key={group.id} className="contents">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a href={`#${group.id}`}>{group.title}</a>
            </span>
          ))}
        </nav>
      </header>

      {toolGroups.map((group, groupIndex) => (
        <section key={group.id} id={group.id} className="scroll-mt-28">
          <div className="shelf-head">
            <div>
              <p className="kicker">
                {String(groupIndex + 1).padStart(2, "0")} · {group.kicker}
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{group.title}</h2>
              <p className="mt-1 text-sm text-muted">{group.note}</p>
            </div>
          </div>
          <ul className={group.links.length === 3 ? "desk-shelf desk-shelf-3" : group.links.length > 1 ? "desk-shelf desk-shelf-2" : "desk-shelf"}>
            {group.links.map((tool, index) => (
              <li key={tool.href}>
                <Link href={tool.href} className={group.links.length === 1 ? "tool-card is-wide" : "tool-card"}>
                  <span className="tool-card-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="tool-card-title">{tool.title}</span>
                  <span className="tool-card-copy">{tool.copy}</span>
                  <span className="tool-card-go">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
