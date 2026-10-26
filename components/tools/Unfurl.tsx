"use client"

import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Button, Input, Label, Textarea } from "@/components/ui"
import { withBase } from "@/lib/site"

const publishedImage = "https://thewhitewitchtm.github.io/mira/og.jpg"

type Platform = "x" | "bluesky" | "discord" | "slack"

const PLATFORMS: { id: Platform; label: string }[] = [
  { id: "x", label: "X" },
  { id: "bluesky", label: "Bluesky" },
  { id: "discord", label: "Discord" },
  { id: "slack", label: "Slack" },
]

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function hostOf(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return "example.com"
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    return new URL(withProtocol).host
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").split("/")[0] || "example.com"
  }
}

function metaTags(title: string, description: string, url: string, image: string): string {
  const t = escapeAttr(title.trim() || "Untitled")
  const d = escapeAttr(description.trim())
  const u = escapeAttr(url.trim())
  const i = escapeAttr(image.trim())
  return [
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${u}">`,
    `<meta property="og:image" content="${i}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${i}">`,
  ].join("\n")
}

function coverDataUrl(img: HTMLImageElement): string {
  const canvas = document.createElement("canvas")
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext("2d")
  if (!ctx) return ""
  ctx.fillStyle = "#0a0a0a"
  ctx.fillRect(0, 0, 1200, 630)
  const scale = Math.max(1200 / img.width, 630 / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  ctx.drawImage(img, (1200 - dw) / 2, (630 - dh) / 2, dw, dh)
  return canvas.toDataURL("image/png")
}

export function Unfurl() {
  const [title, setTitle] = useState("Mira's World")
  const [description, setDescription] = useState("Freelance consultant in AI, C++, and TypeScript. Tools, tutorials, and a dev blog.")
  const [url, setUrl] = useState("https://thewhitewitchtm.github.io/mira/")
  const [site, setSite] = useState("Mira's World")
  const [imageAddress, setImageAddress] = useState(publishedImage)
  const [localSrc, setLocalSrc] = useState<string | null>(null)
  const [platform, setPlatform] = useState<Platform>("x")

  const previewSrc = localSrc || imageAddress
  const host = hostOf(url)
  const tags = useMemo(() => metaTags(title, description, url, imageAddress), [title, description, url, imageAddress])

  const onFile = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast("That file is not an image.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setLocalSrc(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const copyTags = async () => {
    try {
      await navigator.clipboard.writeText(tags)
      toast("Copied the meta tags.")
    } catch {
      toast("Clipboard is blocked in this browser.")
    }
  }

  const downloadCrop = () => {
    const img = new window.Image()
    img.onload = () => {
      const data = coverDataUrl(img)
      if (!data) return
      const link = document.createElement("a")
      link.href = data
      link.download = "og-1200x630.png"
      link.click()
    }
    img.src = previewSrc || withBase("/og.jpg")
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <form
        className="order-2 flex flex-col gap-3 lg:order-1"
        onSubmit={(event) => {
          event.preventDefault()
          copyTags()
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-title">Title</Label>
          <Input id="unfurl-title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-description">Description</Label>
          <Textarea id="unfurl-description" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-url">Page address</Label>
          <Input id="unfurl-url" value={url} onChange={(event) => setUrl(event.target.value)} inputMode="url" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-site">Site name</Label>
          <Input id="unfurl-site" value={site} onChange={(event) => setSite(event.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-image">Image address</Label>
          <Input id="unfurl-image" value={imageAddress} onChange={(event) => setImageAddress(event.target.value)} inputMode="url" />
          <p className="text-xs text-muted">This is the address that goes in the tags. It has to be a file the networks can fetch.</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="unfurl-file">Or drop a picture</Label>
          <Input id="unfurl-file" type="file" accept="image/*" onChange={(event) => onFile(event.target.files?.[0])} />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button type="submit">Copy meta tags</Button>
          <Button type="button" variant="line" onClick={downloadCrop}>
            Download 1200×630
          </Button>
          {localSrc ? (
            <Button type="button" variant="ghost" onClick={() => setLocalSrc(null)}>
              Use the address
            </Button>
          ) : null}
        </div>
      </form>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="mb-3 flex flex-wrap gap-2 md:hidden">
          {PLATFORMS.map((item) => (
            <Button key={item.id} type="button" variant={platform === item.id ? "primary" : "line"} onClick={() => setPlatform(item.id)}>
              {item.label}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {PLATFORMS.map((item) => (
            <Preview key={item.id} kind={item.id} hidden={platform !== item.id} title={title} description={description} host={host} site={site} src={previewSrc} />
          ))}
        </div>
        <label className="mt-4 block text-sm font-medium" htmlFor="unfurl-tags">
          Head tags
        </label>
        <textarea id="unfurl-tags" readOnly value={tags} rows={9} className="field mt-1.5 font-mono text-xs leading-relaxed" />
      </div>
    </div>
  )
}

function Preview({
  kind,
  hidden,
  title,
  description,
  host,
  site,
  src,
}: {
  kind: Platform
  hidden: boolean
  title: string
  description: string
  host: string
  site: string
  src: string
}) {
  const label = PLATFORMS.find((item) => item.id === kind)?.label
  return (
    <article className={hidden ? "hidden md:block" : "block"}>
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">{label}</p>
      {kind === "discord" ? (
        <div className="overflow-hidden rounded-md border border-line bg-[#2b2d31] text-white">
          <div className="border-l-4 border-[#5865f2] p-3">
            <p className="text-xs text-[#00a8fc]">{site || host}</p>
            <p className="mt-1 text-sm font-semibold text-[#00a8fc]">{title || "Untitled"}</p>
            <p className="mt-1 line-clamp-3 text-sm text-[#dbdee1]">{description}</p>
            <img src={src} alt="" className="mt-2 aspect-[1.91/1] w-full rounded object-cover" />
          </div>
        </div>
      ) : kind === "slack" ? (
        <div className="rounded-md border border-line bg-white p-3 text-zinc-900">
          <p className="text-xs text-zinc-500">{site || host}</p>
          <p className="mt-1 text-sm font-semibold text-blue-700">{title || "Untitled"}</p>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{description}</p>
          <img src={src} alt="" className="mt-2 aspect-[1.91/1] w-full rounded object-cover" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-panel">
          <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" />
          <div className="p-3">
            <p className="line-clamp-2 text-sm font-semibold">{title || "Untitled"}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>
            <p className="mt-2 text-xs text-muted">{host}</p>
          </div>
        </div>
      )}
    </article>
  )
}
