"use client"

import * as React from 'react'
import { toast } from "sonner"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { StarIcon, ShareIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { DateDisplay } from './DateDisplay'
import type { PostMeta } from '@/next-blog/types/blog'
import { mdxLoader } from "@/next-blog/lib/mdxLoader"
import {NewIndicator} from "@/next-blog/ui/NewIndicator";

interface BlogPostProps {
	item: PostMeta
}

export async function BlogPost({ item }: BlogPostProps) {
	const copyLink = (path: string) => {
		if (!path) return
		const url = `${window.location.origin}${path}`
		navigator.clipboard.writeText(url)
		toast.success("Link copied! 🪄", {
			description: "The link is now in your clipboard.",
			duration: 3000,
		})
	}

	const mod = await mdxLoader(item.slug)
	const MDX = mod.default

	// Use meta flags (from build-posts)
	const isLong = !!item.long
	const excerptHtml = item.excerpt || item.description || ''

	// Start expanded if metadata says so
	const ClientBlogPost = () => {
		const [expanded, setExpanded] = React.useState(!!item.expanded)

		return (
			<div className="h-full flex flex-col">

				<div className="flex flex-row items-center justify-between">
					<div className="flex items-center gap-3">
						{item.featured && <StarIcon className="text-yellow-500 fill-yellow-500" />}
						<span className="text-2xl">{item.emoji || '📝'}</span>
						<h2 className="font-bold text-lg line-clamp-2">{item.title}</h2>
						<NewIndicator
							className={"ml-5 mt-1 self-start shrink-0"}
							date={item.date ?? ''}
						/>
					</div>
				</div>

				<div>
					<div className={"prose dark:prose-invert"}>
					{isLong && !expanded ? (
						<span dangerouslySetInnerHTML={{ __html: excerptHtml }} />
					) : (
						<MDX />
					)}
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground pt-2 border-t gap-4">
					<DateDisplay date={item.date ?? ''} />

					{isLong && (
						<Button
							variant="ghost"
							className="flex items-center gap-2 mx-auto text-primary hover:text-primary/80"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? 'Show Less' : 'Read More'}
							{expanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
						</Button>
					)}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => copyLink(item.path ?? '')}
						className="shrink-0"
					>
						<ShareIcon className="h-4 w-4" />
					</Button>
				</div>
				<span className={"mb-3"}/>
			</div>
		)
	}

	return <ClientBlogPost />
}