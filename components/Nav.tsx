"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { mainNav, type NavItem, type NavLeaf } from "@/lib/nav"
import { person, withBase } from "@/lib/site"
import { cn } from "@/lib/cn"
import { isExternalHref } from "@/lib/projects"

function isActive(pathname: string, href?: string) {
  if (!href) return false
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(href)
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

function Leaf({ item, onClick, className }: { item: NavLeaf; onClick?: () => void; className?: string }) {
  return (
    <Anchor href={item.href} onClick={onClick} className={className}>
      <span className="min-w-0 truncate">{item.title}</span>
      {item.external ? <span aria-hidden="true" className="opacity-60">↗</span> : null}
    </Anchor>
  )
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href) || item.children?.some((child) => isActive(pathname, child.href))
  if (!item.children && !item.groups) {
    return (
      <Anchor
        href={item.href || "/"}
        className={cn("rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-accent/10 hover:text-accent", active && "text-accent")}
      >
        {item.title}
      </Anchor>
    )
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-accent/10 hover:text-accent",
          active && "text-accent",
        )}
        aria-haspopup="true"
      >
        {item.title}
        <ChevronDown className="size-3 opacity-70" />
      </button>
      <div className="invisible absolute left-0 top-full z-50 min-w-52 pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto rounded-md border border-line bg-panel-2 py-1 shadow-xl">
          {item.groups
            ? item.groups.map((group) => (
                <div key={group.title} className="py-1">
                  <p className="px-3 pt-1 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">{group.title}</p>
                  {group.children.map((child) => (
                    <Leaf
                      key={child.href}
                      item={child}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent/10 hover:text-accent"
                    />
                  ))}
                </div>
              ))
            : item.children?.map((child) => (
                <Leaf
                  key={child.href}
                  item={child}
                  className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent/10 hover:text-accent"
                />
              ))}
        </div>
      </div>
    </div>
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
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent/10 md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav className="hidden min-w-0 flex-1 flex-wrap items-center gap-0.5 md:flex" aria-label="Site">
        {mainNav.map((item) => (
          <DesktopItem key={item.title} item={item} pathname={pathname} />
        ))}
        <Anchor href={withBase("/feed.xml")} className="rounded-md px-2.5 py-1.5 text-sm font-medium hover:bg-accent/10 hover:text-accent">
          RSS
        </Anchor>
      </nav>

      {open ? (
        <div className="absolute inset-x-0 top-full z-50 max-h-[min(80vh,40rem)] overflow-y-auto border-b border-accent/40 bg-ink md:hidden">
          <nav className="flex flex-col p-2" aria-label="Site">
            {mainNav.map((item) => {
              if (!item.children && !item.groups) {
                return (
                  <Anchor
                    key={item.title}
                    href={item.href || "/"}
                    onClick={close}
                    className={cn("rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10", isActive(pathname, item.href) && "text-accent")}
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
                    {item.groups
                      ? item.groups.map((group) => (
                          <div key={group.title}>
                            <p className="px-3 pt-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted">{group.title}</p>
                            {group.children.map((child) => (
                              <Leaf
                                key={child.href}
                                item={child}
                                onClick={close}
                                className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent/10"
                              />
                            ))}
                          </div>
                        ))
                      : item.children?.map((child) => (
                          <Leaf
                            key={child.href}
                            item={child}
                            onClick={close}
                            className="flex items-center justify-between gap-2 px-3 py-1.5 text-sm hover:bg-accent/10"
                          />
                        ))}
                  </div>
                </details>
              )
            })}
            <Anchor href={withBase("/feed.xml")} onClick={close} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10">
              RSS
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
