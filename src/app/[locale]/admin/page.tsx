import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { leadService } from "@/lib/services/lead-service";
import { Section } from "@/components/content/Section";

// Always render on demand (reads env + in-memory store + query token).
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/admin">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "pages" });
  return {
    title: t("admin.metaTitle"),
    robots: { index: false, follow: false },
  };
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <Section>
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-600">{body}</p>
      </div>
    </Section>
  );
}

export default async function AdminPage({
  params,
  searchParams,
}: PageProps<"/[locale]/admin">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });

  // Minimal auth: a shared token via env. NOTE: replace with real authentication
  // (and persistent storage) before production — this is an MVP internal view.
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return (
      <Notice
        title={t("admin.disabledTitle")}
        body={t("admin.disabledBody")}
      />
    );
  }

  const sp = await searchParams;
  const token = typeof sp.token === "string" ? sp.token : "";
  if (token !== adminToken) {
    return (
      <Notice
        title={t("admin.unauthorizedTitle")}
        body={t("admin.unauthorizedBody")}
      />
    );
  }

  const leads = await leadService.listLeads();

  return (
    <Section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{t("admin.title")}</h1>
        <p className="mt-1 text-slate-600">{t("admin.subtitle")}</p>
        <p className="mt-2 text-sm font-medium text-brand-700">
          {t("admin.countLabel")}: {leads.length}
        </p>
      </div>

      {leads.length === 0 ? (
        <p className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
          {t("admin.empty")}
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">{t("admin.th.created")}</th>
                <th className="px-3 py-2">{t("admin.th.name")}</th>
                <th className="px-3 py-2">{t("admin.th.contact")}</th>
                <th className="px-3 py-2">{t("admin.th.city")}</th>
                <th className="px-3 py-2">{t("admin.th.lang")}</th>
                <th className="px-3 py-2">{t("admin.th.situation")}</th>
                <th className="px-3 py-2">{t("admin.th.recommendation")}</th>
                <th className="px-3 py-2">{t("admin.th.source")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {leads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="whitespace-nowrap px-3 py-2 text-xs text-slate-500">
                    {new Date(lead.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 font-medium text-slate-900">
                    {lead.name}
                  </td>
                  <td className="px-3 py-2">
                    <div>{lead.email}</div>
                    <div className="text-xs text-slate-500">{lead.phone}</div>
                  </td>
                  <td className="px-3 py-2">{lead.city}</td>
                  <td className="px-3 py-2 uppercase">{lead.language}</td>
                  <td className="max-w-xs px-3 py-2 text-slate-600">
                    {lead.situation}
                  </td>
                  <td className="px-3 py-2">{lead.recommendation}</td>
                  <td className="px-3 py-2 text-xs text-slate-500">
                    {lead.sourcePage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Section>
  );
}
