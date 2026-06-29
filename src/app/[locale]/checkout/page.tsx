import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import type { ComplianceLabelKey } from "@/lib/schemas/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCatalogItemBySlug, getCoursesForPackage } from "@/content";
import { getLocalized } from "@/lib/utils/locale";
import { formatPrice } from "@/lib/utils/price";
import { Hero } from "@/components/content/Hero";
import { Section } from "@/components/content/Section";
import { Disclaimer } from "@/components/compliance/Disclaimer";
import { CTAButton } from "@/components/cta/CTAButton";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { Link } from "@/i18n/navigation";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { EVENTS } from "@/lib/services/analytics";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/checkout">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "pages" });
  return {
    ...buildMetadata({
      title: t("checkout.metaTitle"),
      description: t("checkout.metaDescription"),
      locale,
      path: "/checkout",
    }),
    robots: { index: false, follow: true },
  };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: PageProps<"/[locale]/checkout">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations({ locale, namespace: "pages" });

  const sp = await searchParams;
  const itemRaw = typeof sp.item === "string" ? sp.item : undefined;
  const [kind, slug] = itemRaw ? itemRaw.split(":") : [];
  const item = slug ? getCatalogItemBySlug(slug) : null;

  // Empty / not-found state.
  if (!item) {
    return (
      <Section>
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            {t("checkout.emptyTitle")}
          </h1>
          <p className="mt-2 text-slate-600">{t("checkout.emptyBody")}</p>
          <Link href="/courses" className={buttonClasses("primary", "lg", "mt-6")}>
            {t("checkout.emptyCta")}
          </Link>
        </div>
      </Section>
    );
  }

  const isCourse = item.kind === "course";
  const title = isCourse
    ? getLocalized(item.course.title, l)
    : getLocalized(item.pkg.title, l);
  const priceUsd = isCourse ? item.course.priceUsd : item.pkg.priceUsd;
  const price = formatPrice(priceUsd, l);

  // Included items + compliance labels.
  const includes = isCourse
    ? item.course.bullets.map((b) => getLocalized(b, l))
    : item.pkg.benefits.map((b) => getLocalized(b, l));
  const labels: ComplianceLabelKey[] = isCourse
    ? item.course.complianceLabels
    : Array.from(
        new Set(
          getCoursesForPackage(item.pkg).flatMap((c) => c.complianceLabels),
        ),
      );
  const providerId = isCourse
    ? item.course.providerId
    : (getCoursesForPackage(item.pkg).find(
        (c) => c.regulatoryStatus === "regulated-partner",
      )?.providerId ?? null);

  return (
    <>
      <Hero eyebrow={t("checkout.summaryHeading")} title={t("checkout.title")} />

      <Section>
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <span className="shrink-0 text-sm font-semibold text-slate-900">
                {price ?? t("checkout.priceLabel")}
              </span>
            </div>

            {includes.length > 0 && (
              <>
                <h3 className="mt-5 text-sm font-semibold text-slate-700">
                  {t("checkout.includesHeading")}
                </h3>
                <ul className="mt-2 space-y-1.5">
                  {includes.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                        aria-hidden="true"
                      />
                      {inc}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {price && (
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="font-semibold text-slate-900">
                  {t("checkout.totalLabel")}
                </span>
                <span className="text-lg font-bold text-slate-900">{price}</span>
              </div>
            )}
          </div>

          <Disclaimer
            labels={labels}
            providerId={providerId}
            className="mt-6"
          />

          <p className="mt-6 text-sm text-slate-600">{t("checkout.note")}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <CTAButton
              href={`/contact?intent=${kind}:${slug}`}
              eventName={EVENTS.CHECKOUT_START}
              eventProps={{ kind, slug }}
              size="lg"
            >
              {t("checkout.continueCta")}
            </CTAButton>
            <WhatsAppCTA
              kind="recommendation"
              item={title}
              size="lg"
              label={t("checkout.whatsappCta")}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
