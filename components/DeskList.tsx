import { extraProjects, githubProjects, projectGroups } from "@/lib/desk"

function DeskAnchor({ title, href }: { title: string; href: string }) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="block rounded-md px-2 py-1.5 text-sm hover:bg-accent"
		>
			{title}
			<span className="sr-only"> (opens in a new tab)</span>
		</a>
	)
}

export function DeskList() {
	return (
		<section className="not-prose mt-10">
			<h2 className="text-xl font-semibold tracking-tight">On the desk</h2>
			<p className="mt-1 max-w-xl text-sm text-muted-foreground">
				The same list as Projects in the menu. A click opens that site.
			</p>
			<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{projectGroups.map((group) => (
					<div key={group.title} className="rounded-xl border border-green-600/40 p-3">
						<h3 className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-green-600">
							{group.title}
						</h3>
						<ul className="mt-1">
							{group.links.map((link) => (
								<li key={link.href}>
									<DeskAnchor title={link.title} href={link.href} />
								</li>
							))}
						</ul>
					</div>
				))}
				<div className="rounded-xl border border-green-600/40 p-3">
					<h3 className="px-2 text-xs font-medium uppercase tracking-[0.16em] text-green-600">
						Also
					</h3>
					<ul className="mt-1">
						{extraProjects.map((link) => (
							<li key={link.href}>
								<DeskAnchor title={link.title} href={link.href} />
							</li>
						))}
						<li>
							<DeskAnchor title="All projects on GitHub" href={githubProjects.href} />
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
