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
}

/**
 * Stub lead service. Logs and keeps leads in memory for the foundation build.
 * Resets per server process — that's fine for now. Swap this implementation for
 * a CRM/database (Supabase, HubSpot, Airtable, etc.) later; the `LeadService`
 * interface and all call sites stay the same.
 */
class ConsoleLeadService implements LeadService {
  private store: LeadRecord[] = [];

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
}

export const leadService: LeadService = new ConsoleLeadService();
