import { getArticles, getPosts, getTutorials } from "@/lib/content"
import type { RailCard, RailLink } from "@/lib/rail"
import { projectGroups } from "@/lib/projects"
import { person, withBase } from "@/lib/site"
import { toolGroups } from "@/lib/tools"

function link(title: string, href: string, external = false): RailLink {
  return { title, href, external }
}

function others(items: RailLink[], href: string): RailLink[] {
  return items.filter((item) => item.href !== href).slice(0, 4)
}

export function buildRailCards(): Record<string, RailCard> {
  const posts = getPosts()
  const articles = getArticles()
  const tutorials = getTutorials()
  const postLinks = posts.map((doc) => link(doc.title, `/blog/${doc.slug}/`))
  const articleLinks = articles.map((doc) => link(doc.title, `/ai/${doc.slug}/`))
  const tutorialLinks = tutorials.map((doc) => link(doc.title, `/tutorials/${doc.slug}/`))
  const toolLinks = toolGroups.flatMap((group) => group.links.map((item) => link(item.title, item.href)))
  const deskLead = projectGroups[0]?.links.find((item) => item.image)

  const cards: Record<string, RailCard> = {
    hire: {
      id: "hire",
      kicker: "Hire",
      title: "Andreas",
      text: "I work for Andreas. Hire me through him.",
      image: withBase("/andreas.jpg"),
      alt: "Andreas, short brown hair, glasses, black jacket, against a black background.",
      width: 832,
      height: 1248,
      href: person.andreas,
      external: true,
      links: [link("Hire me", person.andreas, true)],
    },
    blog: {
      id: "blog",
      kicker: "Notes",
      title: "Blog",
      text: "Build notes from the lab.",
      links: postLinks.slice(0, 4),
    },
    ai: {
      id: "ai",
      kicker: "AI",
      title: "The shelf",
      text: "The field, the Grok products, and how to brief a model.",
      links: articleLinks.slice(0, 5),
    },
    "ai-field": {
      id: "ai-field",
      kicker: "The field",
      title: "History and the modern stack",
      text: "Where it came from, and what ships now.",
      links: articleLinks.filter((item) => item.href.includes("/history/") || item.href.includes("/modern/")),
    },
    "ai-grok": {
      id: "ai-grok",
      kicker: "Grok",
      title: "The products",
      text: "Grok, Build, Bot, and Imagine.",
      links: articleLinks.filter((item) => /\/grok/.test(item.href)),
    },
    "ai-practice": {
      id: "ai-practice",
      kicker: "Practice",
      title: "A good prompt",
      text: "How to brief a model, and the cards.",
      links: [link("A good prompt", "/ai/a-good-prompt/"), link("Cards", "/cards/")],
    },
    projects: {
      id: "projects",
      kicker: "Desk",
      title: "Projects",
      text: "Each link opens that project on its own site.",
      image: deskLead?.image ? withBase(deskLead.image) : undefined,
      alt: "",
      width: 1200,
      height: 630,
      links: projectGroups.map((group) => link(group.title, `/projects/#${group.id}`)),
    },
    tools: {
      id: "tools",
      kicker: "Tools",
      title: "In the browser",
      text: "Posts, marks, and pictures. Nothing is uploaded.",
      links: toolLinks.slice(0, 5),
    },
    tutorials: {
      id: "tutorials",
      kicker: "Tutorials",
      title: "References",
      text: "Tailwind, Markdown, JavaScript, and TypeScript.",
      links: tutorialLinks,
    },
    about: {
      id: "about",
      kicker: "About",
      title: "Mira",
      text: "Dual German-American. Freelance software in Germany.",
      links: [link("Andreas", person.andreas, true), link("GitHub", person.github, true)],
    },
    ukraine: {
      id: "ukraine",
      kicker: "Stand",
      title: "Ukraine",
      text: "Ukraine is my friend. Gifts go through these three.",
      links: [
        link("UNITED24", "https://u24.gov.ua/", true),
        link("Come Back Alive", "https://savelife.in.ua/en/donate-en/", true),
        link("Prytula Foundation", "https://prytulafoundation.org/en", true),
      ],
    },
    cards: {
      id: "cards",
      kicker: "Cards",
      title: "Business cards",
      text: "The person and the lab. 85 × 55 mm.",
      links: [link("About", "/about/")],
    },
  }

  for (const doc of posts) {
    cards[`post:${doc.slug}`] = {
      id: `post:${doc.slug}`,
      kicker: "Notes",
      title: doc.title,
      text: doc.description,
      links: others(postLinks, `/blog/${doc.slug}/`),
    }
  }

  for (const doc of articles) {
    cards[`ai:${doc.slug}`] = {
      id: `ai:${doc.slug}`,
      kicker: "AI",
      title: doc.title,
      text: doc.description,
      links: others(articleLinks, `/ai/${doc.slug}/`),
    }
  }

  for (const doc of tutorials) {
    cards[`tutorial:${doc.slug}`] = {
      id: `tutorial:${doc.slug}`,
      kicker: "Tutorials",
      title: doc.title,
      text: doc.description,
      links: others(tutorialLinks, `/tutorials/${doc.slug}/`),
    }
  }

  for (const group of toolGroups) {
    const links = group.links.map((item) => link(item.title, item.href))
    cards[group.id] = {
      id: group.id,
      kicker: group.kicker,
      title: group.title,
      text: group.note,
      links,
    }
    for (const item of group.links) {
      const slug = item.href.replace(/^\/tools\//, "").replace(/\/$/, "")
      cards[`tool:${slug}`] = {
        id: `tool:${slug}`,
        kicker: "Tools",
        title: item.title,
        text: item.copy,
        links: others(toolLinks, item.href),
      }
    }
  }

  for (const group of projectGroups) {
    const picture = group.links.find((item) => item.image)
    cards[group.id] = {
      id: group.id,
      kicker: group.kicker,
      title: group.title,
      text: picture?.copy || group.links[0]?.copy || "",
      image: picture?.image ? withBase(picture.image) : undefined,
      alt: "",
      width: 1200,
      height: 630,
      links: group.links.map((item) => link(item.title, item.href, true)),
    }
  }

  return cards
}
