"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
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

function WideMenu({ nodes, onNavigate }: { nodes: NavNode[]; onNavigate?: () => void }) {
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
                  return <Leaf key={child.href + child.title} item={child} compact onClick={onNavigate} />
                })}
              </div>
            ))}
          </div>
        ))}
      </div>
      {links.length ? (
        <div className="mt-1 flex flex-wrap items-center border-t border-line pt-1">
          {links.map((item) => (
            <Leaf key={item.href + item.title} item={item} compact onClick={onNavigate} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function SectionMenu({ nodes, onNavigate }: { nodes: NavNode[]; onNavigate?: () => void }) {
  const groups = nodes.filter((node): node is Extract<NavNode, { type: "group" }> => node.type === "group")
  return (
    <div className="min-w-56 rounded-md border border-line bg-panel-2 py-1 shadow-xl">
      {groups.map((node) => (
        <div key={node.title} className="py-1">
          <p className="px-3 pt-1 pb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-accent">{node.title}</p>
          {node.children.map((child, index) => {
            if (child.type !== "link") return null
            return <Leaf key={child.href + child.title + index} item={child} compact onClick={onNavigate} />
          })}
        </div>
      ))}
    </div>
  )
}

function DesktopNodes({ nodes, onNavigate }: { nodes: NavNode[]; onNavigate?: () => void }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "sep") {
          return <div key={`sep-${index}`} role="separator" className="my-1 border-t border-line" />
        }
        if (node.type === "link") return <Leaf key={node.href + node.title} item={node} onClick={onNavigate} />
        return <DesktopGroup key={node.title} node={node} onNavigate={onNavigate} />
      })}
    </>
  )
}

function DesktopGroup({ node, onNavigate }: { node: Extract<NavNode, { type: "group" }>; onNavigate?: () => void }) {
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
          <DesktopNodes nodes={node.children} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}

type MenuBox = { top: number; left: number | null; right: number | null }

function measureMenu(host: HTMLElement, align: "start" | "end", columns: boolean, wide: boolean): MenuBox {
  const rect = host.getBoundingClientRect()
  const edge = document.documentElement.clientWidth
  const top = Math.max(0, rect.bottom - 2)
  if (!columns) {
    const menuWidth = 13 * 16
    if (align === "end") {
      const right = Math.max(8, edge - rect.right)
      if (edge - right - menuWidth < 8) return { top, left: 8, right: null }
      return { top, left: null, right }
    }
    let left = rect.left
    if (left + menuWidth > edge - 8) left = Math.max(8, edge - 8 - menuWidth)
    return { top, left, right: null }
  }
  const want = Math.min((wide ? 46 : 42) * 16, edge - 16)
  let left = rect.left
  if (left + want > edge - 8) left = Math.max(8, edge - 8 - want)
  return { top, left, right: null }
}

function DesktopItem({ item, pathname, align }: { item: NavItem; pathname: string; align: "start" | "end" }) {
  const host = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)
  const pinned = useRef(false)
  const [open, setOpen] = useState(false)
  const [box, setBox] = useState<MenuBox | null>(null)
  const [ready, setReady] = useState(false)
  const active = itemActive(pathname, item)
  const groupCount = item.nodes?.filter((node) => node.type === "group").length ?? 0
  const wide = groupCount === 3

  const clearTimer = () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
    timer.current = null
  }

  const place = () => {
    if (!host.current || !item.nodes) return
    setBox(measureMenu(host.current, align, Boolean(item.columns), wide))
  }

  const show = () => {
    clearTimer()
    place()
    setOpen(true)
  }

  const hide = () => {
    if (pinned.current) return
    clearTimer()
    timer.current = window.setTimeout(() => setOpen(false), 140)
  }

  const close = () => {
    clearTimer()
    pinned.current = false
    setOpen(false)
  }

  const onMenuButton = (event: React.MouseEvent) => {
    event.preventDefault()
    if (pinned.current && open) {
      close()
      return
    }
    pinned.current = true
    show()
  }

  useEffect(() => {
    setReady(true)
    return clearTimer
  }, [])

  useEffect(() => {
    pinned.current = false
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const sync = () => place()
    const nav = host.current?.closest("nav")
    nav?.addEventListener("scroll", sync, { passive: true })
    window.addEventListener("resize", sync)
    window.addEventListener("scroll", sync, true)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    const onDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (host.current?.contains(target) || panel.current?.contains(target)) return
      close()
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    return () => {
      nav?.removeEventListener("scroll", sync)
      window.removeEventListener("resize", sync)
      window.removeEventListener("scroll", sync, true)
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
    }
  }, [open, align, item.columns, wide])

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

  const stay = (event: React.FocusEvent) => {
    const next = event.relatedTarget
    if (next instanceof Node && (host.current?.contains(next) || panel.current?.contains(next))) return
    hide()
  }

  const menu =
    ready && open && box
      ? createPortal(
          <div
            ref={panel}
            className="fixed z-50 pt-1"
            style={{
              top: box.top,
              left: box.left ?? undefined,
              right: box.right ?? undefined,
            }}
            onPointerEnter={show}
            onPointerLeave={hide}
            onFocus={show}
            onBlur={stay}
          >
            {item.columns ? (
              <WideMenu nodes={item.nodes} onNavigate={close} />
            ) : item.sections ? (
              <SectionMenu nodes={item.nodes} onNavigate={close} />
            ) : (
              <div className="max-h-[min(70vh,36rem)] min-w-52 overflow-y-auto rounded-md border border-line bg-panel-2 py-1 shadow-xl">
                <DesktopNodes nodes={item.nodes} onNavigate={close} />
              </div>
            )}
          </div>,
          document.body,
        )
      : null

  return (
    <div ref={host} className="relative shrink-0" onPointerEnter={show} onPointerLeave={hide} onFocus={show} onBlur={stay}>
      <div className={cn("inline-flex items-center rounded-md hover:bg-accent/10 hover:text-accent", active && "text-accent")}>
        {item.href ? (
          <Anchor href={item.href} className="whitespace-nowrap py-1 pl-2 text-sm font-medium">
            {item.title}
          </Anchor>
        ) : (
          <button type="button" className="whitespace-nowrap py-1 pl-2 text-sm font-medium" aria-haspopup="menu" aria-expanded={open} onClick={onMenuButton}>
            {item.title}
          </button>
        )}
        <button
          type="button"
          className="py-1 pr-1.5 pl-1"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`${item.title} menu`}
          onClick={onMenuButton}
        >
          <ChevronDown className="size-3 opacity-70" />
        </button>
      </div>
      {menu}
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
