"use client";

import { useEffect, useState } from "react";
import { Button, type ButtonProps } from "./Button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme";

function getPreferredTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "light";
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(newTheme: "light" | "dark") {
	if (typeof window === "undefined") return;
	const html = document.documentElement;
	html.classList.remove("light", "dark");
	html.classList.add(newTheme);
	localStorage.setItem(STORAGE_KEY, newTheme);
}

export function ThemeToggleButton({
	                                  className,
	                                  variant = "ghost",
	                                  size = "icon",
	                                  ...props
                                  }: ButtonProps) {
	const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Run once on mount - synchronous as possible
		const preferred = getPreferredTheme();
		applyTheme(preferred);
		setCurrentTheme(preferred);
		setMounted(true);

		// Optional: listen for system changes (only if no user override)
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const handleChange = () => {
			if (!localStorage.getItem(STORAGE_KEY)) {  // only react if user didn't pick explicit
				const newPref = media.matches ? "dark" : "light";
				applyTheme(newPref);
				setCurrentTheme(newPref);
			}
		};
		media.addEventListener("change", handleChange);
		return () => media.removeEventListener("change", handleChange);
	}, []);

	const toggle = () => {
		const next = currentTheme === "light" ? "dark" : "light";
		applyTheme(next);
		setCurrentTheme(next);
	};

	if (!mounted) {
		return (
			<Button
				variant={variant}
				size={size}
				className={cn("opacity-0 pointer-events-none", className)}
				disabled
				{...props}
			/>
		);
	}

	return (
		<Button
			variant={variant}
			size={size}
			onClick={toggle}
			aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
			className={cn("cursor-pointer relative", className)}
			{...props}
		>
			<Sun
				className={cn(
					"h-5 w-5 transition-transform absolute",
					currentTheme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
				)}
			/>
			<Moon
				className={cn(
					"h-5 w-5 transition-transform absolute",
					currentTheme === "light" ? "scale-0 -rotate-90" : "scale-100 rotate-0"
				)}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}