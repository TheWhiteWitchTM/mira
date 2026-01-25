"use client"

import {CategoryMeta} from "@/next-blog/types/blog";
import * as React from "react";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {DateDisplay} from "@/next-blog/ui/DateDisplay";
import {Button} from "@/components/ui/button";
import {ShareIcon, StarIcon} from "lucide-react";
import {toast} from "sonner";
import {use} from "react";
import {categoriesMeta} from "@/next-blog/meta/categories-meta";

export default function Header({
	                                       paramsPromise,
                                       }: {
	paramsPromise: Promise<{ slug: string }>
}) {
	const params = use(paramsPromise)
	const slug = params.slug;

	const meta = categoriesMeta.find((category) => category.slug === slug);
	const item = meta as CategoryMeta;
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
	return(
		<Card className="h-full flex flex-col">
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
			<CardFooter className="flex justify-between items-center text-sm text-muted-foreground pt-2 border-t">
				<DateDisplay date={item.date ?? ''} />
				<span className="font-medium">📚 {(item as CategoryMeta).posts} posts</span>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => copyLink(item.path ?? '')}
					className="shrink-0"
				>
					<ShareIcon className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	)
}