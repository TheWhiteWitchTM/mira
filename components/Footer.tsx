import { person, withBase } from "@/lib/site"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 py-4 text-sm text-muted">
        <a href={withBase("/feed.xml")} className="hover:text-accent">
          RSS
        </a>
        <span aria-hidden="true">·</span>
        <a href={`mailto:${person.email}`} className="hover:text-accent">
          Mail
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          GitHub
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.whitewitch} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          The White Witch
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.card} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          The card
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          YouTube
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.x} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          X
        </a>
        <span aria-hidden="true">·</span>
        <a href={person.bluesky} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
          Bluesky
        </a>
      </div>
    </footer>
  )
}
