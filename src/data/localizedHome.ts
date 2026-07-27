import type { Lang } from "@/lib/content";
import {
  REPORT_CHAPTERS,
  REPORT_DELIVERABLES,
  REPORT_FAQS,
} from "@/data/report";

type Item = { title: string; text: string };
type Faq = { q: string; a: string };

export type HomeCopy = {
  seoTitle: string;
  seoDescription: string;
  statusFuture: (days: number) => string;
  statusLive: string;
  heroDisclaimer: string;
  prepared: string;
  chapters: Array<Item & { n: string }>;
  trustCommitment: string;
  procedureLabel: string;
  procedureTitle: string;
  stepLabel: string;
  steps: Item[];
  delayTitle: string;
  delayText: string;
  specialistBio: string;
  specialistQuestions: string;
  specialistReply: string;
  pricingLabel: string;
  pricingTitle: string;
  pricingIntro: string;
  assessmentLabel: string;
  chargedOnce: string;
  paymentLead: string;
  specimenFirst: string;
  feeCovers: string;
  deliverables: string[];
  facts: Array<[string, string]>;
  freeLabel: string;
  freeTools: Array<Item & { cta: string }>;
  invoice: string;
  featuresLabel: string;
  featuresTitle: string;
  featuresIntro: string;
  features: Item[];
  featuresClose: string;
  copyCode: string;
  questionsLabel: string;
  questionsTitle: string;
  faqs: Faq[];
};

const en: HomeCopy = {
  seoTitle: "Article 50 tools, AI notices and company assessment | RapidAct",
  seoDescription:
    "Scan public AI use, publish a clear visitor notice, follow platform implementation guides and get a specialist-reviewed company assessment when you need the complete Article 50 picture.",
  statusFuture: days =>
    `Applies from 2 August 2026, in ${days} day${days === 1 ? "" : "s"}`,
  statusLive: "In force since 2 August 2026",
  heroDisclaimer:
    "RapidAct provides technical implementation tools and specialist assessments, not legal advice. Any point requiring a legal opinion is identified for counsel.",
  prepared:
    "Prepared for your company specifically. Delivered as a written document to the address you give us, within 24–48h of payment.",
  chapters: REPORT_CHAPTERS,
  trustCommitment:
    "Scanner, notice and guides are free. The full company assessment is a one-time €99.",
  procedureLabel: "Procedure",
  procedureTitle: "From intake to action plan",
  stepLabel: "Step",
  steps: [
    {
      title: "You describe your company",
      text: "Add your business, sector, operating countries and known AI systems. Uncertain or missing systems are part of the review.",
    },
    {
      title: "We assess your case",
      text: "Your systems, website and sector are reviewed against the regulation and current guidance. Each system is classified and its obligations are stated individually.",
    },
    {
      title: "You receive the written assessment within 24–48h",
      text: "Receive the inventory, classifications and prioritised action plan. If delivery misses the window, the fee is refunded in full.",
    },
  ],
  delayTitle: "On the reports that the AI Act was delayed",
  delayText:
    "The postponement covered the high-risk rulebook: Annex III obligations moved to December 2027 and Annex I to August 2028. Article 50 transparency obligations remain on schedule from 2 August 2026. The assessment establishes which timetable and duty applies to each system.",
  specialistBio:
    "I design and deploy AI systems, so the assessment connects the regulation to the technology your company operates. Legal questions are isolated and prepared for counsel.",
  specialistQuestions: "Questions before you buy:",
  specialistReply:
    "Replies normally come the same working day, and always inside the 24–48h report window.",
  pricingLabel: "Fees",
  pricingTitle: "One fee, charged once",
  pricingIntro:
    "The tools on this site are free and remain free. The fee is for a specialist reading your case and putting the answer in writing.",
  assessmentLabel: "Assessment",
  chargedOnce: "Charged once, per company. Not a subscription.",
  paymentLead:
    "You enter and review your details before payment. Nothing is charged on this website.",
  specimenFirst: "Read a full specimen assessment first",
  feeCovers: "What the fee covers",
  deliverables: REPORT_DELIVERABLES,
  facts: [
    ["Delivery", "Within 24–48h of payment"],
    ["If we miss it", "Refunded in full"],
    ["Payment handled by", "bunq. Card details never reach us"],
  ],
  freeLabel: "Free, with or without an assessment",
  freeTools: [
    {
      title: "Website scanner",
      text: "Submit a URL and see which AI systems are detectable, checked against 52 known chatbot platforms with the evidence for each match.",
      cta: "Scan a website",
    },
    {
      title: "Clear AI-use notice",
      text: "A calm visitor notice with guided installation paths for WordPress, Shopify, Wix and custom sites.",
      cta: "Add the notice",
    },
  ],
  invoice:
    "An invoice is issued for every payment by Agents AI Ltd. RapidAct is not a law firm and the report is not legal advice.",
  featuresLabel: "How RapidAct works",
  featuresTitle: "Use one tool, or follow the complete path.",
  featuresIntro:
    "Start with a public-page check, add the visitor-facing notice, follow the implementation guidance and escalate to a whole-company assessment only when you need it.",
  features: [
    {
      title: "Discover visible AI",
      text: "Scan a public URL against 52 known chatbot platforms and inspect the evidence behind every match.",
    },
    {
      title: "Disclose it clearly",
      text: "Publish a configurable visitor notice wherever an AI interaction takes place.",
    },
    {
      title: "Implement by platform",
      text: "Follow specific WordPress, Shopify, Wix and custom-site setup and verification guidance.",
    },
    {
      title: "Assess the whole company",
      text: "Map systems, classifications, duties, evidence gaps and next actions in one specialist-reviewed document.",
    },
  ],
  featuresClose:
    "The first three steps are free. The €99 assessment is for the wider company view that a public-page scan cannot provide.",
  copyCode: "Add the AI-use notice",
  questionsLabel: "Questions",
  questionsTitle: "What companies ask before they act",
  faqs: REPORT_FAQS,
};

