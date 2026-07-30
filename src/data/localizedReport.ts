import type { Lang } from "@/lib/content";

type Option = { value: string; label: string };

export type ReportCopy = {
  seoTitle: string;
  seoDescription: string;
  step1: string;
  intakeTitle: string;
  intakeBody: string;
  company: string;
  email: string;
  invalidEmail: string;
  website: string;
  countries: string;
  countriesPlaceholder: string;
  optionalContext: string;
  optionalContextHint: string;
  size: string;
  sizeNote: string;
  sector: string;
  systems: string;
  notes: string;
  notesPlaceholder: string;
  sendError: string;
  continue: string;
  continuing: string;
  noCharge: string;
  buying: string;
  chargedOnce: string;
  specimen: string;
  soldBy: string;
  verifyCompany: string;
  deliveryPromise: string;
  questionsBefore: string;
  technicalNotice: string;
  bookCall: string;
  step2: string;
  recordedTitle: string;
  recordedBody: string;
  reference: string;
  copy: string;
  copied: string;
  referenceHelp: string;
  pay: string;
  paymentPrivacy: string;
  paidTo: string;
  registeredOffice: string;
  next: string;
  nextSteps: [string, string][];
  refundTitle: string;
  refundBody: string;
  change: string;
  sectors: Option[];
  systemsList: Option[];
};

const sectorValues = [
  "E-commerce / retail",
  "SaaS / software",
  "Healthcare",
  "Finance / insurance",
  "Legal / professional services",
  "Education",
  "Travel / hospitality",
  "Manufacturing / industry",
  "Public sector",
  "Other",
];

const systemValues = [
  "Customer-facing chatbot",
  "AI-generated text or copy",
  "AI-generated images or video",
  "Voice AI or phone agents",
  "Recommendation or ranking engine",
  "AI in hiring or HR",
  "AI scoring or profiling of people",
  "Internal AI tools only",
  "Not sure, that is what I need assessed",
];

const options = (values: string[], labels = values): Option[] =>
  values.map((value, index) => ({ value, label: labels[index] }));

