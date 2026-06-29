import type { Locale } from "@/i18n/routing";

export interface CheckoutInput {
  itemId: string;
  kind: "course" | "package";
  locale: Locale;
}

export interface CheckoutService {
  /** Returns a URL to send the user to (hosted checkout or partner enrollment). */
  createCheckout(input: CheckoutInput): Promise<{ url: string }>;
}

/**
 * Placeholder checkout. For the foundation build, "checkout" routes the user to
 * the contact page with their intent encoded, so leads are captured while real
 * payment (Stripe/Square) and partner-enrollment routing are wired later behind
 * this same interface.
 */
export const checkoutService: CheckoutService = {
  async createCheckout({ itemId, kind, locale }) {
    return {
      url: `/${locale}/contact?intent=${kind}:${encodeURIComponent(itemId)}`,
    };
  },
};
