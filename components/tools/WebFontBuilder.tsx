"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button, Input } from "@/components/ui"

const symbols = [
  { char: "↑", name: "up arrow" },
  { char: "↓", name: "down arrow" },
  { char: "←", name: "left arrow" },
  { char: "→", name: "right arrow" },
  { char: "↖", name: "up-left arrow" },
  { char: "↗", name: "up-right arrow" },
  { char: "↙", name: "down-left arrow" },
  { char: "↘", name: "down-right arrow" },
  { char: "↔", name: "left-right arrow" },
  { char: "↕", name: "up-down arrow" },
  { char: "↩", name: "leftwards arrow with hook" },
  { char: "↪", name: "rightwards arrow with hook" },
  { char: "⤴", name: "arrow pointing rightwards then curving upwards" },
  { char: "⤵", name: "arrow pointing rightwards then curving downwards" },
  { char: "➔", name: "rightwards arrow" },
  { char: "➜", name: "rightwards arrow with stroke" },
  { char: "➡", name: "rightwards black arrow" },
  { char: "↺", name: "anticlockwise open circle arrow" },
  { char: "↻", name: "clockwise open circle arrow" },
  { char: "⇄", name: "rightwards arrow over leftwards arrow" },
  { char: "⇅", name: "upwards arrow leftwards of downwards arrow" },
  { char: "⇤", name: "leftwards arrow to bar" },
  { char: "⇥", name: "rightwards arrow to bar" },
  { char: "↵", name: "downwards arrow with corner leftwards (enter)" },
  { char: "↯", name: "downwards zigzag arrow" },
]

function findSymbol(term: string): string {
  const clean = term.toLowerCase().trim()
  if (!clean) return ""
  for (const item of symbols) {
    if (item.name.includes(clean) || item.char === clean) return item.char
  }
  return "?"
}

export function WebFontBuilder() {
  const [search, setSearch] = useState("")
  const terms = search.replace(/,/g, " ").split(/\s+/).map((t) => t.trim()).filter(Boolean)
  const built = terms.map(findSymbol).join("")

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied", { description: label }))
  }

  return (
    <div className="mt-6 space-y-4">
      <Input placeholder="up down left right circle" value={search} onChange={(event) => setSearch(event.target.value)} />
      {search.trim() ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl">{built}</span>
          <Button type="button" variant="line" onClick={() => copy(built, "Symbol sequence")}>
            Copy
          </Button>
        </div>
      ) : null}
      <div className="frame max-h-[540px] overflow-y-auto p-4">
        <h2 className="mb-3 text-lg font-semibold text-white">Arrows ({symbols.length})</h2>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12">
          {symbols.map((item) => (
            <button key={item.name} type="button" title={item.name} className="rounded-md p-2 text-2xl hover:bg-accent/10" onClick={() => copy(item.char, item.name)}>
              {item.char}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
