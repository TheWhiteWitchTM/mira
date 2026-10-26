"use client"

import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type CardSize = "post" | "square"

const SIZES: Record<CardSize, { w: number; h: number; label: string }> = {
	post: { w: 1200, h: 630, label: "Post 1200×630" },
	square: { w: 1080, h: 1080, label: "Square 1080×1080" },
}

const ACCENTS = [
	{ name: "Signal", value: "#22c55e" },
	{ name: "Lip", value: "#e11d48" },
	{ name: "Brass", value: "#eab308" },
	{ name: "Ink", value: "#e7e5e4" },
]

const DEFAULTS = {
	kicker: "Mira · The White Witch",
	name: "Mira",
	line: "Freelance software. The lab is open.",
	detail: "LibreSky, MAGIC, RETRO, and the Qt apps.",
	site: "thewhitewitchtm.github.io",
	emoji: "🧙‍♀️",
}

function setSpacing(ctx: CanvasRenderingContext2D, value: string) {
	const spaced = ctx as CanvasRenderingContext2D & { letterSpacing?: string }
	if ("letterSpacing" in spaced) spaced.letterSpacing = value
}

function firstGrapheme(value: string): string {
	const trimmed = value.trim()
	if (!trimmed) return "✦"
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
		const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })
		const first = segmenter.segment(trimmed)[Symbol.iterator]().next().value
		return first?.segment || "✦"
	}
	return Array.from(trimmed)[0] || "✦"
}

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
	const words = text.split(/\s+/).filter(Boolean)
	const lines: string[] = []
	let line = ""
	for (const word of words) {
		const next = line ? `${line} ${word}` : word
		if (ctx.measureText(next).width > maxWidth && line) {
			lines.push(line)
			line = word
		} else {
			line = next
		}
	}
	if (line) lines.push(line)
	return lines.slice(0, 3)
}

function fitSize(
	ctx: CanvasRenderingContext2D,
	text: string,
	maxWidth: number,
	start: number,
	min: number,
	weight: string,
	family: string,
): number {
	let size = start
	while (size > min) {
		ctx.font = `${weight} ${size}px ${family}`
		if (ctx.measureText(text).width <= maxWidth) return size
		size -= 2
	}
	ctx.font = `${weight} ${min}px ${family}`
	return min
}