const es: HomeCopy = {
  ...en,
  seoTitle:
    "Herramientas del artículo 50, avisos de IA y evaluación | RapidAct",
  seoDescription:
    "Escanea el uso público de IA, publica un aviso claro, sigue guías por plataforma y solicita una evaluación completa cuando necesites revisar toda la empresa.",
  statusFuture: days =>
    `Se aplica desde el 2 de agosto de 2026, dentro de ${days} día${days === 1 ? "" : "s"}`,
  statusLive: "En vigor desde el 2 de agosto de 2026",
  heroDisclaimer:
    "RapidAct ofrece herramientas técnicas de implementación y evaluaciones especializadas, no asesoramiento jurídico. Si una cuestión requiere una opinión legal, la identificamos para asesoría.",
  prepared:
    "Preparado específicamente para tu empresa y entregado por escrito en 24–48 h desde el pago.",
  chapters: [
    {
      n: "01",
      title: "Inventario de IA",
      text: "Todos los sistemas de IA que utilizas, reunidos en un solo lugar: chatbot, textos generados, agentes de voz, modelos de puntuación y herramientas internas.",
    },
    {
      n: "02",
      title: "Clasificación de riesgo por sistema",
      text: "Cada sistema se clasifica como prohibido, de alto riesgo, sujeto solo a transparencia o fuera del ámbito.",
    },
    {
      n: "03",
      title: "Qué debes comunicar exactamente",
      text: "Qué decir, dónde mostrarlo, en qué momento y en qué idiomas para cada punto de contacto.",
    },
    {
      n: "04",
      title: "Tu posición probatoria",
      text: "Qué puede pedir un regulador, cliente o aseguradora, qué puedes aportar hoy y qué falta.",
    },
    {
      n: "05",
      title: "Plan de acción priorizado",
      text: "Las tareas ordenadas por plazo y gravedad, separando lo realmente urgente de lo que no lo es.",
    },
    {
      n: "06",
      title: "Revisión del especialista",
      text: "Conclusión sobre tu posición, la primera acción y cualquier cuestión para asesoría jurídica.",
    },
  ],
  trustCommitment:
    "Escáner, aviso y guías gratis. La evaluación completa cuesta 99 €, un solo pago.",
  procedureLabel: "Proceso",
  procedureTitle: "Qué ocurre después del pago",
  stepLabel: "Paso",
  steps: [
    {
      title: "Describes tu empresa",
      text: "Un formulario breve recoge negocio, sector, tamaño, países y la IA que conoces. Identificar lo que cuenta como IA también forma parte del trabajo.",
    },
    {
      title: "Evaluamos tu caso",
      text: "Revisamos sistemas, web y sector frente al reglamento y la guía vigente. Cada sistema recibe su clasificación y obligaciones.",
    },
    {
      title: "Recibes la evaluación en 24–48 h",
      text: "Obtienes un documento accionable para dirección o asesoría, junto con la valoración directa del especialista. Si se retrasa, reembolso íntegro.",
    },
  ],
  delayTitle: "Sobre las noticias de que la Ley de IA se retrasó",
  delayText:
    "El aplazamiento afectó a las reglas de alto riesgo: el Anexo III pasó a diciembre de 2027 y el Anexo I a agosto de 2028. La transparencia del artículo 50 mantiene el 2 de agosto de 2026. La evaluación determina qué calendario corresponde a cada sistema.",
  specialistBio:
    "Construyo y despliego sistemas de IA, por eso la evaluación la redacta alguien capaz de leer tu arquitectura además del reglamento. Si una cuestión es jurídica, el informe lo indica y prepara lo que debes consultar.",
  specialistQuestions: "Preguntas antes de comprar:",
  specialistReply:
    "Respondemos normalmente el mismo día laborable y siempre dentro del plazo de 24–48 h.",
  pricingLabel: "Precio",
  pricingTitle: "Un único precio, un solo pago",
  pricingIntro:
    "Las herramientas de esta web son y seguirán siendo gratis. Los 99 € cubren la revisión de tu caso y la respuesta escrita del especialista.",
  assessmentLabel: "Evaluación",
  chargedOnce: "Un solo pago por empresa. Sin suscripción.",
  paymentLead:
    "Primero introduces y revisas tus datos. Esta web no carga ningún importe.",
  specimenFirst: "Leer primero una evaluación completa de muestra",
  feeCovers: "Qué incluye el precio",
  deliverables: [
    "Evaluación escrita de cada sistema y artículos aplicables",
    "Clasificación de riesgo por sistema",
    "Obligaciones del artículo 50 por punto de contacto",
    "Texto exacto del aviso y ubicación",
    "Documentación y pruebas que debes poder aportar",
    "Plan priorizado con plazos",
    "Valoración escrita del especialista",
  ],
  facts: [
    ["Entrega", "En 24–48 h desde el pago"],
    ["Si nos retrasamos", "Reembolso íntegro"],
    ["Pago gestionado por", "bunq. No recibimos los datos de tu tarjeta"],
  ],
  freeLabel: "Gratis, compres o no la evaluación",
  freeTools: [
    {
      title: "Escáner de webs",
      text: "Analiza una URL frente a 52 plataformas de chatbot y muestra la prueba de cada coincidencia.",
      cta: "Escanear una web",
    },
    {
      title: "Aviso claro sobre el uso de IA",
      text: "Un aviso claro con rutas de instalación guiadas para WordPress, Shopify, Wix y webs propias.",
      cta: "Añadir el aviso",
    },
  ],
  invoice:
    "Agents AI Ltd. emite factura por cada pago. RapidAct no es un despacho de abogados y el informe no es asesoramiento jurídico.",
  featuresLabel: "Cómo funciona RapidAct",
  featuresTitle: "Usa una herramienta o sigue el proceso completo.",
  featuresIntro:
    "Empieza con una revisión pública, añade el aviso, sigue la guía de implementación y pasa a la evaluación de empresa solo cuando la necesites.",
  features: [
    {
      title: "Detecta la IA visible",
      text: "Escanea una URL pública frente a 52 plataformas y revisa la prueba de cada coincidencia.",
    },
    {
      title: "Comunícala con claridad",
      text: "Publica un aviso configurable allí donde ocurre cada interacción con IA.",
    },
    {
      title: "Implementa por plataforma",
      text: "Sigue pasos específicos para WordPress, Shopify, Wix y webs propias, incluida la verificación.",
    },
    {
      title: "Evalúa toda la empresa",
      text: "Reúne sistemas, clasificaciones, obligaciones, carencias y acciones en un documento revisado por un especialista.",
    },
  ],
  featuresClose:
    "Los tres primeros pasos son gratis. La evaluación de 99 € cubre la visión completa que un escaneo público no puede ofrecer.",
  copyCode: "Añadir el aviso de IA",
  questionsLabel: "Preguntas",
  questionsTitle: "Lo que preguntan las empresas antes de actuar",
  faqs: [
    {
      q: "¿Qué estoy pagando exactamente?",
      a: "Una evaluación escrita y específica de tu posición bajo la Ley de IA, no una plantilla ni un PDF automático.",
    },
    {
      q: "¿Cómo sé que llegará?",
      a: "La recibes en 24–48 h o se devuelve el importe. Agents AI Ltd. es una empresa británica verificable y el informe llega desde una persona a la que puedes responder.",
    },
    {
      q: "¿Sirve si ya tenemos equipo jurídico?",
      a: "Sí. El valor principal es el inventario técnico y la clasificación que el equipo jurídico puede usar directamente.",
    },
    {
      q: "¿Y si somos una empresa pequeña?",
      a: "El artículo 50 depende de lo que hace la IA, no del tamaño. Si la exposición es mínima, el informe lo dice claramente.",
    },
    {
      q: "¿Es asesoramiento jurídico?",
      a: "No. Es una evaluación técnica y organizativa. Si hace falta una opinión legal, el informe lo identifica.",
    },
    {
      q: "¿No se retrasó la Ley de IA?",
      a: "Se retrasaron partes de alto riesgo; las obligaciones de transparencia del artículo 50 mantienen el 2 de agosto de 2026.",
    },
    {
      q: "¿Qué pasa después del informe?",
      a: "Puedes actuar por tu cuenta con las herramientas gratuitas o pedir implementación. No hay suscripción.",
    },
    {
      q: "¿Qué datos necesitáis?",
      a: "Empresa, web, sector, tamaño y sistemas de IA. Se usan solo para preparar el informe.",
    },
  ],
};

