import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-600 to-ocean-500 text-white shadow-sm shadow-brand-900/10 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-900/20 hover:brightness-105 focus-visible:outline-brand-600",
  secondary:
    "border border-brand-200 bg-white text-brand-700 shadow-sm hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-brand-600",
  accent:
    "bg-gradient-to-r from-accent-400 to-accent-500 text-slate-900 shadow-sm shadow-accent-700/10 hover:-translate-y-0.5 hover:shadow-md hover:brightness-105 focus-visible:outline-accent-600",
  ghost:
    "text-brand-700 hover:bg-brand-50 focus-visible:outline-brand-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}
