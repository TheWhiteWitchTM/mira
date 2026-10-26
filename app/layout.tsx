import type { Metadata, Viewport } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {baseMetadata, siteUrl} from "@/app/metadata";
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
				{ '@type': 'ListItem', position: 1, name: 'Blog', url: `${siteUrl}/blog/` },
				{ '@type': 'ListItem', position: 2, name: 'Tools', url: `${siteUrl}/tools/` },
				{ '@type': 'ListItem', position: 3, name: 'Emoji UI', url: `${siteUrl}/projects/emoji-ui/` },
				{ '@type': 'ListItem', position: 4, name: 'NEXT-blog', url: `${siteUrl}/projects/next-blog/` },
				{ '@type': 'ListItem', position: 5, name: 'NEXT-static', url: `${siteUrl}/projects/next-static/` },
				{ '@type': 'ListItem', position: 6, name: 'Emoji Games', url: 'https://thewhitewitchtm.github.io/emojigames/' },
				{ '@type': 'ListItem', position: 7, name: 'The White Witch', url: 'https://thewhitewitchtm.github.io/whitewitch/' },
			],
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
				<div className={"mt-1.5 clock-font text-green-600"}>
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
		<Appbar className={"component"}
			left={
				<div className={"px-3 pt-1 flex flex-row gap-2"}>
					<DigitalClock/>
					<Weather/>
				</div>
			}
			right={
			<span className={"px-5"}>
			<Link
				href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
				target="_blank"
				rel="noopener noreferrer"
			>
				♥️Buy me a coffee!☕
			</Link>
			</span>
		}>
			<span className={"px-5"}>
				Build using ⚡NEXT-static & 📃NEXT-blog!
			</span>
		</Appbar>
	)

	const left = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-40"}>
			<SidebarLeft/>
		</div>
	)

	const right = (
		<div className={"hidden md:flex flex-col flex-1 !my-4 !p-2 component w-20"}>
			<Link
				href={"https://thewhitewitchtm.sociallydead.me/"}
				target={"_blank"}>
			<Image
				src={"/witch.png"}
				alt={"The White Witch"}
				width={200}
				height={200}
				priority
			/>
			</Link>
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
