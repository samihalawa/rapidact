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

export type Lead = typeof leads.$inferSelect;
export type Scan = typeof scans.$inferSelect;
