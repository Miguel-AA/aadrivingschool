import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "@/i18n";

/** Placeholder panel for learn screens not built yet (CE3b). */
export function ComingSoon({
  message,
  overviewHref,
}: {
  message: string;
  overviewHref: string;
}) {
  const t = useTranslations("learn");
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-slate-600">{message}</p>
      <Link
        href={overviewHref}
        className="mt-6 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t("backToOverview")}
      </Link>
    </div>
  );
}
