import Link from "next/link"
import { Nav } from "./Nav"
import { UkraineMark } from "./UkraineMark"
import { WitchMark } from "./WitchMark"
import { person, withBase } from "@/lib/site"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-accent bg-ink/95 backdrop-blur">
      <div className="relative mx-auto flex h-12 max-w-[1400px] flex-nowrap items-center gap-2 px-3 sm:gap-3 sm:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <img
            src={withBase("/avatar.jpg")}
            alt="Mira"
            width={512}
            height={512}
            className="size-8 shrink-0 rounded-full object-cover ring-1 ring-accent/70"
          />
          <span className="truncate font-semibold tracking-tight text-accent">Mira&apos;s World™</span>
        </Link>
        <Nav />
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <WitchMark />
          <UkraineMark />
          <a
            href={person.coffee}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-8 shrink-0 items-center rounded-md border border-accent px-3 text-sm font-semibold text-accent hover:bg-accent/10 sm:inline-flex"
          >
            Buy me a coffee
          </a>
        </div>
      </div>
    </header>
  )
}
