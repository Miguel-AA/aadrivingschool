import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/content/Section";
import { buttonClasses } from "@/components/cta/buttonStyles";

export default function NotFound() {
  const t = useTranslations("common");
  return (
    <Section>
      <div className="mx-auto max-w-xl py-12 text-center">
        <p className="text-6xl font-bold text-brand-700">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          {t("notFound.title")}
        </h1>
        <p className="mt-2 text-slate-600">{t("notFound.body")}</p>
        <Link href="/" className={buttonClasses("primary", "lg", "mt-6")}>
          {t("notFound.cta")}
        </Link>
      </div>
    </Section>
  );
}
