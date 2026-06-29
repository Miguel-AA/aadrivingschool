import { useSearchParams } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "@/i18n";
import { siteConfig } from "@/config/site";
import { getCatalogItemBySlug } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { usePageTitle } from "@/lib/hooks/usePageTitle";
import { Section, SectionHeading } from "@/components/content/Section";
import { Hero } from "@/components/content/Hero";
import { LeadForm } from "@/components/lead/LeadForm";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";

export function Contact() {
  const t = useTranslations("pages");
  const locale = useLocale();
  const [searchParams] = useSearchParams();
  usePageTitle(t("contact.title"));

  // Prefill from an "intent=course:slug" / "package:slug" query (set by CTAs).
  const intentRaw = searchParams.get("intent") ?? undefined;
  let recommendation = "";
  let recommendationLabel: string | undefined;
  if (intentRaw) {
    const [, slug] = intentRaw.split(":");
    const item = getCatalogItemBySlug(slug ?? "");
    if (item) {
      recommendation = item.kind === "course" ? item.course.id : item.pkg.id;
      recommendationLabel =
        item.kind === "course"
          ? getLocalized(item.course.title, locale)
          : getLocalized(item.pkg.title, locale);
    }
  }

  return (
    <>
      <Hero
        eyebrow={t("contact.title")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <LeadForm
              defaults={{ recommendation, sourcePage: "/contact" }}
              recommendationLabel={recommendationLabel}
            />
          </div>

          <aside className="lg:col-span-1">
            <SectionHeading
              title={t("contact.otherWaysHeading")}
              className="mb-4"
            />
            <div className="space-y-4 text-sm">
              <WhatsAppCTA kind="default" variant="primary" className="w-full" />
              <a
                href={`tel:${siteConfig.supportPhone}`}
                className="flex items-center gap-2 text-slate-700 hover:text-brand-700"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {siteConfig.supportPhone}
              </a>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="flex items-center gap-2 text-slate-700 hover:text-brand-700"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {siteConfig.supportEmail}
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
