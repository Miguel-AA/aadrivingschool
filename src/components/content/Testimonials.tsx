import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/content/Section";
import { Reveal } from "@/components/content/Reveal";

type Item = { quote: string; role: string };

/**
 * Testimonials section. NOTE: these quotes are illustrative placeholders that
 * describe who the service is built for. Replace `home.testimonials.items` with
 * real, permissioned customer reviews before launch.
 */
export function Testimonials() {
  const t = useTranslations("home");
  const items = t.raw("testimonials.items") as Item[];

  return (
    <Section tone="muted">
      <SectionHeading
        title={t("testimonials.heading")}
        subtitle={t("testimonials.subheading")}
        centered
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 90}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="h-4 w-4 fill-accent-400 text-accent-400"
                  />
                ))}
              </div>
              <Quote className="h-6 w-6 text-brand-200" aria-hidden="true" />
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-900">
                {item.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
