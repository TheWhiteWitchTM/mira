import type { MetadataRoute } from "next"
import { getArticles, getPosts, getTutorials } from "@/lib/content"
import { toolsNav, tutorialsNav } from "@/lib/nav"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

function loc(path: string): string {
  const joined = `${siteUrl}${path}`
  return joined.endsWith("/") ? joined : `${joined}/`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/projects", "/blog", "/ai", "/cards", "/tools", "/tutorials"]
  return [
    ...staticPaths.map((path) => ({
      url: loc(path),
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.8,
    })),
    ...toolsNav.map((item) => ({
      url: loc(item.href),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...tutorialsNav.map((item) => ({
      url: loc(item.href),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getPosts().map((post) => ({
      url: loc(`/blog/${post.slug}`),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...getTutorials().map((doc) => ({
      url: loc(`/tutorials/${doc.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...getArticles().map((doc) => ({
      url: loc(`/ai/${doc.slug}`),
      lastModified: doc.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ]
}
