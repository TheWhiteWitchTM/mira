export interface ToolLink {
  title: string
  href: string
  copy: string
}

export interface ToolGroup {
  id: string
  title: string
  kicker: string
  note: string
  links: ToolLink[]
}

/** Three shelves. Posts, then marks, then pictures. Nothing is uploaded. */
export const toolGroups: ToolGroup[] = [
  {
    id: "posts",
    title: "Posts",
    kicker: "Before you send it",
    note: "What a link and a caption look like on the networks.",
    links: [
      { href: "/tools/unfurl/", title: "Unfurl", copy: "See the link card on X, Bluesky, Discord, and Slack, then copy the meta tags." },
      { href: "/tools/calling-card/", title: "Calling Card", copy: "Draw a share image for a post. Wide or square. Nothing is uploaded." },
      { href: "/tools/post-meter/", title: "Post Meter", copy: "Paste a caption. See how it fits X, Bluesky, LinkedIn, and Threads. Split a thread." },
    ],
  },
  {
    id: "marks",
    title: "Marks",
    kicker: "Characters",
    note: "Emoji, flags, and the arrows that are hard to type.",
    links: [
      { href: "/tools/emoji/", title: "Emoji", copy: "Search and assemble emoji in the browser." },
      { href: "/tools/flags/", title: "Flags", copy: "Build a flag sequence from country codes and names." },
      { href: "/tools/webfont/", title: "WebFont", copy: "Pick arrows and direction marks, copy the sequence." },
    ],
  },
  {
    id: "pictures",
    title: "Pictures",
    kicker: "On this machine",
    note: "The file never leaves the browser.",
    links: [
      { href: "/tools/image-magic/", title: "Image Magic", copy: "Remove a background, resize, and export an icon set." },
    ],
  },
]

export function allTools(): ToolLink[] {
  return toolGroups.flatMap((group) => group.links)
}