const de: HomeCopy = {
  ...en,
  seoTitle:
    "Artikel-50-Tools, KI-Hinweise und Unternehmensbewertung | RapidAct",
  seoDescription:
    "Öffentliche KI-Nutzung scannen, Besucherhinweise veröffentlichen, Plattformanleitungen nutzen und bei Bedarf das gesamte Unternehmen bewerten lassen.",
  statusFuture: days => `Gilt ab 2. August 2026, in ${days} Tagen`,
  statusLive: "Seit 2. August 2026 in Kraft",
  heroDisclaimer:
    "RapidAct bietet technische Umsetzungstools und Fachbewertungen, keine Rechtsberatung. Fragen, die eine Rechtsmeinung erfordern, werden klar gekennzeichnet.",
  prepared:
    "Speziell für Ihr Unternehmen erstellt und innerhalb von 24–48 Stunden nach Zahlung schriftlich geliefert.",
  chapters: [
    {
      n: "01",
      title: "Ihr KI-Inventar",
      text: "Alle tatsächlich eingesetzten KI-Systeme an einem Ort.",
    },
    {
      n: "02",
      title: "Risikoklassifizierung je System",
      text: "Verboten, Hochrisiko, nur Transparenzpflicht oder nicht erfasst.",
    },
    {
      n: "03",
      title: "Ihre genauen Offenlegungspflichten",
      text: "Was, wo, wann und in welcher Sprache offengelegt werden muss.",
    },
    {
      n: "04",
      title: "Ihre Nachweislage",
      text: "Was Behörden oder Kunden verlangen können und welche Lücken bestehen.",
    },
    {
      n: "05",
      title: "Priorisierter Maßnahmenplan",
      text: "Aufgaben nach Frist und Schwere geordnet.",
    },
    {
      n: "06",
      title: "Prüfung durch den Spezialisten",
      text: "Fazit, erste Maßnahme und alle Fragen für die Rechtsberatung.",
    },
  ],
  trustCommitment:
    "Scanner, Hinweis und Leitfäden sind kostenlos. Die vollständige Bewertung kostet einmalig 99 €.",
  procedureLabel: "Ablauf",
  procedureTitle: "Was nach der Zahlung geschieht",
  stepLabel: "Schritt",
  steps: [
    {
      title: "Sie beschreiben Ihr Unternehmen",
      text: "Ein kurzes Formular erfasst Geschäft, Branche, Größe, Länder und bekannte KI-Systeme.",
    },
    {
      title: "Wir bewerten Ihren Fall",
      text: "Systeme, Website und Branche werden geprüft; jedes System erhält Klassifizierung und Pflichten.",
    },
    {
      title: "Sie erhalten den Bericht in 24–48 Stunden",
      text: "Ein umsetzbarer Bericht plus persönliche Einschätzung; bei Verspätung vollständige Erstattung.",
    },
  ],
  delayTitle: "Zur gemeldeten Verschiebung des AI Act",
  delayText:
    "Verschoben wurden Hochrisiko-Regeln. Die Transparenzpflichten aus Artikel 50 gelten weiter ab 2. August 2026. Der Bericht ordnet jedem System die richtige Frist zu.",
  specialistBio:
    "Ich entwickle und betreibe KI-Systeme. Daher verbindet die Bewertung technische Praxis mit dem Regelwerk und markiert klar, wann Rechtsberatung nötig ist.",
  specialistQuestions: "Fragen vor dem Kauf:",
  specialistReply:
    "Antwort normalerweise am selben Werktag, immer innerhalb von 24–48 Stunden.",
  pricingLabel: "Preis",
  pricingTitle: "Ein Preis, einmalig",
  pricingIntro:
    "Die Tools bleiben kostenlos. Die Gebühr deckt die Prüfung Ihres Falls und die schriftliche Einschätzung.",
  assessmentLabel: "Bewertung",
  chargedOnce: "Einmalig pro Unternehmen. Kein Abo.",
  paymentLead:
    "Sie prüfen Ihre Angaben vor der Zahlung. Diese Website belastet nichts.",
  specimenFirst: "Zuerst vollständiges Muster lesen",
  feeCovers: "Im Preis enthalten",
  deliverables: [
    "Bewertung jedes Systems und der einschlägigen Artikel",
    "Risikoklassifizierung je System",
    "Artikel-50-Pflichten je Kontaktpunkt",
    "Genaue Hinweistexte und Platzierung",
    "Erforderliche Dokumentation",
    "Priorisierter Fristenplan",
    "Schriftliche Facheinschätzung",
  ],
  facts: [
    ["Lieferung", "Innerhalb von 24–48 Stunden"],
    ["Bei Verspätung", "Vollständige Erstattung"],
    ["Zahlung über", "bunq. Kartendaten erreichen uns nicht"],
  ],
  freeLabel: "Kostenlos, mit oder ohne Bewertung",
  freeTools: [
    {
      title: "Website-Scanner",
      text: "Prüft eine URL gegen 52 Chatbot-Plattformen und zeigt Nachweise.",
      cta: "Website scannen",
    },
    {
      title: "Klarer KI-Nutzungshinweis",
      text: "Klarer Besucherhinweis mit geführten Installationswegen für WordPress, Shopify, Wix und eigene Websites.",
      cta: "Hinweis hinzufügen",
    },
  ],
  invoice:
    "Agents AI Ltd. stellt eine Rechnung aus. RapidAct ist keine Kanzlei; der Bericht ist keine Rechtsberatung.",
  featuresLabel: "So funktioniert RapidAct",
  featuresTitle: "Ein Tool nutzen oder dem gesamten Ablauf folgen.",
  featuresIntro:
    "Beginnen Sie mit dem öffentlichen Check, fügen Sie den Hinweis hinzu, folgen Sie der Plattformanleitung und bewerten Sie das ganze Unternehmen nur bei Bedarf.",
  features: [
    {
      title: "Sichtbare KI erkennen",
      text: "Öffentliche URL gegen 52 Plattformen prüfen und jeden Nachweis einsehen.",
    },
    {
      title: "Klar offenlegen",
      text: "Konfigurierbaren Hinweis dort veröffentlichen, wo die KI-Interaktion stattfindet.",
    },
    {
      title: "Nach Plattform umsetzen",
      text: "Konkrete Einrichtung und Prüfung für WordPress, Shopify, Wix und eigene Websites.",
    },
    {
      title: "Ganzes Unternehmen bewerten",
      text: "Systeme, Einstufungen, Pflichten, Nachweislücken und Maßnahmen in einem geprüften Dokument bündeln.",
    },
  ],
  featuresClose:
    "Die ersten drei Schritte sind kostenlos. Die 99-€-Bewertung liefert das Gesamtbild, das ein öffentlicher Scan nicht leisten kann.",
  copyCode: "KI-Hinweis hinzufügen",
  questionsLabel: "Fragen",
  questionsTitle: "Was Unternehmen vor dem Handeln fragen",
  faqs: [
    {
      q: "Wofür zahle ich 99 €?",
      a: "Für eine individuelle schriftliche Bewertung, keine Vorlage und kein automatisch erzeugtes PDF.",
    },
    {
      q: "Wie ist die Lieferung abgesichert?",
      a: "Lieferung in 24–48 Stunden oder vollständige Erstattung durch ein überprüfbares britisches Unternehmen.",
    },
    {
      q: "Nützlich mit eigener Rechtsabteilung?",
      a: "Ja. Sie erhält ein technisches Inventar und eine Klassifizierung als belastbare Arbeitsgrundlage.",
    },
    {
      q: "Gilt das für kleine Firmen?",
      a: "Artikel 50 richtet sich nach der KI-Funktion, nicht nach der Unternehmensgröße.",
    },
    {
      q: "Ist das Rechtsberatung?",
      a: "Nein. Rechtliche Fragen werden identifiziert und für die Beratung vorbereitet.",
    },
    {
      q: "Wurde der AI Act nicht verschoben?",
      a: "Nur Teile der Hochrisiko-Regeln; Artikel 50 bleibt im Zeitplan.",
    },
    {
      q: "Was folgt danach?",
      a: "Sie setzen selbst um oder beauftragen Hilfe. Es gibt kein Abo.",
    },
    {
      q: "Welche Daten werden benötigt?",
      a: "Unternehmen, Website, Branche, Größe und KI-Systeme – nur für den Bericht.",
    },
  ],
};

