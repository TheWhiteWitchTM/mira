import { withBase } from "@/app/metadata"

export default function SidebarLeft() {
	return (
		<div className="flex flex-col gap-2 px-1 text-sm">
			<p className="font-medium text-green-600">Mira</p>
			<p>Freelance software. The lab is this site.</p>
			<a className="underline-offset-4 hover:underline" href="mailto:thewhitewitchtm@gmail.com">
				Mail
			</a>
			<a className="underline-offset-4 hover:underline" href={withBase("/feed.xml")}>
				RSS
			</a>
			<a
				className="underline-offset-4 hover:underline"
				href="https://thewhitewitchtm.github.io/"
				target="_blank"
				rel="noopener noreferrer"
			>
				The card
			</a>
		</div>
	)
}
