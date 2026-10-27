import { pageMetadata } from "@/lib/metadata"
import { githubProjects, projectGroups, type ProjectLink } from "@/lib/projects"
import { withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "Projects",
  "Client work, LibreSky, MAGIC, RETRO, Qt apps, and the rest of the desk. Each link opens that project on its own site.",
  "/projects/",
)

function art(link: ProjectLink) {
  if (!link.image) {
    return (
      <span className="desk-plate">
        <span className="kicker">On this site</span>
        <strong>Three desks</strong>
        <span className="desk-copy">MAGIC, Studio, and Apprentice.</span>
      </span>
    )
  }
  return <img src={withBase(link.image)} alt="" width={1200} height={630} style={link.focus ? { objectPosition: link.focus } : undefined} />
}

function Feature({ link }: { link: ProjectLink }) {
  return (
    <a className="desk-feature" href={link.href} target="_blank" rel="noopener noreferrer">
      {art(link)}
      <span className="desk-feature-copy">
        <span className="desk-feature-name">
          {link.title} <span className="desk-go" aria-hidden="true">↗</span>
        </span>
        <span className="desk-feature-text">{link.copy}</span>
      </span>
    </a>
  )
}

function Card({ link }: { link: ProjectLink }) {
  return (
    <a className="desk-card" href={link.href} target="_blank" rel="noopener noreferrer">
      {art(link)}
      <span className="desk-body">
        <span className="desk-title">
          {link.title} <span className="desk-go" aria-hidden="true">↗</span>
        </span>
        <span className="desk-copy">{link.copy}</span>
      </span>
    </a>
  )
}

export default function ProjectsPage() {
  return (
    <div className="space-y-10">
      <header>
        <p className="kicker">Desk</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Projects</h1>
        <p className="mt-3 max-w-prose text-muted">
          The same shelves as the card. Client work is first. A click opens that project on its own site.
        </p>
        <nav className="shelf-jump" aria-label="Shelves">
          {projectGroups.map((group, index) => (
            <span key={group.id} className="contents">
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a href={`#${group.id}`}>{group.title}</a>
            </span>
          ))}
        </nav>
      </header>

      {projectGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-28">
          <div className="shelf-head">
            <div>
              <p className="kicker">{group.kicker}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{group.title}</h2>
            </div>
            <p className="shelf-count">
              {group.links.length} {group.links.length === 1 ? "site" : "sites"}
            </p>
          </div>
          {group.links.length === 1 ? (
            <Feature link={group.links[0]} />
          ) : (
            <ul className={group.links.length === 3 ? "desk-shelf desk-shelf-3" : "desk-shelf desk-shelf-2"}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Card link={link} />
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <p className="text-sm text-muted">
        The full list is on{" "}
        <a href={githubProjects.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2">
          GitHub
        </a>
        .
      </p>
    </div>
  )
}
