import { useTranslations } from "@/i18n";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Section } from "@/components/content/Section";

type LegalSection = { heading: string; body: string[] };

/**
 * Shared layout for the static legal/trust pages (privacy, terms, refund).
 * Copy lives in the `pages.legal.<key>` message tree (EN/ES) — this component
 * only renders title, last-updated date, intro, and the section list.
 */
export function LegalPage({
  pageKey,
}: {
  pageKey: "privacy" | "terms" | "refund";
}) {
  const t = useTranslations("pages");
  const base = `legal.${pageKey}`;
  const title = t(`${base}.title`);
  usePageTitle(title);

  const sections = t.raw<LegalSection[]>(`${base}.sections`);

  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {t("legal.lastUpdatedLabel")}: {t(`${base}.updated`)}
        </p>
        <p className="mt-6 text-base leading-relaxed text-slate-700">
          {t(`${base}.intro`)}
        </p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-slate-900">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
