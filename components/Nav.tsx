"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { mainNav, type NavItem, type NavLink, type NavNode } from "@/lib/nav"
import { cn } from "@/lib/cn"
import { isExternalHref } from "@/lib/projects"

function isActive(pathname: string, href?: string) {
  if (!href) return false
  if (href === "/") return pathname === "/"
  const path = href.endsWith("/") ? href : `${href}/`
  return pathname === path || pathname === href || pathname.startsWith(path)
}

function nodeActive(pathname: string, node: NavNode): boolean {
  if (node.type === "sep") return false
  if (node.type === "link") return isActive(pathname, node.href)
  return node.children.some((child) => nodeActive(pathname, child))
}

function itemActive(pathname: string, item: NavItem) {
  return isActive(pathname, item.href) || Boolean(item.nodes?.some((node) => nodeActive(pathname, node)))
}

function Anchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}) {
  if (isExternalHref(href) || href.endsWith(".xml")) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("mailto:") || href.endsWith(".xml") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") || href.endsWith(".xml") ? undefined : "noopener noreferrer"}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}

const leafClass = "flex items-center justify-between gap-3 px-3 py-1.5 text-sm hover:bg-accent/10 hover:text-accent"
const compactLeaf = "flex items-center justify-between gap-3 rounded-md px-3 py-1 text-sm hover:bg-accent/10 hover:text-accent"

function Leaf({ item, onClick, compact }: { item: NavLink; onClick?: () => void; compact?: boolean }) {
  return (
    <Anchor href={item.href} onClick={onClick} className={compact ? compactLeaf : leafClass}>
      <span className="min-w-0">{item.title}</span>
      {item.external ? <span aria-hidden="true" className="opacity-60">↗</span> : null}
    </Anchor>
  )
}

function WideMenu({ nodes }: { nodes: NavNode[] }) {
  const links = nodes.filter((node): node is NavLink => node.type === "link")
  const groups = nodes.filter((node): node is Extract<NavNode, { type: "group" }> => node.type === "group")
  const columnCount = groups.length === 3 ? 3 : 2
  const size = Math.ceil(groups.length / columnCount)
  const columns = Array.from({ length: columnCount }, (_, index) => groups.slice(index * size, (index + 1) * size))

  return (
    <div
      className={
        columnCount === 3
          ? "max-h-[min(70vh,36rem)] w-[min(46rem,calc(100vw-1.5rem))] overflow-y-auto rounded-md border border-line bg-panel-2 p-2 shadow-xl"
          : "max-h-[min(70vh,36rem)] w-[min(42rem,calc(100vw-1.5rem))] overflow-y-auto rounded-md border border-line bg-panel-2 p-2 shadow-xl"
      }
    >
      <div className={columnCount === 3 ? "grid grid-cols-3 items-start gap-x-3" : "grid grid-cols-2 items-start gap-x-3"}>
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="min-w-0">
            {column.map((node) => (
              <div key={node.title} className="py-1">
                <p className="px-3 pt-1 pb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">{node.title}</p>
                {node.children.map((child, index) => {
                  if (child.type === "sep") {
                    return <div key={`sep-${index}`} role="separator" className="my-1 border-t border-line" />
                  }
                  if (child.type !== "link") return null
                  return <Leaf key={child.href + child.title} item={child} compact />
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
      {links.length ? (
        <div className="mt-1 flex flex-wrap items-center border-t border-line pt-1">
          {links.map((item) => (
            <Leaf key={item.href + item.title} item={item} compact />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function SectionMenu({ nodes }: { nodes: NavNode[] }) {
  const groups = nodes.filter((node): node is Extract<NavNode, { type: "group" }> => node.type === "group")
  return (
    <div className="min-w-56 rounded-md border border-line bg-panel-2 py-1 shadow-xl">
      {groups.map((node) => (
        <div key={node.title} className="py-1">
          <p className="px-3 pt-1 pb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">{node.title}</p>
          {node.children.map((child, index) => {
            if (child.type !== "link") return null
            return <Leaf key={child.href + child.title + index} item={child} compact />
          })}
        </div>
      ))}
    </div>
  )
}

function DesktopNodes({ nodes }: { nodes: NavNode[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "sep") {
          return <div key={`sep-${index}`} role="separator" className="my-1 border-t border-line" />
        }
        if (node.type === "link") return <Leaf key={node.href + node.title} item={node} />
        return <DesktopGroup key={node.title} node={node} />
      })}
    </>
  )
}

function DesktopGroup({ node }: { node: Extract<NavNode, { type: "group" }> }) {
  return (
    <div className="group/sub relative">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-sm hover:bg-accent/10 hover:text-accent"
        aria-haspopup="menu"
      >
        <span>{node.title}</span>
        <ChevronRight className="size-3.5 opacity-70" />
      </button>
      <div className="invisible absolute left-full top-0 z-50 pl-1 opacity-0 group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
        <div className="min-w-52 rounded-md border border-line bg-panel-2 py-1 shadow-xl">
          <DesktopNodes nodes={node.children} />
        </div>
      </div>
    </div>
  )
}

function placeMenu(host: HTMLElement, align: "start" | "end") {
  const menu = host.querySelector<HTMLElement>("[data-menu]")
  if (!menu) return
  const rect = host.getBoundingClientRect()
  const edge = document.documentElement.clientWidth
  menu.style.top = `${rect.bottom}px`
  if (align === "end") {
    menu.style.left = "auto"
    menu.style.right = `${Math.max(0, edge - rect.right)}px`
  } else {
    menu.style.right = "auto"
    menu.style.left = `${Math.max(0, rect.left)}px`
  }
}

function DesktopItem({ item, pathname, align }: { item: NavItem; pathname: string; align: "start" | "end" }) {
  const host = useRef<HTMLDivElement>(null)
  const active = itemActive(pathname, item)

  useEffect(() => {
    if (!item.nodes || item.columns) return
    const el = host.current
    const nav = el?.closest("nav")
    if (!el || !nav) return
    const sync = () => {
      if (!el.matches(":hover") && !el.matches(":focus-within")) return
      placeMenu(el, align)
    }
    nav.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    return () => {
      nav.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
    }
  }, [align, item.columns, item.nodes])

  if (!item.nodes) {
    return (
      <Anchor
        href={item.href || "/"}
        className={cn("shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium hover:bg-accent/10 hover:text-accent", active && "text-accent")}
      >
        {item.title}
      </Anchor>
    )
  }

  return (
    <div
      ref={host}
      className="group relative shrink-0"
      onPointerEnter={(event) => {
        if (!item.columns) placeMenu(event.currentTarget, align)
      }}
      onFocus={() => {
        if (host.current && !item.columns) placeMenu(host.current, align)
      }}
    >
      <div className={cn("inline-flex items-center rounded-md hover:bg-accent/10 hover:text-accent", active && "text-accent")}>
        {item.href ? (
          <Anchor href={item.href} className="whitespace-nowrap py-1 pl-2 text-sm font-medium">
            {item.title}
          </Anchor>
        ) : (
          <span className="whitespace-nowrap py-1 pl-2 text-sm font-medium">{item.title}</span>
        )}
        <button type="button" className="py-1 pr-1.5 pl-1" aria-haspopup="menu" aria-label={`${item.title} menu`}>
          <ChevronDown className="size-3 opacity-70" />
        </button>
      </div>
      {item.columns ? (
        <div className="fixed inset-x-0 top-12 z-50 hidden justify-center px-3 pt-2 group-hover:flex group-focus-within:flex">
          <WideMenu nodes={item.nodes} />
        </div>
      ) : (
        <div
          data-menu
          className="invisible fixed z-50 pt-1 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
        >
          {item.sections ? (
            <SectionMenu nodes={item.nodes} />
          ) : (
            <div className="min-w-52 rounded-md border border-line bg-panel-2 py-1 shadow-xl">
              <DesktopNodes nodes={item.nodes} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function Nav() {
  const pathname = usePathname()

  return (
    <nav
      className="flex h-12 min-w-0 shrink flex-nowrap items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Site"
    >
      {mainNav.map((item, index) => (
        <DesktopItem key={item.title} item={item} pathname={pathname} align={index >= 4 ? "end" : "start"} />
      ))}
    </nav>
  )
}
