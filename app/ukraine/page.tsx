import { pageMetadata } from "@/lib/metadata"

export const metadata = pageMetadata(
  "I support Ukraine",
  "Ukraine is defending itself. Gifts go through UNITED24, Come Back Alive, and the Prytula Foundation. This site does not see the payment.",
  "/ukraine/",
)

const groups = [
  {
    title: "UNITED24",
    text: "The official fundraising platform of Ukraine. Gifts go to defense, medical aid, and rebuilding.",
    href: "https://u24.gov.ua/",
    label: "Give through UNITED24",
  },
  {
    title: "Come Back Alive",
    text: "A Ukrainian foundation that equips the armed forces and publishes what it bought.",
    href: "https://savelife.in.ua/en/donate-en/",
    label: "Give through Come Back Alive",
  },
  {
    title: "Prytula Foundation",
    text: "The Serhiy Prytula Charity Foundation funds defense, demining, and humanitarian aid.",
    href: "https://prytulafoundation.org/en",
    label: "Give through the Prytula Foundation",
  },
]

export default function UkrainePage() {
  return (
    <article className="space-y-6">
      <div className="overflow-hidden rounded-lg border border-line" aria-hidden="true">
        <svg viewBox="0 0 240 160" className="block h-auto w-full">
          <rect width="240" height="80" fill="#005BBB" />
          <rect y="80" width="240" height="80" fill="#FFD500" />
        </svg>
      </div>
      <header>
        <p className="kicker">Stand</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight text-white">I support Ukraine</h1>
        <p className="mt-3 max-w-prose text-muted">
          Ukraine is defending itself. This page is where a gift goes. Pick the group, and the payment happens on their site. This site does not see it and does not take a cut.
        </p>
      </header>
      <ul className="grid gap-3">
        {groups.map((group) => (
          <li key={group.href} className="frame p-4">
            <h2 className="text-xl font-semibold text-white">{group.title}</h2>
            <p className="mt-2 text-sm text-muted">{group.text}</p>
            <p className="mt-3">
              <a href={group.href} target="_blank" rel="noopener noreferrer" className="chip">
                {group.label}
              </a>
            </p>
          </li>
        ))}
      </ul>
      <p className="text-sm text-muted">Each group opens in a new tab.</p>
    </article>
  )
}
