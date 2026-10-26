import fs from "node:fs"
import path from "node:path"
import RSS from "rss"
import { getPosts, getTutorials } from "../lib/content"
import { defaultDescription, siteName, siteUrl, withBase } from "../lib/site"

const feed = new RSS({
  title: siteName,
  description: defaultDescription,
  feed_url: `${siteUrl}/feed.xml`,
  site_url: `${siteUrl}/`,
  image_url: `${siteUrl}/og.jpg`,
  language: "en",
  pubDate: new Date().toUTCString(),
  custom_namespaces: {
    atom: "http://www.w3.org/2005/Atom",
  },
})

for (const post of getPosts()) {
  feed.item({
    title: post.title,
    description: post.description,
    url: `${siteUrl}/blog/${post.slug}/`,
    date: post.date,
    categories: post.tags,
    author: "Mira",
  })
}

for (const doc of getTutorials()) {
  feed.item({
    title: `Tutorial: ${doc.title}`,
    description: doc.description,
    url: `${siteUrl}/tutorials/${doc.slug}/`,
    date: doc.date,
    categories: ["tutorial", ...doc.tags],
    author: "Mira",
  })
}

const xml = feed.xml({ indent: true })
const out = path.join(process.cwd(), "public", "feed.xml")
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, xml)
console.log(`wrote ${withBase("/feed.xml")} (${getPosts().length} posts, ${getTutorials().length} tutorials)`)
