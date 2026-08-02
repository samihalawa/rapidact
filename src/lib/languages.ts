export const LANGS = ["en", "es", "de", "fr", "it"] as const;

export type Lang = (typeof LANGS)[number];

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};
