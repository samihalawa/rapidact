import type { Lang } from "@/lib/content";

export type PartnerProfileId = "legal" | "audit" | "delivery";

type PartnerProfile = {
  id: PartnerProfileId;
  tab: string;
  title: string;
  body: string;
  next: string;
};

export type PartnersCopy = {
  seoTitle: string;
  seoDescription: string;
  footerLabel: string;
  kicker: string;
  title: string;
  body: string;
  primary: string;
  secondary: string;
  rateLabel: string;
  rateValue: string;
  rateBody: string;
  publicLabel: string;
  publicValue: string;
  publicBody: string;
  servicesLabel: string;
  servicesValue: string;
  servicesBody: string;
  noMinimum: string;
  noPortal: string;
  clientOwned: string;
  profilesKicker: string;
  profilesTitle: string;
  profilesBody: string;
  profiles: PartnerProfile[];
  stepsKicker: string;
  stepsTitle: string;
  steps: [string, string][];
  formKicker: string;
  formTitle: string;
  formBody: string;
  name: string;
  company: string;
  email: string;
  website: string;
  volume: string;
  volumeOptions: string[];
  notes: string;
  notesPlaceholder: string;
  submit: string;
  submitting: string;
  error: string;
  successTitle: string;
  successBody: string;
  bookCall: string;
  viewAssessment: string;
};

