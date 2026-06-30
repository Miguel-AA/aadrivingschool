import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { routing, defaultLocale, type Locale } from "./routing";

// Message catalogs (reused verbatim from the previous next-intl setup).
import enCommon from "@/messages/en/common.json";
import enHome from "@/messages/en/home.json";
import enCompliance from "@/messages/en/compliance.json";
import enLanding from "@/messages/en/landing.json";
import enLeadForm from "@/messages/en/leadForm.json";
import enPages from "@/messages/en/pages.json";
import enQuiz from "@/messages/en/quiz.json";
import esCommon from "@/messages/es/common.json";
import esHome from "@/messages/es/home.json";
import esCompliance from "@/messages/es/compliance.json";
import esLanding from "@/messages/es/landing.json";
import esLeadForm from "@/messages/es/leadForm.json";
import esPages from "@/messages/es/pages.json";
import esQuiz from "@/messages/es/quiz.json";

type Dict = Record<string, unknown>;

const MESSAGES: Record<Locale, Record<string, Dict>> = {
  en: {
    common: enCommon,
    home: enHome,
    compliance: enCompliance,
    landing: enLanding,
    leadForm: enLeadForm,
    pages: enPages,
    quiz: enQuiz,
  },
  es: {
    common: esCommon,
    home: esHome,
    compliance: esCompliance,
    landing: esLanding,
    leadForm: esLeadForm,
    pages: esPages,
    quiz: esQuiz,
  },
};

/** Resolve a dotted key path within a namespace object. */
function resolvePath(obj: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      obj,
    );
}

/** Strip the `[ES] ` placeholder marker so untranslated Spanish shows clean
 *  English text instead of a raw marker. No-op for already-translated strings. */
function strip(value: string): string {
  return value.replace(/^\[ES\]\s*/, "");
}

function cleanDeep<T>(value: T): T {
  if (typeof value === "string") return strip(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => cleanDeep(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = cleanDeep(v);
    return out as T;
  }
  return value;
}

function interpolate(str: string, values?: Record<string, unknown>): string {
  if (!values) return str;
  return str.replace(/\{(\w+)\}/g, (_, k: string) =>
    k in values ? String(values[k]) : `{${k}}`,
  );
}

export type Translator = {
  (key: string, values?: Record<string, unknown>): string;
  raw: <T = unknown>(key: string) => T;
};

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Always start in English on every entry. The choice is intentionally NOT
  // persisted — a fresh visit/reload resets to the default locale; an explicit
  // toggle only lasts for the current session (React state, no reload in the SPA).
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Keep <html lang> in sync with the active locale.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useSetLocale(): (locale: Locale) => void {
  return useContext(LocaleContext).setLocale;
}

/**
 * next-intl-compatible translations hook. `t(key, values?)` returns an
 * interpolated string; `t.raw(key)` returns the raw value (arrays/objects).
 * Falls back to English for missing keys and strips `[ES]` placeholder markers.
 */
export function useTranslations(namespace: string): Translator {
  const { locale } = useContext(LocaleContext);

  return useMemo(() => {
    // Support dotted namespaces (e.g. "landing.common", "pages.courseDetail")
    // by resolving the path into the locale's message tree.
    const ns = resolvePath(MESSAGES[locale], namespace);
    const enNs = resolvePath(MESSAGES.en, namespace);

    const lookup = (key: string): unknown => {
      const found = resolvePath(ns, key);
      return found === undefined ? resolvePath(enNs, key) : found;
    };

    const t = ((key: string, values?: Record<string, unknown>) => {
      const value = lookup(key);
      if (typeof value !== "string") return key;
      return interpolate(strip(value), values);
    }) as Translator;

    t.raw = <T,>(key: string) => cleanDeep(lookup(key)) as T;
    return t;
  }, [locale, namespace]);
}

export { routing };
export type { Locale };
