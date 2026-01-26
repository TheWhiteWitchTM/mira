"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { removeBackground } from "@imgly/background-removal"

export function ImageMagic() {
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [previewUrl, setPreviewUrl] = useState("")
  const [removeBg, setRemoveBg] = useState(false)
  const [addText, setAddText] = useState(false)
  const [textContent, setTextContent] = useState("Your Text Here")
  const [textColor, setTextColor] = useState("#ffffff")
  const [textSize, setTextSize] = useState(60)
  const [filter, setFilter] = useState("none")
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [symmetricCrop, setSymmetricCrop] = useState(0)   // 0-50% all sides
  const [leftRightCrop, setLeftRightCrop] = useState(0)    // 0-50% horizontal
  const [topBottomCrop, setTopBottomCrop] = useState(0)    // 0-50% vertical
  const [rounding, setRounding] = useState(0)              // 0-50px corner radius

  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const drawInitial = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.font = "40px Arial"
    ctx.fillStyle = "#888888"
    ctx.textAlign = "center"
    ctx.fillText("Upload an image", canvas.width / 2, canvas.height / 2)
  }

  const drawPreview = (url) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img = new Image()
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const scaledWidth = img.width * scale
      const scaledHeight = img.height * scale
      const x = (canvas.width - scaledWidth) / 2
      const y = (canvas.height - scaledHeight) / 2

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
    }
    img.onerror = () => {
      ctx.fillStyle = "#ff5555"
      ctx.font = "40px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Image load failed", canvas.width / 2, canvas.height / 2)
    }
    img.src = url
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)

    drawPreview(url)
  }

  const applyMagic = async () => {
    if (!file) return toast.info("Upload an image first")

    setProcessing(true)

    try {
      let currentBlob = await (await fetch(previewUrl)).blob()
      let currentUrl = previewUrl

      if (removeBg) {
        currentBlob = await removeBackground(currentBlob)
        currentUrl = URL.createObjectURL(currentBlob)
        drawPreview(currentUrl)
      }

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const img = await new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = "anonymous"
        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = currentUrl
      })

      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Apply crop sliders
      const cropSymmetric = symmetricCrop / 100
      const cropLR = leftRightCrop / 100
      const cropTB = topBottomCrop / 100

      const cropX = img.width * (cropSymmetric + cropLR / 2)
      const cropY = img.height * (cropSymmetric + cropTB / 2)
      const cropWidth = img.width * (1 - 2 * cropSymmetric - cropLR)
      const cropHeight = img.height * (1 - 2 * cropSymmetric - cropTB)

      const scale = Math.min(canvas.width / cropWidth, canvas.height / cropHeight)
      const scaledWidth = cropWidth * scale
      const scaledHeight = cropHeight * scale
      const x = (canvas.width - scaledWidth) / 2
      const y = (canvas.height - scaledHeight) / 2

      ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, x, y, scaledWidth, scaledHeight)

      if (filter !== "none") {
        ctx.filter = filter === "grayscale" ? "grayscale(100%)" :
          filter === "sepia" ? "sepia(100%)" :
            filter === "invert" ? "invert(100%)" : "none"
        ctx.drawImage(canvas, 0, 0)
        ctx.filter = "none"
      }

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i]
        let g = data[i + 1]
        let b = data[i + 2]

        r += brightness * 2.55
        g += brightness * 2.55
        b += brightness * 2.55

        r = ((r - 128) * (contrast / 100 + 1)) + 128
        g = ((g - 128) * (contrast / 100 + 1)) + 128
        b = ((b - 128) * (contrast / 100 + 1)) + 128

        const avg = (r + g + b) / 3
        r = avg + (r - avg) * (saturation / 100 + 1)
        g = avg + (g - avg) * (saturation / 100 + 1)
        b = avg + (b - avg) * (saturation / 100 + 1)

        data[i] = Math.max(0, Math.min(255, r))
        data[i + 1] = Math.max(0, Math.min(255, g))
        data[i + 2] = Math.max(0, Math.min(255, b))
      }

      ctx.putImageData(imageData, 0, 0)

      if (addText) {
        ctx.font = `${textSize}px Arial`
        ctx.fillStyle = textColor
        ctx.textAlign = "center"
        ctx.fillText(textContent, canvas.width / 2, canvas.height / 2)
      }

      toast.success("Magic applied!")
    } catch (err) {
      console.error(err)
      toast.error("Processing failed")
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    if (!canvas) return toast.info("No canvas to download")

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = "magic_image.png"
    link.click()
  }

  const handleClear = () => {
    setFile(null)
    setPreviewUrl("")
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = "40px Arial"
      ctx.fillStyle = "#888888"
      ctx.textAlign = "center"
      ctx.fillText("Upload an image", canvas.width / 2, canvas.height / 2)
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>ImageMagic – Simple Wizard 🪄</CardTitle>
        <CardDescription>
          Upload image → it appears immediately → adjust sliders → Apply Magic → Download PNG
          <br />
          All toggles off by default (simple JPG → PNG conversion if you want).
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Upload + Preview + Actions */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Image</Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={processing}
              />
              {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
            </div>

            <div className="space-y-2">
              <Label>Preview Canvas</Label>
              <div className="border rounded-lg overflow-hidden shadow-lg bg-[#1a1a1a]">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button onClick={applyMagic} disabled={processing || !file} className="flex-1">
                {processing ? "Processing..." : "Apply Magic ✨"}
              </Button>

              <Button variant="outline" onClick={handleDownload} disabled={!file} className="flex-1">
                Download Canvas as PNG
              </Button>

              {file && (
                <Button variant="ghost" onClick={handleClear} className="flex-1">
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-8">
            {/* Top: Main toggles */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-2">
                <Switch checked={removeBg} onCheckedChange={setRemoveBg} id="remove-bg" />
                <Label htmlFor="remove-bg">Remove Background</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch checked={addText} onCheckedChange={setAddText} id="add-text" />
                <Label htmlFor="add-text">Add Text</Label>
              </div>

              {addText && (
                <div className="pl-6 space-y-4 border-l-2 border-muted">
                  <Input
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Enter text..."
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label>Color</Label>
                      <Input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full h-10 p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label>Size: {textSize}px</Label>
                      <Slider
                        min={20}
                        max={200}
                        step={5}
                        value={[textSize]}
                        onValueChange={([v]) => setTextSize(v)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Crop sliders */}
            <div className="space-y-6 p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-lg">Crop Controls</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Symmetric Crop ({symmetricCrop}% from all sides)</Label>
                  <Slider min={0} max={50} step={1} value={[symmetricCrop]} onValueChange={([v]) => setSymmetricCrop(v)} />
                </div>

                <div className="space-y-2">
                  <Label>Left/Right Crop ({leftRightCrop}%)</Label>
                  <Slider min={0} max={50} step={1} value={[leftRightCrop]} onValueChange={([v]) => setLeftRightCrop(v)} />
                </div>

                <div className="space-y-2">
                  <Label>Top/Bottom Crop ({topBottomCrop}%)</Label>
                  <Slider min={0} max={50} step={1} value={[topBottomCrop]} onValueChange={([v]) => setTopBottomCrop(v)} />
                </div>
              </div>
            </div>

            {/* Filters & adjustments */}
            <div className="space-y-6 p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-lg">Filters & Adjustments</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Filter</Label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="grayscale">Grayscale</SelectItem>
                      <SelectItem value="sepia">Sepia</SelectItem>
                      <SelectItem value="invert">Invert Colors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Brightness ({brightness})</Label>
                  <Slider min={-100} max={100} step={5} value={[brightness]} onValueChange={([v]) => setBrightness(v)} />
                </div>

                <div className="space-y-2">
                  <Label>Contrast ({contrast})</Label>
                  <Slider min={-100} max={100} step={5} value={[contrast]} onValueChange={([v]) => setContrast(v)} />
                </div>

                <div className="space-y-2">
                  <Label>Saturation ({saturation})</Label>
                  <Slider min={-100} max={100} step={5} value={[saturation]} onValueChange={([v]) => setSaturation(v)} />
                </div>

                <div className="space-y-2">
                  <Label>Rounding ({rounding}px)</Label>
                  <Slider min={0} max={50} step={1} value={[rounding]} onValueChange={([v]) => setRounding(v)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={applyMagic} disabled={processing || !file} className="flex-1">
            {processing ? "Processing..." : "Apply Magic ✨"}
          </Button>

          <Button variant="outline" onClick={() => {
            const canvas = canvasRef.current
            if (!canvas) return
            const dataUrl = canvas.toDataURL("image/png")
            const link = document.createElement("a")
            link.href = dataUrl
            link.download = "magic_image.png"
            link.click()
          }} disabled={!file} className="flex-1">
            Download Canvas as PNG
          </Button>

          {file && (
            <Button variant="ghost" onClick={handleClear} className="flex-1">
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}