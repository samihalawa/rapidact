/**
 * Conversion destinations — the only file to edit when the offer or payment link changes.
 *
 * RapidAct is the EU AI Act transparency practice. Its paid offer is the
 * **EU AI Act Company Assessment**: the company describes its AI usage, pays a
 * flat fee, and receives a written classification and action plan within 24–48h.
 *
 * Payment runs through a bunq.me request link. bunq.me accepts `amount` and
 * `description` query params, so each payment carries the buyer's reference code and
 * lands already matched to their intake submission.
 */

export const REPORT = {
  /** Product name — also what the buyer sees in their bunq payment screen. */
  name: "EU AI Act Company Assessment",
  price: 99,
  currency: "EUR",
  priceLabel: "€99",
  /** Inbox delivery window we promise, everywhere on the site. */
  delivery: "24–48h",
} as const;

/** bunq handle the payment request resolves to. */
const BUNQ_HANDLE = "oulang";

export const CONVERT = {
  /** Booking for direct specialist help. */
  calBooking: "https://cal.com/oulang/aiact",
  /** Where every "get the report" CTA goes. */
  report: "/report",
  /** Published specimen of the deliverable, so buyers can read before paying. */
  example: "/example-report",
  /** Free public-page diagnostic. */
  scanner: "/scanner",
  /** Simple commercial route for legal, assurance and delivery partners. */
  partners: "/partners",
  /** Optional conversational route for visitors who want guided questions. */
  guidedAssessment: "https://bot.megawebs.com/rapidact-guided-assessment",
  /** Direct human help for visitors who are not ready to buy. */
  whatsapp: "https://wa.me/34679794037",
  /** AI-use notice, badge and platform implementation guidance. */
  badge: "/article-50#install",
} as const;

/**
 * Build the bunq.me payment URL for a report purchase.
 *
 * Produces e.g.
 *   https://bunq.me/oulang?description=EU+AI+Act+Company+Assessment+REF+K3F9QP&amount=99
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
