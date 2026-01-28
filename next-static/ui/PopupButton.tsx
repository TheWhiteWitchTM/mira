"use client"

import * as React from "react"
import { Button } from "./Button"
import * as Portal from "@radix-ui/react-portal"

export interface PopupButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "onClick" | "children" | "tooltip"> {
	popup: React.ReactNode
	tooltip?: string
	showTooltip?: boolean
	children?: React.ReactNode
}

const PopupButton = React.forwardRef<HTMLButtonElement, PopupButtonProps>(
	(
		{
			popup,
			tooltip,
			showTooltip = false,
			children,
			...buttonProps
		},
		ref
	) => {
		const [open, setOpen] = React.useState(false)
		const buttonRef = React.useRef<HTMLButtonElement>(null)

		const toggle = () => setOpen((prev) => !prev)
		const close = () => setOpen(false)

		// Close popup when clicking outside or pressing Escape
		React.useEffect(() => {
			const handleClickOutside = (e: MouseEvent) => {
				if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
					close()
				}
			}

			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					close()
				}
			}

			if (open) {
				document.addEventListener("mousedown", handleClickOutside)
				document.addEventListener("keydown", handleEscape)
			}

			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
				document.removeEventListener("keydown", handleEscape)
			}
		}, [open])

		// Calculate popup position (right below the button)
		const getPopupPosition = () => {
			if (!buttonRef.current) {
				return { top: 0, left: 0 }
			}

			const rect = buttonRef.current.getBoundingClientRect()
			return {
				top: rect.bottom + window.scrollY + 6,    // 6px gap below button
				left: rect.left + window.scrollX,
			}
		}

		const position = open ? getPopupPosition() : { top: 0, left: 0 }

		return (
			<>
				<Button
					ref={(node) => {
						// Support both forwarded ref and our internal ref
						if (typeof ref === "function") ref(node)
						else if (ref) ref.current = node
						buttonRef.current = node
					}}
					size="icon"
					variant="ghost"
					className="cursor-pointer hover:bg-accent/50 transition-colors"
					onClick={toggle}
					tooltip={showTooltip ? tooltip : undefined}
					{...buttonProps}
				>
					{children}
				</Button>

				{open && (
					<Portal.Root>
						<div
							className="fixed inset-0 z-50"
							onClick={close}
						>
							<div
								className={`
                  absolute z-[60] min-w-[200px] rounded-lg border 
                  bg-popover text-popover-foreground shadow-xl
                  animate-in fade-in-0 zoom-in-95 slide-in-from-top-2
                  duration-150 origin-top-left
                  cursor-pointer
                `}
								style={{
									top: `${position.top}px`,
									left: `${position.left}px`,
								}}
								onClick={(e) => e.stopPropagation()}
							>
								{popup}
							</div>
						</div>
					</Portal.Root>
				)}
			</>
		)
	}
)

PopupButton.displayName = "PopupButton"

export { PopupButton }