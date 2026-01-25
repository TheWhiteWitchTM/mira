import { ReactNode, HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AppbarProps extends HTMLAttributes<HTMLDivElement> {
	left?: ReactNode;
	right?: ReactNode;
	children?: ReactNode;
}

/**
 * Minimal horizontal Appbar primitive:
 * - left content sticks to the start (left side)
 * - children take up the remaining/center space
 * - right content sticks to the far end (right side)
 * - No built-in padding, margin, height, or background — control everything via className or child styles
 * - Full width, flex row, items centered vertically by default
 */
export const Appbar = forwardRef<HTMLDivElement, AppbarProps>(
	(
		{
			left,
			right,
			children,
			className,
			...rest
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex w-full items-center justify-between",
					className
				)}
				{...rest}
			>
				{/* Left section – aligned to start */}
				{left && (
					<div className="flex items-center justify-start shrink-0">
						{left}
					</div>
				)}

				{/* Center / main content – expands to fill available space */}
				<div className="flex-1 flex items-center justify-center min-w-0">
					{children}
				</div>

				{/* Right section – aligned to end */}
				{right && (
					<div className="flex items-center justify-end shrink-0">
						{right}
					</div>
				)}
			</div>
		);
	}
);

Appbar.displayName = "Appbar";