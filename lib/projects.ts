export interface ProjectLink {
  title: string
  href: string
  copy: string
}

export interface ProjectGroup {
  title: string
  kicker: string
  links: ProjectLink[]
}

/** Same shelves as the landing page. Each link opens that project on its own site. */
export const projectGroups: ProjectGroup[] = [
  {
    title: "Showcase",
    kicker: "Work that pays",
    links: [
      {
        title: "Andreas",
        href: "https://thewhitewitchtm.github.io/andreas/",
        copy: "A freelance site for Andreas in Mainz. Java, C++, C#, and Visual Basic. German and English. He is who I work for.",
      },
    ],
  },
  {
    title: "Doors",
    kicker: "Lead",
    links: [
      {
        title: "The White Witch™",
        href: "https://thewhitewitchtm.github.io/whitewitch/",
        copy: "The long pages. Facts first.",
      },
      {
        title: "Mira's World",
        href: "https://thewhitewitchtm.github.io/mira/",
        copy: "This lab. Tools, tutorials, the dev blog.",
      },
      {
        title: "Emoji Games",
        href: "https://thewhitewitchtm.github.io/emojigames/",
        copy: "Old games drawn with emoji.",
      },
    ],
  },
  {
    title: "LibreSky",
    kicker: "The sky",
    links: [
      {
        title: "LibreSky",
        href: "https://thewhitewitchtm.github.io/LibreSky/",
        copy: "A Bluesky client. Edit, voice, video, and chat. The password stays with Bluesky.",
      },
      {
        title: "LibreSky Corporate",
        href: "https://thewhitewitchtm.github.io/corporate/",
        copy: "The edition you host. Small enough for a Pi.",
      },
      {
        title: "SociallyDead",
        href: "https://thewhitewitchtm.github.io/sociallydead/",
        copy: "A directory of social media. Websites, YouTube, X, and Bluesky.",
      },
    ],
  },
  {
    title: "Apps",
    kicker: "Native Qt",
    links: [
      {
        title: "Blogy",
        href: "https://thewhitewitchtm.github.io/blogy/",
        copy: "Markdown for the blogs you already have. Preview, front matter, and publish with git.",
      },
      {
        title: "MAGIC Dock",
        href: "https://thewhitewitchtm.github.io/magic-dock/",
        copy: "Stacks on the COSMIC dock. Linux only.",
      },
      {
        title: "Cinder",
        href: "https://thewhitewitchtm.github.io/cinder/",
        copy: "An editor for bash and sh. Run it, trace it, or stop on a breakpoint.",
      },
      {
        title: "Vesper",
        href: "https://thewhitewitchtm.github.io/vesper/",
        copy: "Music and video for the quiet hours.",
      },
    ],
  },
  {
    title: "MAGIC",
    kicker: "The language",
    links: [
      {
        title: "MAGIC",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/",
        copy: "Lua and BASIC, compiled to JavaScript. Sprites, a terminal, games.",
      },
      {
        title: "MAGIC Studio",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/studio/",
        copy: "The dark IDE. Write it, run it, and see the sprite.",
      },
      {
        title: "MAGIC Apprentice",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/apprentice/",
        copy: "A simpler desk for ages 8 to 16.",
      },
      {
        title: "On the card",
        href: "https://thewhitewitchtm.github.io/magic/",
        copy: "The three desks on the landing page.",
      },
    ],
  },
  {
    title: "RETRO",
    kicker: "The old machines",
    links: [
      {
        title: "RETRO MAGIC",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/",
        copy: "BASIC and assembly for the C64, the Apple II, and the TI-99/4A.",
      },
      {
        title: "RETRO Studio",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/studio/",
        copy: "The window for the three machines.",
      },
      {
        title: "RETRO Toolchain",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/toolchain/",
        copy: "6510 assembler. C, Pascal, and BASIC, out as a PRG.",
      },
      {
        title: "RETRO Center",
        href: "https://thewhitewitchtm.github.io/retro-center/",
        copy: "Five machines, one shelf. Power on, or drop a disk you own.",
      },
    ],
  },
  {
    title: "Satire",
    kicker: "A joke of a news desk",
    links: [
      {
        title: "FAUX NEWS",
        href: "https://thewhitewitchtm.github.io/faux-news/",
        copy: "Satire. Their headline stays on the card. The rest is a joke.",
      },
    ],
  },
]

export const githubProjects = {
  title: "All projects",
  href: "https://github.com/TheWhiteWitchTM?tab=repositories",
}

export function allProjectLinks(): ProjectLink[] {
  return projectGroups.flatMap((group) => group.links)
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")
}
