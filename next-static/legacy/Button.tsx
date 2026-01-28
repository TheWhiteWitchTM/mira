import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // your cn helper (clsx + twMerge)

const variantStyles = {
	default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow",
	destructive:
		"bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
	outline:
		"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
	secondary:
		"bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
	ghost: "hover:bg-accent hover:text-accent-foreground",
	link: "text-primary underline-offset-4 hover:underline",
} as const;

const sizeStyles = {
	default: "h-10 px-4 py-2",
	sm: "h-9 rounded-md px-3",
	lg: "h-11 rounded-md px-8",
	icon: "h-10 w-10", // for icon-only buttons (you can pass children as icon)
} as const;

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof typeof variantStyles;
	size?: keyof typeof sizeStyles;
}

/**
 * Minimal Button primitive
 * - Variants: default, destructive, outline, secondary, ghost, link
 * - Sizes: default, sm, lg, icon
 * - All styling via Tailwind — override with className
 * - No icons, no loading, no extra wrappers
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant = "default",
			size = "default",
			disabled,
			children,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				disabled={disabled}
				className={cn(
					// Base styles – minimal, no heavy opinion
					"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
					"disabled:pointer-events-none disabled:opacity-50",
					// Variant
					variantStyles[variant] || variantStyles.default,
					// Size
					sizeStyles[size] || sizeStyles.default,
					// User overrides last
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";