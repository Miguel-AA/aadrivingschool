/**
 * Renders a JSON-LD structured-data script. Server component. `data` is a plain
 * schema.org object from the helpers in `lib/seo/jsonld.ts`.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, server-built content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
