"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Button, Label, Textarea } from "@/components/ui"

type Network = {
  id: string
  label: string
  limit: number
  hint: string
  count: (text: string) => number
}

const URL_RE = /https?:\/\/[^\s]+/gi
const TCO = 23

function graphemes(text: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].length
  }
  return Array.from(text).length
}

function xCount(text: string): number {
  const urls = text.match(URL_RE) ?? []
  const without = text.replace(URL_RE, "")
  return graphemes(without) + urls.length * TCO
}

const NETWORKS: Network[] = [
  { id: "x", label: "X", limit: 280, hint: "URLs count as 23", count: xCount },
  { id: "bluesky", label: "Bluesky", limit: 300, hint: "Graphemes", count: graphemes },
  { id: "threads", label: "Threads", limit: 500, hint: "Characters", count: (t) => t.length },
  { id: "linkedin", label: "LinkedIn", limit: 3000, hint: "Characters", count: (t) => t.length },
  { id: "mastodon", label: "Mastodon", limit: 500, hint: "Characters, default", count: (t) => t.length },
]

function hashtags(text: string): string[] {
  return [...new Set(text.match(/#[\p{L}\p{N}_]+/gu) ?? [])]
}

function mentions(text: string): string[] {
  return [...new Set(text.match(/@[\p{L}\p{N}._]+/gu) ?? [])]
}

function splitThread(text: string, limit: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const parts: string[] = []
  let current = ""
  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (xCount(next) > limit && current) {
      parts.push(current)
      current = word
    } else {
      current = next
    }
  }
  if (current) parts.push(current)
  const total = parts.length
  if (total <= 1) return parts
  return parts.map((part, index) => `${part} (${index + 1}/${total})`)
}

export function PostMeter() {
  const [text, setText] = useState("The lab is open.\n\nFreelance software. AI, C#, TypeScript.\nhttps://thewhitewitchtm.github.io/mira/")

  const stats = useMemo(() => {
    return {
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      chars: text.length,
      graphs: graphemes(text),
      urls: text.match(URL_RE) ?? [],
      tags: hashtags(text),
      people: mentions(text),
      networks: NETWORKS.map((net) => {
        const used = net.count(text)
        return { ...net, used, over: used > net.limit, ratio: Math.min(1, used / net.limit) }
      }),
    }
  }, [text])

  const thread = splitThread(text, 280)

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast(label)
    } catch {
      toast("Clipboard is blocked in this browser.")
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
      <div className="flex flex-col gap-3">
        <Label htmlFor="post-meter">Caption</Label>
        <Textarea id="post-meter" value={text} onChange={(event) => setText(event.target.value)} rows={12} className="min-h-56 font-sans" />
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => copy(text, "Copied the caption.")}>
            Copy
          </Button>
          {thread.length > 1 ? (
            <Button type="button" variant="line" onClick={() => copy(thread.join("\n\n---\n\n"), "Copied the X thread.")}>
              Copy X thread ({thread.length})
            </Button>
          ) : null}
          <Button type="button" variant="ghost" onClick={() => setText("")}>
            Clear
          </Button>
        </div>
        {thread.length > 1 ? (
          <ol className="space-y-2 text-sm">
            {thread.map((part, index) => (
              <li key={index} className="frame p-3">
                <p className="text-xs text-muted">
                  {index + 1}/{thread.length} · {xCount(part)} / 280
                </p>
                <p className="mt-1 whitespace-pre-wrap">{part}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
      <aside className="flex flex-col gap-3">
        <div className="frame p-4 text-sm">
          <p>
            {stats.graphs} graphemes · {stats.chars} chars · {stats.words} words
          </p>
          <p className="mt-1 text-muted">{stats.urls.length} URL{stats.urls.length === 1 ? "" : "s"}</p>
        </div>
        <ul className="space-y-2">
          {stats.networks.map((net) => (
            <li key={net.id} className="frame p-3">
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-medium">{net.label}</span>
                <span className={net.over ? "text-red-400" : "text-muted"}>
                  {net.used} / {net.limit}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div className={net.over ? "h-full bg-red-400" : "h-full bg-accent"} style={{ width: `${net.ratio * 100}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">{net.hint}</p>
            </li>
          ))}
        </ul>
        {stats.tags.length ? <p className="text-sm text-muted">Tags: {stats.tags.join(" ")}</p> : null}
        {stats.people.length ? <p className="text-sm text-muted">Mentions: {stats.people.join(" ")}</p> : null}
      </aside>
    </div>
  )
}