const fr: HomeCopy = {
  ...de,
  seoTitle:
    "Outils article 50, avis IA et évaluation d’entreprise | RapidAct",
  seoDescription:
    "Scannez l’IA visible, publiez un avis clair, suivez les guides par plateforme et demandez une évaluation complète uniquement si nécessaire.",
  statusFuture: days =>
    `Applicable le 2 août 2026, dans ${days} jour${days === 1 ? "" : "s"}`,
  statusLive: "En vigueur depuis le 2 août 2026",
  heroDisclaimer:
    "RapidAct propose des outils techniques de mise en œuvre et des évaluations spécialisées, pas des conseils juridiques. Les questions nécessitant un avis juridique sont clairement signalées.",
  prepared:
    "Rédigé pour votre entreprise et livré par écrit sous 24–48 h après paiement.",
  chapters: [
    {
      n: "01",
      title: "Votre inventaire IA",
      text: "Tous les systèmes d’IA réellement utilisés, réunis au même endroit.",
    },
    {
      n: "02",
      title: "Classification des risques",
      text: "Interdit, à haut risque, soumis à transparence ou hors champ.",
    },
    {
      n: "03",
      title: "Vos obligations exactes",
      text: "Quoi dire, où, quand et dans quelles langues.",
    },
    {
      n: "04",
      title: "Votre position probatoire",
      text: "Ce qu’un régulateur ou un client peut demander et ce qui manque.",
    },
    {
      n: "05",
      title: "Plan d’action priorisé",
      text: "Les actions classées par échéance et gravité.",
    },
    {
      n: "06",
      title: "Vérification du spécialiste",
      text: "Conclusion, première action et questions à soumettre au conseil juridique.",
    },
  ],
  trustCommitment:
    "Scanner, avis et guides gratuits. L’évaluation complète coûte 99 €, une seule fois.",
  procedureLabel: "Procédure",
  procedureTitle: "Ce qui se passe après le paiement",
  stepLabel: "Étape",
  steps: [
    {
      title: "Vous décrivez votre entreprise",
      text: "Un court formulaire couvre activité, secteur, taille, pays et IA connues.",
    },
    {
      title: "Nous évaluons votre cas",
      text: "Systèmes, site et secteur sont examinés; chaque système reçoit sa classification et ses obligations.",
    },
    {
      title: "Vous recevez le rapport sous 24–48 h",
      text: "Un document actionnable et l’avis direct du spécialiste; remboursement intégral en cas de retard.",
    },
  ],
  delayTitle: "À propos du report annoncé de l’AI Act",
  delayText:
    "Le report concerne les règles à haut risque. Les obligations de transparence de l’article 50 restent applicables le 2 août 2026. Le rapport attribue le bon calendrier à chaque système.",
  specialistBio:
    "Je conçois et déploie des systèmes d’IA. L’évaluation relie donc la réalité technique au règlement et indique clairement quand un avis juridique est nécessaire.",
  specialistQuestions: "Questions avant l’achat :",
  specialistReply:
    "Réponse généralement le jour ouvré même, toujours sous 24–48 h.",
  pricingLabel: "Tarif",
  pricingTitle: "Un prix, une seule fois",
  pricingIntro:
    "Les outils restent gratuits. Les 99 € couvrent l’étude de votre cas et la réponse écrite.",
  assessmentLabel: "Évaluation",
  chargedOnce: "Paiement unique par entreprise. Sans abonnement.",
  paymentLead:
    "Vous vérifiez vos informations avant paiement. Aucun débit n’a lieu sur ce site.",
  specimenFirst: "Lire d’abord le spécimen complet",
  feeCovers: "Ce que couvre le prix",
  deliverables: [
    "Évaluation de chaque système et articles applicables",
    "Classification des risques",
    "Obligations de l’article 50 par point de contact",
    "Texte exact et emplacement des notices",
    "Documents et preuves à conserver",
    "Plan d’action priorisé",
    "Avis écrit du spécialiste",
  ],
  facts: [
    ["Livraison", "Sous 24–48 h après paiement"],
    ["En cas de retard", "Remboursement intégral"],
    ["Paiement par", "bunq. Nous ne recevons pas vos données de carte"],
  ],
  freeLabel: "Gratuit, avec ou sans évaluation",
  freeTools: [
    {
      title: "Scanner de site",
      text: "Vérifie une URL sur 52 plateformes et montre les preuves.",
      cta: "Scanner un site",
    },
    {
      title: "Avis clair sur l’usage de l’IA",
      text: "Avis clair avec des parcours d’installation guidés pour WordPress, Shopify, Wix et les sites personnalisés.",
      cta: "Ajouter l’avis",
    },
  ],
  invoice:
    "Agents AI Ltd. émet une facture. RapidAct n’est pas un cabinet d’avocats et le rapport n’est pas un avis juridique.",
  featuresLabel: "Comment fonctionne RapidAct",
  featuresTitle: "Utilisez un outil ou suivez le parcours complet.",
  featuresIntro:
    "Commencez par le contrôle public, ajoutez l’avis, suivez le guide d’installation et passez à l’évaluation globale uniquement si nécessaire.",
  features: [
    {
      title: "Détecter l’IA visible",
      text: "Scannez une URL publique sur 52 plateformes et consultez chaque preuve.",
    },
    {
      title: "La signaler clairement",
      text: "Publiez un avis configurable là où chaque interaction IA se produit.",
    },
    {
      title: "Mettre en œuvre par plateforme",
      text: "Suivez les étapes propres à WordPress, Shopify, Wix et aux sites personnalisés, vérification comprise.",
    },
    {
      title: "Évaluer toute l’entreprise",
      text: "Rassemblez systèmes, classifications, obligations, lacunes et actions dans un document vérifié.",
    },
  ],
  featuresClose:
    "Les trois premières étapes sont gratuites. L’évaluation à 99 € apporte la vue d’ensemble qu’un scan public ne peut pas fournir.",
  copyCode: "Ajouter l’avis IA",
  questionsLabel: "Questions",
  questionsTitle: "Ce que les entreprises demandent avant d’agir",
  faqs: [
    {
      q: "Que couvrent exactement les 99 € ?",
      a: "Une évaluation écrite propre à votre entreprise, pas un modèle ou un PDF automatique.",
    },
    {
      q: "Comment la livraison est-elle garantie ?",
      a: "Sous 24–48 h ou remboursement intégral par une société britannique vérifiable.",
    },
    {
      q: "Utile avec une équipe juridique ?",
      a: "Oui. Elle reçoit l’inventaire technique et la classification nécessaires.",
    },
    {
      q: "Et pour une petite entreprise ?",
      a: "L’article 50 dépend de la fonction de l’IA, pas de la taille.",
    },
    {
      q: "Est-ce un avis juridique ?",
      a: "Non. Les points juridiques sont identifiés et préparés pour votre conseil.",
    },
    {
      q: "L’AI Act n’a-t-il pas été reporté ?",
      a: "Seules certaines règles à haut risque; l’article 50 reste au calendrier.",
    },
    {
      q: "Que se passe-t-il ensuite ?",
      a: "Vous agissez seul ou demandez une mise en œuvre. Aucun abonnement.",
    },
    {
      q: "Quelles données sont nécessaires ?",
      a: "Entreprise, site, secteur, taille et systèmes IA, uniquement pour le rapport.",
    },
  ],
};

