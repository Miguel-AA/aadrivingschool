import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Section } from "@/components/content/Section";
import { buttonClasses } from "@/components/cta/buttonStyles";

/**
 * Standalone safe fallback for an unknown/failed learn track. Rendered by
 * LearnLayout in place of the player shell, so it brings its own Section + title.
 */
export function LearnNotFound() {
  const t = useTranslations("learn");
  usePageTitle(t("notFound.title"));

  return (
    <Section>
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{t("notFound.title")}</h1>
        <p className="mt-2 text-slate-600">{t("notFound.body")}</p>
        <Link href="/courses" className={buttonClasses("primary", "lg", "mt-6")}>
          {t("backToCourses")}
        </Link>
      </div>
    </Section>
  );
}
