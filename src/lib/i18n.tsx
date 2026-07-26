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
  "nav.request": "Start assessment",
  "nav.requestShort": "Start",
  whatsapp: "Ask on WhatsApp",
  "consent.title": "Private, measurable experience",
  "consent.body":
    "Analytics and session replay show where this journey is unclear. Form answers, payment details and document contents are never sent to analytics.",
  "consent.allow": "Allow analytics",
  "consent.essential": "Essential only",
  "hero.kicker": "EU AI Act, Article 50",
  "hero.title": "Map your company’s AI Act duties in 24–48 hours",
  "hero.body":
    "Get a written inventory of your AI systems, their risk classifications, the notices you need and a prioritised action plan.",
  "hero.price":
    "The assessment costs €99, paid once. It reaches your inbox within 24–48h. If it does not arrive in that window, you are refunded in full.",
  "hero.request": "Start the assessment",
  "hero.specimen": "View the sample PDF",
  "hero.badgeLead": "Need the technical notice only?",
  "hero.badgeLink": "Add a clear AI-use notice",
  "report.label": "Contents of the assessment",
  "report.title": "Six sections. One clear action plan.",
  "report.body":
    "A consistent, reviewable structure tailored to the systems your company operates.",
  "specialist.label": "About us",
  "specialist.title": "Reviewed by a named specialist",
  "specialist.verify": "View Sami on LinkedIn",
  "specialist.role": "Founder, Agents AI Ltd.",
  "specialist.human":
    "Sami reviews every assessment before delivery. Follow-up questions about your assessment are included.",
  "trust.commitment": "Our commitment",
  "specimen.kicker": "Real multi-page specimen",
  "specimen.title": "Review the assessment before you buy",
  "specimen.body":
    "Open or download the eight-page sample to see the structure, depth and action plan.",
  "specimen.notice": "Illustrative specimen",
  "specimen.noticeBody":
    "Meridian Retail Group is invented. No real client information appears in this document.",
  "specimen.open": "Open full PDF",
  "specimen.download": "Download PDF",
  "specimen.pages": "8 pages · A4 PDF",
  "specimen.ctaTitle": "Get this assessment for your company",
  "specimen.ctaBody":
    "Tell us what your company runs and this is what arrives in your inbox within 24–48h. €99, charged once.",
  "cta.label": "Company assessment",
  "cta.once": "One payment per company.",
  "cta.body":
    "Get a specialist-reviewed AI inventory, system classifications, required notices and a prioritised action plan within 24–48h.",
  "cta.primary": "Start the assessment",
  "cta.secondary": "View the sample PDF",
  "cta.contents": "What you receive",
  "cta.item1": "AI inventory and system classifications",
  "cta.item2": "Article 50 duties by touchpoint",
  "cta.item3": "Recommended notice wording and placement",
  "cta.item4": "Evidence and documentation gaps",
  "cta.item5": "Prioritised actions and deadlines",
  "cta.item6": "Specialist review and follow-up questions",
  "cta.freeLead": "Need a public-page check first?",
  "cta.scan": "Scan a website",
  "cta.badgeLead": "Need the visitor notice only?",
  "cta.badge": "Install the AI notice",
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
  "nav.request": "Iniciar evaluación",
  "nav.requestShort": "Empezar",
  whatsapp: "Preguntar por WhatsApp",
  "consent.title": "Experiencia privada y medible",
  "consent.body":
    "La analítica y la reproducción de sesión muestran dónde se atasca el proceso. Nunca enviamos respuestas, pagos ni documentos a analítica.",
  "consent.allow": "Permitir analítica",
  "consent.essential": "Solo esencial",
  "hero.kicker": "Ley de IA de la UE, artículo 50",
  "hero.title": "Define las obligaciones de IA de tu empresa en 24–48 horas",
  "hero.body":
    "Recibe un inventario escrito de tus sistemas de IA, su clasificación, los avisos necesarios y un plan de acción priorizado.",
  "hero.price":
    "La evaluación cuesta 99 €, un solo pago. La recibes en 24–48 h o te devolvemos el importe.",
  "hero.request": "Iniciar la evaluación",
  "hero.specimen": "Ver el PDF de muestra",
  "hero.badgeLead": "¿Solo necesitas el aviso técnico?",
  "hero.badgeLink": "Añade un aviso claro sobre el uso de IA",
  "report.label": "Contenido de la evaluación",
  "report.title": "Seis secciones. Un plan de acción claro.",
  "report.body":
    "Una estructura coherente y revisable, adaptada a los sistemas que utiliza tu empresa.",
  "specialist.label": "Sobre nosotros",
  "specialist.title": "Revisada por un especialista identificado",
  "specialist.verify": "Ver a Sami en LinkedIn",
  "specialist.role": "Fundador, Agents AI Ltd.",
  "specialist.human":
    "Sami revisa cada evaluación antes de entregarla. Las preguntas de seguimiento sobre tu evaluación están incluidas.",
  "trust.commitment": "Nuestro compromiso",
  "specimen.kicker": "Muestra real de varias páginas",
  "specimen.title": "Revisa la evaluación antes de comprar",
  "specimen.body":
    "Abre o descarga la muestra de ocho páginas para ver la estructura, el nivel de detalle y el plan de acción.",
  "specimen.notice": "Muestra ilustrativa",
  "specimen.noticeBody":
    "Meridian Retail Group es una empresa inventada. El documento no contiene datos de clientes reales.",
  "specimen.open": "Abrir PDF completo",
  "specimen.download": "Descargar PDF",
  "specimen.pages": "8 páginas · PDF A4",
  "specimen.ctaTitle": "Recibe esta evaluación para tu empresa",
  "specimen.ctaBody":
    "Cuéntanos qué utiliza tu empresa y recibirás este documento en 24–48 h. 99 €, un solo pago.",
  "cta.label": "Evaluación de empresa",
  "cta.once": "Un solo pago por empresa.",
  "cta.body":
    "Recibe un inventario de IA revisado por un especialista, clasificaciones, avisos necesarios y un plan de acción priorizado en 24–48 h.",
  "cta.primary": "Iniciar la evaluación",
  "cta.secondary": "Ver el PDF de muestra",
  "cta.contents": "Qué recibes",
  "cta.item1": "Inventario de IA y clasificación de sistemas",
  "cta.item2": "Obligaciones del artículo 50 por punto de contacto",
  "cta.item3": "Texto y ubicación recomendados para los avisos",
  "cta.item4": "Carencias de pruebas y documentación",
  "cta.item5": "Acciones y plazos priorizados",
  "cta.item6": "Revisión del especialista y preguntas de seguimiento",
  "cta.freeLead": "¿Primero necesitas revisar una web pública?",
  "cta.scan": "Escanear una web",
  "cta.badgeLead": "¿Solo necesitas el aviso para visitantes?",
  "cta.badge": "Instalar el aviso de IA",
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
  "nav.request": "Bewertung starten",
  "nav.requestShort": "Start",
  whatsapp: "Per WhatsApp fragen",
  "consent.title": "Privat und messbar",
  "consent.body":
    "Analysen zeigen, wo der Ablauf unklar ist. Formulare, Zahlungen und Dokumente werden nie an Analytics gesendet.",
  "consent.allow": "Analyse erlauben",
  "consent.essential": "Nur erforderlich",
  "hero.kicker": "EU AI Act, Artikel 50",
  "hero.title": "Erfassen Sie Ihre KI-Pflichten innerhalb von 24–48 Stunden",
  "hero.body":
    "Sie erhalten ein schriftliches KI-Inventar, Systemklassifizierungen, erforderliche Hinweise und einen priorisierten Maßnahmenplan.",
  "hero.price":
    "Die Bewertung kostet einmalig 99 €. Sie erhalten sie innerhalb von 24–48 Stunden oder Ihr Geld zurück.",
  "hero.request": "Bewertung starten",
  "hero.specimen": "Muster-PDF öffnen",
  "hero.badgeLead": "Nur den technischen Hinweis benötigt?",
  "hero.badgeLink": "Klaren KI-Hinweis hinzufügen",
  "report.label": "Inhalt der Bewertung",
  "report.title": "Sechs Abschnitte. Ein klarer Maßnahmenplan.",
  "report.body":
    "Eine einheitliche, prüfbare Struktur für die Systeme, die Ihr Unternehmen einsetzt.",
  "specialist.label": "Über uns",
  "specialist.title": "Von einem benannten Spezialisten geprüft",
  "specialist.verify": "Sami auf LinkedIn ansehen",
  "specialist.role": "Gründer, Agents AI Ltd.",
  "specialist.human":
    "Sami prüft jede Bewertung vor der Auslieferung. Rückfragen zu Ihrer Bewertung sind inklusive.",
  "trust.commitment": "Unser Versprechen",
  "specimen.kicker": "Echtes mehrseitiges Muster",
  "specimen.title": "Prüfen Sie die Bewertung vor dem Kauf",
  "specimen.body":
    "Öffnen oder laden Sie das achtseitige Muster herunter, um Struktur, Tiefe und Maßnahmenplan zu prüfen.",
  "specimen.notice": "Illustratives Muster",
  "specimen.noticeBody":
    "Meridian Retail Group ist erfunden. Das Dokument enthält keine echten Kundendaten.",
  "specimen.open": "PDF öffnen",
  "specimen.download": "PDF herunterladen",
  "specimen.pages": "8 Seiten · A4-PDF",
  "specimen.ctaTitle": "Erhalten Sie diese Bewertung für Ihr Unternehmen",
  "specimen.ctaBody":
    "Beschreiben Sie Ihre Systeme und erhalten Sie dieses Dokument innerhalb von 24–48 Stunden. Einmalig 99 €.",
  "cta.label": "Unternehmensbewertung",
  "cta.once": "Einmalige Zahlung pro Unternehmen.",
  "cta.body":
    "Erhalten Sie in 24–48 Stunden ein geprüftes KI-Inventar, Systemklassifizierungen, erforderliche Hinweise und einen priorisierten Maßnahmenplan.",
  "cta.primary": "Bewertung starten",
  "cta.secondary": "Muster-PDF öffnen",
  "cta.contents": "Ihr Ergebnis",
  "cta.item1": "KI-Inventar und Systemklassifizierungen",
  "cta.item2": "Artikel-50-Pflichten je Kontaktpunkt",
  "cta.item3": "Empfohlener Hinweistext und Platzierung",
  "cta.item4": "Nachweis- und Dokumentationslücken",
  "cta.item5": "Priorisierte Maßnahmen und Fristen",
  "cta.item6": "Spezialistenprüfung und Rückfragen",
  "cta.freeLead": "Zuerst eine öffentliche Website prüfen?",
  "cta.scan": "Website scannen",
  "cta.badgeLead": "Nur den Besucherhinweis benötigt?",
  "cta.badge": "KI-Hinweis installieren",
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
  "nav.request": "Commencer l’évaluation",
  "nav.requestShort": "Commencer",
  whatsapp: "Poser une question sur WhatsApp",
  "consent.title": "Expérience privée et mesurable",
  "consent.body":
    "L’analyse montre où le parcours manque de clarté. Formulaires, paiements et documents ne sont jamais envoyés.",
  "consent.allow": "Autoriser l’analyse",
  "consent.essential": "Essentiel seulement",
  "hero.kicker": "AI Act européen, article 50",
  "hero.title": "Cartographiez vos obligations IA sous 24–48 heures",
  "hero.body":
    "Recevez un inventaire écrit de vos systèmes, leur classification, les mentions requises et un plan d’action priorisé.",
  "hero.price":
    "L’évaluation coûte 99 €, en un seul paiement. Vous la recevez sous 24–48 h ou êtes remboursé.",
  "hero.request": "Commencer l’évaluation",
  "hero.specimen": "Voir le PDF exemple",
  "hero.badgeLead": "Besoin uniquement de la notice technique ?",
  "hero.badgeLink": "Ajouter un avis clair sur l’usage de l’IA",
  "report.label": "Contenu de l’évaluation",
  "report.title": "Six sections. Un plan d’action clair.",
  "report.body":
    "Une structure cohérente et vérifiable, adaptée aux systèmes utilisés par votre entreprise.",
  "specialist.label": "À propos",
  "specialist.title": "Vérifiée par un spécialiste identifié",
  "specialist.verify": "Voir Sami sur LinkedIn",
  "specialist.role": "Fondateur, Agents AI Ltd.",
  "specialist.human":
    "Sami vérifie chaque évaluation avant livraison. Les questions de suivi sur votre évaluation sont incluses.",
  "trust.commitment": "Notre engagement",
  "specimen.kicker": "Vrai spécimen multipage",
  "specimen.title": "Examinez l’évaluation avant d’acheter",
  "specimen.body":
    "Ouvrez ou téléchargez l’exemple de huit pages pour vérifier sa structure, son niveau de détail et son plan d’action.",
  "specimen.notice": "Spécimen illustratif",
  "specimen.noticeBody":
    "Meridian Retail Group est fictive. Le document ne contient aucune donnée de client réel.",
  "specimen.open": "Ouvrir le PDF",
  "specimen.download": "Télécharger le PDF",
  "specimen.pages": "8 pages · PDF A4",
  "specimen.ctaTitle": "Recevez cette évaluation pour votre entreprise",
  "specimen.ctaBody":
    "Décrivez vos systèmes et recevez ce document sous 24–48 h. 99 €, en un seul paiement.",
  "cta.label": "Évaluation d’entreprise",
  "cta.once": "Un seul paiement par entreprise.",
  "cta.body":
    "Recevez sous 24–48 h un inventaire IA vérifié, les classifications, les mentions requises et un plan d’action priorisé.",
  "cta.primary": "Commencer l’évaluation",
  "cta.secondary": "Voir le PDF exemple",
  "cta.contents": "Ce que vous recevez",
  "cta.item1": "Inventaire IA et classification des systèmes",
  "cta.item2": "Obligations de l’article 50 par point de contact",
  "cta.item3": "Texte et emplacement recommandés",
  "cta.item4": "Écarts de preuve et de documentation",
  "cta.item5": "Actions et échéances prioritaires",
  "cta.item6": "Vérification du spécialiste et questions de suivi",
  "cta.freeLead": "Besoin d’abord de vérifier un site public ?",
  "cta.scan": "Scanner un site",
  "cta.badgeLead": "Besoin uniquement de l’avis visiteur ?",
  "cta.badge": "Installer l’avis IA",
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
  "nav.request": "Inizia la valutazione",
  "nav.requestShort": "Inizia",
  whatsapp: "Chiedi su WhatsApp",
  "consent.title": "Esperienza privata e misurabile",
  "consent.body":
    "L’analisi mostra dove il percorso non è chiaro. Moduli, pagamenti e documenti non vengono mai inviati.",
  "consent.allow": "Consenti analisi",
  "consent.essential": "Solo essenziale",
  "hero.kicker": "AI Act UE, articolo 50",
  "hero.title": "Mappa gli obblighi IA della tua azienda in 24–48 ore",
  "hero.body":
    "Ricevi un inventario scritto dei sistemi IA, le classificazioni, gli avvisi necessari e un piano d’azione prioritario.",
  "hero.price":
    "La valutazione costa 99 €, una sola volta. Arriva entro 24–48 ore o ricevi il rimborso.",
  "hero.request": "Inizia la valutazione",
  "hero.specimen": "Apri il PDF di esempio",
  "hero.badgeLead": "Ti serve solo l’avviso tecnico?",
  "hero.badgeLink": "Aggiungi un avviso chiaro sull’uso dell’IA",
  "report.label": "Contenuto della valutazione",
  "report.title": "Sei sezioni. Un piano d’azione chiaro.",
  "report.body":
    "Una struttura coerente e verificabile, adattata ai sistemi utilizzati dalla tua azienda.",
  "specialist.label": "Chi siamo",
  "specialist.title": "Verificata da uno specialista identificato",
  "specialist.verify": "Vedi Sami su LinkedIn",
  "specialist.role": "Fondatore, Agents AI Ltd.",
  "specialist.human":
    "Sami verifica ogni valutazione prima della consegna. Le domande di follow-up sulla valutazione sono incluse.",
  "trust.commitment": "Il nostro impegno",
  "specimen.kicker": "Esempio reale multipagina",
  "specimen.title": "Esamina la valutazione prima dell’acquisto",
  "specimen.body":
    "Apri o scarica l’esempio di otto pagine per verificarne struttura, profondità e piano d’azione.",
  "specimen.notice": "Esempio illustrativo",
  "specimen.noticeBody":
    "Meridian Retail Group è inventata. Il documento non contiene dati di clienti reali.",
  "specimen.open": "Apri PDF",
  "specimen.download": "Scarica PDF",
  "specimen.pages": "8 pagine · PDF A4",
  "specimen.ctaTitle": "Ricevi questa valutazione per la tua azienda",
  "specimen.ctaBody":
    "Descrivi i tuoi sistemi e ricevi questo documento entro 24–48 ore. 99 €, una sola volta.",
  "cta.label": "Valutazione aziendale",
  "cta.once": "Un solo pagamento per azienda.",
  "cta.body":
    "Ricevi entro 24–48 ore un inventario IA verificato, le classificazioni, gli avvisi necessari e un piano d’azione prioritario.",
  "cta.primary": "Inizia la valutazione",
  "cta.secondary": "Apri il PDF di esempio",
  "cta.contents": "Cosa ricevi",
  "cta.item1": "Inventario IA e classificazione dei sistemi",
  "cta.item2": "Obblighi dell’articolo 50 per punto di contatto",
  "cta.item3": "Testo e posizione consigliati per gli avvisi",
  "cta.item4": "Lacune nelle prove e nella documentazione",
  "cta.item5": "Azioni e scadenze prioritarie",
  "cta.item6": "Verifica dello specialista e domande di follow-up",
  "cta.freeLead": "Vuoi prima controllare un sito pubblico?",
  "cta.scan": "Scansiona un sito",
  "cta.badgeLead": "Ti serve solo l’avviso per i visitatori?",
  "cta.badge": "Installa l’avviso IA",
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
