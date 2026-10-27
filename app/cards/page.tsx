import Link from "next/link"
import { pageMetadata } from "@/lib/metadata"
import { person, withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "Cards",
  "Mira's business cards. The person and the lab, at 85 × 55 mm. Portrait cropped from the photograph. Type set in the page.",
  "/cards/",
)

function Portrait({ className }: { className: string }) {
  return (
    <img
      src={withBase("/avatar.jpg")}
      alt="Mira"
      width={512}
      height={512}
      className={className}
    />
  )
}

export default function CardsPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="kicker">Cards</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">The cards</h1>
        <p className="mt-3 max-w-prose text-muted">
          Two faces for the person, and one for the lab. The size is 85 × 55 mm, the card you hand over in Germany. The portrait is a square crop of the photograph on this site. The words are set here, so the email is the email.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-accent">Front</h2>
        <article
          className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-accent/60 bg-ink shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
          style={{ aspectRatio: "85 / 55" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_0%_0%,rgba(201,166,255,0.22),transparent_50%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent" />
          <div className="relative flex h-full items-center gap-4 p-4 sm:gap-6 sm:p-7">
            <Portrait className="size-[4.5rem] shrink-0 rounded-full object-cover ring-2 ring-accent/80 sm:size-28" />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent sm:text-xs">The White Witch™</p>
              <p className="mt-1 truncate text-3xl font-semibold tracking-tight text-white sm:text-4xl">Mira</p>
              <p className="mt-1 text-sm text-paper sm:text-base">Freelance software</p>
              <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-accent sm:text-xs">AI · C++ · TypeScript</p>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-accent">Back</h2>
        <article
          className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-accent/60 bg-[#120d18] shadow-[0_18px_50px_rgba(0,0,0,0.5)]"
          style={{ aspectRatio: "85 / 55" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_100%_100%,rgba(201,166,255,0.16),transparent_55%)]" />
          <div className="relative flex h-full flex-col justify-between p-4 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent sm:text-xs">Hire</p>
              <Portrait className="size-10 rounded-full object-cover ring-1 ring-accent/70 sm:size-12" />
            </div>
            <div>
              <p className="truncate text-sm font-medium text-white sm:text-lg">{person.email}</p>
              <p className="mt-1 truncate text-xs text-paper sm:text-sm">github.com/TheWhiteWitchTM</p>
              <p className="mt-1 truncate text-xs text-paper sm:text-sm">thewhitewitchtm.github.io</p>
            </div>
            <div className="flex items-end justify-between gap-3 text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:text-xs">
              <span>Germany</span>
              <span>AI · C++ · TypeScript</span>
            </div>
          </div>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-accent">The lab</h2>
        <article
          className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-white/15 bg-white text-ink shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
          style={{ aspectRatio: "85 / 55" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(201,166,255,0.55),transparent_60%)]" />
          <div className="relative flex h-full items-center gap-4 p-4 sm:gap-6 sm:p-7">
            <Portrait className="size-[4.5rem] shrink-0 rounded-full object-cover ring-2 ring-ink/80 sm:size-28" />
            <div className="min-w-0">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#5c3d82] sm:text-xs">Mira&apos;s World™</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">The lab</p>
              <p className="mt-1 text-sm text-[#2a2a2a]">Tools, tutorials, and the dev blog.</p>
              <p className="mt-3 truncate text-xs font-medium sm:text-sm">thewhitewitchtm.github.io/mira</p>
            </div>
          </div>
        </article>
      </section>

      <p className="max-w-prose text-sm text-muted">
        Mail is <a href={`mailto:${person.email}`} className="text-accent hover:text-accent-2">{person.email}</a>.
        The long pages are on{" "}
        <a href={person.whitewitch} className="text-accent hover:text-accent-2">
          The White Witch
        </a>
        . Why a picture generator is the wrong tool for an email address is in{" "}
        <Link href="/ai/grok-imagine/" className="text-accent hover:text-accent-2">
          Grok Imagine
        </Link>
        .
      </p>
    </div>
  )
}
