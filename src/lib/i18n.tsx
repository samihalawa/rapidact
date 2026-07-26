/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { LANGS, LANG_LABELS, type Lang } from "@/lib/content";
import { track } from "@/lib/analytics";

type Dictionary = Record<string, string>;

const EN: Dictionary = {
  "nav.deadline": "EU AI Act Article 50 applies from 2 August 2026",
  "nav.assessment": "The assessment",
  "nav.specimen": "Specimen",
  "nav.fees": "Fees",
  "nav.tools": "Free tools",
  "nav.article": "Article 50",
  "nav.badge": "AI notice",
  "nav.guides": "Guides",
  "nav.scan": "Free scan",
  "nav.request": "Request assessment",
  "nav.requestShort": "Assess",
  whatsapp: "Ask on WhatsApp",
  "consent.title": "Private, measurable experience",
  "consent.body":
    "Analytics and session replay show where this journey is unclear. Form answers, payment details and document contents are never sent to analytics.",
  "consent.allow": "Allow analytics",
  "consent.essential": "Essential only",
  "hero.kicker": "EU AI Act, Article 50",
  "hero.title":
    "Find out which of your AI systems the EU AI Act actually covers",
  "hero.body":
    "Most companies do not have a written list of the AI they run, let alone which obligations attach to each system. We produce that list for you, classify every system against the regulation, and set out what you are required to publish and document.",
  "hero.price":
    "The assessment costs €99, paid once. It reaches your inbox within 24–48h. If it does not arrive in that window, you are refunded in full.",
  "hero.request": "Request the assessment",
  "hero.specimen": "Preview the specimen PDF",
  "hero.badgeLead": "Need the technical notice only?",
  "hero.badgeLink": "Add a clear AI-use notice",
  "report.label": "Contents of the assessment",
  "report.title": "Six sections, written for your systems",
  "report.body":
    "The same structure every time, so the document is comparable and auditable. The content of each section is specific to what your company actually operates.",
  "specialist.label": "About us",
  "specialist.title": "The person behind your assessment",
  "specialist.verify": "View Sami on LinkedIn",
  "specialist.role": "Founder, Agents AI Ltd.",
  "specialist.human":
    "Your assessment is read and written by a person, not generated and sent unread. You can reply with follow-up questions about your own case at no extra cost.",
  "trust.commitment": "Our commitment",
  "specimen.kicker": "Real multi-page specimen",
  "specimen.title": "Preview the exact structure of the €99 assessment",
  "specimen.body":
    "This is an eight-page PDF, not a webpage made to look like a report. Inspect it here, open it full-screen, or download it before you buy.",
  "specimen.notice": "Illustrative specimen",
  "specimen.noticeBody":
    "Meridian Retail Group is invented. No real client information appears in this document.",
  "specimen.open": "Open full PDF",
  "specimen.download": "Download PDF",
  "specimen.pages": "8 pages · A4 PDF",
  "specimen.ctaTitle": "The same document, written for your systems",
  "specimen.ctaBody":
    "Tell us what your company runs and this is what arrives in your inbox within 24–48h. €99, charged once.",
  "footer.product": "Product",
  "footer.requirements": "Requirements",
  "footer.platforms": "Platforms",
  "footer.legal": "Legal",
  "footer.company": "Registered company",
  "footer.office": "Registered office",
  "footer.contact": "Contact",
  "footer.description":
    "Find out which AI systems the EU AI Act covers. The written assessment arrives within 24–48h for €99. The scanner and AI-use notice are free. Technical assessment, not legal advice.",
  "footer.assessment": "The assessment, €99",
  "footer.scan": "Free website scan",
  "footer.badge": "AI notice installer",
  "footer.article": "Article 50 guide",
  "footer.guides": "Guides",
  "footer.chatbot": "Chatbot AI disclosure",
  "footer.content": "AI content labelling",
  "footer.deepfake": "Deepfake labelling",
  "footer.evidence": "Evidence and records",
  "footer.any": "Any website",
  "footer.privacy": "Privacy policy",
  "footer.terms": "Terms of service",
  "footer.advice": "Not legal advice",
  "footer.house": "Companies House No.",
  "footer.copyright": "RapidAct is a trading name.",
  "footer.regulation":
    "Regulation (EU) 2024/1689, Article 50, applies from 2 August 2026",
};

