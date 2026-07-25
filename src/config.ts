/**
 * Conversion destinations — the only file to edit when payment links change.
 *
 * Bunq: create two payment-request links in the bunq app (bunq.me) —
 * one for €59 (Compliance Pack), one for €99 (Done For You) — and paste them here.
 * While a pay link is empty, that CTA falls back to the Cal.com booking.
 */
export const CONVERT = {
  /** €59 Compliance Pack — bunq.me payment link */
  payPack59: "", // e.g. "https://bunq.me/oulang/59/rapidact-compliance-pack"
  /** €99 Done For You — bunq.me payment link */
  payDfy99: "", // e.g. "https://bunq.me/oulang/99/rapidact-done-for-you"
  /** Booking for the €99 install / discovery call */
  calBooking: "https://cal.com/oulang/aiact",
  /** Post-purchase intake (payment links can redirect here) */
  intake: "/start",
} as const;

export type Tier = "free" | "pack" | "dfy";

/** Where a pricing CTA should send the user. */
export function ctaTarget(tier: Tier): { url: string; external: boolean } {
  if (tier === "pack" && CONVERT.payPack59) return { url: CONVERT.payPack59, external: true };
  if (tier === "dfy" && CONVERT.payDfy99) return { url: CONVERT.payDfy99, external: true };
  if (tier === "pack" || tier === "dfy") return { url: CONVERT.calBooking, external: true };
  return { url: "/scanner", external: false };
}

export function openConversion(tier: Tier, navigate: (to: string) => void) {
  const { url, external } = ctaTarget(tier);
  if (external) window.open(url, "_blank", "noopener");
  else navigate(url);
}
