// /next-static/ui/AppLayout.tsx
import { ReactNode, forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
	header?: ReactNode;
	footer?: ReactNode;
	leftAside?: ReactNode;
	rightAside?: ReactNode;
	children: ReactNode;
}

export const AppLayout = forwardRef<HTMLDivElement, AppLayoutProps>(
	({ header, footer, leftAside, rightAside, children, className, ...rest }, ref) => {
		return (
			// Outer grid fills exactly screen height
			<div
				ref={ref}
				className={cn(
					"fixed top-0 left-0 grid h-screen w-full grid-rows-[auto_1fr_auto] overflow-hidden",
					className
				)}
				{...rest}
			>
				{/* Header row - auto height, stays at top */}
				{header && (
					<header className="bg-background z-50">
						{header}
					</header>
				)}

				{/* Main row - 1fr takes remaining space, 3-column grid */}
				<div className="grid grid-cols-[auto_1fr_auto] overflow-hidden bg-background">
					{/* Left sidebar - full height of this row, no scroll here */}
					{leftAside && (
						<aside className="bg-background border-r overflow-hidden">
							<div className="h-full overflow-y-auto">
								{leftAside}
							</div>
						</aside>
					)}

					{/* Center - ONLY place with scroll when needed */}
					<main className="overflow-y-auto">
						{children}
					</main>

					{/* Right sidebar - full height of this row, no scroll here */}
					{rightAside && (
						<aside className="bg-background border-l overflow-hidden">
							<div className="h-full overflow-y-auto">
								{rightAside}
							</div>
						</aside>
					)}
				</div>

				{/* Footer row - auto height, stays at bottom */}
				{footer && (
					<footer className="bg-background border-t z-50">
						{footer}
					</footer>
				)}
			</div>
		);
	}
);

AppLayout.displayName = "AppLayout";