const ES: Dictionary = {
  "nav.deadline":
    "El artículo 50 de la Ley de IA de la UE se aplica desde el 2 de agosto de 2026",
  "nav.assessment": "La evaluación",
  "nav.specimen": "Muestra",
  "nav.fees": "Precio",
  "nav.tools": "Herramientas gratis",
  "nav.article": "Artículo 50",
  "nav.badge": "Aviso de IA",
  "nav.guides": "Guías",
  "nav.scan": "Escaneo gratis",
  "nav.request": "Solicitar evaluación",
  "nav.requestShort": "Evaluar",
  whatsapp: "Preguntar por WhatsApp",
  "consent.title": "Experiencia privada y medible",
  "consent.body":
    "La analítica y la reproducción de sesión muestran dónde se atasca el proceso. Nunca enviamos respuestas, pagos ni documentos a analítica.",
  "consent.allow": "Permitir analítica",
  "consent.essential": "Solo esencial",
  "hero.kicker": "Ley de IA de la UE, artículo 50",
  "hero.title":
    "Descubre qué sistemas de IA de tu empresa cubre realmente la Ley de IA de la UE",
  "hero.body":
    "La mayoría de las empresas no tiene una lista escrita de la IA que utiliza ni de las obligaciones de cada sistema. Creamos ese inventario, clasificamos cada sistema y explicamos qué debes publicar y documentar.",
  "hero.price":
    "La evaluación cuesta 99 €, un solo pago. La recibes en 24–48 h o te devolvemos el importe.",
  "hero.request": "Solicitar la evaluación",
  "hero.specimen": "Ver la muestra en PDF",
  "hero.badgeLead": "¿Solo necesitas el aviso técnico?",
  "hero.badgeLink": "Añade un aviso claro sobre el uso de IA",
  "report.label": "Contenido de la evaluación",
  "report.title": "Seis secciones, escritas para tus sistemas",
  "report.body":
    "La estructura es siempre la misma para que el documento sea comparable y auditable. El contenido se adapta a lo que utiliza tu empresa.",
  "specialist.label": "Sobre nosotros",
  "specialist.title": "La persona detrás de tu evaluación",
  "specialist.verify": "Ver a Sami en LinkedIn",
  "specialist.role": "Fundador, Agents AI Ltd.",
  "specialist.human":
    "Una persona lee y redacta tu evaluación; no se genera y envía sin revisar. Puedes responder con preguntas sobre tu caso sin coste adicional.",
  "trust.commitment": "Nuestro compromiso",
  "specimen.kicker": "Muestra real de varias páginas",
  "specimen.title":
    "Previsualiza la estructura exacta de la evaluación de 99 €",
  "specimen.body":
    "Es un PDF de ocho páginas, no una web con aspecto de informe. Revísalo aquí, ábrelo a pantalla completa o descárgalo antes de comprar.",
  "specimen.notice": "Muestra ilustrativa",
  "specimen.noticeBody":
    "Meridian Retail Group es una empresa inventada. El documento no contiene datos de clientes reales.",
  "specimen.open": "Abrir PDF completo",
  "specimen.download": "Descargar PDF",
  "specimen.pages": "8 páginas · PDF A4",
  "specimen.ctaTitle": "El mismo documento, escrito para tus sistemas",
  "specimen.ctaBody":
    "Cuéntanos qué utiliza tu empresa y recibirás este documento en 24–48 h. 99 €, un solo pago.",
  "footer.product": "Producto",
  "footer.requirements": "Requisitos",
  "footer.platforms": "Plataformas",
  "footer.legal": "Legal",
  "footer.company": "Empresa registrada",
  "footer.office": "Domicilio social",
  "footer.contact": "Contacto",
  "footer.description":
    "Descubre qué sistemas cubre la Ley de IA. La evaluación escrita llega en 24–48 h por 99 €. El escáner y el aviso de IA son gratuitos. Evaluación técnica, no asesoramiento jurídico.",
  "footer.assessment": "La evaluación, 99 €",
  "footer.scan": "Escaneo web gratis",
  "footer.badge": "Instalador del aviso de IA",
  "footer.article": "Guía del artículo 50",
  "footer.guides": "Guías",
  "footer.chatbot": "Aviso de chatbot con IA",
  "footer.content": "Etiquetado de contenido IA",
  "footer.deepfake": "Etiquetado de deepfakes",
  "footer.evidence": "Pruebas y registros",
  "footer.any": "Cualquier web",
  "footer.privacy": "Política de privacidad",
  "footer.terms": "Términos del servicio",
  "footer.advice": "No es asesoramiento jurídico",
  "footer.house": "Companies House n.º",
  "footer.copyright": "RapidAct es una marca comercial.",
  "footer.regulation":
    "Reglamento (UE) 2024/1689, artículo 50, aplicable desde el 2 de agosto de 2026",
};

