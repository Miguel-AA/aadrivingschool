import { ProviderSchema, type Provider } from "@/lib/schemas/content";
import { loc } from "./_loc";

/**
 * Approved course providers/partners. These are PLACEHOLDERS. Do not present any
 * provider as state-approved, and do not publish enrollment links, until the
 * relationship and the exact attribution language are confirmed in writing.
 */
const providers: Provider[] = [
  {
    id: "partner-pending",
    name: "Approved Course Partner",
    attributionText: loc(
      "This course is delivered through an approved course provider. Provider details will be confirmed before enrollment opens.",
      "Este curso se imparte a través de un proveedor de cursos aprobado. Los datos del proveedor se confirmarán antes de que abra la inscripción.",
    ),
    enrollmentUrl: null,
  },
];

export default ProviderSchema.array().parse(providers);
