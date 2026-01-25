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
			left={<>Mira's World™</>}
			right={<><PWAInstallButton/><ThemeToggleButton/></>}
		>
			Header
		</Appbar>
	)

	const footer = (
		<Appbar
			right={<>Right</>}
			left={<>Left</>}
		>
			Footer
		</Appbar>
	)

	const left = (
		<DigitalClock
			latitude={49.993}
			longitude={8.247}
		/>
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
