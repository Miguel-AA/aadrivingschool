"use client";

import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { trackEvent, type AnalyticsEvent } from "@/lib/services/analytics";
import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

interface CTAButtonProps {
  children: ReactNode;
  /** Internal (locale-aware) href. Omit for a plain button driven by onClick. */
  href?: string;
  onClick?: () => void;
  /** Analytics event fired on click — REQUIRED so every CTA is measurable. */
  eventName: AnalyticsEvent;
  eventProps?: Record<string, unknown>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
}

/**
 * Click-to-navigate (or click-to-act) CTA that always fires a named analytics
 * event. Renders a locale-aware Link when `href` is set, otherwise a button.
 */
export function CTAButton({
  children,
  href,
  onClick,
  eventName,
  eventProps,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: CTAButtonProps) {
  const handleClick = () => {
    trackEvent(eventName, eventProps);
    onClick?.();
  };

  const classes = buttonClasses(variant, size, className);

  if (href) {
    return (
      <Link href={href} onClick={handleClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={handleClick} className={classes}>
      {children}
    </button>
  );
}
