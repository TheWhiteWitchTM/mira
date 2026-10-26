"use client"

import { useRef, useState } from "react"
import { removeBackground } from "@imgly/background-removal"
import JSZip from "jszip"
import { Button } from "@/components/ui"

const sizes = [
  { label: "Original", value: "original" },
  { label: "Web medium 1200×800", value: "1200x800" },
  { label: "Instagram 1080×1080", value: "1080x1080" },
  { label: "Story 1080×1920", value: "1080x1920" },
  { label: "X 1200×675", value: "1200x675" },
  { label: "YouTube 1280×720", value: "1280x720" },
]

export function ImageMagic() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [originalSrc, setOriginalSrc] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [selectedSize, setSelectedSize] = useState("original")

  const drawImage = (src: string, width: number, height: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const img = new window.Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
    }
    img.src = src
  }

  const loadFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result !== "string") return
      setOriginalSrc(result)
      setPreviewSrc(result)
      const img = new window.Image()
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height })
        drawImage(result, img.width, img.height)
      }
      img.src = result
    }
    reader.readAsDataURL(file)
  }

  const removeBg = async () => {
    if (!previewSrc) return
    setProcessing(true)
    try {
      const blob = await fetch(previewSrc).then((r) => r.blob())
      const resultBlob = await removeBackground(blob)
      const resultUrl = URL.createObjectURL(resultBlob)
      setPreviewSrc(resultUrl)
      const img = new window.Image()
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height })
        drawImage(resultUrl, img.width, img.height)
      }
      img.src = resultUrl
    } catch (error) {
      console.error(error)
    } finally {
      setProcessing(false)
    }
  }

  const handleResize = (value: string) => {
    setSelectedSize(value)
    if (!originalSrc) return
    if (value === "original") {
      drawImage(previewSrc || originalSrc, dimensions.width, dimensions.height)
      return
    }
    const [w, h] = value.split("x").map(Number)
    drawImage(previewSrc || originalSrc, w, h)
  }

  const exportPng = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const a = document.createElement("a")
    a.href = canvas.toDataURL("image/png")
    a.download = "edited-image.png"
    a.click()
  }

  const exportIcons = async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const zip = new JSZip()
    const pack = [
      { size: 16, name: "favicon-16x16.png" },
      { size: 32, name: "favicon-32x32.png" },
      { size: 180, name: "apple-touch-icon.png" },
      { size: 192, name: "icon-192x192.png" },
      { size: 512, name: "icon-512x512.png" },
    ]
    for (const item of pack) {
      const temp = document.createElement("canvas")
      temp.width = item.size
      temp.height = item.size
      temp.getContext("2d")?.drawImage(canvas, 0, 0, item.size, item.size)
      const blob = await fetch(temp.toDataURL("image/png")).then((r) => r.blob())
      zip.file(item.name, blob)
    }
    const content = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(content)
    const a = document.createElement("a")
    a.href = url
    a.download = "icon-set.zip"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mt-6 space-y-4">
      {previewSrc ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={removeBg} disabled={processing}>
            {processing ? "Removing…" : "Remove background"}
          </Button>
          <select value={selectedSize} onChange={(event) => handleResize(event.target.value)} className="field w-auto">
            {sizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          <Button type="button" variant="line" onClick={exportPng}>
            Export PNG
          </Button>
          <Button type="button" variant="line" onClick={exportIcons}>
            Icon set
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              if (originalSrc) {
                setPreviewSrc(originalSrc)
                setSelectedSize("original")
                drawImage(originalSrc, dimensions.width, dimensions.height)
              }
            }}
          >
            Reset
          </Button>
        </div>
      ) : null}
      <div
        className="frame flex min-h-72 cursor-pointer items-center justify-center p-4"
        onClick={() => fileInputRef.current?.click()}
        onDrop={(event) => {
          event.preventDefault()
          const file = event.dataTransfer.files?.[0]
          if (file?.type.startsWith("image/")) loadFile(file)
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) loadFile(file)
          }}
          className="hidden"
        />
        {previewSrc ? (
          <canvas ref={canvasRef} className="max-h-[70vh] max-w-full" />
        ) : (
          <p className="text-center text-muted">Drop a picture, or click to pick one. JPG, PNG, GIF. Nothing is uploaded.</p>
        )}
      </div>
    </div>
  )
}
