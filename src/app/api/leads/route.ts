import { NextResponse } from "next/server";
import { LeadSchema } from "@/lib/schemas/lead";
import { leadService } from "@/lib/services/lead-service";

/**
 * Lead capture endpoint. Validates with the shared Zod schema, drops honeypot
 * hits silently, and hands off to the swappable lead service. Returns field
 * errors (keyed by field) so the client form can show inline messages.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = LeadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Honeypot tripped: pretend success, but do not store the lead.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, id: "ignored" }, { status: 200 });
  }

  try {
    const result = await leadService.submitLead(parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 },
    );
  }
}
