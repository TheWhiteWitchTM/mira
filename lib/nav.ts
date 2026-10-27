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
  { type: "link", title: "🌬️ Tailwind", href: "/tutorials/tailwind/" },
  { type: "link", title: "📃 Markdown", href: "/tutorials/markdown/" },
  { type: "link", title: "🟨 JavaScript", href: "/tutorials/javascript/" },
  { type: "link", title: "🔷 TypeScript", href: "/tutorials/typescript/" },
]

export const tutorialsNav: NavNode[] = [
  {
    type: "group",
    title: "🌬️ Tailwind",
    children: [
      { type: "link", title: "The page", href: "/tutorials/tailwind/" },
      { type: "link", title: "What it is", href: "/tutorials/tailwind/#what-is-tailwind-css" },
      { type: "link", title: "Quick start", href: "/tutorials/tailwind/#quick-start--play-cdn-great-for-testing--learning" },
      { type: "link", title: "CLI setup", href: "/tutorials/tailwind/#proper-setup--tailwind-cli-recommended-for-real-projects" },
      { type: "link", title: "Utilities", href: "/tutorials/tailwind/#core-utilities--what-youll-use-every-day" },
      { type: "link", title: "Example", href: "/tutorials/tailwind/#practical-example--responsive-feature-card" },
      { type: "link", title: "Dark mode", href: "/tutorials/tailwind/#dark-mode-setup" },
      { type: "link", title: "Make it yours", href: "/tutorials/tailwind/#customization--make-it-yours" },
    ],
  },
  {
    type: "group",
    title: "📃 Markdown",
    children: [
      { type: "link", title: "The page", href: "/tutorials/markdown/" },
      { type: "link", title: "Text", href: "/tutorials/markdown/#1-basic-text-formatting" },
      { type: "link", title: "Headings", href: "/tutorials/markdown/#2-headings" },
      { type: "link", title: "Lists", href: "/tutorials/markdown/#3-lists" },
      { type: "link", title: "Links", href: "/tutorials/markdown/#4-links--images" },
      { type: "link", title: "Code", href: "/tutorials/markdown/#6-code" },
      { type: "link", title: "Tables", href: "/tutorials/markdown/#7-tables" },
      { type: "link", title: "MDX", href: "/tutorials/markdown/#10-mdx-specific-features" },
    ],
  },
  {
    type: "group",
    title: "🟨 JavaScript",
    children: [
      { type: "link", title: "The page", href: "/tutorials/javascript/" },
      { type: "link", title: "A file you can run", href: "/tutorials/javascript/#a-file-you-can-run" },
      { type: "link", title: "Values", href: "/tutorials/javascript/#values" },
      { type: "link", title: "Functions", href: "/tutorials/javascript/#functions" },
      { type: "link", title: "The page API", href: "/tutorials/javascript/#the-page" },
      { type: "link", title: "Modules", href: "/tutorials/javascript/#modules" },
      { type: "link", title: "Async", href: "/tutorials/javascript/#async" },
    ],
  },
  {
    type: "group",
    title: "🔷 TypeScript",
    children: [
      { type: "link", title: "The page", href: "/tutorials/typescript/" },
      { type: "link", title: "A file that is enough", href: "/tutorials/typescript/#a-file-that-is-enough" },
      { type: "link", title: "Everyday types", href: "/tutorials/typescript/#the-types-you-write-every-day" },
      { type: "link", title: "Objects", href: "/tutorials/typescript/#objects" },
      { type: "link", title: "Unions", href: "/tutorials/typescript/#unions-instead-of-flags" },
      { type: "link", title: "A generic", href: "/tutorials/typescript/#a-generic-you-can-read" },
      { type: "link", title: "Strict", href: "/tutorials/typescript/#strict" },
    ],
  },
]

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
  { title: "Tutorials", href: "/tutorials/", columns: true, nodes: tutorialsNav },
  { title: "About", href: "/about/" },
]
