import { pageMetadata } from "@/lib/metadata"
import { githubProjects, projectGroups } from "@/lib/projects"

export const metadata = pageMetadata(
  "Projects",
  "Client work, LibreSky, MAGIC, RETRO, Qt apps, and the rest of the desk. Each link opens that project on its own site.",
  "/projects/",
)

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="kicker">Desk</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">Projects</h1>
        <p className="mt-3 max-w-prose text-muted">
          The same shelves as the landing page. Client work is first. A click opens that project on its own site. The full list is on{" "}
          <a href={githubProjects.href} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2">
            GitHub
          </a>
          .
        </p>
      </header>
      {projectGroups.map((group) => (
        <section key={group.title}>
          <p className="kicker">{group.kicker}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{group.title}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="frame block h-full p-4 hover:border-accent">
                  <h3 className="font-semibold text-white">
                    {link.title} <span aria-hidden="true">↗</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted">{link.copy}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
