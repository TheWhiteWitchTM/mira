import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import {baseMetadata} from "@/app/metadata";
import {AppLayout} from "@/next-static/ui/AppLayout";
import {ThemeToggleButton} from "@/next-static/ui/hemeToggleButton";
import {PWAInstallButton} from "@/next-static/ui/WAInstallButton";
import {Appbar} from "@/next-static/ui/Appbar";
import {DigitalClock} from "@/next-static/ui/DigitalClock";
import {MainMenu} from "@/components/MainMenu";
import Link from "next/link";
import Image from "next/image";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import * as React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = baseMetadata


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	const header = (
		<Appbar
			left={
			<div className={"flex flex-row gap-2"}>
				<Avatar>
					<AvatarImage src={"/icon-192x192.png"}/>
				</Avatar>
				<div className={"mt-1"}>
					<b>Mira's World™</b>
				</div>
			</div>
		}
			right={<><PWAInstallButton/><ThemeToggleButton/></>}
		>
			<MainMenu/>
		</Appbar>
	)

	const footer = (
		<Appbar right={
			<Link
				href="https://www.paypal.com/ncp/payment/BVY3E2H2E2VWA"
				target="_blank"
				rel="noopener noreferrer"
				className="pr-2"
			>
				♥️Buy me a coffee!☕
			</Link>
		}>
			Build using ⚡NEXT-static & 📃NEXT-blog!
		</Appbar>
	)

	const left = (
		<div className={"w-45 flex flex-col items-center gap-3"}>
			<div>
			<DigitalClock
				latitude={49.993}
				longitude={8.247}
			/>
			</div>
			<div>
				<Link
					href={"https://thewhitewitchtm.sociallydead.me/"}
					target={"_blank"}
					>
					<p className={"mb-2"}>
					<b>The unhinged, and way less stable me:</b>
					</p>
					🧙‍♀️𝕿𝖍𝖊 𝖂𝖍𝖎𝖙𝖊 𝖂𝖎𝖙𝖈𝖍™✨
					<Image src={"/witch.png"}
					       alt={"‍🧙‍♀️𝕿𝖍𝖊 𝖂𝖍𝖎𝖙𝖊 𝖂𝖎𝖙𝖈𝖍™✨"}
					       width={250}
					       height={250}
					       priority/>
				</Link>

			</div>
		</div>
	)

  return (
    <html lang="en" className={"m-0 p-0"} suppressHydrationWarning>
      <body className="w-full h-full m-0 p-0 min-h-screen bg-background text-foreground antialiased">

      <>
	        <AppLayout
		        header={header}
		        footer={footer}
		        leftAside={left}
	        >
		        {children}
	        </AppLayout>
          <Toaster/>
        </>
      </body>
    </html>
  );
}
