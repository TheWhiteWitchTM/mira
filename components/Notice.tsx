import { person } from "@/lib/site"

export function Notice() {
  return (
    <aside className="border-b border-accent/35 bg-[#100c16] px-4 py-2 text-center text-sm text-accent-2">
      <p>
        <span className="font-medium">{person.notice}</span>
        <span className="hidden sm:inline">
          {" — "}
          <a href={person.andreas} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
            available for hire
          </a>
        </span>
      </p>
    </aside>
  )
}
