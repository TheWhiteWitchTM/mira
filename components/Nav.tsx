"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"
import { mainNav, type NavItem, type NavLink, type NavNode } from "@/lib/nav"
import { person } from "@/lib/site"
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

function DesktopItem({ item, pathname, align }: { item: NavItem; pathname: string; align: "start" | "end" }) {
  const active = itemActive(pathname, item)
  if (!item.nodes) {
    return (
      <Anchor
        href={item.href || "/"}
        className={cn("whitespace-nowrap rounded-md px-2 py-1 text-sm font-medium hover:bg-accent/10 hover:text-accent", active && "text-accent")}
      >
        {item.title}
      </Anchor>
    )
  }

  return (
    <div className="group relative">
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
          className={cn(
            "invisible absolute top-full z-50 pt-1 opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
            align === "end" ? "right-0" : "left-0",
          )}
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

function MobileNodes({ nodes, close }: { nodes: NavNode[]; close: () => void }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "sep") {
          return <div key={`sep-${index}`} role="separator" className="my-1 border-t border-line" />
        }
        if (node.type === "link") {
          return (
            <Anchor
              key={node.href + node.title}
              href={node.href}
              onClick={close}
              className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent/10"
            >
              <span>{node.title}</span>
              {node.external ? <span aria-hidden="true" className="opacity-60">↗</span> : null}
            </Anchor>
          )
        }
        return (
          <details key={node.title} className="group/sub">
            <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-1.5 text-sm hover:bg-accent/10 [&::-webkit-details-marker]:hidden">
              {node.title}
              <ChevronRight className="size-3.5 opacity-70 transition group-open/sub:rotate-90" />
            </summary>
            <div className="ml-3 border-l border-line">
              <MobileNodes nodes={node.children} close={close} />
            </div>
          </details>
        )
      })}
    </>
  )
}

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <button
        type="button"
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent/10 min-[900px]:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav className="hidden h-12 min-w-0 flex-1 flex-nowrap items-center gap-0.5 min-[900px]:flex" aria-label="Site">
        {mainNav.map((item, index) => (
          <DesktopItem key={item.title} item={item} pathname={pathname} align={index >= 4 ? "end" : "start"} />
        ))}
      </nav>

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 max-h-[min(80vh,40rem)] overflow-y-auto border-b border-accent/40 bg-ink min-[900px]:hidden">
          <nav className="flex flex-col p-2" aria-label="Site">
            {mainNav.map((item) => {
              if (!item.nodes) {
                return (
                  <Anchor
                    key={item.title}
                    href={item.href || "/"}
                    onClick={close}
                    className={cn("rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10", itemActive(pathname, item) && "text-accent")}
                  >
                    {item.title}
                  </Anchor>
                )
              }
              return (
                <details key={item.title} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10 [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <ChevronDown className="size-4 transition group-open:rotate-180" />
                  </summary>
                  <div className="ml-2 border-l border-line pb-2">
                    {item.href ? (
                      <Anchor href={item.href} onClick={close} className="block px-3 py-1.5 text-sm hover:bg-accent/10">
                        Overview
                      </Anchor>
                    ) : null}
                    <MobileNodes nodes={item.nodes} close={close} />
                  </div>
                </details>
              )
            })}
            <Anchor href="/ukraine/" onClick={close} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10">
              I support Ukraine
            </Anchor>
            <a
              href={person.coffee}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-1 rounded-md border border-accent px-3 py-2.5 text-sm font-semibold text-accent"
            >
              Buy me a coffee
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  )
}
