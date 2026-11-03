import { getArticles, getLongform, getPosts, getTutorials } from "@/lib/content"
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

function still(name: string, alt: string): Pick<RailCard, "image" | "alt" | "width" | "height"> {
  return {
    image: withBase(`/rail/${name}.jpg`),
    alt,
    width: 832,
    height: 1248,
  }
}

const toolStill: Record<string, string> = {
  posts: "posts",
  marks: "marks",
  pictures: "pictures",
}

export function buildRailCards(): Record<string, RailCard> {
  const posts = getPosts()
  const longform = getLongform()
  const articles = getArticles()
  const tutorials = getTutorials()
  const postLinks = posts.map((doc) => link(doc.title, `/blog/${doc.slug}/`))
  const longformLinks = longform.map((doc) => link(doc.title, `/articles/${doc.slug}/`))
  const articleLinks = articles.map((doc) => link(doc.title, `/ai/${doc.slug}/`))
  const tutorialLinks = tutorials.map((doc) => link(doc.title, `/tutorials/${doc.slug}/`))
  const toolLinks = toolGroups.flatMap((group) => group.links.map((item) => link(item.title, item.href)))

  const cards: Record<string, RailCard> = {
    lab: {
      id: "lab",
      kicker: "Mira · The White Witch™",
      title: "The lab is open.",
      text: "Freelance software. AI, C++, TypeScript.",
      ...still("lab", "A dark software desk with a laptop, notebooks, and coffee."),
      links: [link("About", "/about/"), link("Projects", "/projects/")],
    },
    hire: {
      id: "hire",
      kicker: "Hire",
      title: "What I take",
      text: "AI, C++, and TypeScript. Mail is the way in.",
      ...still("hire", "A consulting desk with a leather folder, a fountain pen, and a laptop."),
      href: `mailto:${person.email}`,
      links: [link("Hire me", `mailto:${person.email}`)],
    },
    blog: {
      id: "blog",
      kicker: "Notes",
      title: "Blog",
      text: "Build notes from the lab.",
      ...still("blog", "An open notebook, a fountain pen, and index cards on a dark desk."),
      links: postLinks.slice(0, 4),
    },
    articles: {
      id: "articles",
      kicker: "Long form",
      title: "Articles",
      text: "Essays that need more room than a lab note.",
      ...still("posts", "A stack of blank social preview cards on a dark desk."),
      links: longformLinks.slice(0, 4),
    },
    ai: {
      id: "ai",
      kicker: "AI",
      title: "The shelf",
      text: "The field, the Grok products, and how to brief a model.",
      ...still("ai", "A glass neural-network sculpture glowing violet in the dark."),
      links: articleLinks.slice(0, 5),
    },
    "ai-field": {
      id: "ai-field",
      kicker: "The field",
      title: "History and the modern stack",
      text: "Where it came from, and what ships now.",
      ...still("ai", "A glass neural-network sculpture glowing violet in the dark."),
      links: articleLinks.filter((item) => item.href.includes("/history/") || item.href.includes("/modern/")),
    },
    "ai-grok": {
      id: "ai-grok",
      kicker: "Grok",
      title: "The products",
      text: "Grok, Build, Bot, and Imagine.",
      ...still("grok", "A dark glass cube of circuitry and starlight."),
      links: articleLinks.filter((item) => /\/grok/.test(item.href)),
    },
    "ai-practice": {
      id: "ai-practice",
      kicker: "Practice",
      title: "A good prompt",
      text: "How to brief a model, and the cards.",
      ...still("prompt", "A notebook open to a brief, lit by a single beam."),
      links: [link("A good prompt", "/ai/a-good-prompt/"), link("Cards", "/cards/")],
    },
    projects: {
      id: "projects",
      kicker: "Desk",
      title: "Projects",
      text: "Each link opens that project on its own site.",
      ...still("desk", "Three monitors on a dark desk, code and interfaces glowing."),
      links: projectGroups.map((group) => link(group.title, `/projects/#${group.id}`)),
    },
    tools: {
      id: "tools",
      kicker: "Tools",
      title: "In the browser",
      text: "Posts, marks, and pictures. Nothing is uploaded.",
      ...still("tools", "A tablet, scissors, a color loupe, and a small wand on a dark desk."),
      links: toolLinks.slice(0, 5),
    },
    tutorials: {
      id: "tutorials",
      kicker: "Tutorials",
      title: "References",
      text: "Tailwind, Markdown, JavaScript, and TypeScript.",
      ...still("tutorials", "Four reference books on a dark desk, one open."),
      links: tutorialLinks,
    },
    about: {
      id: "about",
      kicker: "About",
      title: "Mira",
      text: "Dual German-American. Freelance software in Germany.",
      ...still("about", "A vintage computer keyboard and a worn programming manual."),
      links: [link("GitHub", person.github, true), link("Hire me", `mailto:${person.email}`)],
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
      ...still("cards", "Two blank dark business cards on a black desk."),
      links: [link("About", "/about/")],
    },
  }

  for (const doc of posts) {
    cards[`post:${doc.slug}`] = {
      id: `post:${doc.slug}`,
      kicker: "Notes",
      title: doc.title,
      text: doc.description,
      ...still("blog", "An open notebook, a fountain pen, and index cards on a dark desk."),
      links: others(postLinks, `/blog/${doc.slug}/`),
    }
  }

  for (const doc of longform) {
    cards[`longform:${doc.slug}`] = {
      id: `longform:${doc.slug}`,
      kicker: "Long form",
      title: doc.title,
      text: doc.description,
      ...still("posts", "A stack of blank social preview cards on a dark desk."),
      links: others(longformLinks, `/articles/${doc.slug}/`),
    }
  }

  for (const doc of articles) {
    const name = /grok/.test(doc.slug) ? "grok" : doc.slug === "a-good-prompt" ? "prompt" : "ai"
    const alt =
      name === "grok"
        ? "A dark glass cube of circuitry and starlight."
        : name === "prompt"
          ? "A notebook open to a brief, lit by a single beam."
          : "A glass neural-network sculpture glowing violet in the dark."
    cards[`ai:${doc.slug}`] = {
      id: `ai:${doc.slug}`,
      kicker: "AI",
      title: doc.title,
      text: doc.description,
      ...still(name, alt),
      links: others(articleLinks, `/ai/${doc.slug}/`),
    }
  }

  for (const doc of tutorials) {
    cards[`tutorial:${doc.slug}`] = {
      id: `tutorial:${doc.slug}`,
      kicker: "Tutorials",
      title: doc.title,
      text: doc.description,
      ...still("tutorials", "Four reference books on a dark desk, one open."),
      links: others(tutorialLinks, `/tutorials/${doc.slug}/`),
    }
  }

  for (const group of toolGroups) {
    const links = group.links.map((item) => link(item.title, item.href))
    const name = toolStill[group.id] || "tools"
    const alt =
      name === "posts"
        ? "A stack of blank social preview cards on a dark desk."
        : name === "marks"
          ? "Enamel flag pins and emoji charms on black velvet."
          : name === "pictures"
            ? "A camera, a print, and a craft knife on a cutting mat."
            : "A tablet, scissors, a color loupe, and a small wand on a dark desk."
    cards[group.id] = {
      id: group.id,
      kicker: group.kicker,
      title: group.title,
      text: group.note,
      ...still(name, alt),
      links,
    }
    for (const item of group.links) {
      const slug = item.href.replace(/^\/tools\//, "").replace(/\/$/, "")
      cards[`tool:${slug}`] = {
        id: `tool:${slug}`,
        kicker: "Tools",
        title: item.title,
        text: item.copy,
        ...still(name, alt),
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
      ...(picture?.image
        ? { image: withBase(picture.image), alt: "", width: 1200, height: 630 }
        : still("hire", "A consulting desk with a leather folder, a fountain pen, and a laptop.")),
      links: group.links.map((item) => link(item.title, item.href, true)),
    }
  }

  return cards
}
