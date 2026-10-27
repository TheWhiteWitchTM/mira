import { githubProjects, projectGroups } from "./projects"
import { toolGroups } from "./tools"

export interface NavLink {
  type: "link"
  title: string
  href: string
  external?: boolean
}

export interface NavSep {
  type: "sep"
}

export interface NavGroup {
  type: "group"
  title: string
  children: NavNode[]
}

export type NavNode = NavLink | NavSep | NavGroup

export interface NavItem {
  title: string
  href?: string
  nodes?: NavNode[]
  /** Groups open as two columns instead of a flyout. */
  columns?: boolean
  /** Groups stack in one column, with a heading over each shelf. */
  sections?: boolean
}

export const toolsNav: NavNode[] = toolGroups.map(
  (group): NavGroup => ({
    type: "group",
    title: group.title,
    children: group.links.map((link) => ({
      type: "link",
      title: link.title,
      href: link.href,
    })),
  }),
)

export const tutorialPages: NavLink[] = [
  { type: "link", title: "🌬️Tailwind", href: "/tutorials/tailwind/" },
  { type: "link", title: "📃Markdown", href: "/tutorials/markdown/" },
  { type: "link", title: "🟨JavaScript", href: "/tutorials/javascript/" },
  { type: "link", title: "🔷TypeScript", href: "/tutorials/typescript/" },
]

export const tutorialsNav: NavNode[] = tutorialPages

/** Menu order. History and the modern stack, then the Grok products, then practice. */
export const aiNav: NavNode[] = [
  { type: "link", title: "History of AI", href: "/ai/history/" },
  { type: "link", title: "Modern AI", href: "/ai/modern/" },
  { type: "sep" },
  { type: "link", title: "Grok", href: "/ai/grok/" },
  { type: "link", title: "Grok Build", href: "/ai/grok-build/" },
  { type: "link", title: "Grok Bot", href: "/ai/grok-bot/" },
  { type: "link", title: "Grok Imagine", href: "/ai/grok-imagine/" },
  { type: "sep" },
  { type: "link", title: "A good prompt", href: "/ai/a-good-prompt/" },
  { type: "link", title: "Cards", href: "/cards/" },
]

const projectNodes: NavNode[] = [
  { type: "link", title: "Full list", href: "/projects/" },
  { type: "sep" },
  ...projectGroups
    .filter((group) => group.links.length > 1)
    .map(
      (group): NavGroup => ({
        type: "group",
        title: group.title,
        children: group.links.map((link) => ({
          type: "link",
          title: link.title,
          href: link.href,
          external: true,
        })),
      }),
    ),
  ...projectGroups
    .filter((group) => group.links.length === 1)
    .flatMap((group) =>
      group.links.map(
        (link): NavLink => ({
          type: "link",
          title: link.title,
          href: link.href,
          external: true,
        }),
      ),
    ),
  { type: "link", title: "GitHub", href: githubProjects.href, external: true },
]

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog/" },
  { title: "AI", href: "/ai/", nodes: aiNav },
  { title: "Projects", columns: true, nodes: projectNodes },
  { title: "Tools", href: "/tools/", sections: true, nodes: toolsNav },
  { title: "Tutorials", href: "/tutorials/", nodes: tutorialsNav },
  { title: "About", href: "/about/" },
]
