"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { RailCard, RailLink } from "@/lib/rail"
import { railIdForPath } from "@/lib/rail"

function RailAnchor({ item }: { item: RailLink }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    )
  }
  return <Link href={item.href}>{item.title}</Link>
}

export function TopicRail({ cards }: { cards: Record<string, RailCard> }) {
  const pathname = usePathname()
  const cardsRef = useRef(cards)
  cardsRef.current = cards
  const known = Object.keys(cards)
  const routeId = railIdForPath(pathname, known)
  const [seenPath, setSeenPath] = useState(pathname)
  const [override, setOverride] = useState<string | null>(null)
  if (seenPath !== pathname) {
    setSeenPath(pathname)
    setOverride(null)
  }
  const active = override && known.includes(override) ? override : routeId

  useEffect(() => {
    const ids = Object.keys(cardsRef.current)
    const main = document.getElementById("main")
    const nodes = main ? [...main.querySelectorAll<HTMLElement>("[data-rail]")] : []
    if (!nodes.length) return

    const visible = new Map<string, number>()
    const apply = () => {
      if (!visible.size) {
        setOverride(null)
        return
      }
      const next = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0]
      if (ids.includes(next)) setOverride(next)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-rail")
          if (!id) continue
          if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top)
          else visible.delete(id)
        }
        apply()
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.15, 0.4] },
    )

    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [pathname])

  const card = cards[active] ?? cards[routeId] ?? cards.lab
  const picture = card.image ? (
    <img src={card.image} alt={card.alt ?? ""} width={card.width ?? 1200} height={card.height ?? 630} />
  ) : null

  return (
    <aside className="side-rail" aria-label={card.title}>
      <div className="side-stick">
        <div key={card.id} className="rail-swap">
          {card.id === "ukraine" ? (
            <div className="rail-flag" aria-hidden="true">
              <span />
              <span />
            </div>
          ) : null}
          {picture ? (
            card.href ? (
              card.external ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                  {picture}
                </a>
              ) : (
                <Link href={card.href} className="block">
                  {picture}
                </Link>
              )
            ) : (
              picture
            )
          ) : null}
          <p className={picture || card.id === "ukraine" ? "kicker mt-3" : "kicker"}>{card.kicker}</p>
          <p className="mt-2 text-sm font-medium leading-5 text-white">{card.title}</p>
          {card.text ? <p className="rail-text">{card.text}</p> : null}
          {card.links.length ? (
            <ul className="rail-links">
              {card.links.map((item) => (
                <li key={item.href + item.title}>
                  <RailAnchor item={item} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </aside>
  )
}
