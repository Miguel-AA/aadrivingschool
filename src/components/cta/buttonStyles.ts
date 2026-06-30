import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  // Metallic gold = the primary action color. Matches the "Explore pathway"
  // card CTA: horizontal bright→deep gold gradient with dark navy text.
  primary:
    "bg-gradient-to-r from-accent-300 to-accent-500 text-brand-950 shadow-sm shadow-accent-700/25 hover:-translate-y-0.5 hover:shadow-md hover:shadow-accent-700/30 hover:brightness-105 focus-visible:outline-accent-600",
  // Navy outline on light backgrounds.
  secondary:
    "border border-brand-200 bg-white text-brand-800 shadow-sm hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 focus-visible:outline-brand-700",
  // Navy solid — strong dark alternative.
  accent:
    "bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-sm shadow-brand-950/20 hover:-translate-y-0.5 hover:shadow-md hover:brightness-110 focus-visible:outline-brand-700",
  ghost: "text-brand-800 hover:bg-brand-50 focus-visible:outline-brand-700",
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
