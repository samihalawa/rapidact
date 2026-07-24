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
}
