import { githubProjects, projectGroups } from "./projects"

export interface NavLeaf {
  title: string
  href: string
  external?: boolean
}

export interface NavItem {
  title: string
  href?: string
  children?: NavLeaf[]
  groups?: { title: string; children: NavLeaf[] }[]
}

export const toolsNav: NavLeaf[] = [
  { title: "Unfurl", href: "/tools/unfurl/" },
  { title: "Calling Card", href: "/tools/calling-card/" },
  { title: "Post Meter", href: "/tools/post-meter/" },
  { title: "Emoji", href: "/tools/emoji/" },
  { title: "Flags", href: "/tools/flags/" },
  { title: "WebFont", href: "/tools/webfont/" },
  { title: "Image Magic", href: "/tools/image-magic/" },
]

export const tutorialsNav: NavLeaf[] = [
  { title: "Markdown", href: "/tutorials/markdown/" },
  { title: "Tailwind 4", href: "/tutorials/tailwind/" },
  { title: "TypeScript", href: "/tutorials/typescript/" },
]

export const mainNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about/" },
  {
    title: "Projects",
    groups: [
      ...projectGroups.map((group) => ({
        title: group.title,
        children: group.links.map((link) => ({
          title: link.title,
          href: link.href,
          external: true,
        })),
      })),
      {
        title: "GitHub",
        children: [{ title: githubProjects.title, href: githubProjects.href, external: true }],
      },
    ],
  },
  { title: "Tools", href: "/tools/", children: toolsNav },
  { title: "Tutorials", href: "/tutorials/", children: tutorialsNav },
  { title: "Blog", href: "/blog/" },
]
