/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { LANGS, LANG_LABELS, type Lang } from "@/lib/content";
import { track } from "@/lib/analytics";

type Dictionary = Record<string, string>;

const EN: Dictionary = {
  "nav.deadline": "EU AI Act Article 50 applies from 2 August 2026",
  "nav.product": "AI Act practice",
  "nav.assessment": "The assessment",
  "nav.specimen": "Specimen",
  "nav.fees": "Fees",
  "nav.tools": "Free tools",
  "nav.article": "Article 50",
  "nav.badge": "AI notice",
  "nav.guides": "Guides",
  "nav.scan": "Free scan",
  "nav.scanShort": "Scan",
  "nav.menu": "Open menu",
  "nav.language": "Language",
  "nav.request": "Start assessment",
  "nav.requestShort": "Start",
  whatsapp: "Ask on WhatsApp",
  "consent.title": "Private, measurable experience",
  "consent.body":
    "Analytics and session replay show where this journey is unclear. Form answers, payment details and document contents are never sent to analytics.",
  "consent.allow": "Allow analytics",
  "consent.essential": "Essential only",
  "hero.kicker": "EU AI Act transparency practice",
  "hero.title": "EU AI Act transparency, implemented and documented.",
  "hero.body":
    "RapidAct is a specialist Article 50 practice for companies that build, deploy or use AI. We scope the duty, publish the right notice, implement it through plugins and badges, and document the evidence.",
  "hero.price":
    "Use the free diagnostic and implementation tools, or commission the €99 specialist company assessment for the complete position and action plan.",
  "hero.scan": "Scan your website free",
  "hero.request": "Assess my company",
  "hero.specimen": "View the sample PDF",
  "hero.badgeLead": "Need the technical notice only?",
  "hero.badgeLink": "Add a clear AI-use notice",
  "hero.workflow": "Article 50 method",
  "hero.workflowStatus": "Scope to evidence",
  "hero.workflow.scan": "Diagnose",
  "hero.workflow.scanBody": "Scan public AI touchpoints",
  "hero.workflow.disclose": "Disclose",
  "hero.workflow.discloseBody": "Apply the right Article 50 notice",
  "hero.workflow.implement": "Implement",
  "hero.workflow.implementBody": "Deploy plugins and the badge",
  "hero.workflow.assess": "Assess",
  "hero.workflow.assessBody": "Document systems, duties and evidence",
  "hero.workflowFoot":
    "One specialist practice, from the first public signal to a documented company position.",
  "hero.free": "Free",
  "report.label": "Contents of the assessment",
  "report.title": "Six sections. One clear action plan.",
  "report.body":
    "A consistent, reviewable structure tailored to the systems your company operates.",
  "specialist.label": "Specialist practice",
  "specialist.title":
    "Production AI experience, grounded in governance and audit",
  "specialist.verify": "View Sami on LinkedIn",
  "specialist.role": "Founder & EU AI Act transparency specialist",
  "specialist.human":
    "Sami combines hands-on AI architecture and deployment with completed training in AI governance, risk, audit, impact assessment and ISO foundations.",
  "specialist.credential.verify": "Verify credential",
  "specialist.credential.systems-governance.title":
    "AI systems, MLOps & governance",
  "specialist.credential.systems-governance.body":
    "Completed three-course specialization in RAG/LLM architecture, MLOps/LLMOps, AI risk, audit and governance.",
  "specialist.credential.iso-foundations.title": "ISO/IEC 22989:2023",
  "specialist.credential.iso-foundations.body":
    "Completed the BSI-authorized course in AI concepts, terminology and management foundations.",
  "specialist.credential.applied-ai.title": "EU AI Act & ISO readiness",
  "specialist.credential.applied-ai.body":
    "Completed coursework in the EU AI Act, ISO 42001/23894, impact assessment, trustworthy AI and secure agent integrations.",
  "trust.commitment": "Product model",
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
  "footer.product": "How we help",
  "footer.requirements": "Requirements",
  "footer.platforms": "Platforms",
  "footer.legal": "Legal",
  "footer.company": "Registered company",
  "footer.office": "Registered office",
  "footer.contact": "Contact",
  "footer.description":
    "A specialist EU AI Act transparency practice for Article 50 scoping, notices, plugins, badges, evidence and company assessments.",
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
  "footer.advice": "Scope of service",
  "footer.house": "Companies House No.",
  "footer.copyright": "RapidAct is a trading name.",
  "footer.regulation":
    "Regulation (EU) 2024/1689, Article 50, applies from 2 August 2026",
};

