"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function UkraineMark() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      const wrap = document.getElementById("ua-mark")?.parentElement
      if (wrap && event.target instanceof Node && wrap.contains(event.target)) return
      setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
    }
  }, [open])

  return (
    <div className={open ? "ua-wrap is-open" : "ua-wrap"}>
      <button
        type="button"
        className="ua-mark"
        id="ua-mark"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="ua-menu"
        aria-label="I support Ukraine"
        onClick={() => setOpen((value) => !value)}
      >
        <svg className="ua-pin" viewBox="0 0 48 32" aria-hidden="true">
          <rect width="48" height="16" fill="#005BBB" />
          <rect y="16" width="48" height="16" fill="#FFD500" />
        </svg>
        <span className="sr-only">I support Ukraine</span>
      </button>
      <div className="ua-door" id="ua-menu" role="menu" aria-label="I support Ukraine" aria-hidden={open ? undefined : true}>
        <span className="ua-door-string" aria-hidden="true" />
        <div className="ua-door-card">
          <span className="ua-door-kicker">Stand</span>
          <strong>UKRAINE</strong>
          <div className="ua-pair">
            <figure className="is-up">
              <svg viewBox="0 0 96 64" aria-hidden="true">
                <rect width="96" height="32" fill="#005BBB" />
                <rect y="32" width="96" height="32" fill="#FFD500" />
                <circle cx="76" cy="48" r="13" fill="#0b1c33" />
                <path
                  fill="#fff"
                  transform="translate(64.6 36.6) scale(.95)"
                  d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"
                />
              </svg>
              <figcaption>
                Ukraine<span className="sr-only">, thumbs up</span>
              </figcaption>
            </figure>
            <figure className="is-down">
              <svg viewBox="0 0 96 64" aria-hidden="true">
                <rect width="96" height="21.34" fill="#fff" />
                <rect y="21.33" width="96" height="21.34" fill="#0039A6" />
                <rect y="42.66" width="96" height="21.34" fill="#D52B1B" />
                <circle cx="76" cy="48" r="13" fill="#0b1c33" />
                <path
                  fill="#fff"
                  transform="translate(64.6 36.6) scale(.95)"
                  d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"
                />
              </svg>
              <figcaption>
                Russia<span className="sr-only">, thumbs down</span>
              </figcaption>
            </figure>
          </div>
          <span className="ua-door-note">Ways to give</span>
          <Link className="ua-item" role="menuitem" href="/ukraine/" onClick={() => setOpen(false)}>
            I support Ukraine
          </Link>
        </div>
      </div>
    </div>
  )
}
