import type { AnchorHTMLAttributes, ReactNode } from "react"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeShiki from "@shikijs/rehype"
import Link from "next/link"
import { isExternalHref } from "./projects"
import { withBase } from "./site"

const components = {
  a: ({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) => {
    const url = typeof href === "string" ? href : ""
    const className = "text-accent underline-offset-4 hover:text-accent-2 hover:underline"
    if (!url) return <span {...rest}>{children}</span>
    if (isExternalHref(url)) {
      return (
        <a href={url} className={className} target={url.startsWith("mailto:") ? undefined : "_blank"} rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"} {...rest}>
          {children}
        </a>
      )
    }
    const path = url.startsWith("/") ? url : `/${url}`
    if (path.endsWith(".xml")) {
      return (
        <a href={withBase(path)} className={className} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={path} className={className} {...rest}>
        {children}
      </Link>
    )
  },
}

export async function renderMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeShiki,
            {
              theme: "nord",
              defaultLang: "plaintext",
            },
          ],
        ],
      },
    },
  })
  return content
}
