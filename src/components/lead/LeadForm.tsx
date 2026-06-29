
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "@/i18n";
import { z } from "zod";
import { LeadSchema, type LeadInput } from "@/lib/schemas/lead";

// Form values use the schema INPUT type (defaults make some fields optional),
// while the validated/submitted values use the OUTPUT type.
type LeadFormValues = z.input<typeof LeadSchema>;
import { trackEvent, EVENTS } from "@/lib/services/analytics";
import { siteConfig } from "@/config/site";
import { buttonClasses } from "@/components/cta/buttonStyles";
import { WhatsAppCTA } from "@/components/cta/WhatsAppCTA";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { cn } from "@/lib/utils/cn";

interface LeadFormProps {
  defaults?: Partial<
    Pick<LeadInput, "recommendation" | "situation" | "sourcePage">
  >;
  /** Human-readable label of the recommended item, shown as context. */
  recommendationLabel?: string;
  className?: string;
}

const fieldClasses =
  "mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:ring-brand-600";

export function LeadForm({
  defaults,
  recommendationLabel,
  className,
}: LeadFormProps) {
  const t = useTranslations("leadForm");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues, unknown, LeadInput>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      language: locale,
      situation: defaults?.situation ?? "",
      recommendation: defaults?.recommendation ?? "",
      sourcePage: defaults?.sourcePage ?? "",
      consent: false,
      website: "",
    },
  });

  // `as` narrows the dynamic zod message key (e.g. "validation.name") to the
  // typed message-key union so next-intl's typed `t` accepts it.
  const msg = (key?: string) =>
    key ? t(key as Parameters<typeof t>[0]) : undefined;

  const onSubmit = handleSubmit(async (values) => {
    trackEvent(EVENTS.LEAD_SUBMIT_ATTEMPT, { sourcePage: values.sourcePage });
    // Investor demo build: there is no backend. Simulate a successful
    // submission. Wire this to a real CRM/API endpoint before launch.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
    trackEvent(EVENTS.LEAD_SUBMIT_SUCCESS, {
      sourcePage: values.sourcePage,
      recommendation: values.recommendation,
    });
  });

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-xl border border-emerald-200 bg-emerald-50 p-6",
          className,
        )}
        role="status"
      >
        <h3 className="text-lg font-semibold text-emerald-900">
          {t("success.heading")}
        </h3>
        <p className="mt-2 text-sm text-emerald-800">{t("success.body")}</p>
        <div className="mt-4">
          <WhatsAppCTA kind="default" variant="primary" />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      {recommendationLabel && (
        <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
          {recommendationLabel}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            {t("fields.name")} *
          </label>
          <input id="name" className={fieldClasses} {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{msg(errors.name.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-slate-700">
            {t("fields.phone")} *
          </label>
          <input
            id="phone"
            type="tel"
            className={fieldClasses}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{msg(errors.phone.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            {t("fields.email")} *
          </label>
          <input
            id="email"
            type="email"
            className={fieldClasses}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{msg(errors.email.message)}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="text-sm font-medium text-slate-700">
            {t("fields.city")} *
          </label>
          <input id="city" className={fieldClasses} {...register("city")} />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{msg(errors.city.message)}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="language" className="text-sm font-medium text-slate-700">
          {t("fields.language")}
        </label>
        <select id="language" className={fieldClasses} {...register("language")}>
          <option value="en">{t("languageOptions.en")}</option>
          <option value="es">{t("languageOptions.es")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="situation" className="text-sm font-medium text-slate-700">
          {t("fields.situation")}
        </label>
        <textarea
          id="situation"
          rows={3}
          className={fieldClasses}
          {...register("situation")}
        />
      </div>

      {/* Honeypot: hidden from users, attractive to bots. Must remain empty. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <ConsentCheckbox
        label={`${t("fields.consent")} *`}
        error={msg(errors.consent?.message)}
        {...register("consent")}
      />

      <p className="text-xs text-slate-500">{t("privacyNote")}</p>

      {status === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p className="font-medium">{t("error.heading")}</p>
          <p>{t("error.body")}</p>
          <p className="mt-1">{t("error.fallback", { email: siteConfig.supportEmail })}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses("primary", "lg", "w-full sm:w-auto")}
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
