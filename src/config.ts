/**
 * Conversion destinations — the only file to edit when the offer or payment link changes.
 *
 * The product is the **AI Act Complete Pre-Consultory Report**: the company tells us
 * about their business and AI usage, pays a flat fee, and receives a full written
 * assessment plus a professional contact assessment in their inbox within 24–48h.
 * (Same model as a law firm's pre-consultation fee — you pay to have your case looked at.)
 *
 * Payment runs through a bunq.me request link. bunq.me accepts `amount` and
 * `description` query params, so each payment carries the buyer's reference code and
 * lands already matched to their intake submission.
 */

export const REPORT = {
  /** Product name — also what the buyer sees in their bunq payment screen. */
  name: "AI Act Complete Pre-Consultory Report",
  price: 99,
  currency: "EUR",
  priceLabel: "€99",
  /** Inbox delivery window we promise, everywhere on the site. */
  delivery: "24–48h",
} as const;

/** bunq handle the payment request resolves to. */
const BUNQ_HANDLE = "oulang";

export const CONVERT = {
  /** Booking for a live call (secondary — the report is the primary path). */
  calBooking: "https://cal.com/oulang/aiact",
  /** Where every "get the report" CTA goes. */
  report: "/report",
  /** Published specimen of the deliverable, so buyers can read before paying. */
  example: "/example-report",
  /** Free scanner, top of funnel, still free forever. */
  scanner: "/scanner",
} as const;

/**
 * Build the bunq.me payment URL for a report purchase.
 *
 * Produces e.g.
 *   https://bunq.me/oulang?description=AI+Act+Complete+Pre-Consultory+Report+REF+K3F9QP&amount=99
 *
 * The description stays ASCII-only — payment descriptions get passed through bank
 * rails that are not reliably UTF-8 clean, and the ref must survive that trip intact.
 *
 * @param ref  Reference code from the intake submission, so an incoming payment can be
 *             matched to the company that filled the form. Omitted when unavailable.
 */
export function bunqPayUrl(ref?: string): string {
  const params = new URLSearchParams({
    description: ref ? `${REPORT.name} REF ${ref}` : REPORT.name,
    amount: String(REPORT.price),
  });
  return `https://bunq.me/${BUNQ_HANDLE}?${params.toString()}`;
}

/**
 * Human-readable reference code shown to the buyer and written into the bunq
 * description. Short and unambiguous — no 0/O or 1/I confusion when typed by hand.
 */
export function makeRef(): string {
  const alphabet = "ACDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

/** Open the bunq payment screen in a new tab. */
export function openPayment(ref?: string) {
  window.open(bunqPayUrl(ref), "_blank", "noopener");
}
