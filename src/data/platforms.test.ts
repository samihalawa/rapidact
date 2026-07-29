import { describe, expect, it } from "vitest";
import { LANGS } from "@/lib/content";
import {
  getPlatform,
  getPlatforms,
  PLATFORM_PAGE_COPY,
  PLATFORM_SLUGS,
} from "./platforms";

const slugs = PLATFORM_SLUGS;

function expectNonEmpty(value: string) {
  expect(typeof value).toBe("string");
  expect(value.trim().length).toBeGreaterThan(0);
}

describe("localized platform guides", () => {
  it("provides complete platform pages in every supported language", () => {
    for (const lang of LANGS) {
      const platforms = getPlatforms(lang);
      expect(platforms.map(platform => platform.slug)).toEqual(slugs);
      expect(PLATFORM_PAGE_COPY[lang].platforms).not.toBe("");

      for (const platform of platforms) {
        expectNonEmpty(platform.h1);
        expectNonEmpty(platform.metaTitle);
        expectNonEmpty(platform.metaDescription);
        expectNonEmpty(platform.intro);
        expectNonEmpty(platform.detectionNote);
        expect(platform.freeInstall.length).toBeGreaterThanOrEqual(3);
        platform.freeInstall.forEach(expectNonEmpty);
        expect(platform.commonWidgets.length).toBeGreaterThan(0);
        platform.commonWidgets.forEach(expectNonEmpty);
      }
    }
  });

  it("does not fall back to English page copy on localized routes", () => {
    for (const lang of LANGS.filter(value => value !== "en")) {
      for (const slug of slugs) {
        const english = getPlatform(slug, "en");
        const localized = getPlatform(slug, lang);

        expect(localized?.h1).not.toBe(english?.h1);
        expect(localized?.intro).not.toBe(english?.intro);
        expect(localized?.detectionNote).not.toBe(english?.detectionNote);
      }
    }
  });

  it("preserves platform-specific guidance instead of generic interpolation", () => {
    const generatedContentTerms = {
      es: "contenido generado",
      de: "KI-generierte Inhalte",
      fr: "contenus générés",
      it: "contenuti generati",
    } as const;
    const firstMessageTerms = {
      es: "primer mensaje",
      de: "ersten Bot-Nachricht",
      fr: "premier message",
      it: "primo messaggio",
    } as const;

    for (const lang of ["es", "de", "fr", "it"] as const) {
      expect(getPlatform("shopify", lang)?.intro).toContain(
        generatedContentTerms[lang]
      );
      expect(getPlatform("tidio", lang)?.h1).toMatch(/Tidio|Lyro/);
      expect(getPlatform("botpress", lang)?.freeInstall.join(" ")).toContain(
        firstMessageTerms[lang]
      );
    }
  });

  it("uses natural custom-site headings without a platform placeholder", () => {
    const expected = {
      es: {
        meta: "Aviso de IA para cualquier web",
        install: "Instala el aviso en tu web",
        assessment: "cubre tu web",
        firstStep: "opción para cualquier web",
      },
      de: {
        meta: "KI-Hinweis für jede Website",
        install: "Hinweis auf Ihrer Website installieren",
        assessment: "deckt Ihre Website",
        firstStep: "Option für jede Website",
      },
      fr: {
        meta: "Mention IA pour tout site web",
        install: "Installer la mention sur votre site",
        assessment: "couvre votre site",
        firstStep: "option pour tout site web",
      },
      it: {
        meta: "Avviso IA per qualsiasi sito",
        install: "Installa l’avviso sul tuo sito",
        assessment: "copre il tuo sito",
        firstStep: "opzione per qualsiasi sito",
      },
    } as const;
    const forbiddenPhrases = [
      "en Cualquier web",
      "auf Jede Website",
      "sur Tout site web",
      "su Qualsiasi sito",
    ] as const;

    for (const lang of ["es", "de", "fr", "it"] as const) {
      const customSite = getPlatform("custom-website", lang);
      expect(customSite).toBeDefined();
      const pageText = [
        customSite!.metaTitle,
        customSite!.metaDescription,
        customSite!.h1,
        customSite!.intro,
        customSite!.freeInstall.join(" "),
        PLATFORM_PAGE_COPY[lang].installTitle(customSite!),
        PLATFORM_PAGE_COPY[lang].assessment(customSite!),
      ].join(" ");

      expect(customSite!.metaTitle).toContain(expected[lang].meta);
      expect(customSite!.freeInstall[0]).toContain(expected[lang].firstStep);
      expect(PLATFORM_PAGE_COPY[lang].installTitle(customSite!)).toBe(
        expected[lang].install
      );
      expect(PLATFORM_PAGE_COPY[lang].assessment(customSite!)).toContain(
        expected[lang].assessment
      );
      for (const phrase of forbiddenPhrases) {
        expect(pageText).not.toContain(phrase);
      }
    }
  });

  it("localizes generic widget labels while preserving product names", () => {
    const englishGenericLabels = [
      "Custom GPT apps",
      "Tidio live chat",
      "Tidio flows (automated replies)",
      "Custom GPT-based agents",
      "Voiceflow bots (similar setup)",
      "Custom GPT assistants",
      "Voice AI widgets",
    ];

    for (const lang of ["es", "de", "fr", "it"] as const) {
      const labels = getPlatforms(lang).flatMap(
        platform => platform.commonWidgets
      );
      for (const englishLabel of englishGenericLabels) {
        expect(labels).not.toContain(englishLabel);
      }
      expect(labels).toContain("Botpress Webchat");
      expect(labels).toContain("Intercom Fin");
    }
  });

  it("uses the official Wix installation flow in every language", () => {
    for (const lang of LANGS) {
      const wix = getPlatform("wix", lang);

      expect(wix).toBeDefined();
      expect(wix!.installUrl).toBe("https://wix.to/JKi80ih");
      expectNonEmpty(PLATFORM_PAGE_COPY[lang].installOfficial(wix!));
      expect(PLATFORM_PAGE_COPY[lang].installOfficial(wix!)).toContain("Wix");
      expect(wix!.freeInstall[0]).toMatch(/Wix/);
    }
  });
});
