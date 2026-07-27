/**
 * Shared contracts between frontend and backend.
 */

export interface ScanFinding {
  id: string;
  name: string;
  vendor: string;
  category: string;
  article: string;
  severity: "high" | "medium" | "low";
  evidence: string[];
  existingDisclosureFound: boolean;
}

export interface ScanSummary {
  total: number;
  high: number;
  undisclosed: number;
  scannedAt: string;
  url: string;
}

export interface ScanResult {
  detected: ScanFinding[];
  score: number;
  summary: ScanSummary;
  report: string;
  reachable: boolean;
  error?: string;
}

export interface LeadInput {
  email: string;
  url?: string;
  source?: string;
}

export interface LeadResult {
  ok: boolean;
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
}
