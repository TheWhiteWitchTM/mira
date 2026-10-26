import Link from "next/link"
import { Nav } from "./Nav"
import { person } from "@/lib/site"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent bg-ink/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-[1400px] items-center gap-3 px-3 py-2 sm:px-5">
        <Link href="/" className="shrink-0 font-semibold tracking-tight text-accent">
          Mira&apos;s World™
        </Link>
        <Nav />
        <a
          href={person.coffee}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden shrink-0 rounded-md border border-accent px-3 py-1.5 text-sm font-semibold text-accent hover:bg-accent/10 sm:inline-flex"
        >
          Buy me a coffee
        </a>
      </div>
    </header>
  )
}
