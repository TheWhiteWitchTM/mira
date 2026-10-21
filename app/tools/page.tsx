import type { Metadata } from "next";
import Link from "next/link";
import {PageContent} from "@/next-static/legacy/PageContent";
import {pageMetadata} from "@/app/metadata";

export const metadata: Metadata = pageMetadata(
	'Tools',
	'Browser tools on Mira\'s World: flags, emoji, web fonts, and Image Magic. Nothing is uploaded.',
	'/tools',
)

const tools = [
	{ href: '/tools/flags', title: 'Flag builder', text: 'Build a flag in the browser.' },
	{ href: '/tools/emoji', title: 'Emoji builder', text: 'Assemble an emoji.' },
	{ href: '/tools/webfont', title: 'Web font builder', text: 'Turn characters into a web font.' },
	{ href: '/tools/image-magic', title: 'Image Magic', text: 'Remove a background and resize images. The work stays in this browser.' },
]

export default function ToolsPage() {
	return (
		<PageContent className={"prose dark:prose-invert"}>
			<h1>Tools</h1>
			<p>Small tools that run in the browser. Nothing is uploaded.</p>
			<ul>
				{tools.map((tool) => (
					<li key={tool.href}>
						<Link href={tool.href}>{tool.title}</Link>
						{' — '}
						{tool.text}
					</li>
				))}
			</ul>
		</PageContent>
	)
}
