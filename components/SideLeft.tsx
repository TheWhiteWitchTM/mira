import { person, withBase } from "@/lib/site"

export function SideLeft() {
  return (
    <aside className="hidden w-[140px] shrink-0 lg:block">
      <div className="sticky top-24">
        <a href={person.whitewitch} target="_blank" rel="noopener noreferrer" className="block">
          <img
            src={withBase("/witch.jpg")}
            alt="The White Witch. Green witch in a white hat, holding a book and a wand."
            width={1408}
            height={1408}
            className="w-full rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
          />
        </a>
        <p className="mt-3 text-xs leading-5 text-muted">
          <a href={person.whitewitch} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-2">
            The White Witch
          </a>
          . The long pages.
        </p>
        <ul className="mt-3 flex flex-col gap-1.5 text-sm">
          <li>
            <a href={person.whitewitchRepo} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              whitewitch repo
            </a>
          </li>
          <li>
            <a href={person.githubRepos} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              All projects
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