const DE: Dictionary = {
  "nav.deadline": "Artikel 50 des EU AI Act gilt seit 2. August 2026",
  "nav.assessment": "Bewertung",
  "nav.specimen": "Muster",
  "nav.fees": "Preis",
  "nav.tools": "Kostenlose Tools",
  "nav.article": "Artikel 50",
  "nav.badge": "KI-Hinweis",
  "nav.guides": "Leitfäden",
  "nav.scan": "Gratis-Scan",
  "nav.request": "Bewertung anfordern",
  "nav.requestShort": "Prüfen",
  whatsapp: "Per WhatsApp fragen",
  "consent.title": "Privat und messbar",
  "consent.body":
    "Analysen zeigen, wo der Ablauf unklar ist. Formulare, Zahlungen und Dokumente werden nie an Analytics gesendet.",
  "consent.allow": "Analyse erlauben",
  "consent.essential": "Nur erforderlich",
  "hero.kicker": "EU AI Act, Artikel 50",
  "hero.title":
    "Finden Sie heraus, welche Ihrer KI-Systeme der EU AI Act tatsächlich erfasst",
  "hero.body":
    "Die meisten Unternehmen haben weder ein schriftliches KI-Inventar noch eine Zuordnung der Pflichten. Wir erfassen und klassifizieren jedes System und nennen die nötigen Veröffentlichungen und Nachweise.",
  "hero.price":
    "Die Bewertung kostet einmalig 99 €. Sie erhalten sie innerhalb von 24–48 Stunden oder Ihr Geld zurück.",
  "hero.request": "Bewertung anfordern",
  "hero.specimen": "Muster-PDF ansehen",
  "hero.badgeLead": "Nur den technischen Hinweis benötigt?",
  "hero.badgeLink": "Klaren KI-Hinweis hinzufügen",
  "report.label": "Inhalt der Bewertung",
  "report.title": "Sechs Abschnitte für Ihre Systeme",
  "report.body":
    "Eine feste, prüfbare Struktur mit Inhalten, die auf Ihre tatsächlich eingesetzten Systeme zugeschnitten sind.",
  "specialist.label": "Über uns",
  "specialist.title": "Die Person hinter Ihrer Bewertung",
  "specialist.verify": "Sami auf LinkedIn ansehen",
  "specialist.role": "Gründer, Agents AI Ltd.",
  "specialist.human":
    "Ihre Bewertung wird von einer Person gelesen und geschrieben, nicht ungelesen automatisch versendet. Rückfragen zu Ihrem Fall sind inklusive.",
  "trust.commitment": "Unser Versprechen",
  "specimen.kicker": "Echtes mehrseitiges Muster",
  "specimen.title": "Sehen Sie die genaue Struktur der 99-€-Bewertung",
  "specimen.body":
    "Ein echtes achtseitiges PDF – keine als Bericht gestaltete Webseite. Hier ansehen, im Vollbild öffnen oder vor dem Kauf herunterladen.",
  "specimen.notice": "Illustratives Muster",
  "specimen.noticeBody":
    "Meridian Retail Group ist erfunden. Das Dokument enthält keine echten Kundendaten.",
  "specimen.open": "PDF öffnen",
  "specimen.download": "PDF herunterladen",
  "specimen.pages": "8 Seiten · A4-PDF",
  "specimen.ctaTitle": "Dasselbe Dokument für Ihre Systeme",
  "specimen.ctaBody":
    "Beschreiben Sie Ihre Systeme und erhalten Sie dieses Dokument innerhalb von 24–48 Stunden. Einmalig 99 €.",
  "footer.product": "Produkt",
  "footer.requirements": "Anforderungen",
  "footer.platforms": "Plattformen",
  "footer.legal": "Rechtliches",
  "footer.company": "Eingetragenes Unternehmen",
  "footer.office": "Geschäftsanschrift",
  "footer.contact": "Kontakt",
  "footer.description":
    "Erfahren Sie, welche KI-Systeme der EU AI Act erfasst. Schriftliche Bewertung in 24–48 Stunden für 99 €. Scanner und KI-Hinweis sind kostenlos.",
  "footer.assessment": "Bewertung, 99 €",
  "footer.scan": "Kostenloser Website-Scan",
  "footer.badge": "KI-Hinweis installieren",
  "footer.article": "Leitfaden Artikel 50",
  "footer.guides": "Leitfäden",
  "footer.chatbot": "KI-Chatbot-Hinweis",
  "footer.content": "KI-Inhalte kennzeichnen",
  "footer.deepfake": "Deepfakes kennzeichnen",
  "footer.evidence": "Nachweise und Aufzeichnungen",
  "footer.any": "Jede Website",
  "footer.privacy": "Datenschutz",
  "footer.terms": "Nutzungsbedingungen",
  "footer.advice": "Keine Rechtsberatung",
  "footer.house": "Companies House Nr.",
  "footer.copyright": "RapidAct ist ein Handelsname.",
  "footer.regulation":
    "Verordnung (EU) 2024/1689, Artikel 50, gilt ab 2. August 2026",
};

