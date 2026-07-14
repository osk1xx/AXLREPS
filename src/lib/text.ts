import type { Lang } from "./i18n";

export function pickLang(field: unknown, lang: Lang, fallback = "pl" as Lang): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  const obj = field as Record<string, string>;
  return obj[lang] || obj[fallback] || Object.values(obj).find((v) => v) || "";
}