const ES: Dictionary = {
  "nav.deadline":
    "El artículo 50 de la Ley de IA de la UE se aplica desde el 2 de agosto de 2026",
  "nav.product": "Práctica Ley de IA",
  "nav.assessment": "La evaluación",
  "nav.specimen": "Muestra",
  "nav.fees": "Precio",
  "nav.tools": "Herramientas gratis",
  "nav.article": "Artículo 50",
  "nav.badge": "Aviso de IA",
  "nav.guides": "Guías",
  "nav.scan": "Escaneo gratis",
  "nav.scanShort": "Escanear",
  "nav.menu": "Abrir menú",
  "nav.language": "Idioma",
  "nav.request": "Iniciar evaluación",
  "nav.requestShort": "Empezar",
  whatsapp: "Preguntar por WhatsApp",
  "consent.title": "Experiencia privada y medible",
  "consent.body":
    "La analítica y la reproducción de sesión muestran dónde se atasca el proceso. Nunca enviamos respuestas, pagos ni documentos a analítica.",
  "consent.allow": "Permitir analítica",
  "consent.essential": "Solo esencial",
  "hero.kicker": "Práctica especializada en transparencia de la Ley de IA",
  "hero.title": "Transparencia de la Ley de IA, implementada y documentada.",
  "hero.body":
    "RapidAct es una práctica especializada en el artículo 50 para empresas que crean, despliegan o utilizan IA. Determinamos la obligación, publicamos el aviso correcto, lo implementamos con plugins y distintivos y documentamos la prueba.",
  "hero.price":
    "Usa gratis las herramientas de diagnóstico e implementación o solicita por 99 € la evaluación especializada completa y su plan de acción.",
  "hero.scan": "Escanear mi web gratis",
  "hero.request": "Evaluar mi empresa",
  "hero.specimen": "Ver el PDF de muestra",
  "hero.badgeLead": "¿Solo necesitas el aviso técnico?",
  "hero.badgeLink": "Añade un aviso claro sobre el uso de IA",
  "hero.workflow": "Método artículo 50",
  "hero.workflowStatus": "Del alcance a la prueba",
  "hero.workflow.scan": "Diagnosticar",
  "hero.workflow.scanBody": "Escanear puntos de contacto públicos",
  "hero.workflow.disclose": "Comunicar",
  "hero.workflow.discloseBody": "Aplicar el aviso correcto del artículo 50",
  "hero.workflow.implement": "Implementar",
  "hero.workflow.implementBody": "Desplegar plugins y distintivo",
  "hero.workflow.assess": "Evaluar",
  "hero.workflow.assessBody": "Documentar sistemas, obligaciones y pruebas",
  "hero.workflowFoot":
    "Una práctica especializada, desde la primera señal pública hasta una posición empresarial documentada.",
  "hero.free": "Gratis",
  "report.label": "Contenido de la evaluación",
  "report.title": "Seis secciones. Un plan de acción claro.",
  "report.body":
    "Una estructura coherente y revisable, adaptada a los sistemas que utiliza tu empresa.",
  "specialist.label": "Práctica especializada",
  "specialist.title":
    "Experiencia en IA de producción, reforzada con gobernanza y auditoría",
  "specialist.verify": "Ver a Sami en LinkedIn",
  "specialist.role": "Fundador y especialista en transparencia de la Ley de IA",
  "specialist.human":
    "Sami combina arquitectura y despliegue real de IA con formación completada en gobernanza, riesgo, auditoría, evaluación de impacto y fundamentos ISO.",
  "specialist.credential.verify": "Verificar credencial",
  "specialist.credential.systems-governance.title":
    "Sistemas de IA, MLOps y gobernanza",
  "specialist.credential.systems-governance.body":
    "Especialización de tres cursos completada en RAG/LLM, MLOps/LLMOps, riesgo, auditoría y gobernanza de IA.",
  "specialist.credential.iso-foundations.title": "ISO/IEC 22989:2023",
  "specialist.credential.iso-foundations.body":
    "Curso autorizado por BSI completado sobre conceptos, terminología y fundamentos de gestión de IA.",
  "specialist.credential.applied-ai.title": "Ley de IA y preparación ISO",
  "specialist.credential.applied-ai.body":
    "Formación completada en Ley de IA, ISO 42001/23894, impacto, IA confiable e integraciones seguras de agentes.",
  "trust.commitment": "Modelo",
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
  "footer.product": "Cómo ayudamos",
  "footer.requirements": "Requisitos",
  "footer.platforms": "Plataformas",
  "footer.legal": "Legal",
  "footer.company": "Empresa registrada",
  "footer.office": "Domicilio social",
  "footer.contact": "Contacto",
  "footer.description":
    "Práctica especializada en transparencia de la Ley de IA: alcance del artículo 50, avisos, plugins, distintivos, pruebas y evaluaciones.",
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
  "footer.advice": "Alcance del servicio",
  "footer.house": "Companies House n.º",
  "footer.copyright": "RapidAct es una marca comercial.",
  "footer.regulation":
    "Reglamento (UE) 2024/1689, artículo 50, aplicable desde el 2 de agosto de 2026",
};

