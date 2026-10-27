export interface ProjectLink {
  title: string
  href: string
  copy: string
  /** Path under the site, passed through withBase. */
  image?: string
  /** object-position when the art is a portrait. */
  focus?: string
}

export interface ProjectGroup {
  id: string
  title: string
  kicker: string
  links: ProjectLink[]
}

/** Same shelves as the landing page. Each link opens that project on its own site. */
export const projectGroups: ProjectGroup[] = [
  {
    id: "showcase",
    title: "Showcase",
    kicker: "Work that pays",
    links: [
      {
        title: "Andreas",
        href: "https://thewhitewitchtm.github.io/andreas/",
        copy: "A freelance site for Andreas in Mainz. Java, C++, C#, and Visual Basic. German and English. He is who I work for.",
        image: "/desk/andreas.jpg",
      },
    ],
  },
  {
    id: "doors",
    title: "Doors",
    kicker: "Lead",
    links: [
      {
        title: "The White Witch™",
        href: "https://thewhitewitchtm.github.io/whitewitch/",
        copy: "The long pages. Facts first.",
        image: "/desk/whitewitch.jpg",
      },
      {
        title: "Mira's World",
        href: "https://thewhitewitchtm.github.io/mira/",
        copy: "This lab. Tools, tutorials, the dev blog.",
        image: "/mira.jpg",
        focus: "center 18%",
      },
      {
        title: "Emoji Games",
        href: "https://thewhitewitchtm.github.io/emojigames/",
        copy: "Old games drawn with emoji.",
        image: "/desk/emoji.jpg",
      },
    ],
  },
  {
    id: "libresky",
    title: "LibreSky",
    kicker: "The sky",
    links: [
      {
        title: "LibreSky",
        href: "https://thewhitewitchtm.github.io/LibreSky/",
        copy: "A Bluesky client. Edit, voice, video, and chat. The password stays with Bluesky.",
        image: "/desk/libresky.png",
      },
      {
        title: "LibreSky Corporate",
        href: "https://thewhitewitchtm.github.io/corporate/",
        copy: "The edition you host. Small enough for a Pi.",
        image: "/desk/libresky-corporate.png",
      },
      {
        title: "SociallyDead",
        href: "https://thewhitewitchtm.github.io/sociallydead/",
        copy: "A directory of social media. Websites, YouTube, X, and Bluesky.",
        image: "/desk/sociallydead.jpg",
      },
    ],
  },
  {
    id: "apps",
    title: "Apps",
    kicker: "Native Qt",
    links: [
      {
        title: "Blogy",
        href: "https://thewhitewitchtm.github.io/blogy/",
        copy: "Markdown for the blogs you already have. Preview, front matter, and publish with git.",
        image: "/desk/blogy.jpg",
      },
      {
        title: "MAGIC Dock",
        href: "https://thewhitewitchtm.github.io/magic-dock/",
        copy: "Stacks on the COSMIC dock. Linux only.",
        image: "/desk/magic-dock.jpg",
      },
      {
        title: "Cinder",
        href: "https://thewhitewitchtm.github.io/cinder/",
        copy: "An editor for bash and sh. Run it, trace it, or stop on a breakpoint.",
        image: "/desk/cinder.jpg",
      },
      {
        title: "Vesper",
        href: "https://thewhitewitchtm.github.io/vesper/",
        copy: "Music and video for the quiet hours.",
        image: "/desk/vesper.jpg",
      },
    ],
  },
  {
    id: "magic",
    title: "MAGIC",
    kicker: "The language",
    links: [
      {
        title: "MAGIC",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/",
        copy: "Lua and BASIC, compiled to JavaScript. Sprites, a terminal, games.",
        image: "/desk/magic.jpg",
      },
      {
        title: "MAGIC Studio",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/studio/",
        copy: "The dark IDE. Write it, run it, and see the sprite.",
        image: "/desk/studio.jpg",
      },
      {
        title: "MAGIC Apprentice",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/apprentice/",
        copy: "A simpler desk for ages 8 to 16.",
        image: "/desk/apprentice.jpg",
      },
      {
        title: "On the card",
        href: "https://thewhitewitchtm.github.io/magic/",
        copy: "The three desks on the landing page.",
      },
    ],
  },
  {
    id: "retro",
    title: "RETRO",
    kicker: "The old machines",
    links: [
      {
        title: "RETRO MAGIC",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/",
        copy: "BASIC and assembly for the C64, the Apple II, and the TI-99/4A.",
        image: "/desk/retro-magic.jpg",
      },
      {
        title: "RETRO Studio",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/studio/",
        copy: "The window for the three machines.",
        image: "/desk/retro-studio.jpg",
      },
      {
        title: "RETRO Toolchain",
        href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/toolchain/",
        copy: "6510 assembler. C, Pascal, and BASIC, out as a PRG.",
        image: "/desk/retro-toolchain.jpg",
      },
      {
        title: "RETRO Center",
        href: "https://thewhitewitchtm.github.io/retro-center/",
        copy: "Five machines, one shelf. Power on, or drop a disk you own.",
        image: "/desk/retro-center.jpg",
      },
    ],
  },
  {
    id: "satire",
    title: "Satire",
    kicker: "A joke of a news desk",
    links: [
      {
        title: "FAUX NEWS",
        href: "https://thewhitewitchtm.github.io/faux-news/",
        copy: "Satire. Their headline stays on the card. The rest is a joke.",
        image: "/desk/faux-news.png",
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
