import { Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/content/Section";
import { Reveal } from "@/components/content/Reveal";

type Item = { quote: string; name: string; role: string };

/**
 * Testimonials section. NOTE: these are clearly-labeled SAMPLE quotes (the
 * "Sample" badge). Replace `home.testimonials.items` with real, permissioned
 * customer reviews before launch — do not present fabricated quotes as verified.
 */
export function Testimonials() {
  const t = useTranslations("home");
  const items = t.raw("testimonials.items") as Item[];

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow={t("testimonials.eyebrow")}
        title={t("testimonials.heading")}
        centered
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 90}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-accent-400 text-accent-400"
                    />
                  ))}
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {t("testimonials.sampleLabel")}
                </span>
              </div>
              <Quote
                className="h-6 w-6 text-brand-300"
                aria-hidden="true"
              />
              <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-slate-700">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-ocean-500 text-xs font-bold text-white"
                >
                  {item.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
                <span className="text-sm">
                  <span className="block font-semibold text-slate-900">
                    {item.name}
                  </span>
                  <span className="block text-slate-500">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
