import { z } from "zod";

/**
 * Shared lead schema — used by the client form (via zodResolver) AND the API
 * route, so validation rules live in exactly one place.
 */
export const LeadSchema = z.object({
  name: z.string().min(2, "validation.name"),
  phone: z.string().min(7, "validation.phone"),
  email: z.email("validation.email"),
  language: z.enum(["en", "es"]),
  city: z.string().min(1, "validation.city"),
  situation: z.string().max(2000).optional().default(""),
  // Course/package id carried over from the quiz recommendation (if any).
  recommendation: z.string().max(120).optional().default(""),
  // The page the lead originated from (for source attribution).
  sourcePage: z.string().max(200).optional().default(""),
  // Boolean (so an unchecked box is a valid initial value) that must be true to
  // pass. Keeps react-hook-form defaults simple while still requiring opt-in.
  consent: z.boolean().refine((v) => v === true, { message: "validation.consent" }),
  // Honeypot: real users never see or fill this; bots do. Validation stays
  // permissive so the API route can silently accept-and-drop bot submissions
  // (a 200) rather than returning a 400 that signals the trap.
  website: z.string().optional().default(""),
});

export type LeadInput = z.infer<typeof LeadSchema>;
