import type { LocalizedText } from "@/lib/schemas/content";
import type { DisclaimerPreset } from "@/lib/schemas/learn";
import { loc } from "@/content/_loc";

/**
 * Reusable compliance copy for the course player — DATA ONLY (CE3a).
 *
 * These presets are keyed by LearnCourse.disclaimerPreset. Nothing here renders
 * yet; the player (CE3b+) reads a preset and shows it on every learn screen.
 *
 * Copy is intentionally conservative and must stay that way:
 *  - educational practice/study only
 *  - NOT the official Florida exam
 *  - NOT affiliated with the DMV/FLHSMV
 *  - NO guarantee of any outcome
 *  - always verify current requirements with official sources
 *  - never imply a certificate or state approval
 */

/** Lines shared by every preset. */
const baseLines: LocalizedText[] = [
  loc(
    "This is an educational study and practice product.",
    "Este es un producto educativo de estudio y práctica.",
  ),
  loc(
    "It is not the official Florida exam and is not affiliated with or endorsed by the Florida DMV/FLHSMV.",
    "No es el examen oficial de Florida y no está afiliado ni respaldado por el DMV/FLHSMV de Florida.",
  ),
  loc(
    "It does not guarantee any result and does not issue any certificate.",
    "No garantiza ningún resultado y no emite ningún certificado.",
  ),
  loc(
    "Always confirm current requirements with official state sources.",
    "Confirma siempre los requisitos vigentes con las fuentes oficiales del estado.",
  ),
];

export interface DisclaimerContent {
  /** Ordered lines to display. */
  lines: LocalizedText[];
}

/**
 * Preset copy by key. Product-specific presets extend the shared base with one
 * extra clarifying line where needed.
 */
export const DISCLAIMER_PRESETS: Record<DisclaimerPreset, DisclaimerContent> = {
  "standard-practice": {
    lines: baseLines,
  },
  "spanish-bootcamp": {
    lines: [
      ...baseLines,
      loc(
        "The official Florida knowledge exam is taken in English; this product explains concepts in Spanish and teaches the English vocabulary to help you prepare.",
        "El examen teórico oficial de Florida se presenta en inglés; este producto explica los conceptos en español y enseña el vocabulario en inglés para ayudarte a prepararte.",
      ),
    ],
  },
  "info-guide": {
    lines: [
      ...baseLines,
      loc(
        "This is general guidance only and is not legal advice.",
        "Esto es solo orientación general y no constituye asesoría legal.",
      ),
    ],
  },
};
