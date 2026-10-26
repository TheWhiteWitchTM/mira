import Link from "next/link"
import { getArticle, getPosts } from "@/lib/content"
import { pageMetadata } from "@/lib/metadata"
import { projectGroups } from "@/lib/projects"
import { person, withBase } from "@/lib/site"

export const metadata = pageMetadata(
  "Mira — freelance consultant in AI, C++, and TypeScript",
  "Professional lab of Mira, The White Witch. Freelance consulting in AI, C++, and TypeScript. Tools, tutorials, projects, and a dev blog.",
  "/",
)

const skills = ["AI", "C++", "TypeScript", "Next.js", "Qt", "Open source"]

const contacts = [
  { title: "Mail", href: `mailto:${person.email}` },
  { title: "GitHub", href: person.github },
  { title: "The card", href: person.card },
  { title: "RSS", href: withBase("/feed.xml") },
]

export default function HomePage() {
  const posts = getPosts().slice(0, 3)
  const featured = projectGroups.slice(0, 3)

  return (
    <div className="space-y-10">
      <section className="frame overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
          <div className="bg-black">
            <img
              src={withBase("/mira.jpg")}
              alt="Mira, smiling, red hair in a ponytail, black jacket, pointing."
              width={1008}
              height={1792}
              className="aspect-[3/4] h-auto w-full object-cover object-top sm:aspect-auto sm:h-full sm:max-h-[28rem]"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-5 sm:p-7">
            <p className="kicker">Mira · The White Witch™</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">The lab is open.</h1>
            <p className="max-w-md text-base text-muted">
              Freelance software consultant. AI systems, C++ and Qt, TypeScript in the browser. This site is the card for the work. The long pages live with the witch.
            </p>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">
                  {skill}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-2">
              {contacts.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="chip"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <p className="kicker">Hire</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">What I take</h2>
        <p className="mt-2 max-w-prose text-sm text-muted">I work for Andreas. Hire me through him.</p>
        <p className="mt-3">
          <a href={person.andreas} target="_blank" rel="noopener noreferrer" className="chip">
            Hire me
          </a>
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            { title: "AI", text: "Wire models into products that already ship. Static sites, local tools, and the boring glue that makes a demo a system." },
            { title: "C++", text: "Native apps and Qt. Tooling that stays on the machine. The Borland habit of a small program that does one job." },
            { title: "TypeScript", text: "Next.js, static export, GitHub Pages. The stack this site is on. Browser tools that never upload your files." },
          ].map((item) => (
            <li key={item.title} className="frame p-4">
              <h3 className="font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="kicker">Desk</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">Projects</h2>
          </div>
          <Link href="/projects/" className="text-sm text-accent hover:text-accent-2">
            Full list →
          </Link>
        </div>
        <div className="mt-4 grid gap-3">
          {featured.map((group) => (
            <article key={group.title} className="frame p-4">
              <p className="kicker">{group.kicker}</p>
              <h3 className="mt-1 font-semibold text-white">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="chip">
                      {link.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="kicker">Notes</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">From the blog</h2>
          </div>
          <Link href="/blog/" className="text-sm text-accent hover:text-accent-2">
            All posts →
          </Link>
        </div>
        <ul className="mt-4 grid gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="frame block p-4 hover:border-accent">
                <p className="text-xs text-muted">
                  <time dateTime={post.date}>{post.date}</time>
                </p>
                <h3 className="mt-1 font-semibold text-white">{post.title}</h3>
                <p className="mt-1 text-sm text-muted">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="kicker">AI</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">The shelf</h2>
          </div>
          <Link href="/ai/" className="text-sm text-accent hover:text-accent-2">
            All articles →
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {["history", "modern", "grok", "a-good-prompt"].map((slug) => {
            const doc = getArticle(slug)
            if (!doc) return null
            return (
              <li key={slug}>
                <Link href={`/ai/${doc.slug}/`} className="frame block h-full p-4 hover:border-accent">
                  <h3 className="font-semibold text-white">{doc.title}</h3>
                  <p className="mt-1 text-sm text-muted">{doc.description}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
