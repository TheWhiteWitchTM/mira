"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import dataRaw from "@emoji-mart/data"
import { Button, Input } from "@/components/ui"

const data = dataRaw as {
  emojis: Record<string, { id: string; name: string; keywords: string[]; skins: Array<{ unified: string }> }>
  categories: Array<{ id: string; name: string; emojis: string[] }>
}

const categoryNameMap: Record<string, string> = {
  smileys_and_emotion: "Smileys & Emotion",
  people_and_body: "People & Body",
  component: "Component",
  animals_and_nature: "Animals & Nature",
  food_and_drink: "Food & Drink",
  travel_and_places: "Travel & Places",
  activities: "Activities",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
}

function displayName(id: string, fallback?: string) {
  return categoryNameMap[id] || fallback || id.replace(/_/g, " ")
}

function toEmoji(unified: string): string {
  return unified
    .split("-")
    .map((hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .join("")
}

function findBest(terms: string[]) {
  if (!terms.length) return null
  let max = -1
  let best: (typeof data.emojis)[string] | null = null
  for (const emoji of Object.values(data.emojis)) {
    const fields = [emoji.name.toLowerCase(), ...emoji.keywords.map((k) => k.toLowerCase())]
    const score = terms.filter((term) => fields.some((field) => field.includes(term))).length
    if (score > max) {
      max = score
      best = emoji
    }
  }
  return best
}

function findEmoji(terms: string[]): string | null {
  const lower = terms.map((t) => t.toLowerCase())
  const skinMap: Record<string, number> = { light: 1, "medium-light": 2, medium: 3, "medium-dark": 4, dark: 5, black: 5 }
  const skinTerm = lower.find((t) => t in skinMap)
  const skinIndex = skinTerm ? skinMap[skinTerm] : 0
  const base = lower.filter((t) => !(t in skinMap))
  const match = findBest(base.length ? base : lower)
  if (!match) return null
  const skin = match.skins[skinIndex] ?? match.skins[0]
  return toEmoji(skin.unified)
}

export function EmojiBuilder() {
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () => (category === "all" ? data.categories : data.categories.filter((cat) => cat.id === category)),
    [category],
  )

  const built = search
    .split(",")
    .map((segment) => findEmoji(segment.trim().split(/\s+/).filter(Boolean)) || "?")
    .join("")

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => toast("Copied", { description: label }))
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="field sm:w-56">
          <option value="all">All categories</option>
          {data.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {displayName(cat.id, cat.name)}
            </option>
          ))}
        </select>
        <Input placeholder="woman black, sparkle, frog" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {search.trim() ? (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-4xl">{built}</span>
          <Button type="button" variant="line" onClick={() => copy(built, "Emoji sequence")}>
            Copy
          </Button>
        </div>
      ) : null}
      <div className="frame max-h-[540px] overflow-y-auto p-4">
        {filtered.map((cat) => (
          <div key={cat.id} className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-white">
              {displayName(cat.id, cat.name)} <span className="text-sm font-normal text-muted">({cat.emojis.length})</span>
            </h2>
            <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 md:grid-cols-12">
              {cat.emojis.map((id) => {
                const emoji = data.emojis[id]
                if (!emoji) return null
                const char = toEmoji(emoji.skins[0].unified)
                return (
                  <button
                    key={id}
                    type="button"
                    title={emoji.name}
                    className="rounded-md p-2 text-2xl hover:bg-accent/10"
                    onClick={() => copy(char, emoji.name)}
                  >
                    {char}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
