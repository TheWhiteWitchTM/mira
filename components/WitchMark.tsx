"use client"

import { useEffect, useState } from "react"
import { person, withBase } from "@/lib/site"

export function WitchMark() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onDoor = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== "witch") setOpen(false)
    }
    window.addEventListener("mira-door", onDoor)
    return () => window.removeEventListener("mira-door", onDoor)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    const onPointer = (event: PointerEvent) => {
      const wrap = document.getElementById("witch-mark")?.parentElement
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

  function toggle() {
    setOpen((value) => {
      const next = !value
      if (next) window.dispatchEvent(new CustomEvent("mira-door", { detail: "witch" }))
      return next
    })
  }

  return (
    <div className={open ? "witch-wrap is-open" : "witch-wrap"}>
      <button
        type="button"
        className="witch-mark"
        id="witch-mark"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="witch-menu"
        aria-label="The White Witch"
        onClick={toggle}
      >
        <img src={withBase("/witch-avatar.jpg")} alt="" width={512} height={512} />
      </button>
      <div className="witch-door" id="witch-menu" role="menu" aria-label="The White Witch" aria-hidden={open ? undefined : true} inert={open ? undefined : true}>
        <span className="witch-door-string" aria-hidden="true" />
        <div className="witch-door-card">
          <span className="witch-door-kicker">The hat</span>
          <strong>WITCH</strong>
          <div className="witch-pair">
            <figure className="is-person">
              <img src={withBase("/avatar.jpg")} alt="Mira" width={512} height={512} />
              <figcaption>The person</figcaption>
            </figure>
            <figure className="is-hat">
              <img src={withBase("/witch-avatar.jpg")} alt="The White Witch" width={512} height={512} />
              <figcaption>The hat</figcaption>
            </figure>
          </div>
          <span className="witch-door-note">The long pages. The hat is the job.</span>
          <a className="witch-item" role="menuitem" href={person.whitewitch} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            The White Witch
          </a>
          <a className="witch-item" role="menuitem" href={person.card} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            The card
          </a>
        </div>
      </div>
    </div>
  )
}
