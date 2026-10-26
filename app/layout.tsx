import type { Metadata, Viewport } from "next"
import { Toaster } from "sonner"
import { Gtag } from "@/components/Gtag"
import { Shell } from "@/components/Shell"
import { baseMetadata, jsonLdGraph } from "@/lib/metadata"
import "./globals.css"

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-ink text-paper antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph()) }} />
        <Gtag />
        <Shell>{children}</Shell>
        <Toaster theme="dark" offset={88} />
      </body>
    </html>
  )
}
