import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "Tools",
  "Browser tools on Mira's World: link cards, a calling card, a post meter, emoji, flags, web fonts, and Image Magic. Nothing is uploaded.",
  "/tools/",
)

const tools = [
  { href: "/tools/unfurl/", title: "Unfurl", text: "See the link card on X, Bluesky, Discord, and Slack, then copy the meta tags." },
  { href: "/tools/calling-card/", title: "Calling Card", text: "Draw a share image for a post. Wide or square. Nothing is uploaded." },
  { href: "/tools/post-meter/", title: "Post Meter", text: "Paste a caption. See how it fits X, Bluesky, LinkedIn, and Threads. Split a thread." },
  { href: "/tools/emoji/", title: "Emoji", text: "Search and assemble emoji in the browser." },
  { href: "/tools/flags/", title: "Flags", text: "Build a flag sequence from country codes and names." },
  { href: "/tools/webfont/", title: "WebFont", text: "Pick arrows and direction marks, copy the sequence." },
  { href: "/tools/image-magic/", title: "Image Magic", text: "Remove a background, resize, and export an icon set. The work stays in this browser." },
]

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="kicker">Tools</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">In the browser</h1>
        <p className="mt-3 max-w-prose text-muted">Small tools. Nothing is uploaded. Useful for social posts and for shipping a page.</p>
      </header>
      <ul className="grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link href={tool.href} className="frame block h-full p-4 hover:border-accent">
              <h2 className="font-semibold text-white">{tool.title}</h2>
              <p className="mt-2 text-sm text-muted">{tool.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
