import type { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "line" | "ghost" }) {
  const look = variant === "primary" ? "btn-primary" : variant === "line" ? "btn-line" : "btn-ghost"
  return <button className={cn("btn", look, className)} {...props} />
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("field", className)} {...props} />
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("field min-h-24", className)} {...props} />
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-paper", className)} {...props} />
}
