"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { removeBackground } from "@imgly/background-removal"
import JSZip from "jszip"
import { toast } from "sonner"
import { Button } from "@/components/ui"

const sizes = [
  { label: "Original", value: "original" },
  { label: "Web medium 1200×800", value: "1200x800" },
  { label: "Instagram 1080×1080", value: "1080x1080" },
  { label: "Story 1080×1920", value: "1080x1920" },
  { label: "X 1200×675", value: "1200x675" },
  { label: "YouTube 1280×720", value: "1280x720" },
]

const DB_NAME = "mira-image-magic"
const STORE = "picture"
const KEY = "current"

type SavedPicture = {
  original: Blob
  preview: Blob
  size: string
  name: string
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(STORE, mode)
        const request = run(tx.objectStore(STORE))
        request.onerror = () => reject(request.error)
        tx.oncomplete = () => resolve(request.result)
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error ?? new Error("The save was aborted."))
      }).finally(() => db.close()),
  )
}

function readSaved(): Promise<SavedPicture | null> {
  return enqueue(async () => {
    const value = await withStore<SavedPicture | undefined>("readonly", (store) => store.get(KEY))
    if (!value || !(value.original instanceof Blob) || !(value.preview instanceof Blob)) return null
    return value
  })
}

let idbQueue: Promise<unknown> = Promise.resolve()

function enqueue<T>(job: () => Promise<T>): Promise<T> {
  const run = idbQueue.then(job, job)
  idbQueue = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}

function writeSaved(picture: SavedPicture): Promise<IDBValidKey> {
  return enqueue(() => withStore("readwrite", (store) => store.put(picture, KEY)))
}

function forgetSaved(): Promise<undefined> {
  return enqueue(() => withStore("readwrite", (store) => store.delete(KEY)))
}

function outputSize(selected: string, source: { width: number; height: number }) {
  if (selected === "original" || !source.width || !source.height) return source
  const [width, height] = selected.split("x").map(Number)
  if (!width || !height) return source
  return { width, height }
}

function downloadName(name: string): string {
  const stem = name.replace(/\.[^.]+$/, "") || "edited-image"
  return `${stem}-edited.png`
}

