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
		<>
			<h2>📃Blog Feed: {item.emoji}{item?.title}</h2>
			{item?.description}
		</>
	)
}