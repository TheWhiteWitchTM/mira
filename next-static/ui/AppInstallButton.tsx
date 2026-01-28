// /next-static/ui/AppInstallButton.tsx

"use client"

import * as React from "react"
import { Button } from "./Button"
import { Download, Check } from "lucide-react"

export interface AppInstallButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "onClick" | "tooltip" | "children"> {
	installText?: string
	installedText?: string
	installTooltip?: string
	installedTooltip?: string
	swPath?: string
	showText?: boolean
	showTooltip?: boolean
}

const AppInstallButton = React.forwardRef<HTMLButtonElement, AppInstallButtonProps>(
	({
		 installText = "Install App",
		 installedText = "Installed",
		 installTooltip = "Add to home screen",
		 installedTooltip = "App installed",
		 swPath = "/sw.js",
		 showText = false,
		 showTooltip = false,
		 ...buttonProps
	 }, ref) => {
		const [deferredPrompt, setDeferredPrompt] = React.useState<Event | null>(null)
		const [isInstalled, setIsInstalled] = React.useState(false)
		const [swRegistered, setSwRegistered] = React.useState(false)

		React.useEffect(() => {
			const registerSW = async () => {
				if (swRegistered) return
				if (process.env.NODE_ENV === "development") return
				if (!("serviceWorker" in navigator)) return

				try {
					await navigator.serviceWorker.register(swPath, { scope: "/" })
					setSwRegistered(true)
				} catch {}
			}

			registerSW()

			const checkStandalone = () => {
				if (window.matchMedia("(display-mode: standalone)").matches) {
					setIsInstalled(true)
				}
			}
			checkStandalone()

			const handleBeforeInstallPrompt = (e: Event) => {
				e.preventDefault()
				setDeferredPrompt(e)
			}

			const handleAppInstalled = () => {
				setIsInstalled(true)
				setDeferredPrompt(null)
			}

			window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
			window.addEventListener("appinstalled", handleAppInstalled)
			window.addEventListener("focus", checkStandalone)

			return () => {
				window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
				window.removeEventListener("appinstalled", handleAppInstalled)
				window.removeEventListener("focus", checkStandalone)
			}
		}, [swPath, swRegistered])

		const handleInstall = async () => {
			if (!deferredPrompt) return
				;(deferredPrompt as any).prompt()
			const { outcome } = await (deferredPrompt as any).userChoice
			if (outcome === "accepted") {
				setIsInstalled(true)
			}
			setDeferredPrompt(null)
		}

		if (isInstalled) {
			return (
				<Button
					ref={ref}
					tooltip={showTooltip ? installedTooltip : undefined}
					size="icon"
					variant="ghost"
					className="hover:cursor-pointer transition-colors"
					{...buttonProps}
				>
					<Check className="h-4 w-4" />
					{showText && installedText}
				</Button>
			)
		}

		if (deferredPrompt) {
			return (
				<Button
					ref={ref}
					tooltip={showTooltip ? installTooltip : undefined}
					size="icon"
					variant="ghost"
					className="hover:cursor-pointer transition-colors"
					onClick={handleInstall}
					{...buttonProps}
				>
					<Download className="h-4 w-4" />
					{showText && installText}
				</Button>
			)
		}

		return null
	}
)
AppInstallButton.displayName = "AppInstallButton"

export { AppInstallButton }