const FR: Dictionary = {
  "nav.deadline":
    "L’article 50 de l’AI Act européen s’applique depuis le 2 août 2026",
  "nav.assessment": "L’évaluation",
  "nav.specimen": "Spécimen",
  "nav.fees": "Tarif",
  "nav.tools": "Outils gratuits",
  "nav.article": "Article 50",
  "nav.badge": "Avis IA",
  "nav.guides": "Guides",
  "nav.scan": "Scan gratuit",
  "nav.request": "Demander l’évaluation",
  "nav.requestShort": "Évaluer",
  whatsapp: "Poser une question sur WhatsApp",
  "consent.title": "Expérience privée et mesurable",
  "consent.body":
    "L’analyse montre où le parcours manque de clarté. Formulaires, paiements et documents ne sont jamais envoyés.",
  "consent.allow": "Autoriser l’analyse",
  "consent.essential": "Essentiel seulement",
  "hero.kicker": "AI Act européen, article 50",
  "hero.title":
    "Découvrez quels systèmes d’IA de votre entreprise relèvent réellement de l’AI Act européen",
  "hero.body":
    "La plupart des entreprises n’ont ni inventaire écrit de leurs IA ni cartographie des obligations. Nous recensons et classons chaque système, puis précisons ce qu’il faut publier et documenter.",
  "hero.price":
    "L’évaluation coûte 99 €, en un seul paiement. Vous la recevez sous 24–48 h ou êtes remboursé.",
  "hero.request": "Demander l’évaluation",
  "hero.specimen": "Voir le spécimen PDF",
  "hero.badgeLead": "Besoin uniquement de la notice technique ?",
  "hero.badgeLink": "Ajouter un avis clair sur l’usage de l’IA",
  "report.label": "Contenu de l’évaluation",
  "report.title": "Six sections rédigées pour vos systèmes",
  "report.body":
    "Une structure stable, comparable et auditable, dont le contenu correspond aux systèmes réellement utilisés par votre entreprise.",
  "specialist.label": "À propos",
  "specialist.title": "La personne derrière votre évaluation",
  "specialist.verify": "Voir Sami sur LinkedIn",
  "specialist.role": "Fondateur, Agents AI Ltd.",
  "specialist.human":
    "Votre évaluation est lue et rédigée par une personne. Vous pouvez poser des questions complémentaires sur votre cas sans supplément.",
  "trust.commitment": "Notre engagement",
  "specimen.kicker": "Vrai spécimen multipage",
  "specimen.title": "Prévisualisez la structure exacte de l’évaluation à 99 €",
  "specimen.body":
    "Un vrai PDF de huit pages, pas une page web déguisée en rapport. Consultez-le ici, ouvrez-le en plein écran ou téléchargez-le.",
  "specimen.notice": "Spécimen illustratif",
  "specimen.noticeBody":
    "Meridian Retail Group est fictive. Le document ne contient aucune donnée de client réel.",
  "specimen.open": "Ouvrir le PDF",
  "specimen.download": "Télécharger le PDF",
  "specimen.pages": "8 pages · PDF A4",
  "specimen.ctaTitle": "Le même document, rédigé pour vos systèmes",
  "specimen.ctaBody":
    "Décrivez vos systèmes et recevez ce document sous 24–48 h. 99 €, en un seul paiement.",
  "footer.product": "Produit",
  "footer.requirements": "Exigences",
  "footer.platforms": "Plateformes",
  "footer.legal": "Mentions légales",
  "footer.company": "Société enregistrée",
  "footer.office": "Siège social",
  "footer.contact": "Contact",
  "footer.description":
    "Découvrez quels systèmes sont couverts par l’AI Act. Évaluation écrite sous 24–48 h pour 99 €. Scanner et avis IA gratuits.",
  "footer.assessment": "Évaluation, 99 €",
  "footer.scan": "Scan gratuit",
  "footer.badge": "Installer l’avis IA",
  "footer.article": "Guide de l’article 50",
  "footer.guides": "Guides",
  "footer.chatbot": "Notice chatbot IA",
  "footer.content": "Étiquetage du contenu IA",
  "footer.deepfake": "Étiquetage des deepfakes",
  "footer.evidence": "Preuves et registres",
  "footer.any": "Tout site web",
  "footer.privacy": "Politique de confidentialité",
  "footer.terms": "Conditions de service",
  "footer.advice": "Pas un avis juridique",
  "footer.house": "Companies House n°",
  "footer.copyright": "RapidAct est un nom commercial.",
  "footer.regulation":
    "Règlement (UE) 2024/1689, article 50, applicable le 2 août 2026",
};

