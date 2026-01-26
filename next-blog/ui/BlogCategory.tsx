// @/components/emoji-ui/blog/BlogCategory.tsx

import * as React from 'react';
import { toast } from "sonner";  // ← this is the new import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { StarIcon, ShareIcon } from 'lucide-react';
import { DateDisplay } from './DateDisplay';
import type { MetaBase, PostMeta, CategoryMeta } from '@/next-blog/types/blog';
import Link from "next/link";

interface BlogCategoryProps {
	item: MetaBase;
}

export function BlogCategory({ item }: BlogCategoryProps) {
	const copyLink = (path: string) => {
		if (!path) return;

		const url = `${window.location.origin}${path}`;
		navigator.clipboard.writeText(url);

		toast.success("Link copied! 🪄", {
			description: "The link is now in your clipboard.",
			duration: 3000,
			// You can add more options: position: "bottom-center", action: { label: "Undo", onClick: ... }
		});
	};

	return (
		<Card className="h-full flex flex-col">
			<Link
				href={item.path}
				className="
    block               // makes it full-width like a div
    no-underline        // text-decoration: none
    text-inherit        // color inherits from parent (no blue/purple)
    visited:text-inherit // same for visited state
    hover:text-inherit  // prevent color change on hover
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring // optional: better focus ring"
			>
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-1">
					{item.featured && <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
					<span className="text-2xl">{item.emoji}</span>
					<h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
				</div>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="text-muted-foreground line-clamp-3">
					{item.description}
				</p>
			</CardContent>
			</Link>
			<CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t">
				<DateDisplay date={item.date ?? ''} />
				<Button
					variant="ghost"
					size="icon"
					onClick={(e) => {
						e.stopPropagation()
						copyLink(item.path ?? '')
					}}
					className="shrink-0"
				>
					<ShareIcon className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	);
}