"use client"

import * as React from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { extraProjects, githubProjects, isExternalHref, projectGroups } from "@/lib/desk"
import {
	ChevronDown,
	ExternalLink,
	Flag,
	Github,
	Home,
	IdCard,
	Lightbulb,
	LayoutDashboard,
	Menu,
	Newspaper,
	PaintbrushIcon,
	Rss,
	Smile,
	Text,
	Wind,
	Wrench,
} from "lucide-react"

interface SubItem {
	label: string
	href: string
	icon?: typeof Home
}

interface NavItem {
	type: "link" | "submenu"
	label: string
	href?: string
	icon?: typeof Home
	subitems?: SubItem[]
}

const feedHref = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/feed.xml`

const toolItems: SubItem[] = [
	{ label: "Calling Card", href: "/tools/calling-card", icon: IdCard },
	{ label: "Emoji", href: "/tools/emoji", icon: Smile },
	{ label: "Flags", href: "/tools/flags", icon: Flag },
	{ label: "WebFont", href: "/tools/webfont", icon: Text },
	{ label: "Image Magic", href: "/tools/image-magic", icon: PaintbrushIcon },
]

const tutorialItems: SubItem[] = [
	{ label: "Tailwind", href: "/tutorials/tailwind", icon: Wind },
	{ label: "Markdown", href: "/tutorials/markdown", icon: Newspaper },
]

const mainMenuItems: NavItem[] = [
	{ type: "link", label: "Home", href: "/", icon: Home },
	{ type: "link", label: "Blog", href: "/blog", icon: Newspaper },
	{ type: "submenu", label: "Projects", icon: LayoutDashboard },
	{ type: "submenu", label: "Tools", icon: Wrench, subitems: toolItems },
	{ type: "submenu", label: "Tutorials", icon: Lightbulb, subitems: tutorialItems },
	{ type: "link", label: "RSS", href: feedHref, icon: Rss },
]

function isActivePath(pathname: string, href: string | undefined): boolean {
	if (!href || isExternalHref(href) || href.endsWith(".xml")) return false
	if (href === "/") return pathname === "/"
	return pathname === href || pathname.startsWith(`${href}/`)
}

function MenuAnchor({
	href,
	className,
	children,
	onNavigate,
}: {
	href: string
	className?: string
	children: React.ReactNode
	onNavigate?: () => void
}) {
	if (isExternalHref(href) || href.endsWith(".xml")) {
		return (
			<a
				href={href}
				target={href.endsWith(".xml") ? undefined : "_blank"}
				rel={href.endsWith(".xml") ? undefined : "noopener noreferrer"}
				className={className}
				onClick={onNavigate}
			>
				{children}
			</a>
		)
	}
	return (
		<Link href={href} className={className} onClick={onNavigate}>
			{children}
		</Link>
	)
}

function projectAnchor(title: string, href: string) {
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-2">
			<span className="min-w-0 flex-1 truncate">{title}</span>
			<ExternalLink className="size-3 shrink-0 opacity-60" />
		</a>
	)
}

export function MainMenu() {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)
	const close = () => setOpen(false)

	const sectionActive = (item: NavItem) => {
		if (item.href && isActivePath(pathname, item.href)) return true
		return item.subitems?.some((sub) => isActivePath(pathname, sub.href)) ?? false
	}

	const buttonClasses = (active: boolean) =>
		cn(
			"h-9 rounded-md px-2.5 text-sm font-medium",
			"flex items-center gap-1.5",
			active && "underline underline-offset-4",
		)

	return (
		<div className="flex items-center gap-1">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-[min(100vw-2rem,20rem)] overflow-y-auto p-0">
					<nav className="flex flex-col p-3" aria-label="Site">
						{mainMenuItems.map((item) => {
							if (item.type === "link" && item.href) {
								const active = isActivePath(pathname, item.href)
								return (
									<MenuAnchor
										key={item.label}
										href={item.href}
										onNavigate={close}
										className={cn(
											"flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
											active && "bg-accent/50 underline underline-offset-4",
										)}
									>
										{item.icon && <item.icon className="h-4 w-4" />}
										{item.label}
									</MenuAnchor>
								)
							}
							if (item.label === "Projects") {
								return (
									<details key={item.label} className="group py-1">
										<summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent [&::-webkit-details-marker]:hidden">
											<LayoutDashboard className="h-4 w-4" />
											Projects
											<ChevronDown className="ml-auto h-4 w-4 transition-transform group-open:rotate-180" />
										</summary>
										<div className="ml-3 border-l pl-2">
											{projectGroups.map((group) => (
												<div key={group.title} className="py-1">
													<p className="px-2 pt-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
														{group.title}
													</p>
													{group.links.map((link) => (
														<a
															key={link.href}
															href={link.href}
															target="_blank"
															rel="noopener noreferrer"
															onClick={close}
															className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
														>
															<span className="min-w-0 flex-1">{link.title}</span>
															<ExternalLink className="size-3 shrink-0 opacity-60" />
														</a>
													))}
												</div>
											))}
											<div className="mt-1 border-t pt-1">
												{extraProjects.map((link) => (
													<a
														key={link.href}
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
														onClick={close}
														className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
													>
														{link.title}
														<ExternalLink className="ml-auto size-3 opacity-60" />
													</a>
												))}
												<a
													href={githubProjects.href}
													target="_blank"
													rel="noopener noreferrer"
													onClick={close}
													className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent"
												>
													<Github className="h-4 w-4" />
													{githubProjects.title}
												</a>
											</div>
										</div>
									</details>
								)
							}
							return (
								<details key={item.label} className="group py-1">
									<summary className="flex cursor-pointer list-none items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent [&::-webkit-details-marker]:hidden">
										{item.icon && <item.icon className="h-4 w-4" />}
										{item.label}
										<ChevronDown className="ml-auto h-4 w-4 transition-transform group-open:rotate-180" />
									</summary>
									<div className="ml-4 border-l pl-2">
										{item.subitems?.map((sub) => {
											const subActive = isActivePath(pathname, sub.href)
											return (
												<Link
													key={sub.href}
													href={sub.href}
													onClick={close}
													className={cn(
														"flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent",
														subActive && "bg-accent/40 underline underline-offset-4",
													)}
												>
													{sub.icon && <sub.icon className="h-4 w-4" />}
													{sub.label}
												</Link>
											)
										})}
									</div>
								</details>
							)
						})}
					</nav>
				</SheetContent>
			</Sheet>

			<nav className="hidden flex-wrap items-center gap-0.5 md:flex" aria-label="Site">
				{mainMenuItems.map((item) => {
					const active = sectionActive(item) || isActivePath(pathname, item.href)
					if (item.type === "link" && item.href) {
						return (
							<MenuAnchor key={item.label} href={item.href}>
								<Button variant="ghost" className={buttonClasses(active)}>
									{item.icon && <item.icon className="h-4 w-4" />}
									{item.label}
								</Button>
							</MenuAnchor>
						)
					}
					if (item.label === "Projects") {
						return (
							<DropdownMenu key={item.label}>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className={buttonClasses(false)}>
										<LayoutDashboard className="h-4 w-4" />
										Projects
										<ChevronDown className="h-3 w-3 opacity-70" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" className="w-56">
									{projectGroups.map((group) => (
										<DropdownMenuSub key={group.title}>
											<DropdownMenuSubTrigger>{group.title}</DropdownMenuSubTrigger>
											<DropdownMenuSubContent className="w-56">
												{group.links.map((link) => (
													<DropdownMenuItem key={link.href} asChild>
														{projectAnchor(link.title, link.href)}
													</DropdownMenuItem>
												))}
											</DropdownMenuSubContent>
										</DropdownMenuSub>
									))}
									<DropdownMenuSeparator />
									{extraProjects.map((link) => (
										<DropdownMenuItem key={link.href} asChild>
											{projectAnchor(link.title, link.href)}
										</DropdownMenuItem>
									))}
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<a
											href={githubProjects.href}
											target="_blank"
											rel="noopener noreferrer"
											className="flex w-full items-center gap-2"
										>
											<Github className="h-4 w-4" />
											{githubProjects.title}
										</a>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						)
					}
					return (
						<DropdownMenu key={item.label}>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className={buttonClasses(active)}>
									{item.icon && <item.icon className="h-4 w-4" />}
									{item.label}
									<ChevronDown className="h-3 w-3 opacity-70" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-48">
								{item.subitems?.map((sub) => (
									<DropdownMenuItem key={sub.href} asChild>
										<Link
											href={sub.href}
											className={cn(
												"flex w-full items-center gap-2",
												isActivePath(pathname, sub.href) && "underline underline-offset-4",
											)}
										>
											{sub.icon && <sub.icon className="h-4 w-4" />}
											{sub.label}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)
				})}
			</nav>
		</div>
	)
}