const DE: Dictionary = {
  "nav.deadline": "Artikel 50 des EU AI Act gilt seit 2. August 2026",
  "nav.product": "AI-Act-Praxis",
  "nav.assessment": "Bewertung",
  "nav.specimen": "Muster",
  "nav.fees": "Preis",
  "nav.tools": "Kostenlose Tools",
  "nav.article": "Artikel 50",
  "nav.badge": "KI-Hinweis",
  "nav.guides": "Leitfäden",
  "nav.scan": "Gratis-Scan",
  "nav.scanShort": "Scannen",
  "nav.menu": "Menü öffnen",
  "nav.language": "Sprache",
  "nav.request": "Bewertung starten",
  "nav.requestShort": "Start",
  whatsapp: "Per WhatsApp fragen",
  "consent.title": "Privat und messbar",
  "consent.body":
    "Analysen zeigen, wo der Ablauf unklar ist. Formulare, Zahlungen und Dokumente werden nie an Analytics gesendet.",
  "consent.allow": "Analyse erlauben",
  "consent.essential": "Nur erforderlich",
  "hero.kicker": "Fachpraxis für Transparenz nach dem EU AI Act",
  "hero.title": "AI-Act-Transparenz, umgesetzt und dokumentiert.",
  "hero.body":
    "RapidAct ist eine Fachpraxis für Artikel 50 für Unternehmen, die KI entwickeln, einsetzen oder nutzen. Wir klären die Pflicht, veröffentlichen den richtigen Hinweis, setzen Plugins und Badge um und dokumentieren die Nachweise.",
  "hero.price":
    "Nutzen Sie die Diagnose- und Umsetzungstools kostenlos oder beauftragen Sie für 99 € die vollständige Fachbewertung mit Maßnahmenplan.",
  "hero.scan": "Website kostenlos scannen",
  "hero.request": "Unternehmen bewerten",
  "hero.specimen": "Muster-PDF öffnen",
  "hero.badgeLead": "Nur den technischen Hinweis benötigt?",
  "hero.badgeLink": "Klaren KI-Hinweis hinzufügen",
  "hero.workflow": "Artikel-50-Methode",
  "hero.workflowStatus": "Von Umfang bis Nachweis",
  "hero.workflow.scan": "Diagnose",
  "hero.workflow.scanBody": "Öffentliche KI-Kontaktpunkte prüfen",
  "hero.workflow.disclose": "Offenlegen",
  "hero.workflow.discloseBody": "Passenden Artikel-50-Hinweis anwenden",
  "hero.workflow.implement": "Umsetzen",
  "hero.workflow.implementBody": "Plugins und Badge bereitstellen",
  "hero.workflow.assess": "Bewerten",
  "hero.workflow.assessBody": "Systeme, Pflichten und Nachweise dokumentieren",
  "hero.workflowFoot":
    "Eine Fachpraxis vom ersten öffentlichen Signal bis zur dokumentierten Unternehmensposition.",
  "hero.free": "Gratis",
  "report.label": "Inhalt der Bewertung",
  "report.title": "Sechs Abschnitte. Ein klarer Maßnahmenplan.",
  "report.body":
    "Eine einheitliche, prüfbare Struktur für die Systeme, die Ihr Unternehmen einsetzt.",
  "specialist.label": "Fachpraxis",
  "specialist.title":
    "Produktive KI-Erfahrung, fundiert durch Governance und Audit",
  "specialist.verify": "Sami auf LinkedIn ansehen",
  "specialist.role": "Gründer & Spezialist für AI-Act-Transparenz",
  "specialist.human":
    "Sami verbindet praktische KI-Architektur und Bereitstellung mit abgeschlossener Weiterbildung in Governance, Risiko, Audit, Folgenabschätzung und ISO-Grundlagen.",
  "specialist.credential.verify": "Nachweis öffnen",
  "specialist.credential.systems-governance.title":
    "KI-Systeme, MLOps & Governance",
  "specialist.credential.systems-governance.body":
    "Dreiteilige Spezialisierung zu RAG/LLM, MLOps/LLMOps, KI-Risiko, Audit und Governance abgeschlossen.",
  "specialist.credential.iso-foundations.title": "ISO/IEC 22989:2023",
  "specialist.credential.iso-foundations.body":
    "Von BSI autorisierter Kurs zu KI-Begriffen, Terminologie und Managementgrundlagen abgeschlossen.",
  "specialist.credential.applied-ai.title": "EU AI Act & ISO-Bereitschaft",
  "specialist.credential.applied-ai.body":
    "Weiterbildung zu EU AI Act, ISO 42001/23894, Folgenabschätzung, vertrauenswürdiger KI und sicheren Agenten.",
  "trust.commitment": "Modell",
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
  "footer.product": "Leistungen",
  "footer.requirements": "Anforderungen",
  "footer.platforms": "Plattformen",
  "footer.legal": "Rechtliches",
  "footer.company": "Eingetragenes Unternehmen",
  "footer.office": "Geschäftsanschrift",
  "footer.contact": "Kontakt",
  "footer.description":
    "Fachpraxis für AI-Act-Transparenz: Artikel-50-Scope, Hinweise, Plugins, Badges, Nachweise und Unternehmensbewertungen.",
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
  "footer.advice": "Leistungsumfang",
  "footer.house": "Companies House Nr.",
  "footer.copyright": "RapidAct ist ein Handelsname.",
  "footer.regulation":
    "Verordnung (EU) 2024/1689, Artikel 50, gilt ab 2. August 2026",
};

