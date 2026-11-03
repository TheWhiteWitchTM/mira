export const siteHost = "miratechtm.sociallydead.me"
export const siteOrigin = `https://${siteHost}`
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
export const siteUrl = `${siteOrigin}${basePath}`
export const siteName = "Mira's World"
export const gaId = "G-13S6Z9KCX9"

export const person = {
  name: "Mira",
  brand: "The White Witch™",
  handle: "miratechtm",
  job: "Freelance software consultant",
  notice: "Pro freelance consultant · AI · C++ · TypeScript",
  location: "Germany",
  email: "miratechtm@sociallydead.me",
  github: "https://github.com/TheWhiteWitchTM",
  githubRepos: "https://github.com/TheWhiteWitchTM?tab=repositories",
  whitewitchRepo: "https://github.com/TheWhiteWitchTM/whitewitch",
  whitewitch: "https://thewhitewitchtm.github.io/whitewitch/",
  card: "https://thewhitewitchtm.github.io/",
  youtube: "https://youtube.com/@TheWhiteWitchTM",
  x: "https://x.com/miratechtm",
  bluesky: "https://bsky.app/profile/miratechtm.sociallydead.me",
  coffee: "https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA",
}

export function withBase(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${normalized}`
}

export function asset(path: string): string {
  return withBase(path)
}

/** Social card. Bump the query when public/og.jpg changes so X and Bluesky fetch the new file. */
export const ogImagePath = "/og.jpg?v=2"

export const defaultTitle = "Mira — freelance consultant in AI, C++, and TypeScript"
export const defaultDescription =
  "Mira's World is the professional lab of Mira, The White Witch. Freelance software consulting in AI, C++, and TypeScript. Browser tools, tutorials, projects, and a dev blog. Static pages on GitHub."

export const keywords = [
  "Mira",
  "Mira's World",
  "The White Witch",
  "freelance consultant",
  "AI consultant",
  "C++",
  "TypeScript",
  "Next.js",
  "GitHub Pages",
  "LibreSky",
  "MAGIC",
  "open source",
  "Germany",
]
