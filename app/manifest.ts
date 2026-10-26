import type { MetadataRoute } from "next"
import { withBase } from "@/lib/site"

export const dynamic = "force-static"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mira's World",
    short_name: "Mira's World",
    description: "Freelance consultant in AI, C#, and TypeScript. Tools, tutorials, and a dev blog.",
    id: withBase("/"),
    start_url: withBase("/"),
    scope: withBase("/"),
    lang: "en",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    categories: ["business", "education", "productivity"],
    icons: [
      { src: withBase("/icon-192x192.png"), sizes: "192x192", type: "image/png" },
      { src: withBase("/icon-512x512.png"), sizes: "512x512", type: "image/png" },
    ],
  }
}
