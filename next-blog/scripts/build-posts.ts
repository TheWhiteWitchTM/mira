// scripts/build-posts-meta.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import { marked } from 'marked';

const BLOG_ROOT = path.join(process.cwd(), '/blog');

// ── CONFIGURABLE PART ────────────────────────────────────────────────────────
const BLOG_URL_PREFIX = '/blog';
const META_OUTPUT_DIR = path.join(process.cwd(), 'next-blog/meta');
const OUTPUT_FILE = path.join(META_OUTPUT_DIR, 'posts-meta.ts');
// ──────────────────────────────────────────────────────────────────────────────

const DEFAULT_EMOJI = '📝';
const EXCERPT_MAX_PLAIN_CHARS = 400;
const SITE_URL = 'https://thewhitewitchtm.github.io/mira';
const REGISTRY_FILE = path.join(process.cwd(), 'next-blog/lib/mdx-registry.ts');
const FEED_FILE = path.join(process.cwd(), 'public/feed.xml');

function cleanDescription(raw: unknown, plainText: string): string {
	let description = typeof raw === 'string' ? raw.replace(/\s+/g, ' ').trim() : '';
	const broken = description.length === 0
		|| description.startsWith(';')
		|| description.startsWith('#')
		|| description.startsWith('<')
		|| description.length > 280;
	if (broken) description = plainText;
	if (description.length > 160) {
		const cut = description.lastIndexOf(' ', 157);
		description = `${(cut > 80 ? description.slice(0, cut) : description.slice(0, 157)).trim()}…`;
	}
	return description;
}

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

interface PostMeta {
	slug: string;
	title: string;
	description: string;
	date: string;
	path: string;
	category: string;
	url?: string;
	urlType?: string;
	emoji: string;
	pinned: boolean;
	featured: boolean;
	expanded: boolean;
	tags: string[];
	excerpt: string;
	long: boolean;
}

async function loadPreviousDates(): Promise<Map<string, string>> {
	const dates = new Map<string, string>();
	try {
		const text = await fs.readFile(OUTPUT_FILE, 'utf8');
		for (const match of text.matchAll(/"slug": "([^"]+)"[\s\S]*?"date": "(\d{4}-\d{2}-\d{2})"/g)) {
			dates.set(match[1], match[2]);
		}
	} catch {
		// First generation has no file to read.
	}
	return dates;
}

async function run() {
	await fs.mkdir(META_OUTPUT_DIR, { recursive: true });

	const previousDates = await loadPreviousDates();
	const posts: PostMeta[] = [];

	const categories = await fs.readdir(BLOG_ROOT, { withFileTypes: true });

	for (const cat of categories) {
		if (!cat.isDirectory() || cat.name.startsWith('(') || cat.name.startsWith('[') || cat.name === 'meta') {
			continue;
		}

		const catPath = path.join(BLOG_ROOT, cat.name);
		const items = await fs.readdir(catPath, { withFileTypes: true });

		for (const item of items) {
			if (!item.isDirectory()) continue;

			const mdxPath = path.join(catPath, item.name, 'page.mdx');

			let stat;
			try {
				stat = await fs.stat(mdxPath);
				if (!stat.isFile()) continue;
			} catch {
				continue;
			}

			const text = await fs.readFile(mdxPath, 'utf-8');

			let meta: Record<string, any> = {};

			const m = text.match(/export const metadata\s*=\s*({[\s\S]*?});/);
			if (m) {
				try {
					const fnBody = `return ${m[1].trim()}`;
					meta = new Function(fnBody)();
				} catch (err) {
					console.warn(`Metadata parse error in ${cat.name}/${item.name}:`, (err as Error).message);
				}
			}

			const metaEnd = text.indexOf('};', text.indexOf('metadata'));
			const body = (metaEnd >= 0 ? text.slice(metaEnd + 2) : text).trim();

			const fullHtml = await marked.parse(body);

			const plainText = fullHtml.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

			let excerpt = '';
			let isLong = false;

			if (plainText.length > EXCERPT_MAX_PLAIN_CHARS) {
				isLong = true;

				let cutAt = EXCERPT_MAX_PLAIN_CHARS;
				const sentenceEnd = plainText.lastIndexOf('.', cutAt);
				if (sentenceEnd > 100) cutAt = sentenceEnd + 1;

				const approxHtmlPos = Math.floor((cutAt / plainText.length) * fullHtml.length);
				let htmlCut = fullHtml.lastIndexOf('.', approxHtmlPos);
				if (htmlCut === -1) htmlCut = fullHtml.lastIndexOf('\n', approxHtmlPos);
				if (htmlCut > 100) htmlCut += 1;
				else htmlCut = approxHtmlPos;

				excerpt = fullHtml.slice(0, htmlCut).trim() + '...';
			} else {
				excerpt = fullHtml;
			}

			const slug = `${cat.name}/${item.name}`;
			const fullPath = `${BLOG_URL_PREFIX}/${slug}`;

			posts.push({
				slug,
				title: meta.title || item.name.replace(/-/g, ' '),
				description: cleanDescription(meta.description, plainText),
				date: (typeof meta.date === 'string' && meta.date) || previousDates.get(slug) || stat.mtime.toISOString().split('T')[0],
				path: fullPath,
				category: cat.name,
				url: meta.url,
				urlType: meta.urlType,
				emoji: meta.emoji || DEFAULT_EMOJI,
				pinned: meta.pinned === true,
				featured: meta.featured === true,
				expanded: meta.expanded === true,
				tags: Array.isArray(meta.tags) ? meta.tags : [],
				excerpt,
				long: isLong,
			});
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	const code = `// AUTO-GENERATED by build-posts-meta.ts — do not edit
// Generated: ${new Date().toISOString()}

import type { PostMeta } from '@/next-blog/types/blog';

export const postsMeta: PostMeta[] = ${JSON.stringify(posts, null, 2)};
`;

	await fs.writeFile(OUTPUT_FILE, code, 'utf-8');

	const loaders = posts
		.slice()
		.sort((a, b) => a.slug.localeCompare(b.slug))
		.map((post) => {
			if (!/^[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/.test(post.slug)) {
				throw new Error(`Unsafe blog slug: ${post.slug}`);
			}
			return `\t${JSON.stringify(post.slug)}: () => import(${JSON.stringify(`@/blog/${post.slug}/page.mdx`)}),`;
		})
		.join('\n');

	const registry = `// AUTO-GENERATED by build-posts.ts — do not edit
// Generated: ${new Date().toISOString()}

import type { ComponentType } from 'react';

export const mdxLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
${loaders}
};
`;
	await fs.writeFile(REGISTRY_FILE, registry, 'utf-8');

	const items = posts.map((post) => {
		const link = `${SITE_URL}/blog/${post.slug}/`;
		const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString();
		return [
			'    <item>',
			`      <title>${escapeXml(post.title)}</title>`,
			`      <link>${link}</link>`,
			`      <guid isPermaLink="true">${link}</guid>`,
			`      <pubDate>${pubDate}</pubDate>`,
			`      <description>${escapeXml(post.description)}</description>`,
			'    </item>',
		].join('\n');
	}).join('\n');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mira's World</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>The lab of Mira, The White Witch. Tools, tutorials, and the dev blog.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
	await fs.writeFile(FEED_FILE, feed, 'utf-8');

	console.log(`Updated: ${OUTPUT_FILE}`);
	console.log(`Updated: ${REGISTRY_FILE}`);
	console.log(`Updated: ${FEED_FILE}`);
	console.log(`Total posts: ${posts.length}`);
}

run().catch(err => {
	console.error('Build failed:', err);
	process.exit(1);
});