const FR: Dictionary = {
  "nav.deadline":
    "L’article 50 de l’AI Act européen s’applique depuis le 2 août 2026",
  "nav.product": "Pratique AI Act",
  "nav.assessment": "L’évaluation",
  "nav.specimen": "Spécimen",
  "nav.fees": "Tarif",
  "nav.tools": "Outils gratuits",
  "nav.article": "Article 50",
  "nav.badge": "Avis IA",
  "nav.guides": "Guides",
  "nav.scan": "Scan gratuit",
  "nav.scanShort": "Scanner",
  "nav.menu": "Ouvrir le menu",
  "nav.language": "Langue",
  "nav.request": "Commencer l’évaluation",
  "nav.requestShort": "Commencer",
  whatsapp: "Poser une question sur WhatsApp",
  "consent.title": "Expérience privée et mesurable",
  "consent.body":
    "L’analyse montre où le parcours manque de clarté. Formulaires, paiements et documents ne sont jamais envoyés.",
  "consent.allow": "Autoriser l’analyse",
  "consent.essential": "Essentiel seulement",
  "hero.kicker": "Pratique spécialisée en transparence de l’AI Act européen",
  "hero.title": "La transparence AI Act, mise en œuvre et documentée.",
  "hero.body":
    "RapidAct est une pratique spécialisée de l’article 50 pour les entreprises qui conçoivent, déploient ou utilisent l’IA. Nous cadrons l’obligation, publions l’avis adapté, déployons plugins et badge, puis documentons les preuves.",
  "hero.price":
    "Utilisez gratuitement les outils de diagnostic et de mise en œuvre, ou commandez l’évaluation spécialisée complète à 99 €.",
  "hero.scan": "Scanner mon site gratuitement",
  "hero.request": "Évaluer mon entreprise",
  "hero.specimen": "Voir le PDF exemple",
  "hero.badgeLead": "Besoin uniquement de la notice technique ?",
  "hero.badgeLink": "Ajouter un avis clair sur l’usage de l’IA",
  "hero.workflow": "Méthode article 50",
  "hero.workflowStatus": "Du périmètre à la preuve",
  "hero.workflow.scan": "Diagnostiquer",
  "hero.workflow.scanBody": "Scanner les points de contact IA publics",
  "hero.workflow.disclose": "Signaler",
  "hero.workflow.discloseBody": "Appliquer l’avis article 50 adapté",
  "hero.workflow.implement": "Mettre en œuvre",
  "hero.workflow.implementBody": "Déployer plugins et badge",
  "hero.workflow.assess": "Évaluer",
  "hero.workflow.assessBody": "Documenter systèmes, obligations et preuves",
  "hero.workflowFoot":
    "Une pratique spécialisée, du premier signal public à une position d’entreprise documentée.",
  "hero.free": "Gratuit",
  "report.label": "Contenu de l’évaluation",
  "report.title": "Six sections. Un plan d’action clair.",
  "report.body":
    "Une structure cohérente et vérifiable, adaptée aux systèmes utilisés par votre entreprise.",
  "specialist.label": "Pratique spécialisée",
  "specialist.title":
    "Expérience de l’IA en production, ancrée dans la gouvernance et l’audit",
  "specialist.verify": "Voir Sami sur LinkedIn",
  "specialist.role": "Fondateur et spécialiste de la transparence AI Act",
  "specialist.human":
    "Sami associe architecture et déploiement réels de l’IA à des formations achevées en gouvernance, risque, audit, analyse d’impact et fondamentaux ISO.",
  "specialist.credential.verify": "Vérifier le titre",
  "specialist.credential.systems-governance.title":
    "Systèmes IA, MLOps et gouvernance",
  "specialist.credential.systems-governance.body":
    "Spécialisation de trois cours achevée en RAG/LLM, MLOps/LLMOps, risque, audit et gouvernance IA.",
  "specialist.credential.iso-foundations.title": "ISO/IEC 22989:2023",
  "specialist.credential.iso-foundations.body":
    "Cours autorisé par BSI achevé sur les concepts, la terminologie et les bases de gestion de l’IA.",
  "specialist.credential.applied-ai.title": "AI Act et préparation ISO",
  "specialist.credential.applied-ai.body":
    "Formation achevée en AI Act, ISO 42001/23894, analyse d’impact, IA de confiance et agents sécurisés.",
  "trust.commitment": "Modèle",
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
  "footer.product": "Nos services",
  "footer.requirements": "Exigences",
  "footer.platforms": "Plateformes",
  "footer.legal": "Mentions légales",
  "footer.company": "Société enregistrée",
  "footer.office": "Siège social",
  "footer.contact": "Contact",
  "footer.description":
    "Pratique spécialisée en transparence AI Act : article 50, avis, plugins, badges, preuves et évaluations d’entreprise.",
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
  "footer.advice": "Périmètre du service",
  "footer.house": "Companies House n°",
  "footer.copyright": "RapidAct est un nom commercial.",
  "footer.regulation":
    "Règlement (UE) 2024/1689, article 50, applicable le 2 août 2026",
};

