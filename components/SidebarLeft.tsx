import Image from "next/image"
import { withBase } from "@/app/metadata"

const links = [
	{ title: "Mail", href: "mailto:thewhitewitchtm@gmail.com" },
	{ title: "RSS", href: withBase("/feed.xml") },
	{ title: "The card", href: "https://thewhitewitchtm.github.io/" },
	{ title: "The White Witch", href: "https://thewhitewitchtm.github.io/whitewitch/" },
]

export default function SidebarLeft() {
	return (
		<div className="flex flex-col gap-3 text-sm">
			<Image
				src="/banner.jpg"
				alt="Mira, red hair in a ponytail, black jacket."
				width={1008}
				height={1792}
				className="aspect-[3/4] w-full rounded-lg object-cover object-[center_15%]"
			/>
			<div>
				<p className="font-medium text-green-600">Mira</p>
				<p className="mt-1 text-muted-foreground">Freelance software. The lab is this site.</p>
			</div>
			<ul className="flex flex-col gap-1.5">
				{links.map((link) => {
					const external = link.href.startsWith("http")
					return (
						<li key={link.title}>
							<a
								href={link.href}
								className="underline-offset-4 hover:underline"
								target={external ? "_blank" : undefined}
								rel={external ? "noopener noreferrer" : undefined}
							>
								{link.title}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
