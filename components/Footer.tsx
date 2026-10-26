import { person, withBase } from "@/lib/site"

const links = [
  { title: "RSS", href: withBase("/feed.xml") },
  { title: "Mail", href: `mailto:${person.email}` },
  { title: "GitHub", href: person.github },
  { title: "The White Witch", href: person.whitewitch },
  { title: "The card", href: person.card },
  { title: "Andreas", href: person.andreas },
  { title: "YouTube", href: person.youtube },
  { title: "X", href: person.x },
  { title: "Bluesky", href: person.bluesky },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <nav className="footer-links" aria-label="Footer">
        {links.map((link, index) => (
          <span key={link.href} className="contents">
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
              {link.title}
            </a>
          </span>
        ))}
        <span aria-hidden="true">·</span>
        <span>
          <span className="text-[#0057b7]">🇺🇦 Ukraine is my friend.</span> <span className="text-[#ffd700]">Slava Ukraini!</span>
        </span>
      </nav>
    </footer>
  )
}