const IT: Dictionary = {
  "nav.deadline": "L’articolo 50 dell’AI Act UE si applica dal 2 agosto 2026",
  "nav.product": "Pratica AI Act",
  "nav.assessment": "La valutazione",
  "nav.specimen": "Esempio",
  "nav.fees": "Prezzo",
  "nav.tools": "Strumenti gratuiti",
  "nav.article": "Articolo 50",
  "nav.badge": "Avviso IA",
  "nav.guides": "Guide",
  "nav.scan": "Scansione gratuita",
  "nav.scanShort": "Scansiona",
  "nav.menu": "Apri menu",
  "nav.language": "Lingua",
  "nav.request": "Inizia la valutazione",
  "nav.requestShort": "Inizia",
  whatsapp: "Chiedi su WhatsApp",
  "consent.title": "Esperienza privata e misurabile",
  "consent.body":
    "L’analisi mostra dove il percorso non è chiaro. Moduli, pagamenti e documenti non vengono mai inviati.",
  "consent.allow": "Consenti analisi",
  "consent.essential": "Solo essenziale",
  "hero.kicker": "Pratica specializzata nella trasparenza dell’AI Act UE",
  "hero.title": "Trasparenza AI Act, implementata e documentata.",
  "hero.body":
    "RapidAct è una pratica specializzata nell’articolo 50 per aziende che sviluppano, distribuiscono o usano IA. Definiamo l’obbligo, pubblichiamo l’avviso corretto, implementiamo plugin e badge e documentiamo le prove.",
  "hero.price":
    "Usa gratis gli strumenti di diagnosi e implementazione oppure richiedi la valutazione specialistica completa da 99 €.",
  "hero.scan": "Scansiona gratis il sito",
  "hero.request": "Valuta la mia azienda",
  "hero.specimen": "Apri il PDF di esempio",
  "hero.badgeLead": "Ti serve solo l’avviso tecnico?",
  "hero.badgeLink": "Aggiungi un avviso chiaro sull’uso dell’IA",
  "hero.workflow": "Metodo articolo 50",
  "hero.workflowStatus": "Dal perimetro alla prova",
  "hero.workflow.scan": "Diagnosticare",
  "hero.workflow.scanBody": "Scansionare i punti di contatto IA pubblici",
  "hero.workflow.disclose": "Dichiara",
  "hero.workflow.discloseBody": "Applicare l’avviso articolo 50 corretto",
  "hero.workflow.implement": "Implementa",
  "hero.workflow.implementBody": "Distribuire plugin e badge",
  "hero.workflow.assess": "Valuta",
  "hero.workflow.assessBody": "Documentare sistemi, obblighi e prove",
  "hero.workflowFoot":
    "Una pratica specializzata, dal primo segnale pubblico a una posizione aziendale documentata.",
  "hero.free": "Gratis",
  "report.label": "Contenuto della valutazione",
  "report.title": "Sei sezioni. Un piano d’azione chiaro.",
  "report.body":
    "Una struttura coerente e verificabile, adattata ai sistemi utilizzati dalla tua azienda.",
  "specialist.label": "Pratica specializzata",
  "specialist.title":
    "Esperienza IA in produzione, fondata su governance e audit",
  "specialist.verify": "Vedi Sami su LinkedIn",
  "specialist.role": "Fondatore e specialista di trasparenza AI Act",
  "specialist.human":
    "Sami unisce architettura e distribuzione reale dell’IA a formazione completata in governance, rischio, audit, valutazione d’impatto e basi ISO.",
  "specialist.credential.verify": "Verifica credenziale",
  "specialist.credential.systems-governance.title":
    "Sistemi IA, MLOps e governance",
  "specialist.credential.systems-governance.body":
    "Specializzazione di tre corsi completata in RAG/LLM, MLOps/LLMOps, rischio, audit e governance IA.",
  "specialist.credential.iso-foundations.title": "ISO/IEC 22989:2023",
  "specialist.credential.iso-foundations.body":
    "Corso autorizzato BSI completato su concetti, terminologia e basi di gestione dell’IA.",
  "specialist.credential.applied-ai.title": "AI Act e preparazione ISO",
  "specialist.credential.applied-ai.body":
    "Formazione completata su AI Act, ISO 42001/23894, impatto, IA affidabile e integrazioni sicure di agenti.",
  "trust.commitment": "Modello",
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
  "footer.product": "Come aiutiamo",
  "footer.requirements": "Requisiti",
  "footer.platforms": "Piattaforme",
  "footer.legal": "Note legali",
  "footer.company": "Società registrata",
  "footer.office": "Sede legale",
  "footer.contact": "Contatti",
  "footer.description":
    "Pratica specializzata nella trasparenza AI Act: articolo 50, avvisi, plugin, badge, prove e valutazioni aziendali.",
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
  "footer.advice": "Ambito del servizio",
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
