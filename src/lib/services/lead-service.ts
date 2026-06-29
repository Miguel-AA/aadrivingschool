import "server-only";
import { randomUUID } from "node:crypto";
import type { LeadInput } from "@/lib/schemas/lead";

export type LeadRecord = LeadInput & {
  id: string;
  createdAt: string;
  status: "new";
};

export interface LeadService {
  submitLead(input: LeadInput): Promise<{ id: string; ok: true }>;
  /** Read captured leads (newest first) for the internal admin view. */
  listLeads(): Promise<LeadRecord[]>;
}

// Back the store with globalThis so it's shared across bundles. Next.js bundles
// route handlers and server components separately, so a plain module-level array
// would be a different instance in each — the API route's leads wouldn't be
// visible to the /admin page. (Still per-process and non-persistent; swap for a
// real DB/CRM later.)
const globalForLeads = globalThis as unknown as { __leadStore?: LeadRecord[] };
const store: LeadRecord[] = (globalForLeads.__leadStore ??= []);

/**
 * Stub lead service. Logs and keeps leads in memory for the foundation build.
 * Resets per server process — that's fine for now. Swap this implementation for
 * a CRM/database (Supabase, HubSpot, Airtable, etc.) later; the `LeadService`
 * interface and all call sites stay the same.
 */
class ConsoleLeadService implements LeadService {
  private store: LeadRecord[] = store;

  async submitLead(input: LeadInput) {
    const record: LeadRecord = {
      ...input,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
    };
    this.store.push(record);
    console.log("[lead-service] new lead", record);
    return { id: record.id, ok: true as const };
  }

  async listLeads() {
    return [...this.store].reverse();
  }
}

export const leadService: LeadService = new ConsoleLeadService();
