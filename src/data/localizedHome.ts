import type { Lang } from "@/lib/content";
import {
  REPORT_CHAPTERS,
  REPORT_DELIVERABLES,
  REPORT_FAQS,
} from "@/data/report";

type Item = { title: string; text: string };
type Faq = { q: string; a: string };

export type HomeCopy = {
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
  statusFuture: days =>
    `Applies from 2 August 2026, in ${days} day${days === 1 ? "" : "s"}`,
  statusLive: "In force since 2 August 2026",
  heroDisclaimer:
    "Technical and organisational assessment, not legal advice. Any point requiring a legal opinion is identified for counsel.",
  prepared:
    "Prepared for your company specifically. Delivered as a written document to the address you give us, within 24–48h of payment.",
  chapters: REPORT_CHAPTERS,
  trustCommitment: "Delivered within 24–48h of payment, or refunded in full.",
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
      text: "A calm visitor notice for WordPress, Shopify and Wix through native marketplace apps, plus one script for custom sites.",
      cta: "Add the notice",
    },
  ],
  invoice:
    "An invoice is issued for every payment by Agents AI Ltd. RapidAct is not a law firm and the report is not legal advice.",
  featuresLabel: "Free tools",
  featuresTitle: "Scan your page. Publish the notice.",
  featuresIntro:
    "Check the AI signals visible on a public page, then add a clear visitor disclosure. Both tools are free.",
  features: [
    {
      title: "AI detection scanner",
      text: "Checks a URL against 52 known chatbot platforms and shows the evidence behind each match.",
    },
    {
      title: "Visitor AI disclosure",
      text: "A clear notice for interactive AI, visible wherever the interaction happens.",
    },
    {
      title: "Configurable",
      text: "Set the system, provider, wording, details URL, position and colour without rebuilding the script.",
    },
    {
      title: "Privacy-preserving",
      text: "No cookies, profiles or visitor data. The notice makes no tracking request.",
    },
    {
      title: "Platform coverage",
      text: "Native WordPress, Shopify and Wix apps bundle the notice; custom sites can use the standalone script.",
    },
    {
      title: "Implementation guides",
      text: "Specific installation and verification steps for each supported platform.",
    },
  ],
  featuresClose:
    "The notice is the straightforward half. Establishing which systems are covered and what evidence you must produce is where the assessment helps.",
  copyCode: "Add the AI-use notice",
  questionsLabel: "Questions",
  questionsTitle: "What companies ask before they pay",
  faqs: REPORT_FAQS,
};

