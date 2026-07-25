import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

/**
 * Leads captured from the scanner / report download / plugin CTAs.
 */
export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  url: varchar("url", { length: 1024 }),
  source: varchar("source", { length: 64 }).notNull().default("scanner"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Every scan run through the site (powers stats + follow-up).
 */
export const scans = mysqlTable("scans", {
  id: serial("id").primaryKey(),
  url: varchar("url", { length: 1024 }).notNull(),
  score: int("score"),
  totalDetected: int("total_detected").notNull().default(0),
  undisclosed: int("undisclosed").notNull().default(0),
  reachable: int("reachable").notNull().default(1),
  report: text("report"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/**
 * Paid "AI Act Complete Pre-Consultory Report" requests.
 *
 * A row is written the moment a company submits its intake — before payment — so a
 * lead is never lost if they drop off at the bunq screen. `ref` is the short code the
 * buyer sees and that travels in the bunq payment description, which is how an
 * incoming payment gets matched back to this row.
 */
export const reportRequests = mysqlTable("report_requests", {
  id: serial("id").primaryKey(),
  ref: varchar("ref", { length: 16 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  website: varchar("website", { length: 512 }),
  email: varchar("email", { length: 255 }).notNull(),
  country: varchar("country", { length: 64 }),
  companySize: varchar("company_size", { length: 32 }),
  sector: varchar("sector", { length: 64 }),
  /** Comma-separated AI systems the company reports using. */
  aiSystems: text("ai_systems"),
  notes: text("notes"),
  /** requested → paid → delivered */
  status: varchar("status", { length: 24 }).notNull().default("requested"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type Scan = typeof scans.$inferSelect;
export type ReportRequest = typeof reportRequests.$inferSelect;
