import { person } from "@/lib/site"

export function Notice() {
  return (
    <aside className="border-b border-accent/35 bg-[#100c16] px-4 py-2 text-center text-sm text-accent-2">
      <p>
        <span className="font-medium">{person.notice}</span>
        <span className="hidden text-muted sm:inline"> — available for hire</span>
      </p>
    </aside>
  )
}