export function CallingCard() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [size, setSize] = useState<CardSize>("post")
	const [accent, setAccent] = useState(ACCENTS[0].value)
	const [kicker, setKicker] = useState(DEFAULTS.kicker)
	const [name, setName] = useState(DEFAULTS.name)
	const [line, setLine] = useState(DEFAULTS.line)
	const [detail, setDetail] = useState(DEFAULTS.detail)
	const [site, setSite] = useState(DEFAULTS.site)
	const [emoji, setEmoji] = useState(DEFAULTS.emoji)

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return
		let cancelled = false

		const paint = () => {
			if (cancelled) return
			const { w, h } = SIZES[size]
			canvas.width = w
			canvas.height = h
			const family = getComputedStyle(document.body).fontFamily || "system-ui, sans-serif"
			const pad = Math.round(w * 0.07)
			const mark = firstGrapheme(emoji)
			const seal = Math.round(Math.min(w, h) * 0.16)
			const textWidth = w - pad * 2 - seal - pad

			ctx.fillStyle = "#09090b"
			ctx.fillRect(0, 0, w, h)

			ctx.strokeStyle = accent
			ctx.lineWidth = Math.max(2, Math.round(w * 0.004))
			const inset = Math.round(w * 0.028)
			ctx.strokeRect(inset, inset, w - inset * 2, h - inset * 2)

			ctx.fillStyle = accent
			ctx.textBaseline = "top"
			setSpacing(ctx, "0.16em")
			const kickerSize = fitSize(ctx, kicker.toUpperCase(), textWidth, Math.round(w * 0.02), 14, "600", family)
			ctx.font = `600 ${kickerSize}px ${family}`
			ctx.fillText(kicker.toUpperCase(), pad, Math.round(h * 0.14))
			setSpacing(ctx, "0px")

			ctx.fillStyle = "#fafafa"
			const nameSize = fitSize(ctx, name || "Name", textWidth, Math.round(w * (size === "square" ? 0.09 : 0.078)), 28, "650", family)
			ctx.font = `650 ${nameSize}px ${family}`
			const nameY = Math.round(h * (size === "square" ? 0.28 : 0.26))
			ctx.fillText(name || "Name", pad, nameY)

			ctx.fillStyle = "#e7e5e4"
			const lineSize = Math.round(w * 0.028)
			ctx.font = `400 ${lineSize}px ${family}`
			const lines = wrapLines(ctx, line, textWidth)
			let y = nameY + nameSize + Math.round(h * 0.04)
			for (const row of lines) {
				ctx.fillText(row, pad, y)
				y += Math.round(lineSize * 1.35)
			}

			ctx.fillStyle = "#a1a1aa"
			const detailSize = Math.round(w * 0.02)
			ctx.font = `400 ${detailSize}px ${family}`
			const details = wrapLines(ctx, detail, textWidth)
			y += Math.round(h * 0.02)
			for (const row of details) {
				ctx.fillText(row, pad, y)
				y += Math.round(detailSize * 1.4)
			}

			setSpacing(ctx, "0.08em")
			ctx.fillStyle = accent
			const siteSize = Math.round(w * 0.016)
			ctx.font = `600 ${siteSize}px ${family}`
			ctx.fillText(site.toUpperCase(), pad, h - pad - siteSize)
			setSpacing(ctx, "0px")

			const cx = w - pad - seal / 2
			const cy = h - pad - seal / 2
			ctx.beginPath()
			ctx.arc(cx, cy, seal / 2, 0, Math.PI * 2)
			ctx.strokeStyle = accent
			ctx.lineWidth = Math.max(2, Math.round(seal * 0.04))
			ctx.stroke()
			ctx.font = `${Math.round(seal * 0.46)}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`
			ctx.textAlign = "center"
			ctx.textBaseline = "middle"
			ctx.fillText(mark, cx, cy + seal * 0.04)
			ctx.textAlign = "left"
			ctx.textBaseline = "top"
		}

		paint()
		document.fonts.ready.then(paint).catch(() => undefined)
		return () => {
			cancelled = true
		}
	}, [accent, detail, emoji, kicker, line, name, site, size])

	const download = () => {
		const canvas = canvasRef.current
		if (!canvas) return
		canvas.toBlob((blob) => {
			if (!blob) {
				toast("Could not draw the card.")
				return
			}
			const url = URL.createObjectURL(blob)
			const anchor = document.createElement("a")
			anchor.href = url
			anchor.download = size === "square" ? "calling-card-square.png" : "calling-card.png"
			anchor.click()
			URL.revokeObjectURL(url)
			toast("Saved the PNG.")
		}, "image/png")
	}

	const copyCaption = async () => {
		const caption = `${name} — ${line}\n${site}`
		try {
			await navigator.clipboard.writeText(caption)
			toast("Copied the caption.")
		} catch {
			toast("Clipboard is blocked in this browser.")
		}
	}

	const reset = () => {
		setKicker(DEFAULTS.kicker)
		setName(DEFAULTS.name)
		setLine(DEFAULTS.line)
		setDetail(DEFAULTS.detail)
		setSite(DEFAULTS.site)
		setEmoji(DEFAULTS.emoji)
		setAccent(ACCENTS[0].value)
		setSize("post")
	}

	return (
		<div className="not-prose mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
			<form
				className="order-2 flex flex-col gap-3 lg:order-1"
				onSubmit={(event) => {
					event.preventDefault()
					download()
				}}
			>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="card-kicker">Kicker</Label>
					<Input id="card-kicker" value={kicker} onChange={(event) => setKicker(event.target.value)} className="text-base" />
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="card-name">Name</Label>
					<Input id="card-name" value={name} onChange={(event) => setName(event.target.value)} className="text-base" />
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="card-line">Line</Label>
					<Input id="card-line" value={line} onChange={(event) => setLine(event.target.value)} className="text-base" />
				</div>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="card-detail">Detail</Label>
					<Input id="card-detail" value={detail} onChange={(event) => setDetail(event.target.value)} className="text-base" />
				</div>
				<div className="grid grid-cols-1 gap-3">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="card-site">Site line</Label>
						<Input id="card-site" value={site} onChange={(event) => setSite(event.target.value)} className="text-base" />
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="card-emoji">Mark</Label>
						<Input
							id="card-emoji"
							value={emoji}
							onChange={(event) => setEmoji(event.target.value)}
							className="text-base"
							aria-describedby="card-emoji-hint"
						/>
					</div>
				</div>
				<p id="card-emoji-hint" className="text-xs text-muted-foreground">
					One emoji. It sits in the seal.
				</p>
				<div className="flex flex-col gap-1.5">
					<span className="text-sm font-medium">Accent</span>
					<div className="flex flex-wrap gap-2">
						{ACCENTS.map((swatch) => (
							<button
								key={swatch.value}
								type="button"
								aria-pressed={accent === swatch.value}
								onClick={() => setAccent(swatch.value)}
								className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm aria-pressed:border-foreground"
							>
								<span className="size-3 rounded-full" style={{ background: swatch.value }} />
								{swatch.name}
							</button>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-1.5">
					<span className="text-sm font-medium">Size</span>
					<div className="flex flex-wrap gap-2">
						{(Object.keys(SIZES) as CardSize[]).map((key) => (
							<Button
								key={key}
								type="button"
								variant={size === key ? "default" : "outline"}
								onClick={() => setSize(key)}
							>
								{SIZES[key].label}
							</Button>
						))}
					</div>
				</div>
				<div className="flex flex-wrap gap-2 pt-1">
					<Button type="submit">Download PNG</Button>
					<Button type="button" variant="outline" onClick={copyCaption}>
						Copy caption
					</Button>
					<Button type="button" variant="ghost" onClick={reset}>
						Reset
					</Button>
				</div>
			</form>
			<div className="order-1 min-w-0 lg:order-2">
				<canvas
					ref={canvasRef}
					role="img"
					aria-label={`${name}. ${line}`}
					className="h-auto w-full max-w-full rounded-xl border bg-black"
				/>
				<p className="mt-2 text-xs text-muted-foreground">
					Drawn here. Nothing is uploaded. The wide size is a post preview. The square size fits a profile post.
				</p>
			</div>
		</div>
	)
}
