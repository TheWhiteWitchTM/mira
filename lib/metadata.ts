import type { Metadata } from "next"
import {
  basePath,
  defaultDescription,
  defaultTitle,
  keywords,
  person,
  siteName,
  siteOrigin,
  siteUrl,
  withBase,
} from "./site"

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  publisher: person.name,
  applicationName: siteName,
  category: "technology",
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: withBase("/"),
    siteName,
    images: [
      {
        url: withBase("/og.jpg"),
        width: 1200,
        height: 630,
        alt: "Mira, red hair in a ponytail, black jacket, pointing.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    site: "@TheWhiteWitchTM",
    creator: "@TheWhiteWitchTM",
    images: [withBase("/og.jpg")],
  },
  icons: {
    icon: [
      { url: withBase("/favicon.ico"), sizes: "32x32" },
      { url: withBase("/icon-192x192.png"), sizes: "192x192", type: "image/png" },
      { url: withBase("/icon-512x512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: withBase("/apple-touch-icon.png"),
  },
  alternates: {
    canonical: withBase("/"),
    types: {
      "application/rss+xml": withBase("/feed.xml"),
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "theme-color": "#0a0a0a",
  },
}

export function pageMetadata(title: string, description: string, path: string, type: "website" | "article" = "website"): Metadata {
  const canonical = withBase(path.endsWith("/") || path.endsWith(".xml") ? path : `${path}/`)
  return {
    title,
    description,
    alternates: { canonical, types: { "application/rss+xml": withBase("/feed.xml") } },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      siteName,
      images: [
        {
          url: withBase("/og.jpg"),
          width: 1200,
          height: 630,
          alt: "Mira, red hair in a ponytail, black jacket, pointing.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [withBase("/og.jpg")],
    },
  }
}

export function jsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        url: `${siteUrl}/`,
        description: defaultDescription,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#mira` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#mira`,
        name: person.name,
        alternateName: ["The White Witch", "The White Witch™"],
        jobTitle: person.job,
        description: "Freelance software consultant. AI, C#, and TypeScript. Dual German-American, based in Germany.",
        url: siteUrl,
        email: person.email,
        image: `${siteUrl}/mira.jpg`,
        nationality: ["German", "American"],
        knowsAbout: ["Artificial intelligence", "C#", "TypeScript", "Next.js", "Open source"],
        sameAs: [
          person.github,
          person.x,
          person.youtube,
          person.whitewitch,
          person.card,
          "https://thewhitewitchtm.github.io/emojigames/",
          "https://thewhitewitchtm.github.io/LibreSky/",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: "Mira — freelance software consulting",
        url: `${siteUrl}/`,
        image: `${siteUrl}/og.jpg`,
        founder: { "@id": `${siteUrl}/#mira` },
        areaServed: "Worldwide",
        serviceType: ["AI consulting", "C# development", "TypeScript development", "Next.js"],
      },
    ],
  }
}

export { basePath, siteUrl, withBase }