const es: HomeCopy = {
  ...en,
  statusFuture: days =>
    `Se aplica desde el 2 de agosto de 2026, dentro de ${days} día${days === 1 ? "" : "s"}`,
  statusLive: "En vigor desde el 2 de agosto de 2026",
  heroDisclaimer:
    "RapidAct realiza evaluaciones técnicas y organizativas de cumplimiento. No es un despacho de abogados y el informe no constituye asesoramiento jurídico. Si una cuestión requiere una opinión legal, el informe lo indica y explica qué llevar a un abogado.",
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
  trustCommitment: "Entrega en 24–48 h desde el pago o reembolso íntegro.",
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
      text: "Un aviso claro para WordPress, Shopify y Wix mediante aplicaciones nativas, más un script para webs propias.",
      cta: "Añadir el aviso",
    },
  ],
  invoice:
    "Agents AI Ltd. emite factura por cada pago. RapidAct no es un despacho de abogados y el informe no es asesoramiento jurídico.",
  featuresLabel: "Herramientas gratuitas",
  featuresTitle: "Escanea tu página. Publica el aviso.",
  featuresIntro:
    "Comprueba las señales de IA visibles en una página pública y añade un aviso claro. Ambas herramientas son gratuitas.",
  features: [
    {
      title: "Escáner de detección de IA",
      text: "Comprueba una URL frente a 52 plataformas y muestra la evidencia de cada coincidencia.",
    },
    {
      title: "Aviso de IA al visitante",
      text: "Un aviso claro y visible allí donde ocurre la interacción.",
    },
    {
      title: "Configurable",
      text: "Define sistema, proveedor, texto, enlace, posición y color sin recompilar.",
    },
    {
      title: "Privado",
      text: "Sin cookies, perfiles ni datos del visitante; el aviso no rastrea.",
    },
    {
      title: "Compatible con plataformas",
      text: "Aplicaciones nativas para WordPress, Shopify y Wix; script independiente para webs propias.",
    },
    {
      title: "Guías de implementación",
      text: "Pasos concretos para cada plataforma, sin jerga jurídica ni técnica.",
    },
  ],
  featuresClose:
    "Instalar el aviso es la parte sencilla. Determinar qué sistemas están cubiertos y qué pruebas debes conservar es la parte que resuelve la evaluación.",
  copyCode: "Añadir el aviso de IA",
  questionsLabel: "Preguntas",
  questionsTitle: "Lo que preguntan las empresas antes de pagar",
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
  statusFuture: days => `Gilt ab 2. August 2026, in ${days} Tagen`,
  statusLive: "Seit 2. August 2026 in Kraft",
  heroDisclaimer:
    "RapidAct erstellt technische und organisatorische Compliance-Bewertungen. Wir sind keine Kanzlei; der Bericht ist keine Rechtsberatung. Rechtliche Fragen werden klar gekennzeichnet.",
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
    "Lieferung innerhalb von 24–48 Stunden oder vollständige Erstattung.",
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
      text: "Klarer Besucherhinweis über native WordPress-, Shopify- und Wix-Apps sowie ein Skript für eigene Websites.",
      cta: "Hinweis hinzufügen",
    },
  ],
  invoice:
    "Agents AI Ltd. stellt eine Rechnung aus. RapidAct ist keine Kanzlei; der Bericht ist keine Rechtsberatung.",
  featuresLabel: "Kostenlose Tools",
  featuresTitle: "Seite scannen. Hinweis veröffentlichen.",
  featuresIntro:
    "Prüfen Sie sichtbare KI-Signale und fügen Sie einen klaren Besucherhinweis hinzu. Beide Tools sind kostenlos.",
  features: [
    {
      title: "KI-Scanner",
      text: "Prüft 52 Plattformen und zeigt den Nachweis jeder Erkennung.",
    },
    {
      title: "Besucherhinweis",
      text: "Klarer Hinweis dort, wo die KI-Interaktion stattfindet.",
    },
    {
      title: "Konfigurierbar",
      text: "System, Anbieter, Text, Link, Position und Farbe einstellen.",
    },
    {
      title: "Datensparsam",
      text: "Keine Cookies, Profile oder Besucherdaten.",
    },
    {
      title: "Plattformübergreifend",
      text: "Native Apps für WordPress, Shopify und Wix; eigenständiges Skript für eigene Websites.",
    },
    {
      title: "Anleitungen",
      text: "Konkrete Schritte ohne Rechts- oder Technikjargon.",
    },
  ],
  featuresClose:
    "Der Hinweis ist einfach. Welche Systeme erfasst sind und welche Nachweise nötig sind, klärt die Bewertung.",
  copyCode: "KI-Hinweis hinzufügen",
  questionsLabel: "Fragen",
  questionsTitle: "Was Unternehmen vor der Zahlung fragen",
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
  statusFuture: days =>
    `Applicable le 2 août 2026, dans ${days} jour${days === 1 ? "" : "s"}`,
  statusLive: "En vigueur depuis le 2 août 2026",
  heroDisclaimer:
    "RapidAct réalise des évaluations techniques et organisationnelles. Nous ne sommes pas un cabinet d’avocats et le rapport n’est pas un avis juridique. Les questions juridiques sont signalées clairement.",
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
  trustCommitment: "Livré sous 24–48 h ou remboursé intégralement.",
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
      text: "Avis clair via des applications natives WordPress, Shopify et Wix, plus un script pour les sites personnalisés.",
      cta: "Ajouter l’avis",
    },
  ],
  invoice:
    "Agents AI Ltd. émet une facture. RapidAct n’est pas un cabinet d’avocats et le rapport n’est pas un avis juridique.",
  featuresLabel: "Outils gratuits",
  featuresTitle: "Scannez la page. Publiez la notice.",
  featuresIntro:
    "Vérifiez les signaux IA visibles puis ajoutez une notice claire. Les deux outils sont gratuits.",
  features: [
    {
      title: "Scanner IA",
      text: "Vérifie 52 plateformes et montre chaque preuve.",
    },
    {
      title: "Notice aux visiteurs",
      text: "Une notice claire là où l’interaction IA a lieu.",
    },
    {
      title: "Configurable",
      text: "Système, fournisseur, texte, lien, position et couleur.",
    },
    {
      title: "Respectueux de la vie privée",
      text: "Aucun cookie, profil ou donnée visiteur.",
    },
    {
      title: "Toutes plateformes",
      text: "Applications natives pour WordPress, Shopify et Wix ; script autonome pour les sites personnalisés.",
    },
    {
      title: "Guides",
      text: "Étapes concrètes sans jargon juridique ou technique.",
    },
  ],
  featuresClose:
    "Installer la notice est simple. L’évaluation détermine quels systèmes sont couverts et quelles preuves conserver.",
  copyCode: "Ajouter l’avis IA",
  questionsLabel: "Questions",
  questionsTitle: "Ce que les entreprises demandent avant de payer",
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
  statusFuture: days =>
    `Si applica dal 2 agosto 2026, tra ${days} giorn${days === 1 ? "o" : "i"}`,
  statusLive: "In vigore dal 2 agosto 2026",
  heroDisclaimer:
    "RapidAct realizza valutazioni tecniche e organizzative di conformità. Non è uno studio legale e il report non è consulenza giuridica. Le questioni legali vengono indicate chiaramente.",
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
  trustCommitment: "Consegna entro 24–48 ore o rimborso completo.",
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
      text: "Avviso chiaro tramite app native WordPress, Shopify e Wix, più uno script per siti personalizzati.",
      cta: "Aggiungi l’avviso",
    },
  ],
  invoice:
    "Agents AI Ltd. emette fattura. RapidAct non è uno studio legale e il report non è consulenza giuridica.",
  featuresLabel: "Strumenti gratuiti",
  featuresTitle: "Scansiona la pagina. Pubblica l’avviso.",
  featuresIntro:
    "Controlla i segnali IA visibili e aggiungi un avviso chiaro. Entrambi gli strumenti sono gratuiti.",
  features: [
    {
      title: "Scanner IA",
      text: "Controlla 52 piattaforme e mostra ogni prova.",
    },
    {
      title: "Avviso ai visitatori",
      text: "Un avviso chiaro dove avviene l’interazione IA.",
    },
    {
      title: "Configurabile",
      text: "Sistema, fornitore, testo, link, posizione e colore.",
    },
    {
      title: "Rispetta la privacy",
      text: "Nessun cookie, profilo o dato del visitatore.",
    },
    {
      title: "Tutte le piattaforme",
      text: "App native per WordPress, Shopify e Wix; script autonomo per siti personalizzati.",
    },
    { title: "Guide", text: "Passaggi concreti senza gergo legale o tecnico." },
  ],
  featuresClose:
    "Installare l’avviso è semplice. La valutazione stabilisce quali sistemi sono coperti e quali prove conservare.",
  copyCode: "Aggiungi l’avviso IA",
  questionsLabel: "Domande",
  questionsTitle: "Cosa chiedono le aziende prima di pagare",
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