export const PARTNERS_COPY: Record<Lang, PartnersCopy> = {
  en: {
    seoTitle: "RapidAct partners | Turn AI Act work into client revenue",
    seoDescription:
      "Use the €99 RapidAct assessment as paid discovery, then keep every euro from your own legal, audit or implementation work.",
    footerLabel: "Partner with RapidAct",
    kicker: "RapidAct partner offer",
    title: "Turn one €99 assessment into your next client engagement.",
    body: "Use RapidAct as the paid first step with clients that build, deploy or use AI. We document the company position; your firm keeps the relationship and delivers the higher-value work that follows.",
    primary: "Start with one client",
    secondary: "Review the assessment",
    rateLabel: "Founding partner cost",
    rateValue: "€69",
    rateBody: "Per completed company assessment. You choose what to charge.",
    publicLabel: "Public assessment",
    publicValue: "€99",
    publicBody:
      "A clear anchor price your client can verify before proceeding.",
    servicesLabel: "Your own services",
    servicesValue: "100%",
    servicesBody:
      "RapidAct takes no share of your legal, audit, remediation or implementation fees.",
    noMinimum: "No minimum volume",
    noPortal: "No dashboard or subscription",
    clientOwned: "Your firm owns the client relationship",
    profilesKicker: "Where the margin comes from",
    profilesTitle: "One assessment. Three practical partner motions.",
    profilesBody:
      "Choose the profile closest to your firm. The assessment creates a documented starting point for the work you already sell.",
    profiles: [
      {
        id: "legal",
        tab: "Legal & privacy",
        title: "Open a scoped advisory matter",
        body: "Give clients a written AI inventory and Article 50 action plan before deeper legal interpretation, policy, contract or privacy work.",
        next: "You sell: advisory, policies, contracts and governance.",
      },
      {
        id: "audit",
        tab: "Audit & assurance",
        title: "Qualify the client before the main engagement",
        body: "Use a compact company assessment to expose systems, evidence gaps and priority actions before readiness, assurance or certification work.",
        next: "You sell: readiness, assurance and audit services.",
      },
      {
        id: "delivery",
        tab: "AI, web & managed services",
        title: "Convert findings into implementation",
        body: "Identify public AI touchpoints and required notices, then deliver the website, workflow, record-keeping and ongoing operational changes.",
        next: "You sell: implementation, maintenance and managed service.",
      },
    ],
    stepsKicker: "No programme overhead",
    stepsTitle: "From introduction to paid work in three steps.",
    steps: [
      [
        "Bring one client",
        "Send the company, the systems you know about and the questions you want answered. No minimum or partner portal.",
      ],
      [
        "RapidAct delivers",
        "We prepare the specialist company assessment within 24–48 hours for the €69 founding-partner rate.",
      ],
      [
        "You deliver the next engagement",
        "Use the findings to scope your own work. Your firm controls the relationship and keeps all of its service fees.",
      ],
    ],
    formKicker: "Start small",
    formTitle: "Bring one client or discuss the fit.",
    formBody:
      "Tell us what your firm does. We will reply personally and map the quickest first engagement—no platform onboarding.",
    name: "Your name",
    company: "Firm or company",
    email: "Work email",
    website: "Website",
    volume: "Potential AI clients",
    volumeOptions: [
      "One client now",
      "1–5 this year",
      "6–20 this year",
      "20+ this year",
    ],
    notes: "What do you want to offer your clients?",
    notesPlaceholder:
      "For example: AI governance advice for SaaS clients, ISO readiness, or website implementation.",
    submit: "Start with one client",
    submitting: "Sending…",
    error:
      "We could not save the enquiry. Book a call or email sami@rapidact.eu.",
    successTitle: "Your partner enquiry is with Sami.",
    successBody:
      "We will reply personally. If you already have a client, use the booking link to scope the first assessment now.",
    bookCall: "Book a 15-minute partner call",
    viewAssessment: "View the €99 assessment",
  },
  es: {
    seoTitle: "Partners de RapidAct | Convierte la Ley de IA en ingresos",
    seoDescription:
      "Utiliza la evaluación de RapidAct de 99 € como diagnóstico de pago y conserva todos los ingresos de tus servicios jurídicos, de auditoría o implementación.",
    footerLabel: "Colabora con RapidAct",
    kicker: "Oferta para partners de RapidAct",
    title: "Convierte una evaluación de 99 € en tu próximo encargo.",
    body: "Usa RapidAct como primer paso de pago con clientes que crean, despliegan o utilizan IA. Nosotros documentamos la posición de la empresa; tu firma conserva la relación y presta el trabajo de mayor valor.",
    primary: "Empezar con un cliente",
    secondary: "Revisar la evaluación",
    rateLabel: "Coste para partner fundador",
    rateValue: "69 €",
    rateBody:
      "Por evaluación completada. Tú decides el precio para tu cliente.",
    publicLabel: "Evaluación pública",
    publicValue: "99 €",
    publicBody: "Un precio de referencia que el cliente puede comprobar.",
    servicesLabel: "Tus propios servicios",
    servicesValue: "100 %",
    servicesBody:
      "RapidAct no participa en tus honorarios jurídicos, de auditoría, corrección o implementación.",
    noMinimum: "Sin volumen mínimo",
    noPortal: "Sin panel ni suscripción",
    clientOwned: "Tu firma conserva la relación con el cliente",
    profilesKicker: "De dónde sale el margen",
    profilesTitle: "Una evaluación. Tres modelos de colaboración.",
    profilesBody:
      "Elige el perfil más parecido a tu firma. La evaluación crea el punto de partida documentado para los servicios que ya vendes.",
    profiles: [
      {
        id: "legal",
        tab: "Legal y privacidad",
        title: "Abre un asunto de asesoramiento bien definido",
        body: "Entrega un inventario de IA y un plan del artículo 50 antes de profundizar en interpretación, políticas, contratos o privacidad.",
        next: "Tú vendes: asesoramiento, políticas, contratos y gobernanza.",
      },
      {
        id: "audit",
        tab: "Auditoría y assurance",
        title: "Cualifica al cliente antes del encargo principal",
        body: "Detecta sistemas, carencias de pruebas y acciones prioritarias antes de trabajos de preparación, aseguramiento o certificación.",
        next: "Tú vendes: preparación, aseguramiento y auditoría.",
      },
      {
        id: "delivery",
        tab: "IA, web y servicios gestionados",
        title: "Convierte los hallazgos en implementación",
        body: "Identifica puntos de contacto y avisos necesarios y ejecuta los cambios de web, procesos, registros y mantenimiento.",
        next: "Tú vendes: implementación, mantenimiento y servicio gestionado.",
      },
    ],
    stepsKicker: "Sin sobrecarga de programa",
    stepsTitle: "De la presentación al trabajo pagado en tres pasos.",
    steps: [
      [
        "Trae un cliente",
        "Envía la empresa, los sistemas conocidos y las preguntas. Sin mínimo ni portal.",
      ],
      [
        "RapidAct entrega",
        "Preparamos la evaluación especializada en 24–48 h por la tarifa fundadora de 69 €.",
      ],
      [
        "Tú prestas el siguiente servicio",
        "Usa los hallazgos para definir tu trabajo. Tu firma conserva al cliente y todos sus honorarios.",
      ],
    ],
    formKicker: "Empieza pequeño",
    formTitle: "Trae un cliente o comprueba el encaje.",
    formBody:
      "Cuéntanos qué hace tu firma. Responderemos personalmente con el primer encargo más rápido, sin onboarding de plataforma.",
    name: "Tu nombre",
    company: "Firma o empresa",
    email: "Correo profesional",
    website: "Sitio web",
    volume: "Clientes potenciales con IA",
    volumeOptions: [
      "Un cliente ahora",
      "1–5 este año",
      "6–20 este año",
      "Más de 20 este año",
    ],
    notes: "¿Qué quieres ofrecer a tus clientes?",
    notesPlaceholder:
      "Por ejemplo: gobernanza para clientes SaaS, preparación ISO o implementación web.",
    submit: "Empezar con un cliente",
    submitting: "Enviando…",
    error:
      "No hemos podido guardar la solicitud. Reserva una llamada o escribe a sami@rapidact.eu.",
    successTitle: "Sami ha recibido tu solicitud.",
    successBody:
      "Responderemos personalmente. Si ya tienes un cliente, reserva una llamada para definir la primera evaluación.",
    bookCall: "Reservar llamada de 15 minutos",
    viewAssessment: "Ver la evaluación de 99 €",
  },
  de: {
    seoTitle: "RapidAct Partner | AI-Act-Arbeit in Umsatz verwandeln",
    seoDescription:
      "Nutzen Sie das 99-€-Assessment als bezahlte Analyse und behalten Sie sämtliche Honorare Ihrer Rechts-, Prüfungs- oder Umsetzungsleistungen.",
    footerLabel: "Partner von RapidAct werden",
    kicker: "RapidAct Partnerangebot",
    title: "Machen Sie aus einem 99-€-Assessment das nächste Kundenmandat.",
    body: "Nutzen Sie RapidAct als bezahlten Einstieg für Kunden, die KI entwickeln, einsetzen oder nutzen. Wir dokumentieren die Unternehmensposition; Sie behalten die Kundenbeziehung und die höherwertige Folgearbeit.",
    primary: "Mit einem Kunden starten",
    secondary: "Assessment ansehen",
    rateLabel: "Gründungspartner-Preis",
    rateValue: "69 €",
    rateBody: "Je abgeschlossenem Assessment. Sie bestimmen Ihren Kundenpreis.",
    publicLabel: "Öffentlicher Preis",
    publicValue: "99 €",
    publicBody: "Ein klarer Referenzpreis, den Ihr Kunde prüfen kann.",
    servicesLabel: "Ihre Leistungen",
    servicesValue: "100 %",
    servicesBody:
      "RapidAct erhält keinen Anteil an Ihren Rechts-, Prüfungs-, Abhilfe- oder Umsetzungshonoraren.",
    noMinimum: "Keine Mindestmenge",
    noPortal: "Kein Portal oder Abonnement",
    clientOwned: "Die Kundenbeziehung bleibt bei Ihnen",
    profilesKicker: "Wo die Marge entsteht",
    profilesTitle: "Ein Assessment. Drei praktische Partnermodelle.",
    profilesBody:
      "Wählen Sie das passende Profil. Das Assessment schafft den dokumentierten Ausgangspunkt für Leistungen, die Sie bereits verkaufen.",
    profiles: [
      {
        id: "legal",
        tab: "Recht & Datenschutz",
        title: "Ein klar abgegrenztes Beratungsmandat eröffnen",
        body: "Liefern Sie KI-Inventar und Artikel-50-Plan vor vertiefter Rechtsauslegung, Richtlinien-, Vertrags- oder Datenschutzarbeit.",
        next: "Sie verkaufen: Beratung, Richtlinien, Verträge und Governance.",
      },
      {
        id: "audit",
        tab: "Prüfung & Assurance",
        title: "Kunden vor dem Hauptauftrag qualifizieren",
        body: "Ermitteln Sie Systeme, Nachweislücken und Prioritäten vor Readiness-, Assurance- oder Zertifizierungsleistungen.",
        next: "Sie verkaufen: Readiness, Assurance und Prüfung.",
      },
      {
        id: "delivery",
        tab: "KI, Web & Managed Services",
        title: "Feststellungen in Umsetzung verwandeln",
        body: "Erkennen Sie öffentliche KI-Kontaktpunkte und Hinweise und setzen Sie Website-, Prozess-, Nachweis- und Betriebsänderungen um.",
        next: "Sie verkaufen: Umsetzung, Wartung und Managed Service.",
      },
    ],
    stepsKicker: "Kein Programmaufwand",
    stepsTitle: "In drei Schritten vom Kontakt zum bezahlten Auftrag.",
    steps: [
      [
        "Einen Kunden einbringen",
        "Senden Sie Unternehmen, bekannte Systeme und Fragen. Ohne Mindestmenge oder Partnerportal.",
      ],
      [
        "RapidAct liefert",
        "Wir erstellen das Assessment in 24–48 Stunden zum Gründungspartner-Preis von 69 €.",
      ],
      [
        "Sie liefern den Folgeauftrag",
        "Nutzen Sie die Ergebnisse zur Abgrenzung Ihrer Arbeit und behalten Sie alle eigenen Honorare.",
      ],
    ],
    formKicker: "Klein anfangen",
    formTitle: "Bringen Sie einen Kunden mit oder prüfen Sie die Passung.",
    formBody:
      "Beschreiben Sie Ihr Unternehmen. Wir antworten persönlich mit dem schnellsten ersten Auftrag—ohne Plattform-Onboarding.",
    name: "Ihr Name",
    company: "Kanzlei oder Unternehmen",
    email: "Geschäftliche E-Mail",
    website: "Website",
    volume: "Potenzielle KI-Kunden",
    volumeOptions: [
      "Ein Kunde jetzt",
      "1–5 dieses Jahr",
      "6–20 dieses Jahr",
      "Mehr als 20 dieses Jahr",
    ],
    notes: "Was möchten Sie Ihren Kunden anbieten?",
    notesPlaceholder:
      "Zum Beispiel KI-Governance für SaaS, ISO-Readiness oder Website-Umsetzung.",
    submit: "Mit einem Kunden starten",
    submitting: "Wird gesendet…",
    error:
      "Die Anfrage konnte nicht gespeichert werden. Buchen Sie einen Termin oder schreiben Sie an sami@rapidact.eu.",
    successTitle: "Sami hat Ihre Partneranfrage erhalten.",
    successBody:
      "Wir antworten persönlich. Wenn Sie bereits einen Kunden haben, buchen Sie jetzt die kurze Abstimmung.",
    bookCall: "15-minütiges Partnergespräch buchen",
    viewAssessment: "99-€-Assessment ansehen",
  },
  fr: {
    seoTitle: "Partenaires RapidAct | Transformer l’AI Act en revenus",
    seoDescription:
      "Utilisez l’évaluation RapidAct à 99 € comme diagnostic payant et conservez tous les honoraires de vos services juridiques, d’audit ou de mise en œuvre.",
    footerLabel: "Devenir partenaire RapidAct",
    kicker: "Offre partenaires RapidAct",
    title: "Transformez une évaluation à 99 € en prochaine mission client.",
    body: "Utilisez RapidAct comme première étape payante pour les clients qui développent, déploient ou utilisent l’IA. Nous documentons la position de l’entreprise ; votre cabinet garde la relation et réalise la mission à plus forte valeur.",
    primary: "Commencer avec un client",
    secondary: "Voir l’évaluation",
    rateLabel: "Tarif partenaire fondateur",
    rateValue: "69 €",
    rateBody: "Par évaluation terminée. Vous fixez le prix facturé au client.",
    publicLabel: "Prix public",
    publicValue: "99 €",
    publicBody: "Un prix de référence clair que votre client peut vérifier.",
    servicesLabel: "Vos propres services",
    servicesValue: "100 %",
    servicesBody:
      "RapidAct ne prend aucune part de vos honoraires juridiques, d’audit, de correction ou de mise en œuvre.",
    noMinimum: "Aucun volume minimum",
    noPortal: "Aucun portail ni abonnement",
    clientOwned: "Vous gardez la relation client",
    profilesKicker: "D’où vient la marge",
    profilesTitle: "Une évaluation. Trois modèles partenaires concrets.",
    profilesBody:
      "Choisissez le profil le plus proche. L’évaluation crée un point de départ documenté pour les services que vous vendez déjà.",
    profiles: [
      {
        id: "legal",
        tab: "Droit et vie privée",
        title: "Ouvrir une mission de conseil bien cadrée",
        body: "Donnez au client un inventaire IA et un plan Article 50 avant l’interprétation juridique, les politiques, contrats ou travaux de confidentialité.",
        next: "Vous vendez : conseil, politiques, contrats et gouvernance.",
      },
      {
        id: "audit",
        tab: "Audit et assurance",
        title: "Qualifier le client avant la mission principale",
        body: "Identifiez systèmes, lacunes de preuve et priorités avant les travaux de préparation, d’assurance ou de certification.",
        next: "Vous vendez : préparation, assurance et audit.",
      },
      {
        id: "delivery",
        tab: "IA, web et services gérés",
        title: "Transformer les constats en mise en œuvre",
        body: "Repérez les points de contact IA et les mentions nécessaires, puis réalisez les changements web, processus, preuves et maintenance.",
        next: "Vous vendez : mise en œuvre, maintenance et service géré.",
      },
    ],
    stepsKicker: "Aucune lourdeur de programme",
    stepsTitle: "De l’introduction à la mission payante en trois étapes.",
    steps: [
      [
        "Apportez un client",
        "Envoyez l’entreprise, les systèmes connus et les questions. Aucun minimum ni portail.",
      ],
      [
        "RapidAct livre",
        "Nous préparons l’évaluation sous 24–48 h au tarif partenaire fondateur de 69 €.",
      ],
      [
        "Vous réalisez la mission suivante",
        "Utilisez les constats pour cadrer votre travail. Vous gardez la relation et tous vos honoraires.",
      ],
    ],
    formKicker: "Commencer simplement",
    formTitle: "Apportez un client ou vérifiez l’adéquation.",
    formBody:
      "Décrivez votre activité. Nous répondrons personnellement avec la première mission la plus rapide—sans onboarding de plateforme.",
    name: "Votre nom",
    company: "Cabinet ou entreprise",
    email: "E-mail professionnel",
    website: "Site web",
    volume: "Clients IA potentiels",
    volumeOptions: [
      "Un client maintenant",
      "1–5 cette année",
      "6–20 cette année",
      "Plus de 20 cette année",
    ],
    notes: "Que souhaitez-vous proposer à vos clients ?",
    notesPlaceholder:
      "Par exemple : gouvernance IA pour SaaS, préparation ISO ou mise en œuvre web.",
    submit: "Commencer avec un client",
    submitting: "Envoi…",
    error:
      "La demande n’a pas pu être enregistrée. Réservez un appel ou écrivez à sami@rapidact.eu.",
    successTitle: "Sami a reçu votre demande partenaire.",
    successBody:
      "Nous répondrons personnellement. Si vous avez déjà un client, réservez l’échange pour cadrer la première évaluation.",
    bookCall: "Réserver un appel partenaire de 15 minutes",
    viewAssessment: "Voir l’évaluation à 99 €",
  },
  it: {
    seoTitle: "Partner RapidAct | Trasforma l’AI Act in ricavi",
    seoDescription:
      "Usa la valutazione RapidAct da 99 € come analisi a pagamento e conserva tutti i compensi dei tuoi servizi legali, di audit o implementazione.",
    footerLabel: "Diventa partner RapidAct",
    kicker: "Offerta partner RapidAct",
    title: "Trasforma una valutazione da 99 € nel prossimo incarico cliente.",
    body: "Usa RapidAct come primo passo a pagamento con clienti che sviluppano, distribuiscono o usano IA. Noi documentiamo la posizione aziendale; il tuo studio conserva il rapporto e realizza il lavoro a maggior valore.",
    primary: "Inizia con un cliente",
    secondary: "Vedi la valutazione",
    rateLabel: "Costo partner fondatore",
    rateValue: "69 €",
    rateBody: "Per valutazione completata. Decidi tu il prezzo al cliente.",
    publicLabel: "Prezzo pubblico",
    publicValue: "99 €",
    publicBody: "Un prezzo di riferimento chiaro e verificabile dal cliente.",
    servicesLabel: "I tuoi servizi",
    servicesValue: "100%",
    servicesBody:
      "RapidAct non trattiene alcuna parte dei compensi legali, di audit, correzione o implementazione.",
    noMinimum: "Nessun volume minimo",
    noPortal: "Nessun portale o abbonamento",
    clientOwned: "Il rapporto con il cliente resta tuo",
    profilesKicker: "Da dove nasce il margine",
    profilesTitle: "Una valutazione. Tre modelli partner concreti.",
    profilesBody:
      "Scegli il profilo più vicino al tuo studio. La valutazione crea il punto di partenza documentato per i servizi che già vendi.",
    profiles: [
      {
        id: "legal",
        tab: "Legale e privacy",
        title: "Apri un incarico di consulenza ben definito",
        body: "Fornisci inventario IA e piano Articolo 50 prima di interpretazione legale, policy, contratti o attività privacy.",
        next: "Tu vendi: consulenza, policy, contratti e governance.",
      },
      {
        id: "audit",
        tab: "Audit e assurance",
        title: "Qualifica il cliente prima dell’incarico principale",
        body: "Individua sistemi, lacune probatorie e priorità prima di readiness, assurance o certificazione.",
        next: "Tu vendi: readiness, assurance e audit.",
      },
      {
        id: "delivery",
        tab: "IA, web e servizi gestiti",
        title: "Trasforma i risultati in implementazione",
        body: "Identifica punti di contatto IA e avvisi necessari, poi realizza modifiche web, processi, registri e manutenzione.",
        next: "Tu vendi: implementazione, manutenzione e servizio gestito.",
      },
    ],
    stepsKicker: "Nessun peso di programma",
    stepsTitle: "Dall’introduzione al lavoro pagato in tre passi.",
    steps: [
      [
        "Porta un cliente",
        "Invia azienda, sistemi noti e domande. Nessun minimo o portale.",
      ],
      [
        "RapidAct consegna",
        "Prepariamo la valutazione entro 24–48 ore alla tariffa partner di 69 €.",
      ],
      [
        "Tu svolgi l’incarico successivo",
        "Usa i risultati per definire il tuo lavoro. Conservi il cliente e tutti i compensi.",
      ],
    ],
    formKicker: "Inizia in piccolo",
    formTitle: "Porta un cliente o verifica l’idoneità.",
    formBody:
      "Descrivi la tua attività. Risponderemo personalmente con il primo incarico più rapido—senza onboarding di piattaforma.",
    name: "Il tuo nome",
    company: "Studio o azienda",
    email: "Email di lavoro",
    website: "Sito web",
    volume: "Potenziali clienti IA",
    volumeOptions: [
      "Un cliente adesso",
      "1–5 quest’anno",
      "6–20 quest’anno",
      "Più di 20 quest’anno",
    ],
    notes: "Cosa vuoi offrire ai clienti?",
    notesPlaceholder:
      "Per esempio: governance IA per SaaS, preparazione ISO o implementazione web.",
    submit: "Inizia con un cliente",
    submitting: "Invio…",
    error:
      "Non è stato possibile salvare la richiesta. Prenota una chiamata o scrivi a sami@rapidact.eu.",
    successTitle: "Sami ha ricevuto la richiesta partner.",
    successBody:
      "Risponderemo personalmente. Se hai già un cliente, prenota l’incontro per definire la prima valutazione.",
    bookCall: "Prenota una chiamata partner di 15 minuti",
    viewAssessment: "Vedi la valutazione da 99 €",
  },
};