const it: HomeCopy = {
  ...fr,
  seoTitle:
    "Strumenti articolo 50, avvisi IA e valutazione aziendale | RapidAct",
  seoDescription:
    "Scansiona l’IA visibile, pubblica un avviso chiaro, segui le guide per piattaforma e richiedi la valutazione completa solo quando serve.",
  statusFuture: days =>
    `Si applica dal 2 agosto 2026, tra ${days} giorn${days === 1 ? "o" : "i"}`,
  statusLive: "In vigore dal 2 agosto 2026",
  heroDisclaimer:
    "RapidAct offre strumenti tecnici di implementazione e valutazioni specialistiche, non consulenza legale. Le questioni che richiedono un parere giuridico vengono indicate chiaramente.",
  prepared:
    "Preparato per la tua azienda e consegnato per iscritto entro 24–48 ore dal pagamento.",
  chapters: [
    {
      n: "01",
      title: "Inventario IA",
      text: "Tutti i sistemi di IA realmente usati, riuniti in un unico documento.",
    },
    {
      n: "02",
      title: "Classificazione del rischio",
      text: "Vietato, ad alto rischio, soggetto a trasparenza o fuori ambito.",
    },
    {
      n: "03",
      title: "Obblighi esatti di trasparenza",
      text: "Cosa dire, dove, quando e in quali lingue.",
    },
    {
      n: "04",
      title: "Posizione documentale",
      text: "Cosa possono chiedere autorità o clienti e quali prove mancano.",
    },
    {
      n: "05",
      title: "Piano d’azione prioritario",
      text: "Attività ordinate per scadenza e gravità.",
    },
    {
      n: "06",
      title: "Verifica dello specialista",
      text: "Conclusione, prima azione e domande da sottoporre al consulente legale.",
    },
  ],
  trustCommitment:
    "Scanner, avviso e guide sono gratuiti. La valutazione completa costa 99 €, una sola volta.",
  procedureLabel: "Procedura",
  procedureTitle: "Cosa accade dopo il pagamento",
  stepLabel: "Fase",
  steps: [
    {
      title: "Descrivi la tua azienda",
      text: "Un breve modulo raccoglie attività, settore, dimensioni, paesi e IA conosciute.",
    },
    {
      title: "Valutiamo il caso",
      text: "Sistemi, sito e settore vengono analizzati; ogni sistema riceve classificazione e obblighi.",
    },
    {
      title: "Ricevi il report in 24–48 ore",
      text: "Un documento operativo e il parere diretto dello specialista; rimborso completo in caso di ritardo.",
    },
  ],
  delayTitle: "Sulle notizie del rinvio dell’AI Act",
  delayText:
    "Il rinvio riguarda le regole ad alto rischio. Gli obblighi di trasparenza dell’articolo 50 restano fissati al 2 agosto 2026. Il report assegna il calendario corretto a ogni sistema.",
  specialistBio:
    "Progetto e distribuisco sistemi di IA. La valutazione collega quindi la realtà tecnica al regolamento e indica quando serve un parere legale.",
  specialistQuestions: "Domande prima dell’acquisto:",
  specialistReply:
    "Risposta normalmente nello stesso giorno lavorativo, sempre entro 24–48 ore.",
  pricingLabel: "Prezzo",
  pricingTitle: "Un prezzo, una sola volta",
  pricingIntro:
    "Gli strumenti restano gratuiti. I 99 € coprono l’analisi del caso e la risposta scritta.",
  assessmentLabel: "Valutazione",
  chargedOnce: "Pagamento unico per azienda. Nessun abbonamento.",
  paymentLead:
    "Inserisci e controlli i dati prima del pagamento. Il sito non effettua addebiti.",
  specimenFirst: "Leggi prima il report completo di esempio",
  feeCovers: "Cosa include il prezzo",
  deliverables: [
    "Valutazione di ogni sistema e articoli applicabili",
    "Classificazione del rischio",
    "Obblighi dell’articolo 50 per punto di contatto",
    "Testo e posizione esatti degli avvisi",
    "Documenti e prove da conservare",
    "Piano d’azione prioritario",
    "Valutazione scritta dello specialista",
  ],
  facts: [
    ["Consegna", "Entro 24–48 ore dal pagamento"],
    ["In caso di ritardo", "Rimborso completo"],
    ["Pagamento tramite", "bunq. Non riceviamo i dati della carta"],
  ],
  freeLabel: "Gratis, con o senza valutazione",
  freeTools: [
    {
      title: "Scanner del sito",
      text: "Verifica un URL su 52 piattaforme e mostra le prove.",
      cta: "Scansiona un sito",
    },
    {
      title: "Avviso chiaro sull’uso dell’IA",
      text: "Avviso chiaro con percorsi di installazione guidati per WordPress, Shopify, Wix e siti personalizzati.",
      cta: "Aggiungi l’avviso",
    },
  ],
  invoice:
    "Agents AI Ltd. emette fattura. RapidAct non è uno studio legale e il report non è consulenza giuridica.",
  featuresLabel: "Come funziona RapidAct",
  featuresTitle: "Usa un singolo strumento o segui l’intero percorso.",
  featuresIntro:
    "Inizia dal controllo pubblico, aggiungi l’avviso, segui la guida di implementazione e passa alla valutazione aziendale solo quando serve.",
  features: [
    {
      title: "Rileva l’IA visibile",
      text: "Scansiona un URL pubblico su 52 piattaforme e consulta ogni prova.",
    },
    {
      title: "Dichiarala con chiarezza",
      text: "Pubblica un avviso configurabile dove avviene ogni interazione IA.",
    },
    {
      title: "Implementa per piattaforma",
      text: "Segui istruzioni specifiche per WordPress, Shopify, Wix e siti personalizzati, inclusa la verifica.",
    },
    {
      title: "Valuta tutta l’azienda",
      text: "Riunisci sistemi, classificazioni, obblighi, lacune e azioni in un documento verificato.",
    },
  ],
  featuresClose:
    "I primi tre passaggi sono gratuiti. La valutazione da 99 € offre il quadro completo che una scansione pubblica non può fornire.",
  copyCode: "Aggiungi l’avviso IA",
  questionsLabel: "Domande",
  questionsTitle: "Cosa chiedono le aziende prima di agire",
  faqs: [
    {
      q: "Cosa coprono esattamente i 99 €?",
      a: "Una valutazione scritta specifica, non un modello o un PDF automatico.",
    },
    {
      q: "Come è garantita la consegna?",
      a: "Entro 24–48 ore o rimborso completo da una società britannica verificabile.",
    },
    {
      q: "È utile con un team legale?",
      a: "Sì. Offre l’inventario tecnico e la classificazione su cui lavorare.",
    },
    {
      q: "E per una piccola azienda?",
      a: "L’articolo 50 dipende dalla funzione dell’IA, non dalle dimensioni.",
    },
    {
      q: "È consulenza legale?",
      a: "No. I punti giuridici vengono identificati e preparati per il legale.",
    },
    {
      q: "L’AI Act non è stato rinviato?",
      a: "Solo alcune regole ad alto rischio; l’articolo 50 resta in calendario.",
    },
    {
      q: "Cosa succede dopo?",
      a: "Puoi procedere da solo o chiedere implementazione. Nessun abbonamento.",
    },
    {
      q: "Quali dati servono?",
      a: "Azienda, sito, settore, dimensioni e sistemi IA, solo per il report.",
    },
  ],
};

export const HOME_COPY: Record<Lang, HomeCopy> = { en, es, de, fr, it };