const IT: Dictionary = {
  "nav.deadline": "L’articolo 50 dell’AI Act UE si applica dal 2 agosto 2026",
  "nav.assessment": "La valutazione",
  "nav.specimen": "Esempio",
  "nav.fees": "Prezzo",
  "nav.tools": "Strumenti gratuiti",
  "nav.article": "Articolo 50",
  "nav.badge": "Avviso IA",
  "nav.guides": "Guide",
  "nav.scan": "Scansione gratuita",
  "nav.request": "Richiedi valutazione",
  "nav.requestShort": "Valuta",
  whatsapp: "Chiedi su WhatsApp",
  "consent.title": "Esperienza privata e misurabile",
  "consent.body":
    "L’analisi mostra dove il percorso non è chiaro. Moduli, pagamenti e documenti non vengono mai inviati.",
  "consent.allow": "Consenti analisi",
  "consent.essential": "Solo essenziale",
  "hero.kicker": "AI Act UE, articolo 50",
  "hero.title":
    "Scopri quali sistemi di IA della tua azienda rientrano davvero nell’AI Act UE",
  "hero.body":
    "La maggior parte delle aziende non ha un inventario scritto dell’IA né una mappa degli obblighi. Elenchiamo e classifichiamo ogni sistema e indichiamo cosa pubblicare e documentare.",
  "hero.price":
    "La valutazione costa 99 €, una sola volta. Arriva entro 24–48 ore o ricevi il rimborso.",
  "hero.request": "Richiedi la valutazione",
  "hero.specimen": "Vedi il PDF di esempio",
  "hero.badgeLead": "Ti serve solo l’avviso tecnico?",
  "hero.badgeLink": "Aggiungi un avviso chiaro sull’uso dell’IA",
  "report.label": "Contenuto della valutazione",
  "report.title": "Sei sezioni scritte per i tuoi sistemi",
  "report.body":
    "Una struttura stabile, comparabile e verificabile, con contenuti specifici per i sistemi realmente usati dall’azienda.",
  "specialist.label": "Chi siamo",
  "specialist.title": "La persona dietro la valutazione",
  "specialist.verify": "Vedi Sami su LinkedIn",
  "specialist.role": "Fondatore, Agents AI Ltd.",
  "specialist.human":
    "La valutazione viene letta e scritta da una persona. Puoi rispondere con domande sul tuo caso senza costi aggiuntivi.",
  "trust.commitment": "Il nostro impegno",
  "specimen.kicker": "Esempio reale multipagina",
  "specimen.title": "Guarda la struttura esatta della valutazione da 99 €",
  "specimen.body":
    "Un vero PDF di otto pagine, non una pagina web che sembra un report. Consultalo qui, aprilo a schermo intero o scaricalo.",
  "specimen.notice": "Esempio illustrativo",
  "specimen.noticeBody":
    "Meridian Retail Group è inventata. Il documento non contiene dati di clienti reali.",
  "specimen.open": "Apri PDF",
  "specimen.download": "Scarica PDF",
  "specimen.pages": "8 pagine · PDF A4",
  "specimen.ctaTitle": "Lo stesso documento, scritto per i tuoi sistemi",
  "specimen.ctaBody":
    "Descrivi i tuoi sistemi e ricevi questo documento entro 24–48 ore. 99 €, una sola volta.",
  "footer.product": "Prodotto",
  "footer.requirements": "Requisiti",
  "footer.platforms": "Piattaforme",
  "footer.legal": "Note legali",
  "footer.company": "Società registrata",
  "footer.office": "Sede legale",
  "footer.contact": "Contatti",
  "footer.description":
    "Scopri quali sistemi copre l’AI Act UE. Valutazione scritta in 24–48 ore a 99 €. Scanner e avviso IA gratuiti.",
  "footer.assessment": "Valutazione, 99 €",
  "footer.scan": "Scansione gratuita",
  "footer.badge": "Installa l’avviso IA",
  "footer.article": "Guida articolo 50",
  "footer.guides": "Guide",
  "footer.chatbot": "Avviso chatbot IA",
  "footer.content": "Etichettatura contenuti IA",
  "footer.deepfake": "Etichettatura deepfake",
  "footer.evidence": "Prove e registri",
  "footer.any": "Qualsiasi sito",
  "footer.privacy": "Privacy",
  "footer.terms": "Termini di servizio",
  "footer.advice": "Non è consulenza legale",
  "footer.house": "Companies House n.",
  "footer.copyright": "RapidAct è un nome commerciale.",
  "footer.regulation":
    "Regolamento (UE) 2024/1689, articolo 50, applicabile dal 2 agosto 2026",
};