export const REPORT_COPY: Record<Lang, ReportCopy> = {
  en: {
    seoTitle: "EU AI Act assessment, €99 | RapidAct",
    seoDescription:
      "Tell us about your company and the AI you use. Your complete assessment reaches your inbox within 24–48 hours.",
    step1: "Step 1 of 2",
    intakeTitle: "Start your company assessment",
    intakeBody:
      "Start with your company name and work email. Add any useful context only if you have it.",
    company: "Company name",
    email: "Work email",
    invalidEmail: "Enter a valid email address.",
    website: "Website",
    countries: "Countries you operate in",
    countriesPlaceholder: "Spain, Germany, UK",
    optionalContext: "Add more context",
    optionalContextHint:
      "Optional: website, known AI, countries, size, sector and anything you want us to examine.",
    size: "Company size",
    sizeNote:
      "Obligations depend on what a system does, not company size. Size affects penalty calculations, not whether the duty applies.",
    sector: "Sector",
    systems: "Which AI do you already know you use?",
    notes: "Anything specific you want assessed",
    notesPlaceholder:
      "For example: we run an AI voice agent for bookings and are unsure whether it is covered.",
    sendError:
      "Your details could not be sent. Try again, or contact us directly and we will take them by email.",
    continue: "Continue to payment · €99",
    continuing: "Saving…",
    noCharge: "No charge yet. Confirm the €99 fee and seller on the next step.",
    buying: "You are buying",
    chargedOnce: "Charged once, per company.",
    specimen: "See the full eight-page specimen",
    soldBy: "Sold by",
    verifyCompany: "Verify on Companies House",
    deliveryPromise: "Delivered within 24–48h or refunded in full.",
    questionsBefore: "Questions before you buy:",
    technicalNotice:
      "Technical and organisational assessment, not legal advice.",
    bookCall: "Book a call",
    step2: "Step 2 of 2",
    recordedTitle: "Assessment request saved — pay €99 to begin",
    recordedBody:
      "Your specialist starts after payment. The assessment is delivered to your work email within 24–48h.",
    reference: "Your reference",
    copy: "Copy",
    copied: "Copied",
    referenceHelp:
      "This code is already included in the payment description so your payment matches your submission automatically.",
    pay: "Pay €99 securely with bunq",
    paymentPrivacy:
      "Payment is processed by bunq. Card and bank details are never seen or stored by this website.",
    paidTo: "Paid to",
    registeredOffice: "Registered office",
    next: "What happens next",
    nextSteps: [
      [
        "Payment received",
        "You receive a receipt and invoice quoting your reference.",
      ],
      [
        "Your case is assessed",
        "A specialist reviews your systems, sector and website against the current regulation and guidance.",
      ],
      [
        "Assessment delivered",
        "The written document arrives within 24–48h, with follow-up questions included.",
      ],
    ],
    refundTitle: "If the assessment does not arrive, you do not pay for it.",
    refundBody:
      "Nothing in your inbox within 24–48h? Reply to your receipt and the fee is refunded in full.",
    change: "Change details",
    sectors: options(sectorValues),
    systemsList: options(systemValues),
  },
  es: {
    seoTitle: "Evaluación de la Ley de IA, 99 € | RapidAct",
    seoDescription:
      "Cuéntanos qué IA utiliza tu empresa. Recibirás la evaluación completa en 24–48 horas.",
    step1: "Paso 1 de 2",
    intakeTitle: "Inicia la evaluación de tu empresa",
    intakeBody:
      "Empieza con el nombre de la empresa y tu correo de trabajo. Añade más contexto solo si lo tienes.",
    company: "Nombre de la empresa",
    email: "Correo de trabajo",
    invalidEmail: "Introduce una dirección de correo válida.",
    website: "Sitio web",
    countries: "Países en los que operas",
    countriesPlaceholder: "España, Alemania, Reino Unido",
    optionalContext: "Añadir más contexto",
    optionalContextHint:
      "Opcional: web, IA conocidas, países, tamaño, sector y cualquier punto que quieras que revisemos.",
    size: "Tamaño de la empresa",
    sizeNote:
      "Las obligaciones dependen de lo que hace el sistema, no del tamaño. El tamaño afecta al cálculo de sanciones.",
    sector: "Sector",
    systems: "¿Qué IA sabes que utiliza tu empresa?",
    notes: "Algo específico que quieras evaluar",
    notesPlaceholder:
      "Por ejemplo: utilizamos un agente de voz para reservas y no sabemos si está cubierto.",
    sendError:
      "No se han podido enviar los datos. Inténtalo de nuevo o contáctanos y los recogeremos por correo.",
    continue: "Continuar al pago · 99 €",
    continuing: "Guardando…",
    noCharge:
      "Todavía no se cobra nada. Confirma el precio de 99 € y el vendedor en el siguiente paso.",
    buying: "Estás comprando",
    chargedOnce: "Un solo pago por empresa.",
    specimen: "Ver la muestra completa de ocho páginas",
    soldBy: "Vendido por",
    verifyCompany: "Verificar en Companies House",
    deliveryPromise: "Entrega en 24–48 h o reembolso total.",
    questionsBefore: "Preguntas antes de comprar:",
    technicalNotice:
      "Evaluación técnica y organizativa, no asesoramiento jurídico.",
    bookCall: "Reservar llamada",
    step2: "Paso 2 de 2",
    recordedTitle: "Solicitud guardada — paga 99 € para empezar",
    recordedBody:
      "El especialista comienza tras el pago. La evaluación llegará a tu correo de trabajo en 24–48 h.",
    reference: "Tu referencia",
    copy: "Copiar",
    copied: "Copiado",
    referenceHelp:
      "El código ya está incluido en el concepto de pago para vincularlo automáticamente con tu solicitud.",
    pay: "Pagar 99 € de forma segura con bunq",
    paymentPrivacy:
      "bunq procesa el pago. Esta web nunca ve ni almacena los datos bancarios o de la tarjeta.",
    paidTo: "Pago a",
    registeredOffice: "Domicilio social",
    next: "Qué ocurre después",
    nextSteps: [
      [
        "Pago recibido",
        "Recibes un justificante y una factura con tu referencia.",
      ],
      [
        "Evaluamos tu caso",
        "Un especialista revisa tus sistemas, sector y web según la normativa y guía vigentes.",
      ],
      [
        "Entrega de la evaluación",
        "El documento llega en 24–48 h e incluye preguntas de seguimiento.",
      ],
    ],
    refundTitle: "Si la evaluación no llega, no la pagas.",
    refundBody:
      "¿No está en tu bandeja en 24–48 h? Responde al recibo y te reembolsaremos el importe completo.",
    change: "Cambiar datos",
    sectors: options(sectorValues, [
      "Comercio electrónico / retail",
      "SaaS / software",
      "Sanidad",
      "Finanzas / seguros",
      "Servicios jurídicos / profesionales",
      "Educación",
      "Viajes / hostelería",
      "Fabricación / industria",
      "Sector público",
      "Otro",
    ]),
    systemsList: options(systemValues, [
      "Chatbot para clientes",
      "Texto generado por IA",
      "Imágenes o vídeo generados por IA",
      "IA de voz o agentes telefónicos",
      "Motor de recomendación o clasificación",
      "IA en selección o RR. HH.",
      "Puntuación o perfilado de personas",
      "Solo herramientas internas",
      "No lo sé; necesito que lo evaluéis",
    ]),
  },
  de: {
    seoTitle: "EU-AI-Act-Bewertung, 99 € | RapidAct",
    seoDescription:
      "Beschreiben Sie Ihr Unternehmen und seine KI. Die vollständige Bewertung kommt in 24–48 Stunden.",
    step1: "Schritt 1 von 2",
    intakeTitle: "Starten Sie Ihre Unternehmensbewertung",
    intakeBody:
      "Starten Sie mit Unternehmensname und geschäftlicher E-Mail. Weitere Angaben sind nur optional.",
    company: "Unternehmensname",
    email: "Geschäftliche E-Mail",
    invalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein.",
    website: "Website",
    countries: "Länder Ihrer Tätigkeit",
    countriesPlaceholder: "Deutschland, Spanien, UK",
    optionalContext: "Mehr Kontext hinzufügen",
    optionalContextHint:
      "Optional: Website, bekannte KI, Länder, Größe, Branche und alles, was wir gezielt prüfen sollen.",
    size: "Unternehmensgröße",
    sizeNote:
      "Pflichten richten sich nach der Funktion des Systems, nicht nach der Größe. Die Größe beeinflusst die Bußgeldberechnung.",
    sector: "Branche",
    systems: "Welche KI kennen Sie bereits im Unternehmen?",
    notes: "Was sollen wir besonders prüfen?",
    notesPlaceholder:
      "Zum Beispiel: Wir nutzen einen KI-Sprachagenten für Buchungen und kennen unsere Pflicht nicht.",
    sendError:
      "Die Angaben konnten nicht gesendet werden. Versuchen Sie es erneut oder kontaktieren Sie uns per E-Mail.",
    continue: "Weiter zur Zahlung · 99 €",
    continuing: "Speichern…",
    noCharge:
      "Hier wird nichts berechnet. Preis und Verkäufer sehen Sie vor der Zahlung.",
    buying: "Sie kaufen",
    chargedOnce: "Einmalig pro Unternehmen.",
    specimen: "Vollständiges achtseitiges Muster ansehen",
    soldBy: "Verkauft von",
    verifyCompany: "Bei Companies House prüfen",
    deliveryPromise: "Lieferung in 24–48 Std. oder volle Erstattung.",
    questionsBefore: "Fragen vor dem Kauf:",
    technicalNotice:
      "Technische und organisatorische Bewertung, keine Rechtsberatung.",
    bookCall: "Gespräch buchen",
    step2: "Schritt 2 von 2",
    recordedTitle: "Anfrage gespeichert — zahlen Sie 99 €, um zu starten",
    recordedBody:
      "Die Arbeit beginnt nach Zahlungseingang. Die Bewertung kommt in 24–48 Std. an Ihre geschäftliche E-Mail.",
    reference: "Ihre Referenz",
    copy: "Kopieren",
    copied: "Kopiert",
    referenceHelp:
      "Der Code steht bereits im Zahlungszweck und ordnet die Zahlung automatisch zu.",
    pay: "99 € sicher mit bunq bezahlen",
    paymentPrivacy:
      "bunq verarbeitet die Zahlung. Karten- und Bankdaten werden auf dieser Website weder gesehen noch gespeichert.",
    paidTo: "Zahlung an",
    registeredOffice: "Sitz",
    next: "Wie es weitergeht",
    nextSteps: [
      ["Zahlung eingegangen", "Sie erhalten Beleg und Rechnung mit Referenz."],
      [
        "Ihr Fall wird bewertet",
        "Ein Spezialist prüft Systeme, Branche und Website anhand der aktuellen Regeln.",
      ],
      [
        "Bewertung geliefert",
        "Das Dokument kommt in 24–48 Std.; Rückfragen sind enthalten.",
      ],
    ],
    refundTitle: "Kommt die Bewertung nicht, zahlen Sie nicht.",
    refundBody:
      "Nicht innerhalb von 24–48 Std. im Posteingang? Antworten Sie auf den Beleg und erhalten Sie die volle Erstattung.",
    change: "Angaben ändern",
    sectors: options(sectorValues, [
      "E-Commerce / Einzelhandel",
      "SaaS / Software",
      "Gesundheitswesen",
      "Finanzen / Versicherung",
      "Recht / professionelle Dienste",
      "Bildung",
      "Reise / Gastgewerbe",
      "Fertigung / Industrie",
      "Öffentlicher Sektor",
      "Sonstige",
    ]),
    systemsList: options(systemValues, [
      "Kunden-Chatbot",
      "KI-generierte Texte",
      "KI-generierte Bilder oder Videos",
      "Sprach-KI oder Telefonagenten",
      "Empfehlungs- oder Ranking-System",
      "KI in Recruiting oder HR",
      "Bewertung oder Profiling von Personen",
      "Nur interne KI-Tools",
      "Unsicher; genau das soll bewertet werden",
    ]),
  },
  fr: {
    seoTitle: "Évaluation de l’AI Act, 99 € | RapidAct",
    seoDescription:
      "Décrivez votre entreprise et ses IA. L’évaluation complète arrive sous 24–48 heures.",
    step1: "Étape 1 sur 2",
    intakeTitle: "Commencez l’évaluation de votre entreprise",
    intakeBody:
      "Commencez par le nom de l’entreprise et votre e-mail professionnel. Le reste est facultatif.",
    company: "Nom de l’entreprise",
    email: "E-mail professionnel",
    invalidEmail: "Saisissez une adresse e-mail valide.",
    website: "Site web",
    countries: "Pays d’activité",
    countriesPlaceholder: "France, Espagne, Allemagne",
    optionalContext: "Ajouter du contexte",
    optionalContextHint:
      "Facultatif : site, IA connues, pays, taille, secteur et tout point à examiner.",
    size: "Taille de l’entreprise",
    sizeNote:
      "Les obligations dépendent de la fonction du système, pas de la taille. La taille influe sur le calcul des sanctions.",
    sector: "Secteur",
    systems: "Quelles IA savez-vous déjà utiliser ?",
    notes: "Point particulier à évaluer",
    notesPlaceholder:
      "Par exemple : nous utilisons un agent vocal pour les réservations et ignorons s’il est couvert.",
    sendError:
      "Impossible d’envoyer vos informations. Réessayez ou contactez-nous par e-mail.",
    continue: "Continuer au paiement · 99 €",
    continuing: "Enregistrement…",
    noCharge:
      "Aucun débit ici. Le prix et le vendeur sont affichés avant le paiement.",
    buying: "Vous achetez",
    chargedOnce: "Paiement unique par entreprise.",
    specimen: "Voir le modèle complet de huit pages",
    soldBy: "Vendu par",
    verifyCompany: "Vérifier sur Companies House",
    deliveryPromise: "Livré sous 24–48 h ou remboursé.",
    questionsBefore: "Questions avant l’achat :",
    technicalNotice:
      "Évaluation technique et organisationnelle, pas un avis juridique.",
    bookCall: "Réserver un appel",
    step2: "Étape 2 sur 2",
    recordedTitle: "Demande enregistrée — payez 99 € pour commencer",
    recordedBody:
      "Le travail commence après le paiement. L’évaluation arrive à votre e-mail professionnel sous 24–48 h.",
    reference: "Votre référence",
    copy: "Copier",
    copied: "Copié",
    referenceHelp:
      "Ce code figure déjà dans le libellé du paiement et associe automatiquement votre demande.",
    pay: "Payer 99 € en toute sécurité avec bunq",
    paymentPrivacy:
      "bunq traite le paiement. Ce site ne voit ni ne stocke vos données bancaires.",
    paidTo: "Payé à",
    registeredOffice: "Siège social",
    next: "Étapes suivantes",
    nextSteps: [
      [
        "Paiement reçu",
        "Vous recevez un reçu et une facture avec votre référence.",
      ],
      [
        "Votre cas est évalué",
        "Un spécialiste examine vos systèmes, secteur et site selon les règles actuelles.",
      ],
      [
        "Évaluation livrée",
        "Le document arrive sous 24–48 h et les questions de suivi sont incluses.",
      ],
    ],
    refundTitle: "Si l’évaluation n’arrive pas, vous ne la payez pas.",
    refundBody:
      "Rien sous 24–48 h ? Répondez au reçu et nous rembourserons l’intégralité.",
    change: "Modifier mes informations",
    sectors: options(sectorValues, [
      "E-commerce / commerce",
      "SaaS / logiciel",
      "Santé",
      "Finance / assurance",
      "Juridique / services professionnels",
      "Éducation",
      "Voyage / hôtellerie",
      "Fabrication / industrie",
      "Secteur public",
      "Autre",
    ]),
    systemsList: options(systemValues, [
      "Chatbot client",
      "Texte généré par IA",
      "Images ou vidéos générées par IA",
      "IA vocale ou agents téléphoniques",
      "Moteur de recommandation ou classement",
      "IA en recrutement ou RH",
      "Notation ou profilage de personnes",
      "Outils IA internes uniquement",
      "Je ne sais pas ; c’est à évaluer",
    ]),
  },
  it: {
    seoTitle: "Valutazione AI Act, 99 € | RapidAct",
    seoDescription:
      "Descrivi l’azienda e le IA utilizzate. La valutazione completa arriva entro 24–48 ore.",
    step1: "Passaggio 1 di 2",
    intakeTitle: "Inizia la valutazione della tua azienda",
    intakeBody:
      "Inizia con il nome dell’azienda e l’e-mail di lavoro. Aggiungi altro contesto solo se lo hai.",
    company: "Nome dell’azienda",
    email: "E-mail di lavoro",
    invalidEmail: "Inserisci un indirizzo email valido.",
    website: "Sito web",
    countries: "Paesi in cui operi",
    countriesPlaceholder: "Italia, Spagna, Germania",
    optionalContext: "Aggiungi altro contesto",
    optionalContextHint:
      "Facoltativo: sito, IA note, paesi, dimensioni, settore e qualsiasi punto da esaminare.",
    size: "Dimensioni dell’azienda",
    sizeNote:
      "Gli obblighi dipendono dalla funzione del sistema, non dalle dimensioni. Le dimensioni incidono sul calcolo delle sanzioni.",
    sector: "Settore",
    systems: "Quali IA sai già che usa l’azienda?",
    notes: "Aspetti specifici da valutare",
    notesPlaceholder:
      "Ad esempio: usiamo un agente vocale per le prenotazioni e non sappiamo se è coperto.",
    sendError: "Impossibile inviare i dati. Riprova o contattaci via e-mail.",
    continue: "Continua al pagamento · 99 €",
    continuing: "Salvataggio…",
    noCharge:
      "Qui non viene addebitato nulla. Vedrai prezzo e venditore prima del pagamento.",
    buying: "Stai acquistando",
    chargedOnce: "Pagamento unico per azienda.",
    specimen: "Vedi il modello completo di otto pagine",
    soldBy: "Venduto da",
    verifyCompany: "Verifica su Companies House",
    deliveryPromise: "Consegna in 24–48 h o rimborso totale.",
    questionsBefore: "Domande prima dell’acquisto:",
    technicalNotice:
      "Valutazione tecnica e organizzativa, non consulenza legale.",
    bookCall: "Prenota una chiamata",
    step2: "Passaggio 2 di 2",
    recordedTitle: "Richiesta salvata — paga 99 € per iniziare",
    recordedBody:
      "Il lavoro inizia al ricevimento del pagamento. La valutazione arriva alla tua e-mail di lavoro entro 24–48 h.",
    reference: "Il tuo riferimento",
    copy: "Copia",
    copied: "Copiato",
    referenceHelp:
      "Il codice è già inserito nella causale e associa automaticamente il pagamento alla richiesta.",
    pay: "Paga 99 € in sicurezza con bunq",
    paymentPrivacy:
      "bunq elabora il pagamento. Questo sito non vede né conserva dati bancari o della carta.",
    paidTo: "Pagamento a",
    registeredOffice: "Sede legale",
    next: "Cosa succede dopo",
    nextSteps: [
      [
        "Pagamento ricevuto",
        "Ricevi una ricevuta e una fattura con il riferimento.",
      ],
      [
        "Valutiamo il caso",
        "Uno specialista esamina sistemi, settore e sito secondo le regole attuali.",
      ],
      [
        "Valutazione consegnata",
        "Il documento arriva in 24–48 h e include le domande successive.",
      ],
    ],
    refundTitle: "Se la valutazione non arriva, non la paghi.",
    refundBody:
      "Nulla entro 24–48 h? Rispondi alla ricevuta e riceverai il rimborso completo.",
    change: "Modifica i dati",
    sectors: options(sectorValues, [
      "E-commerce / vendita",
      "SaaS / software",
      "Sanità",
      "Finanza / assicurazioni",
      "Servizi legali / professionali",
      "Istruzione",
      "Viaggi / ospitalità",
      "Produzione / industria",
      "Settore pubblico",
      "Altro",
    ]),
    systemsList: options(systemValues, [
      "Chatbot per clienti",
      "Testo generato dall’IA",
      "Immagini o video generati dall’IA",
      "IA vocale o agenti telefonici",
      "Motore di raccomandazione o ranking",
      "IA in selezione o HR",
      "Punteggio o profilazione di persone",
      "Solo strumenti IA interni",
      "Non so; è ciò che devo valutare",
    ]),
  },
};
