import { githubProjects, projectGroups } from "./projects"

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
}

export const toolsNav: NavLink[] = [
  { type: "link", title: "Unfurl", href: "/tools/unfurl/" },
  { type: "link", title: "Calling Card", href: "/tools/calling-card/" },
  { type: "link", title: "Post Meter", href: "/tools/post-meter/" },
  { type: "link", title: "Emoji", href: "/tools/emoji/" },
  { type: "link", title: "Flags", href: "/tools/flags/" },
  { type: "link", title: "WebFont", href: "/tools/webfont/" },
  { type: "link", title: "Image Magic", href: "/tools/image-magic/" },
]

export const tutorialPages: NavLink[] = [
  { type: "link", title: "Markdown", href: "/tutorials/markdown/" },
  { type: "link", title: "Tailwind 4", href: "/tutorials/tailwind/" },
  { type: "link", title: "TypeScript", href: "/tutorials/typescript/" },
]

export const tutorialsNav: NavNode[] = [
  {
    type: "group",
    title: "Markdown",
    children: [
      { type: "link", title: "The page", href: "/tutorials/markdown/" },
      { type: "link", title: "Text", href: "/tutorials/markdown/#text" },
      { type: "link", title: "Headings", href: "/tutorials/markdown/#headings" },
      { type: "link", title: "Lists", href: "/tutorials/markdown/#lists" },
      { type: "link", title: "Code", href: "/tutorials/markdown/#code" },
      { type: "link", title: "Tables", href: "/tutorials/markdown/#tables" },
    ],
  },
  {
    type: "group",
    title: "Tailwind 4",
    children: [
      { type: "link", title: "The page", href: "/tutorials/tailwind/" },
      { type: "link", title: "The three files", href: "/tutorials/tailwind/#the-three-files" },
      { type: "link", title: "The phone comes first", href: "/tutorials/tailwind/#the-phone-comes-first" },
      { type: "link", title: "The card", href: "/tutorials/tailwind/#the-card-on-the-home-page" },
      { type: "link", title: "Custom colors", href: "/tutorials/tailwind/#custom-colors-on-this-site" },
      { type: "link", title: "Where it goes wrong", href: "/tutorials/tailwind/#where-it-goes-wrong" },
    ],
  },
  {
    type: "group",
    title: "TypeScript",
    children: [
      { type: "link", title: "The page", href: "/tutorials/typescript/" },
      { type: "link", title: "Strict", href: "/tutorials/typescript/#strict" },
      { type: "link", title: "Unions", href: "/tutorials/typescript/#unions-instead-of-flags" },
      { type: "link", title: "Generics", href: "/tutorials/typescript/#generics-you-can-read" },
      { type: "link", title: "Next.js, static", href: "/tutorials/typescript/#nextjs-static" },
      { type: "link", title: "Before you ship", href: "/tutorials/typescript/#before-you-ship" },
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
  { title: "Tools", href: "/tools/", nodes: toolsNav },
  { title: "Tutorials", href: "/tutorials/", columns: true, nodes: tutorialsNav },
  { title: "About", href: "/about/" },
]