const DICTIONARIES: Record<Lang, Dictionary> = {
  en: EN,
  es: ES,
  de: DE,
  fr: FR,
  it: IT,
};

type I18nValue = {
  lang: Lang;
  t: (key: string) => string;
  path: (pathname: string) => string;
  setLanguage: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function localeFromPath(pathname: string): Lang | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return LANGS.includes(first as Lang) ? (first as Lang) : null;
}

function stripLocale(pathname: string): string {
  const explicit = localeFromPath(pathname);
  if (!explicit) return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${explicit}(?=/|$)`), "");
  return stripped || "/";
}

function browserLanguage(): Lang {
  const saved = localStorage.getItem("rapidact-language") as Lang | null;
  if (saved && LANGS.includes(saved)) return saved;
  for (const value of navigator.languages || [navigator.language]) {
    const short = value.toLowerCase().split("-")[0] as Lang;
    if (LANGS.includes(short)) return short;
  }
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const explicit = localeFromPath(location.pathname);
  const lang = explicit || "en";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (explicit || sessionStorage.getItem("rapidact-language-routed") === "1")
      return;
    sessionStorage.setItem("rapidact-language-routed", "1");
    const detected = browserLanguage();
    if (detected !== "en") {
      navigate(
        `/${detected}${location.pathname === "/" ? "" : location.pathname}${location.search}${location.hash}`,
        { replace: true }
      );
    }
  }, [explicit, location.hash, location.pathname, location.search, navigate]);

  const value = useMemo<I18nValue>(() => {
    const path = (pathname: string) => {
      const base = stripLocale(pathname);
      return lang === "en" ? base : `/${lang}${base === "/" ? "" : base}`;
    };
    return {
      lang,
      path,
      t: key => DICTIONARIES[lang][key] || EN[key] || key,
      setLanguage: next => {
        track("language_changed", {
          previous_language: lang,
          selected_language: next,
        });
        localStorage.setItem("rapidact-language", next);
        const base = stripLocale(location.pathname);
        navigate(
          `${next === "en" ? base : `/${next}${base === "/" ? "" : base}`}${location.search}${location.hash}`
        );
      },
    };
  }, [lang, location.hash, location.pathname, location.search, navigate]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}

export function LanguageSelector() {
  const { lang, setLanguage } = useI18n();
  return (
    <label
      className="relative inline-flex h-11 items-center"
      aria-label="Language"
    >
      <span className="sr-only">Language</span>
      <select
        value={lang}
        onChange={event => setLanguage(event.target.value as Lang)}
        className="hairline ink h-11 w-[3.5rem] appearance-none rounded border bg-white py-0 pr-6 pl-2 text-[12px] font-semibold uppercase focus-visible:ring-2 focus-visible:ring-[#1f3a5f]/25 focus-visible:outline-none"
      >
        {LANGS.map(value => (
          <option key={value} value={value} title={LANG_LABELS[value]}>
            {value.toUpperCase()}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 text-[9px] text-[#6b7280]">
        ▾
      </span>
    </label>
  );
}
