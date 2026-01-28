// /next-static/ui/AppInstallButton.tsx

"use client"

import * as React from "react"
import { Button } from "./Button"
import { Download, Check, AlertTriangle } from "lucide-react"

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
		const [status, setStatus] = React.useState("checking")

		React.useEffect(() => {
			const registerSW = async () => {
				if (swRegistered) return
				if (process.env.NODE_ENV === "development") {
					setStatus("dev")
					return
				}
				if (!("serviceWorker" in navigator)) {
					setStatus("error")
					return
				}

				try {
					await navigator.serviceWorker.register(swPath, { scope: "/" })
					setSwRegistered(true)
				} catch {
					setStatus("error")
				}
			}

			registerSW()

			const checkStandalone = () => {
				if (window.matchMedia("(display-mode: standalone)").matches) {
					setIsInstalled(true)
					setStatus("installed")
				}
			}
			checkStandalone()

			const handleBeforeInstallPrompt = (e: Event) => {
				e.preventDefault()
				setDeferredPrompt(e)
				setStatus("ready")
			}

			const handleAppInstalled = () => {
				setIsInstalled(true)
				setDeferredPrompt(null)
				setStatus("installed")
			}

			window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
			window.addEventListener("appinstalled", handleAppInstalled)
			window.addEventListener("focus", checkStandalone)

			setTimeout(() => {
				if (status === "checking") {
					setStatus("not-ready")
				}
			}, 3000)

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
				setStatus("installed")
			}
			setDeferredPrompt(null)
		}

		const commonClasses = "hover:cursor-pointer transition-colors"

		if (isInstalled || status === "installed") {
			return (
				<Button
					ref={ref}
					tooltip={showTooltip ? installedTooltip : undefined}
					size="icon"
					variant="ghost"
					className={commonClasses}
					{...buttonProps}
				>
					<Check className="h-4 w-4" />
					{showText && installedText}
				</Button>
			)
		}

		if (status === "ready" || deferredPrompt) {
			return (
				<Button
					ref={ref}
					tooltip={showTooltip ? installTooltip : undefined}
					size="icon"
					variant="ghost"
					className={commonClasses}
					onClick={handleInstall}
					{...buttonProps}
				>
					<Download className="h-4 w-4" />
					{showText && installText}
				</Button>
			)
		}

		// Status fallback – icon-only if showText=false
		const statusIcon = <AlertTriangle className="h-3.5 w-3.5" />
		let statusLabel = ""
		if (showText) {
			if (status === "dev") statusLabel = "Dev"
			else if (status === "error") statusLabel = "Error"
			else statusLabel = "Not ready"
		}

		return (
			<div className={`inline-flex items-center gap-2 rounded border border-red-400 bg-red-50 px-2.5 py-1 text-xs text-red-800 dark:border-red-600 dark:bg-red-950 dark:text-red-300 hover:cursor-default ${showText ? "cursor-default" : "cursor-default"}`}>
				{statusIcon}
				{showText && <span>{statusLabel}</span>}
			</div>
		)
	}
)
AppInstallButton.displayName = "AppInstallButton"

export { AppInstallButton }