import {
  ArrowRight,
  Award,
  BookOpen,
  ClipboardCheck,
  Languages,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "@/i18n";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "@/components/content/Section";
import { Reveal } from "@/components/content/Reveal";
import { Icon } from "@/components/content/Icon";

type ServiceItem = { key: string; title: string; body: string };

// Per-service icon + destination (services map to existing pages/courses).
const META: Record<string, { icon: LucideIcon; href: string }> = {
  tlsae: { icon: BookOpen, href: "/courses/tlsae" },
  permit: { icon: ClipboardCheck, href: "/permit-test-prep" },
  teen: { icon: Users, href: "/courses/dets" },
  spanish: { icon: Languages, href: "/spanish-help" },
  ticket: { icon: ShieldAlert, href: "/ticket-help" },
  insurance: { icon: Award, href: "/55-plus-driver" },
};

/** "Services We Help With" — professional solution list (not an ecommerce grid). */
export function Services() {
  const t = useTranslations("home");
  const items = t.raw("services.items") as ServiceItem[];

  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow={t("services.heading")}
          title={t("services.title")}
          subtitle={t("services.subheading")}
        />
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const meta = META[item.key];
          return (
            <Reveal key={item.key} delay={i * 70}>
              <Link
                href={meta?.href ?? "/courses"}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-900/5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-800 ring-1 ring-inset ring-brand-100 transition-colors group-hover:bg-brand-100">
                  {meta && <Icon icon={meta.icon} className="h-5 w-5" />}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-brand-900 group-hover:text-accent-600">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{item.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-600">
                  {t("services.learnMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
