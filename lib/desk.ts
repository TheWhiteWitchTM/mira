export interface DeskLink {
	title: string
	href: string
}

export interface DeskGroup {
	title: string
	links: DeskLink[]
}

/** Same shelves as the landing page. Each link opens that project on its own site. */
export const projectGroups: DeskGroup[] = [
	{
		title: "Doors",
		links: [
			{ title: "The White Witch™", href: "https://thewhitewitchtm.github.io/whitewitch/" },
			{ title: "Mira's World", href: "https://thewhitewitchtm.github.io/mira/" },
			{ title: "Emoji Games", href: "https://thewhitewitchtm.github.io/emojigames/" },
		],
	},
	{
		title: "LibreSky",
		links: [
			{ title: "Open LibreSky", href: "https://thewhitewitchtm.github.io/LibreSky/" },
			{ title: "LibreSky Corporate", href: "https://thewhitewitchtm.github.io/corporate/" },
			{ title: "SociallyDead", href: "https://thewhitewitchtm.github.io/sociallydead/" },
		],
	},
	{
		title: "Apps",
		links: [
			{ title: "Blogy", href: "https://thewhitewitchtm.github.io/blogy/" },
			{ title: "MAGIC Dock", href: "https://thewhitewitchtm.github.io/magic-dock/" },
			{ title: "Cinder", href: "https://thewhitewitchtm.github.io/cinder/" },
			{ title: "Vesper", href: "https://thewhitewitchtm.github.io/vesper/" },
		],
	},
	{
		title: "MAGIC",
		links: [
			{ title: "MAGIC", href: "https://thewhitewitchtm.github.io/whitewitch/magic/" },
			{ title: "MAGIC Studio", href: "https://thewhitewitchtm.github.io/whitewitch/magic/studio/" },
			{ title: "MAGIC Apprentice", href: "https://thewhitewitchtm.github.io/whitewitch/magic/apprentice/" },
			{ title: "On the card", href: "https://thewhitewitchtm.github.io/magic/" },
		],
	},
	{
		title: "RETRO",
		links: [
			{ title: "RETRO MAGIC", href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/" },
			{ title: "RETRO Studio", href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/studio/" },
			{ title: "RETRO Toolchain", href: "https://thewhitewitchtm.github.io/whitewitch/magic/retro/toolchain/" },
			{ title: "RETRO Center", href: "https://thewhitewitchtm.github.io/retro-center/" },
		],
	},
]

export const extraProjects: DeskLink[] = [
	{ title: "FAUX NEWS", href: "https://thewhitewitchtm.github.io/faux-news/" },
]

export const githubProjects: DeskLink = {
	title: "All projects",
	href: "https://github.com/TheWhiteWitchTM?tab=repositories",
}

export function isExternalHref(href: string): boolean {
	return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:")
}