export function ImageMagic() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const urlsRef = useRef<string[]>([])
  const blobsRef = useRef<SavedPicture | null>(null)
  const seenUrl = useRef<string | null>(null)
  const generation = useRef(0)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [source, setSource] = useState({ width: 0, height: 0 })
  const [selectedSize, setSelectedSize] = useState("original")
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [ready, setReady] = useState(false)
  const [kept, setKept] = useState(false)

  if (seenUrl.current !== previewUrl) {
    seenUrl.current = previewUrl
    imageRef.current = null
  }

  const showBlobs = (original: Blob, preview: Blob) => {
    const nextOriginal = URL.createObjectURL(original)
    const nextPreview = original === preview ? nextOriginal : URL.createObjectURL(preview)
    const previous = urlsRef.current
    urlsRef.current = nextOriginal === nextPreview ? [nextOriginal] : [nextOriginal, nextPreview]
    setOriginalUrl(nextOriginal)
    setPreviewUrl(nextPreview)
    for (const url of previous) URL.revokeObjectURL(url)
  }

  const persist = async (picture: SavedPicture) => {
    const ticket = generation.current
    blobsRef.current = picture
    try {
      await writeSaved(picture)
      if (ticket !== generation.current) return
      setKept(true)
    } catch {
      if (ticket !== generation.current) return
      setKept(false)
      toast("The picture is on screen. This browser would not store it, so export it before you refresh.")
    }
  }

  useEffect(() => {
    const ticket = generation.current
    let cancelled = false
    readSaved()
      .then((saved) => {
        if (cancelled || ticket !== generation.current || !saved) return
        blobsRef.current = saved
        showBlobs(saved.original, saved.preview)
        setSelectedSize(sizes.some((size) => size.value === saved.size) ? saved.size : "original")
        setKept(true)
      })
      .catch(() => {
        if (!cancelled) toast("This browser did not give the saved picture back.")
      })
      .finally(() => {
        if (!cancelled) setReady(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!previewUrl) return
    let cancelled = false
    const img = new window.Image()
    img.onload = () => {
      if (cancelled) return
      imageRef.current = img
      setSource({ width: img.naturalWidth, height: img.naturalHeight })
    }
    img.onerror = () => {
      if (!cancelled) toast("The picture would not open.")
    }
    img.src = previewUrl
    return () => {
      cancelled = true
    }
  }, [previewUrl])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !previewUrl || !source.width) return
    const { width, height } = outputSize(selectedSize, source)
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(img, 0, 0, width, height)
  }, [previewUrl, selectedSize, source])

  const loadFile = (file: File) => {
    if (processing) return
    if (!file.type.startsWith("image/")) {
      toast("That file is not an image.")
      return
    }
    generation.current += 1
    const picture: SavedPicture = { original: file, preview: file, size: "original", name: file.name }
    showBlobs(file, file)
    setSelectedSize("original")
    void persist(picture)
  }

  const removeBg = async () => {
    const current = blobsRef.current
    if (!current || processing) return
    setProcessing(true)
    setStatus("Starting…")
    try {
      const resultBlob = await removeBackground(current.preview, {
        progress: (key, loaded, total) => {
          if (key.startsWith("fetch:")) {
            const pct = total ? Math.round((loaded / total) * 100) : 0
            setStatus(`Fetching the model… ${pct}%. Stay on this page.`)
            return
          }
          setStatus("Removing the background… Stay on this page.")
        },
      })
      const picture: SavedPicture = { ...current, preview: resultBlob, size: "original" }
      showBlobs(picture.original, picture.preview)
      setSelectedSize("original")
      await persist(picture)
      toast("Background is off. A refresh keeps this picture.")
    } catch (error) {
      console.error(error)
      toast("Background removal failed. The picture is still here.")
    } finally {
      setProcessing(false)
      setStatus(null)
    }
  }

  const handleResize = (value: string) => {
    setSelectedSize(value)
    const current = blobsRef.current
    if (!current) return
    void persist({ ...current, size: value })
  }

  const reset = () => {
    const current = blobsRef.current
    if (!current) return
    const picture: SavedPicture = { ...current, preview: current.original, size: "original" }
    showBlobs(picture.original, picture.preview)
    setSelectedSize("original")
    void persist(picture)
  }

  const forget = async () => {
    generation.current += 1
    blobsRef.current = null
    imageRef.current = null
    for (const url of urlsRef.current) URL.revokeObjectURL(url)
    urlsRef.current = []
    setOriginalUrl(null)
    setPreviewUrl(null)
    setSource({ width: 0, height: 0 })
    setSelectedSize("original")
    setKept(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
    try {
      await forgetSaved()
    } catch {
      toast("The picture left the screen. This browser may still have a copy.")
    }
  }

  const exportPng = () => {
    const canvas = canvasRef.current
    const current = blobsRef.current
    if (!canvas || !source.width) return
    let href = ""
    try {
      href = canvas.toDataURL("image/png")
    } catch {
      toast("This picture is too large to export from the page.")
      return
    }
    const a = document.createElement("a")
    a.href = href
    a.download = downloadName(current?.name || "edited-image.png")
    a.click()
  }

  const exportIcons = async () => {
    const canvas = canvasRef.current
    if (!canvas || !source.width) return
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
      const blob = await fetch(temp.toDataURL("image/png")).then((response) => response.blob())
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
      {previewUrl ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" onClick={removeBg} disabled={processing || !originalUrl}>
            {processing ? "Removing…" : "Remove background"}
          </Button>
          <select value={selectedSize} onChange={(event) => handleResize(event.target.value)} className="field w-auto" disabled={processing}>
            {sizes.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
          <Button type="button" variant="line" onClick={exportPng} disabled={!source.width || processing}>
            Export PNG
          </Button>
          <Button type="button" variant="line" onClick={exportIcons} disabled={!source.width || processing}>
            Icon set
          </Button>
          <Button type="button" variant="line" onClick={() => fileInputRef.current?.click()} disabled={processing}>
            Replace
          </Button>
          <Button type="button" variant="ghost" onClick={reset} disabled={processing}>
            Reset
          </Button>
          <Button type="button" variant="ghost" onClick={forget} disabled={processing}>
            Forget
          </Button>
        </div>
      ) : null}
      {status ? <p className="text-sm text-accent">{status}</p> : null}
      {previewUrl && !status ? (
        <p className="text-sm text-muted">
          {kept
            ? "Saved in this browser. A refresh keeps it."
            : "On screen only. Export it before you refresh."}
        </p>
      ) : null}
      <div
        className={`frame flex min-h-72 items-center justify-center p-4 ${previewUrl ? "" : "cursor-pointer"}`}
        onClick={() => {
          if (!previewUrl && ready) fileInputRef.current?.click()
        }}
        onDrop={(event) => {
          event.preventDefault()
          const file = event.dataTransfer.files?.[0]
          if (file) loadFile(file)
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
        {!ready ? (
          <p className="text-center text-muted">Looking for the saved picture…</p>
        ) : previewUrl ? (
          <div className="checker inline-block max-w-full rounded-md">
            <canvas ref={canvasRef} className="max-h-[70vh] max-w-full" />
          </div>
        ) : (
          <p className="text-center text-muted">Drop a picture, or click to pick one. JPG, PNG, GIF. A refresh keeps it. Nothing is uploaded.</p>
        )}
      </div>
    </div>
  )
}
