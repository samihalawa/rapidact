import { Link, useParams } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import {
  listContent,
  contentPath,
  type ContentType,
  LANGS,
  type Lang,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const HUB_COPY: Record<
  Lang,
  {
    seoTitle: string;
    seoDescription: string;
    title: string;
    body: string;
    pages: string;
    sections: { type: ContentType; title: string; blurb: string }[];
  }
> = {
  en: {
    seoTitle: "EU AI Act Article 50 guides | RapidAct",
    seoDescription:
      "Find Article 50 guidance by question, AI vendor, sector and implementation task.",
    title: "Find the Article 50 guidance you need",
    body: "Choose a question, AI vendor or sector. Each guide identifies the relevant duty and the next implementation step.",
    pages: "guides",
    sections: [
      {
        type: "answers",
        title: "Direct answers",
        blurb:
          "Key Article 50 questions, answered with sources and next steps.",
      },
      {
        type: "vendors",
        title: "By AI vendor",
        blurb: "Check the technical signal, role and likely disclosure path.",
      },
      {
        type: "sectors",
        title: "By sector",
        blurb: "Review common AI uses and exposure in your industry.",
      },
      {
        type: "compare",
        title: "Compare options",
        blurb: "Choose the right tool or assessment for the task.",
      },
      {
        type: "glossary",
        title: "Glossary",
        blurb: "Understand the terms used in the regulation and guidance.",
      },
      {
        type: "blog",
        title: "Updates",
        blurb: "Track deadlines, enforcement and implementation changes.",
      },
    ],
  },
  es: {
    seoTitle: "Guías del artículo 50 de la Ley de IA | RapidAct",
    seoDescription:
      "Encuentra guías del artículo 50 por pregunta, proveedor de IA, sector y tarea.",
    title: "Encuentra la guía del artículo 50 que necesitas",
    body: "Elige una pregunta, proveedor de IA o sector. Cada guía identifica la obligación y el siguiente paso.",
    pages: "guías",
    sections: [
      {
        type: "answers",
        title: "Respuestas directas",
        blurb: "Preguntas clave, fuentes y próximos pasos.",
      },
      {
        type: "vendors",
        title: "Por proveedor de IA",
        blurb: "Revisa la señal técnica, la función y el aviso probable.",
      },
      {
        type: "sectors",
        title: "Por sector",
        blurb: "Usos habituales de IA y exposición en tu industria.",
      },
      {
        type: "compare",
        title: "Comparar opciones",
        blurb: "Elige la herramienta o evaluación adecuada.",
      },
      {
        type: "glossary",
        title: "Glosario",
        blurb: "Comprende los términos de la normativa y sus guías.",
      },
      {
        type: "blog",
        title: "Actualizaciones",
        blurb: "Sigue plazos, aplicación y cambios.",
      },
    ],
  },
  de: {
    seoTitle: "Leitfäden zu Artikel 50 des EU AI Act | RapidAct",
    seoDescription:
      "Artikel-50-Leitfäden nach Frage, KI-Anbieter, Branche und Aufgabe.",
    title: "Finden Sie den passenden Artikel-50-Leitfaden",
    body: "Wählen Sie Frage, KI-Anbieter oder Branche. Jeder Leitfaden nennt Pflicht und nächsten Schritt.",
    pages: "Leitfäden",
    sections: [
      {
        type: "answers",
        title: "Direkte Antworten",
        blurb: "Kernfragen mit Quellen und nächsten Schritten.",
      },
      {
        type: "vendors",
        title: "Nach KI-Anbieter",
        blurb: "Technisches Signal, Rolle und Hinweisweg prüfen.",
      },
      {
        type: "sectors",
        title: "Nach Branche",
        blurb: "Typische KI-Nutzung und Exposition Ihrer Branche.",
      },
      {
        type: "compare",
        title: "Optionen vergleichen",
        blurb: "Das passende Tool oder Assessment wählen.",
      },
      {
        type: "glossary",
        title: "Glossar",
        blurb: "Begriffe aus Verordnung und Leitlinien verstehen.",
      },
      {
        type: "blog",
        title: "Aktuelles",
        blurb: "Fristen, Durchsetzung und Änderungen verfolgen.",
      },
    ],
  },
  fr: {
    seoTitle: "Guides de l’article 50 de l’AI Act | RapidAct",
    seoDescription:
      "Trouvez les guides de l’article 50 par question, fournisseur IA, secteur et tâche.",
    title: "Trouvez le guide Article 50 adapté",
    body: "Choisissez une question, un fournisseur IA ou un secteur. Chaque guide indique l’obligation et l’action suivante.",
    pages: "guides",
    sections: [
      {
        type: "answers",
        title: "Réponses directes",
        blurb: "Questions clés, sources et prochaines actions.",
      },
      {
        type: "vendors",
        title: "Par fournisseur IA",
        blurb: "Vérifiez le signal technique, le rôle et la mention.",
      },
      {
        type: "sectors",
        title: "Par secteur",
        blurb: "Usages courants de l’IA et exposition du secteur.",
      },
      {
        type: "compare",
        title: "Comparer les options",
        blurb: "Choisissez l’outil ou l’évaluation adaptée.",
      },
      {
        type: "glossary",
        title: "Glossaire",
        blurb: "Comprenez les termes du règlement et des lignes directrices.",
      },
      {
        type: "blog",
        title: "Actualités",
        blurb: "Suivez les échéances, l’application et les changements.",
      },
    ],
  },
  it: {
    seoTitle: "Guide all’articolo 50 dell’AI Act | RapidAct",
    seoDescription:
      "Trova guide all’articolo 50 per domanda, fornitore IA, settore e attività.",
    title: "Trova la guida all’articolo 50 adatta",
    body: "Scegli una domanda, un fornitore IA o un settore. Ogni guida indica l’obbligo e l’azione successiva.",
    pages: "guide",
    sections: [
      {
        type: "answers",
        title: "Risposte dirette",
        blurb: "Domande chiave, fonti e prossime azioni.",
      },
      {
        type: "vendors",
        title: "Per fornitore IA",
        blurb: "Verifica segnale tecnico, ruolo e avviso probabile.",
      },
      {
        type: "sectors",
        title: "Per settore",
        blurb: "Usi comuni dell’IA ed esposizione del settore.",
      },
      {
        type: "compare",
        title: "Confronta opzioni",
        blurb: "Scegli lo strumento o la valutazione adatta.",
      },
      {
        type: "glossary",
        title: "Glossario",
        blurb: "Comprendi i termini del regolamento e delle linee guida.",
      },
      {
        type: "blog",
        title: "Aggiornamenti",
        blurb: "Segui scadenze, applicazione e cambiamenti.",
      },
    ],
  },
};

export default function ContentHub() {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const { lang: contextLang } = useI18n();
  const lang: Lang = LANGS.includes(paramLang as Lang)
    ? (paramLang as Lang)
    : contextLang;
  const copy = HUB_COPY[lang];
  return (
    <div className="min-h-screen bg-white">
      <Seo title={copy.seoTitle} description={copy.seoDescription} />
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#16181d] sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#5c6370]">{copy.body}</p>

        {copy.sections.map(sec => {
          const items = listContent(sec.type, lang);
          if (!items.length) return null;
          return (
            <section key={sec.type} className="mt-12">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-bold text-[#16181d]">
                  {sec.title}
                </h2>
                <span className="text-xs font-semibold text-[#6b7280]">
                  {items.length} {copy.pages}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#5c6370]">{sec.blurb}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(item => (
                  <Link
                    key={item.slug}
                    to={contentPath(item)}
                    className="group rounded border border-[#e2e2dd] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1f3a5f] hover:shadow-md"
                  >
                    <p className="text-[15px] leading-snug font-bold text-[#16181d] group-hover:text-[#1f3a5f]">
                      {item.title.replace(/ \| RapidAct$/, "")}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#5c6370]">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
