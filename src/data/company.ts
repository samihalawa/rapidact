/**
 * Real-world identity of the business behind RapidAct.
 *
 * This is the highest-value trust content on the site. A visitor deciding whether
 * to send €99 to strangers for a compliance assessment is, consciously or not,
 * checking whether a real, reachable, legally accountable entity stands behind
 * the page. A registered company number they can verify themselves does more
 * work than any amount of design.
 *
 * Rule: everything here must be literally true and independently checkable.
 * Anything not verifiable is left empty, and the UI omits that block entirely
 * rather than filling it with something plausible.
 */

/** The registered entity that takes the payment and issues the invoice. */
export const ENTITY = {
  legalName: "Agents AI Ltd.",
  registrationNumber: "16570822",
  address: "27 Old Gloucester Street, London WC1N 3AX",
  country: "United Kingdom",
  phone: "+44 7883 306011",
  /**
   * TODO(sami): confirm this address. It was given as "contact@AgentsAI.l",
   * which is not a valid domain, so ".ltd" is an inference. A contact address
   * that bounces on a payment page is worse than showing no address at all,
   * so correct this or clear it.
   */
  contactEmail: "contact@agentsai.ltd",
  /**
   * VAT registration. Leave empty until the company is actually VAT registered:
   * the pricing copy only promises a VAT invoice when this is set, because
   * promising a VAT invoice you cannot issue is a real problem, not a detail.
   */
  vatNumber: "",
} as const;

/**
 * Public register entry, so the claim is checkable in one click rather than
 * merely asserted. UK companies are searchable on Companies House by number.
 */
export const COMPANIES_HOUSE_URL = `https://find-and-update.company-information.service.gov.uk/company/${ENTITY.registrationNumber}`;

/** The person who performs and signs the assessments. */
export const SPECIALIST = {
  name: "Sami Halawa",
  role: `Founder, ${ENTITY.legalName}`,
  /**
   * Keep this to genuine, checkable background. Do not add a legal
   * qualification unless one is actually held: for a compliance product, an
   * overstated credential is the failure mode that ends the business.
   */
  bio: "I build and ship AI systems for a living, which is why this assessment is written by someone who can read your stack rather than only the regulation. Where a question turns on a point of law rather than on how a system is built, the report says so plainly and tells you what to take to a lawyer.",
  /** Path to a real photograph in /public, e.g. "/team/sami.jpg". "" hides it. */
  photo: "",
  /** Public profile so the person can be verified. "" hides the link. */
  linkedin: "",
  email: ENTITY.contactEmail,
} as const;

/**
 * Optional downloadable version of the deliverable, e.g. a redacted PDF placed
 * in /public. The published specimen at /example-report already covers the
 * "read it before you buy" job, so this is a nice-to-have rather than a gap.
 */
export const SAMPLE_REPORT_URL = "";

export const HAS_NAMED_SPECIALIST = SPECIALIST.name.length > 0;
export const HAS_ENTITY_DETAILS =
  ENTITY.legalName.length > 0 && ENTITY.registrationNumber.length > 0;
export const HAS_VAT = ENTITY.vatNumber.length > 0;
export const ENTITY_DISPLAY_NAME = ENTITY.legalName || "RapidAct";
