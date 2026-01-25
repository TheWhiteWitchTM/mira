"use client";

import { useState, useEffect } from "react";
import { Button, type ButtonProps } from "./Button";
import { DownloadCloud } from "lucide-react"; // or any icon you like as default child
import { cn } from "@/lib/utils";

export function PWAInstallButton({
	                                 className,
	                                 variant = "outline",
	                                 size = "default",
	                                 children,
	                                 ...props
                                 }: ButtonProps) {
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
	const [canPrompt, setCanPrompt] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);
	const [installedViaPrompt, setInstalledViaPrompt] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		// Detect if currently running as installed PWA
		const standalone = window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any).standalone === true ||
			document.referrer.includes("android-app://");
		setIsStandalone(standalone);

		if (standalone) {
			return; // already in app mode → no prompt needed
		}

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e);
			setCanPrompt(true);
		};

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// If prompt already fired before mount (rare), but catch it
		if (deferredPrompt) setCanPrompt(true);

		// Optional: appinstalled event (fires when user accepts prompt)
		const handleAppInstalled = () => {
			setInstalledViaPrompt(true);
			setCanPrompt(false);
			setDeferredPrompt(null);
		};
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	const handleClick = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === "accepted") {
			setInstalledViaPrompt(true);
		}

		setDeferredPrompt(null);
		setCanPrompt(false);
	};

	if (!mounted || isStandalone || installedViaPrompt || !canPrompt) {
		return null; // hide when: not mounted, already in app, install accepted, or no prompt available
	}

	return (
		<Button
			variant={variant}
			size={size}
			onClick={handleClick}
			className={cn("cursor-pointer", className)} // hand cursor when clickable
			{...props}
		>
			{children || (
				<>
					<DownloadCloud className="mr-2 h-4 w-4" />
					Install App
				</>
			)}
		</Button>
	);
}