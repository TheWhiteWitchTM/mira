// ClientSlugPage.tsx
'use client'

import { use } from 'react'
import {Feed} from "@/next-blog/ui/Feed";

export default function ClientSlugPage({
	                                       paramsPromise,
                                       }: {
	paramsPromise: Promise<{ slug: string }>
}) {
	const params = use(paramsPromise)  // ← this unwraps the promise
	const slug = params.slug

	// Now you can safely use slug in your client component
	return (
		<Feed category={slug}/>
	)
}