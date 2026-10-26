import Image from "next/image"
import { PageContent } from "@/next-static/legacy/PageContent"
import { DeskList } from "@/components/DeskList"
import { withBase } from "@/app/metadata"
import Intro from "./intro.mdx"

const contacts = [
	{ title: "Mail", href: "mailto:thewhitewitchtm@gmail.com" },
	{ title: "GitHub", href: "https://github.com/TheWhiteWitchTM" },
	{ title: "YouTube", href: "https://youtube.com/@TheWhiteWitchTM" },
	{ title: "Bluesky", href: "https://bsky.app/profile/thewhitewitchtm.sociallydead.me" },
	{ title: "X", href: "https://x.com/TheWhiteWitchTM" },
	{ title: "The card", href: "https://thewhitewitchtm.github.io/" },
]

export default function Home() {
	return (
		<PageContent variant="large" className="prose dark:prose-invert">
			<div className="not-prose overflow-hidden rounded-2xl border border-green-600/70 shadow-md shadow-green-500/20">
				<div className="grid grid-cols-1 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
					<div className="bg-black">
						<Image
							src="/banner.jpg"
							alt="Mira, smiling, red hair in a ponytail, black jacket, pointing."
							width={720}
							height={1280}
							priority
							className="aspect-[3/4] h-auto w-full object-cover object-top sm:aspect-auto sm:h-full sm:min-h-[24rem] sm:max-h-[34rem]"
						/>
					</div>
					<div className="flex flex-col justify-center gap-4 p-5 sm:p-7">
						<p className="text-xs font-medium uppercase tracking-[0.18em] text-green-600">
							Mira · The White Witch™
						</p>
						<h1 className="text-4xl font-semibold tracking-tight">Mira</h1>
						<p className="max-w-md text-base text-muted-foreground">
							Freelance software. This site is the lab: tools, tutorials, and the dev blog. The rest of the desk opens from the list below.
						</p>
						<ul className="flex flex-wrap gap-2">
							{contacts.map((item) => (
								<li key={item.title}>
									<a
										href={item.href}
										target={item.href.startsWith("mailto:") ? undefined : "_blank"}
										rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
										className="inline-flex rounded-full border border-green-600/50 px-3 py-1.5 text-sm hover:bg-accent"
									>
										{item.title}
									</a>
								</li>
							))}
							<li>
								<a
									href={withBase("/feed.xml")}
									className="inline-flex rounded-full border border-green-600/50 px-3 py-1.5 text-sm hover:bg-accent"
								>
									RSS
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Intro />
			<DeskList />
		</PageContent>
	)
}
