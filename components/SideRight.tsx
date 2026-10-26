import { Github, Mail, Youtube } from "lucide-react"
import { BlueSkyIcon } from "./Icons"
import { person, withBase } from "@/lib/site"

const links = [
  { href: person.github, label: "GitHub", icon: Github },
  { href: `mailto:${person.email}`, label: "Mail", icon: Mail },
  { href: person.youtube, label: "YouTube", icon: Youtube },
  { href: person.x, label: "X", icon: null },
  { href: person.bluesky, label: "Bluesky", icon: BlueSkyIcon },
]

export function SideRight() {
  return (
    <aside className="hidden w-[140px] shrink-0 lg:block">
      <div className="sticky top-24">
        <img
          src={withBase("/mira.jpg")}
          alt="Mira, smiling, red hair in a ponytail, black jacket, pointing."
          width={1008}
          height={1792}
          className="w-full rounded-lg object-cover object-top shadow-[0_4px_16px_rgba(0,0,0,0.45)]"
        />
        <p className="mt-3 text-sm font-medium text-accent">Mira</p>
        <p className="mt-1 text-xs leading-5 text-muted">Freelance software. AI, C++, TypeScript.</p>
        <ul className="mt-3 flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-2 text-sm text-paper hover:text-accent"
                  aria-label={link.label}
                >
                  {Icon ? <Icon className="size-4" /> : <span className="text-xs font-semibold">X</span>}
                  <span>{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
