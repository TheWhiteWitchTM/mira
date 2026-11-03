"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
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
          ? "max-h-[min(70vh,36rem)] w-[min(46rem,calc(100vw-1.5rem))] max-w-full overflow-y-auto rounded-md border border-line bg-panel-2 p-2 shadow-xl"
          : "max-h-[min(70vh,36rem)] w-[min(42rem,calc(100vw-1.5rem))] max-w-full overflow-y-auto rounded-md border border-line bg-panel-2 p-2 shadow-xl"
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
    <div className="min-w-56 max-w-full rounded-md border border-line bg-panel-2 py-1 shadow-xl">
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
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-3 py-1.5 text-left text-sm hover:bg-accent/10 hover:text-accent"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{node.title}</span>
        <ChevronDown className={cn("size-3.5 opacity-70 transition-transform", open && "rotate-180")} />
      </button>
      {open ? (
        <div className="pb-1 pl-2">
          <DesktopNodes nodes={node.children} onNavigate={onNavigate} />
        </div>
      ) : null}
    </div>
  )
}

function MenuBody({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!item.nodes) return null
  if (item.columns) return <WideMenu nodes={item.nodes} onNavigate={onNavigate} />
  if (item.sections) return <SectionMenu nodes={item.nodes} onNavigate={onNavigate} />
  return (
    <div className="max-h-[min(70vh,36rem)] min-w-52 max-w-full overflow-y-auto rounded-md border border-line bg-panel-2 py-1 shadow-xl">
      <DesktopNodes nodes={item.nodes} onNavigate={onNavigate} />
    </div>
  )
}

type NavMenuValue = {
  openTitle: string | null
  pathname: string
  toggle: (title: string) => void
  close: () => void
  registerTrigger: (title: string, node: HTMLElement | null) => void
  triggerFor: (title: string) => HTMLElement | null
  panelRef: React.RefObject<HTMLDivElement | null>
}

const NavMenuContext = createContext<NavMenuValue | null>(null)

function useNavMenu() {
  const value = useContext(NavMenuContext)
  if (!value) throw new Error("Nav menu is missing")
  return value
}

export function NavRoot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [openTitle, setOpenTitle] = useState<string | null>(null)
  const triggers = useRef(new Map<string, HTMLElement>())
  const panelRef = useRef<HTMLDivElement>(null)

  const registerTrigger = useCallback((title: string, node: HTMLElement | null) => {
    if (node) triggers.current.set(title, node)
    else triggers.current.delete(title)
  }, [])

  const triggerFor = useCallback((title: string) => triggers.current.get(title) ?? null, [])

  const close = useCallback(() => setOpenTitle(null), [])

  const toggle = useCallback((title: string) => {
    setOpenTitle((current) => {
      const next = current === title ? null : title
      if (next) window.dispatchEvent(new CustomEvent("mira-door", { detail: "nav" }))
      return next
    })
  }, [])

  useEffect(() => {
    setOpenTitle(null)
  }, [pathname])

  useEffect(() => {
    const onDoor = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== "nav") setOpenTitle(null)
    }
    window.addEventListener("mira-door", onDoor)
    return () => window.removeEventListener("mira-door", onDoor)
  }, [])

  useEffect(() => {
    if (!openTitle) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenTitle(null)
    }
    const onDown = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (panelRef.current?.contains(target)) return
      const trigger = triggers.current.get(openTitle)
      if (trigger?.contains(target)) return
      setOpenTitle(null)
    }
    window.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onDown)
    }
  }, [openTitle])

  return (
    <NavMenuContext.Provider value={{ openTitle, pathname, toggle, close, registerTrigger, triggerFor, panelRef }}>
      {children}
    </NavMenuContext.Provider>
  )
}

function DesktopItem({ item }: { item: NavItem }) {
  const { openTitle, pathname, toggle, close, registerTrigger } = useNavMenu()
  const host = useRef<HTMLDivElement>(null)
  const open = openTitle === item.title
  const active = itemActive(pathname, item)

  useEffect(() => {
    registerTrigger(item.title, host.current)
    return () => registerTrigger(item.title, null)
  }, [item.title, registerTrigger])

  if (!item.nodes) {
    return (
      <Anchor
        href={item.href || "/"}
        onClick={close}
        className={cn("shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium hover:bg-accent/10 hover:text-accent", active && "text-accent")}
      >
        {item.title}
      </Anchor>
    )
  }

  return (
    <div ref={host} className="relative shrink-0">
      <div className={cn("inline-flex items-center rounded-md hover:bg-accent/10 hover:text-accent", (active || open) && "text-accent", open && "bg-accent/10")}>
        {item.href ? (
          <Anchor href={item.href} onClick={close} className="whitespace-nowrap py-1 pl-2 text-sm font-medium">
            {item.title}
          </Anchor>
        ) : (
          <button type="button" className="whitespace-nowrap py-1 pl-2 text-sm font-medium" aria-haspopup="menu" aria-expanded={open} aria-controls="site-nav-panel" onClick={() => toggle(item.title)}>
            {item.title}
          </button>
        )}
        <button
          type="button"
          className="py-1 pr-1.5 pl-1"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="site-nav-panel"
          aria-label={`${item.title} menu`}
          onClick={() => toggle(item.title)}
        >
          <ChevronDown className={cn("size-3 opacity-70 transition-transform", open && "rotate-180")} />
        </button>
      </div>
    </div>
  )
}

export function Nav() {
  return (
    <nav
      className="flex h-12 min-w-0 shrink flex-nowrap items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Site"
    >
      {mainNav.map((item) => (
        <DesktopItem key={item.title} item={item} />
      ))}
    </nav>
  )
}

export function NavPanel() {
  const { openTitle, close, triggerFor, panelRef } = useNavMenu()
  const item = mainNav.find((entry) => entry.nodes && entry.title === openTitle) ?? null
  const menuRef = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)

  useLayoutEffect(() => {
    if (!item) return
    const place = () => {
      const trigger = triggerFor(item.title)
      const host = panelRef.current
      const menu = menuRef.current
      if (!trigger || !host || !menu) return
      const hostBox = host.getBoundingClientRect()
      const triggerBox = trigger.getBoundingClientRect()
      const padLeft = Number.parseFloat(getComputedStyle(host).paddingLeft) || 0
      const contentWidth = host.clientWidth - padLeft - (Number.parseFloat(getComputedStyle(host).paddingRight) || 0)
      let left = triggerBox.left - hostBox.left - padLeft
      const max = Math.max(0, contentWidth - menu.offsetWidth)
      if (left < 0) left = 0
      if (left > max) left = max
      setShift(left)
    }
    place()
    const nav = triggerFor(item.title)?.closest("nav")
    nav?.addEventListener("scroll", place, { passive: true })
    window.addEventListener("resize", place)
    return () => {
      nav?.removeEventListener("scroll", place)
      window.removeEventListener("resize", place)
    }
  }, [item, panelRef, triggerFor])

  if (!item) return null

  return (
    <div className="border-b border-accent bg-ink/95">
      <div ref={panelRef} id="site-nav-panel" className="mx-auto max-w-[1400px] px-3 py-2 sm:px-5">
        <div ref={menuRef} className="w-fit max-w-full" style={{ marginLeft: shift }}>
          <MenuBody item={item} onNavigate={close} />
        </div>
      </div>
    </div>
  )
}
