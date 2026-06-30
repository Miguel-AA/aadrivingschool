/**
 * Cloudflare Pages Function — POST /api/lead
 *
 * Receives a lead from the client form, re-validates it server-side with the
 * SAME Zod schema the client uses, silently drops honeypot spam, and forwards
 * valid leads to a server-only webhook (LEAD_WEBHOOK_URL). It never logs PII and
 * never fakes success: if delivery is not configured or fails, it returns a
 * non-2xx error so the frontend shows its error state + contact fallbacks.
 *
 * Runs on the Cloudflare Workers runtime (not part of the Vite app bundle, and
 * outside the app tsconfig `include`, so it is built/typed by Cloudflare).
 */
import { LeadSchema } from "../../src/lib/schemas/lead";

interface Env {
  /** Server-only delivery target (webhook/email relay). NOT a VITE_ var. */
  LEAD_WEBHOOK_URL?: string;
}

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  // Content-type guard.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ ok: false, error: "invalid_content_type" }, 400);
  }

  // Safe JSON parse.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: a real user never fills `website`. If present, accept-and-drop
  // with a success-shaped 200 so bots get no signal the trap was tripped.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim() !== ""
  ) {
    return json({ ok: true });
  }

  // Server-side validation (shared schema enforces required fields + consent).
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, error: "invalid_payload" }, 400);
  }
  const lead = parsed.data;

  // Delivery must be configured. Do NOT fake success for a real valid lead.
  if (!env.LEAD_WEBHOOK_URL) {
    // Non-PII only.
    console.error("[lead] delivery not configured (LEAD_WEBHOOK_URL missing)");
    return json({ ok: false, error: "not_configured" }, 500);
  }

  // Clean payload for the delivery target: lead fields + metadata.
  const payload = {
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    city: lead.city,
    language: lead.language,
    situation: lead.situation,
    recommendation: lead.recommendation,
    sourcePage: lead.sourcePage,
    submittedAt: new Date().toISOString(),
  };

  try {
    const res = await fetch(env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      // Log status only — never the lead payload.
      console.error("[lead] delivery_failed", { status: res.status });
      return json({ ok: false, error: "delivery_failed" }, 502);
    }
  } catch {
    console.error("[lead] delivery_error");
    return json({ ok: false, error: "delivery_error" }, 502);
  }

  return json({ ok: true });
}
