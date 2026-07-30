/**
 * Shared contracts between frontend and backend.
 */

/**
 * One email rule for every public form and API endpoint.
 *
 * The previous scanner check only looked for an `@` and a dot, while Zod used
 * a stricter server rule. That let the modal submit addresses the API would
 * reject, which surfaced as a misleading storage error.
 */
export const EMAIL_PATTERN =
  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string) {
  const normalized = normalizeEmail(value);
  const localPart = normalized.slice(0, normalized.lastIndexOf("@"));
  return (
    normalized.length <= 255 &&
    localPart.length > 0 &&
    !localPart.startsWith(".") &&
    !localPart.endsWith(".") &&
    !localPart.includes("..") &&
    EMAIL_PATTERN.test(normalized)
  );
}

export interface ScanFinding {
  id: string;
  name: string;
  vendor: string;
  category: string;
  article: string;
  severity: "high" | "medium" | "low";
  sourceUrl: string;
  evidence: string[];
  existingDisclosureFound: boolean;
}

export interface ScanPage {
  url: string;
  title: string;
}

export interface ScanBrokenElement {
  url: string;
  description: string;
}

export interface ScanRiskIndicator {
  area: "article_5" | "annex_3";
  sourceUrl: string;
  evidence: string;
  reason: string;
}

export interface ScanSummary {
  total: number;
  high: number;
  undisclosed: number;
  scannedAt: string;
  url: string;
  scanStatus: "complete" | "partial";
  pagesVisited: ScanPage[];
  blockers: string[];
  brokenElements: ScanBrokenElement[];
  riskIndicators: ScanRiskIndicator[];
  engine: "anchor-browser";
}

export interface ScanResult {
  detected: ScanFinding[];
  score: number;
  summary: ScanSummary;
  report: string;
  reachable: boolean;
  error?: string;
}

export type ScanStartResult =
  | { ok: true; token: string }
  | { ok: false; error: "invalid-url" | "rate-limited" | "anchor-unavailable" };

export type ScanStatusResult =
  | { status: "running" }
  | { status: "failed"; error: string }
  | { status: "completed"; result: ScanResult };

export interface LeadInput {
  email: string;
  url?: string;
  source?: string;
  name?: string;
  company?: string;
  partnerType?: string;
  clientVolume?: string;
  notes?: string;
}

export interface LeadResult {
  ok: boolean;
  stored: boolean;
  crm?: "synced" | "skipped" | "failed";
}

/** Intake for the paid EU AI Act Company Assessment. */
export interface ReportRequestInput {
  company: string;
  website?: string;
  email: string;
  country?: string;
  companySize?: string;
  sector?: string;
  aiSystems?: string[];
  notes?: string;
}

export interface ReportRequestResult {
  ok: boolean;
  /** Short reference code shown to the buyer and carried in the payment description. */
  ref: string;
  /** False when the intake could not be persisted — the buyer is never blocked by this. */
  stored: boolean;
  /** Server-side Close CRM delivery status for this intake. */
  crm: "synced" | "skipped" | "failed";
}
