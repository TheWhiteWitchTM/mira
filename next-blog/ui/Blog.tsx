// @/components/emoji-ui/blog/Blog.tsx
// CATEGORY OVERVIEW – grid of categories

'use client'

import * as React from 'react'
import { BlogHeader } from './BlogHeader'
import { BlogCategory } from './BlogCategory'
import type { CategoryMeta } from '@/next-blog/types/blog'
import { categoriesMeta } from '@/next-blog/meta/categories-meta' // adjust import

export function Blog() {
	const [filtered, setFiltered] = React.useState<CategoryMeta[]>(categoriesMeta)

	return (
		<div className="w-full">
			<BlogHeader
				items={categoriesMeta}
				onFiltered={setFiltered}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mt-8">
				{filtered.length === 0 ? (
					<p className="col-span-full text-center text-muted-foreground py-12">
						No categories match your filters...
					</p>
				) : (
					filtered.map(cat => (
						<BlogCategory key={cat.slug} item={cat} />
					))
				)}
			</div>
		</div>
	)
}