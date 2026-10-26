import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {baseMetadata, siteUrl, withBase} from "@/app/metadata";
import {extraProjects, githubProjects, projectGroups} from "@/lib/desk";
import {Appbar} from "@/next-static/legacy/Appbar";
import {MainMenu} from "@/components/MainMenu";
import Link from "next/link";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";
import { ThemeProvider } from "next-themes"
import {Toolbar} from "@/components/Toolbar";
import { DigitalClock }  from "@/components/DigitalClock";
import {Weather} from "@/components/Weather";
import Image from "next/image";
import SidebarRight from "@/components/SidebarRight";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Layout } from "@/emoji-ui/ui/Layout"
import SidebarLeft from "@/components/SidebarLeft";

export const metadata: Metadata = baseMetadata

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: '#000000',
}

const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': `${siteUrl}/#website`,
			name: "Mira's World",
			url: `${siteUrl}/`,
			description: baseMetadata.description,
			inLanguage: 'en',
			publisher: { '@id': `${siteUrl}/#mira` },
		},
		{
			'@type': 'Person',
			'@id': `${siteUrl}/#mira`,
			name: 'Mira',
			alternateName: 'The White Witch',
			jobTitle: 'Freelance software developer',
			url: 'https://thewhitewitchtm.github.io/',
			sameAs: [
				'https://github.com/TheWhiteWitchTM',
				'https://x.com/TheWhiteWitchTM',
				'https://youtube.com/@TheWhiteWitchTM',
				'https://bsky.app/profile/thewhitewitchtm.sociallydead.me',
				'https://thewhitewitchtm.github.io/',
				'https://thewhitewitchtm.github.io/whitewitch/',
				'https://thewhitewitchtm.github.io/emojigames/',
				'https://thewhitewitchtm.github.io/sociallydead/',
				'https://thewhitewitchtm.github.io/LibreSky/',
				'https://thewhitewitchtm.github.io/whitewitch/magic/',
			],
		},
		{
			'@type': 'ItemList',
			name: "Mira's World",
			itemListElement: [
				{ name: 'Blog', url: `${siteUrl}/blog/` },
				{ name: 'Tools', url: `${siteUrl}/tools/` },
				{ name: 'Calling Card', url: `${siteUrl}/tools/calling-card/` },
				{ name: 'Tutorials', url: `${siteUrl}/tutorials/markdown/` },
				{ name: 'RSS', url: `${siteUrl}/feed.xml` },
				...projectGroups.flatMap((group) => group.links.map((link) => ({ name: link.title, url: link.href }))),
				...extraProjects.map((link) => ({ name: link.title, url: link.href })),
				{ name: githubProjects.title, url: githubProjects.href },
			].map((item, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				url: item.url,
			})),
		},
	],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const header = (
		<Appbar className={"component"}
			left={
			<div className={"flex flex-row gap-2"}>
				<Avatar className={"border-2 border-green-600 shadow-[0_0_10px_#dc2626] shadow-green-500/70"}>
					<AvatarImage src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon-192x192.png`} alt="Mira's World"/>
				</Avatar>
				<div className={"mt-1.5 hidden min-[420px]:block clock-font text-green-600"}>
					<b>Mira's World™</b>
				</div>
			</div>
		}
			right={<Toolbar/>}
		>
			<MainMenu/>
		</Appbar>
	)

	const footer = (
		<footer className={"component flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 py-2 text-sm"}>
			<div className={"flex flex-wrap items-center gap-3"}>
				<DigitalClock/>
				<Weather/>
			</div>
			<div className={"flex flex-wrap items-center gap-x-4 gap-y-1"}>
				<a href={withBase("/feed.xml")}>RSS</a>
				<a href="https://thewhitewitchtm.github.io/" target="_blank" rel="noopener noreferrer">The card</a>
				<Link
					href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
					target="_blank"
					rel="noopener noreferrer"
				>
					Buy me a coffee
				</Link>
			</div>
		</footer>
	)

	const left = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-48"}>
			<SidebarLeft/>
		</div>
	)

	const right = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-20"}>
			<a
				href="https://thewhitewitchtm.github.io/whitewitch/"
				target="_blank"
				rel="noopener noreferrer"
			>
			<Image
				src={"/witch.png"}
				alt={"The White Witch"}
				width={200}
				height={200}
				priority
			/>
			</a>
			<SidebarRight/>
		</div>
	)

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className={"w-full h-full m-0 p-0 min-h-screen bg-background text-foreground antialiased"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Analytics/>
      <GoogleAnalytics gaId="G-13S6Z9KCX9" />
      <ThemeProvider
	      attribute="class"
	      defaultTheme="system"
	      enableSystem
	      disableTransitionOnChange
      >
	        <Layout
		        header={header}
		        footer={footer}
		        leftSidebar={left}
		        rightSidebar={right}
		        children={children}
	        />
          <Toaster/>
      </ThemeProvider>
      </body>
    </html>
  );
}
