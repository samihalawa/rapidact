import type { Lang } from "@/lib/content";

type ScannerCopy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  scope: string;
  urlLabel: string;
  placeholder: string;
  scan: string;
  scanning: string;
  emailGateLabel: string;
  emailGateTitle: string;
  emailGateBody: string;
  emailGateField: string;
  emailGateHint: string;
  emailGateContinue: string;
  emailGateCancel: string;
  emailGateInvalid: string;
  emailGateError: string;
  progress: string;
  progressScope: string;
  elapsed: (seconds: number) => string;
  stages: { label: string; detail: string }[];
  fullLabel: string;
  fullBody: string;
  fullCta: string;
  fullWhatsapp: string;
  bookCall: string;
  failureTitle: string;
  rateLimited: string;
  invalidUrl: string;
  unreachable: (error: string) => string;
  failureRetry: string;
  scanStatus: Record<"complete" | "partial", string>;
  pagesInspected: string;
  blockersTitle: string;
  source: string;
  readiness: string;
  summary: (total: number, high: number, undisclosed: number) => string;
  article: string;
  evidence: string;
  disclosureFound: string;
  disclosureMissing: string;
  noSignaturesTitle: string;
  noSignaturesBody: string;
  evidenceBody: string;
  assessmentTitle: string;
  assessmentBody: string;
  noticeTitle: string;
  noticeBody: string;
  noticeCta: string;
  copied: string;
  copyReport: string;
  download: string;
  pdfTitle: string;
  pdfGenerated: string;
  pdfFindings: string;
  pdfActions: string;
  pdfScope: string;
  disclaimer: string;
  chatWhat: (name: string, disclosureFound: boolean) => string;
  chatFix: string;
  otherWhat: (name: string) => string;
  otherFix: string;
};

export const SCANNER_COPY: Record<Lang, ScannerCopy> = {
  en: {
    seoTitle: "Free website AI disclosure scan | RapidAct",
    seoDescription:
      "Scan a public page for visible AI tools and disclosure wording, then get practical next steps.",
    eyebrow: "Free public-page scan",
    title: "Check one page for visible AI",
    intro:
      "Enter a public URL. RapidAct checks the rendered page for visitor-facing AI controls and visible disclosure.",
    scope: "Fast first check · one page · up to 5 primary touchpoints",
    urlLabel: "Website address",
    placeholder: "your-site.com",
    scan: "Scan website",
    scanning: "Scanning",
    emailGateLabel: "Receive your scan",
    emailGateTitle: "Unlock your scan result",
    emailGateBody:
      "Enter your email to run the scan, view the result and unlock the one-page PDF. Any valid email address works.",
    emailGateField: "Work email",
    emailGateHint: "We use it for this scan and relevant follow-up.",
    emailGateContinue: "Run free scan",
    emailGateCancel: "Cancel",
    emailGateInvalid: "Enter a valid email address.",
    emailGateError: "We could not save your email. Please try again.",
    progress: "Public-page scan",
    progressScope: "One rendered page · up to 5 distinct touchpoints · no forms",
    elapsed: seconds => `${seconds}s elapsed`,
    stages: [
      {
        label: "Starting the browser",
        detail: "Validating the address and creating the live inspection.",
      },
      {
        label: "Checking the rendered page",
        detail:
          "The secure browser is checking visible AI and disclosure evidence.",
      },
      {
        label: "Preparing your result",
        detail: "Structuring the observed evidence and your next action.",
      },
    ],
    fullLabel: "Free scan complete",
    fullBody:
      "This result covers the submitted public page. The €99 assessment maps your AI systems, roles, required notices and evidence into a reviewed company action plan.",
    fullCta: "Start assessment · €99",
    fullWhatsapp: "Request complete scan",
    bookCall: "Book a specialist call",
    failureTitle: "This page could not be scanned",
    rateLimited: "Scan limit reached. Try again in a few minutes.",
    invalidUrl: "Enter a valid public website address.",
    unreachable: () =>
      "We could not read a reliable result. Retry once or book a specialist review.",
    failureRetry: "Retry this scan",
    scanStatus: {
      complete: "Public-page inspection complete",
      partial: "Partial inspection — review the blockers",
    },
    pagesInspected: "Page inspected",
    blockersTitle: "Inspection blockers",
    source: "Source",
    readiness: "visible AI controls",
    summary: (total, high, undisclosed) =>
      `${total} AI touchpoint${total === 1 ? "" : "s"} · ${high} high exposure · ${undisclosed} without visible disclosure`,
    article: "Article",
    evidence: "Technical match",
    disclosureFound: "Disclosure wording found — verify timing and prominence",
    disclosureMissing:
      "No disclosure wording found — review your role and first-interaction notice",
    noSignaturesTitle: "No visible AI touchpoints observed",
    noSignaturesBody:
      "No visitor-facing AI control was observed on this page. Other pages and internal systems are outside this scan.",
    evidenceBody:
      "Record the live URL, approved wording, provider or deployer role, owner, publication date and desktop/mobile check. The notice does not create an evidence log.",
    assessmentTitle: "Assess the whole company · €99",
    assessmentBody:
      "Get the inventory, classifications, required notices and prioritised action plan within 24–48h.",
    noticeTitle: "Add the visitor notice · Free",
    noticeBody:
      "If you use AI elsewhere, copy one script, tailor the message and check the published result.",
    noticeCta: "Open installer",
    copied: "Copied",
    copyReport: "Copy results",
    download: "Download PDF",
    pdfTitle: "Public-page AI transparency scan",
    pdfGenerated: "Generated",
    pdfFindings: "Detected touchpoints",
    pdfActions: "Priority actions",
    pdfScope:
      "Scope: a fast rendered-page observation of the single URL listed in this PDF. Other pages, private systems and organisational roles are outside this scan.",
    disclaimer:
      "Technical public-page scan, not legal advice. Regulation (EU) 2024/1689, Article 50.",
    chatWhat: (name, disclosureFound) =>
      `${name} is visible on the page. ${
        disclosureFound
          ? "Disclosure wording was found; verify that people see it at the right moment."
          : "No disclosure wording was found on the scanned page."
      }`,
    chatFix:
      "If you are responsible for the direct-interaction notice, tailor and publish the free RapidAct notice. Confirm the provider or deployer role separately.",
    otherWhat: name =>
      `${name} is visible on the page. Confirm whether visitors can identify where AI is involved.`,
    otherFix:
      "Review the relevant content-labelling duty and record the decision.",
  },
  es: {
    seoTitle: "Escaneo gratis de avisos de IA en tu web | RapidAct",
    seoDescription:
      "Escanea una página pública para detectar IA visible y avisos, y recibe próximos pasos prácticos.",
    eyebrow: "Escaneo gratuito de página pública",
    title: "Comprueba una página en busca de IA visible",
    intro:
      "Introduce una URL pública. RapidAct revisa la página renderizada para detectar controles de IA y avisos visibles.",
    scope: "Primera revisión rápida · una página · hasta 5 puntos de IA",
    urlLabel: "Dirección del sitio web",
    placeholder: "tu-web.es",
    scan: "Escanear web",
    scanning: "Escaneando",
    emailGateLabel: "Recibe tu escaneo",
    emailGateTitle: "Desbloquea el resultado del escaneo",
    emailGateBody:
      "Introduce tu correo para ejecutar el escaneo, ver el resultado y desbloquear el PDF de una página. Se acepta cualquier correo válido.",
    emailGateField: "Correo de trabajo",
    emailGateHint: "Lo usamos para este escaneo y su seguimiento.",
    emailGateContinue: "Ejecutar escaneo gratis",
    emailGateCancel: "Cancelar",
    emailGateInvalid: "Introduce un correo válido.",
    emailGateError: "No hemos podido guardar el correo. Inténtalo de nuevo.",
    progress: "Escaneo de página pública",
    progressScope: "Una página renderizada · hasta 5 puntos distintos · sin formularios",
    elapsed: seconds => `${seconds} s`,
    stages: [
      {
        label: "Iniciando el navegador",
        detail: "Validando la dirección y creando la inspección en vivo.",
      },
      {
        label: "Revisando la página renderizada",
        detail: "El navegador seguro comprueba la IA visible y sus avisos.",
      },
      {
        label: "Preparando el resultado",
        detail: "Estructurando las pruebas observadas y la siguiente acción.",
      },
    ],
    fullLabel: "Escaneo gratuito completado",
    fullBody:
      "Este resultado cubre la página pública enviada. La evaluación de 99 € organiza tus sistemas de IA, roles, avisos obligatorios y evidencias en un plan de acción revisado para la empresa.",
    fullCta: "Iniciar evaluación · 99 €",
    fullWhatsapp: "Solicitar escaneo completo",
    bookCall: "Reservar llamada con un especialista",
    failureTitle: "No se ha podido escanear la página",
    rateLimited: "Límite de escaneos alcanzado. Inténtalo en unos minutos.",
    invalidUrl: "Introduce una dirección web pública válida.",
    unreachable: () =>
      "No hemos podido leer un resultado fiable. Reinténtalo una vez o reserva una revisión.",
    failureRetry: "Reintentar este escaneo",
    scanStatus: {
      complete: "Inspección de la página pública completada",
      partial: "Inspección parcial — revisa los bloqueos",
    },
    pagesInspected: "Página inspeccionada",
    blockersTitle: "Bloqueos de la inspección",
    source: "Fuente",
    readiness: "controles de IA visibles",
    summary: (total, high, undisclosed) =>
      `${total} punto${total === 1 ? "" : "s"} de IA · ${high} de exposición alta · ${undisclosed} sin aviso visible`,
    article: "Artículo",
    evidence: "Coincidencia técnica",
    disclosureFound: "Aviso encontrado — comprueba el momento y la visibilidad",
    disclosureMissing:
      "No se encontró un aviso — revisa tu función y la primera interacción",
    noSignaturesTitle: "No se observaron puntos de IA visibles",
    noSignaturesBody:
      "No se observó un control de IA orientado al visitante en esta página. Otras páginas y sistemas internos quedan fuera de este escaneo.",
    evidenceBody:
      "Registra la URL, el texto aprobado, la función, el responsable, la fecha y la comprobación en móvil y ordenador. El aviso no crea un registro de pruebas.",
    assessmentTitle: "Evalúa toda la empresa · 99 €",
    assessmentBody:
      "Recibe el inventario, las clasificaciones, los avisos y el plan priorizado en 24–48 h.",
    noticeTitle: "Añade el aviso para visitantes · Gratis",
    noticeBody:
      "Si usas IA en otros lugares, copia un script, adapta el mensaje y comprueba el resultado publicado.",
    noticeCta: "Abrir instalador",
    copied: "Copiado",
    copyReport: "Copiar resultados",
    download: "Descargar PDF",
    pdfTitle: "Escaneo de transparencia de IA en página pública",
    pdfGenerated: "Generado",
    pdfFindings: "Puntos detectados",
    pdfActions: "Acciones prioritarias",
    pdfScope:
      "Alcance: observación rápida de la única URL indicada en este PDF. Otras páginas y los sistemas privados quedan fuera.",
    disclaimer:
      "Escaneo técnico de página pública, no asesoramiento jurídico. Reglamento (UE) 2024/1689, artículo 50.",
    chatWhat: (name, disclosureFound) =>
      `${name} aparece en la página. ${
        disclosureFound
          ? "Se encontró un aviso; comprueba que se muestra en el momento correcto."
          : "No se encontró un aviso en la página escaneada."
      }`,
    chatFix:
      "Si eres responsable del aviso de interacción, adapta y publica el aviso gratuito de RapidAct. Confirma por separado tu función.",
    otherWhat: name =>
      `${name} aparece en la página. Confirma si los visitantes identifican dónde interviene la IA.`,
    otherFix:
      "Revisa la obligación de etiquetado pertinente y documenta la decisión.",
  },
  de: {
    seoTitle: "Kostenloser Website-Scan für KI-Hinweise | RapidAct",
    seoDescription:
      "Scannen Sie eine öffentliche Seite nach sichtbarer KI und Hinweisen und erhalten Sie konkrete nächste Schritte.",
    eyebrow: "Kostenloser Scan öffentlicher Seiten",
    title: "Eine Seite auf sichtbare KI prüfen",
    intro:
      "Geben Sie eine öffentliche URL ein. RapidAct prüft die gerenderte Seite auf KI-Funktionen für Besucher und sichtbare Hinweise.",
    scope: "Schneller Erstcheck · eine Seite · bis zu 5 KI-Kontaktpunkte",
    urlLabel: "Website-Adresse",
    placeholder: "ihre-website.de",
    scan: "Website scannen",
    scanning: "Scan läuft",
    emailGateLabel: "Scan erhalten",
    emailGateTitle: "Scan-Ergebnis freischalten",
    emailGateBody:
      "Geben Sie Ihre E-Mail ein, um den Scan zu starten, das Ergebnis anzusehen und das einseitige PDF freizuschalten. Jede gültige E-Mail-Adresse funktioniert.",
    emailGateField: "Geschäftliche E-Mail",
    emailGateHint:
      "Wir verwenden sie für diesen Scan und relevante Nachfragen.",
    emailGateContinue: "Kostenlosen Scan starten",
    emailGateCancel: "Abbrechen",
    emailGateInvalid: "Geben Sie eine gültige E-Mail-Adresse ein.",
    emailGateError:
      "Die E-Mail konnte nicht gespeichert werden. Bitte erneut versuchen.",
    progress: "Öffentlicher Seiten-Scan",
    progressScope: "Eine gerenderte Seite · bis zu 5 klare Kontaktpunkte · keine Formulare",
    elapsed: seconds => `${seconds} s`,
    stages: [
      {
        label: "Browser wird gestartet",
        detail: "Adresse wird validiert und die Live-Prüfung erstellt.",
      },
      {
        label: "Gerenderte Seite wird geprüft",
        detail: "Der sichere Browser prüft sichtbare KI und deren Hinweise.",
      },
      {
        label: "Ergebnis wird vorbereitet",
        detail: "Beobachtete Nachweise und nächste Schritte werden geordnet.",
      },
    ],
    fullLabel: "Kostenloser Scan abgeschlossen",
    fullBody:
      "Dieses Ergebnis deckt die eingereichte öffentliche Seite ab. Die Bewertung für 99 € ordnet Ihre KI-Systeme, Rollen, erforderlichen Hinweise und Nachweise in einen geprüften Aktionsplan für das Unternehmen ein.",
    fullCta: "Bewertung starten · 99 €",
    fullWhatsapp: "Vollständigen Scan anfordern",
    bookCall: "Fachgespräch buchen",
    failureTitle: "Diese Seite konnte nicht gescannt werden",
    rateLimited: "Scan-Limit erreicht. Versuchen Sie es in einigen Minuten.",
    invalidUrl: "Geben Sie eine gültige öffentliche Webadresse ein.",
    unreachable: () =>
      "Es konnte kein verlässliches Ergebnis gelesen werden. Versuchen Sie es erneut oder buchen Sie eine Prüfung.",
    failureRetry: "Scan erneut versuchen",
    scanStatus: {
      complete: "Prüfung der öffentlichen Seite abgeschlossen",
      partial: "Teilprüfung — Blocker prüfen",
    },
    pagesInspected: "Geprüfte Seite",
    blockersTitle: "Prüfungsblocker",
    source: "Quelle",
    readiness: "sichtbare KI-Funktionen",
    summary: (total, high, undisclosed) =>
      `${total} KI-Kontaktpunkt${total === 1 ? "" : "e"} · ${high} hohe Exposition · ${undisclosed} ohne sichtbaren Hinweis`,
    article: "Artikel",
    evidence: "Technischer Treffer",
    disclosureFound: "Hinweis gefunden — Zeitpunkt und Sichtbarkeit prüfen",
    disclosureMissing:
      "Kein Hinweis gefunden — Rolle und erste Interaktion prüfen",
    noSignaturesTitle: "Keine sichtbaren KI-Kontaktpunkte beobachtet",
    noSignaturesBody:
      "Auf dieser Seite wurde kein besucherorientiertes KI-Steuerelement beobachtet. Andere Seiten und interne Systeme sind nicht Teil dieses Scans.",
    evidenceBody:
      "Dokumentieren Sie URL, Freigabetext, Rolle, Verantwortlichen, Datum und Desktop-/Mobilprüfung. Der Hinweis erstellt kein Nachweisprotokoll.",
    assessmentTitle: "Gesamtes Unternehmen bewerten · 99 €",
    assessmentBody:
      "Erhalten Sie Inventar, Klassifizierungen, Hinweise und Maßnahmenplan in 24–48 Stunden.",
    noticeTitle: "Besucherhinweis hinzufügen · Kostenlos",
    noticeBody:
      "Wenn Sie KI an anderer Stelle einsetzen, kopieren Sie ein Skript, passen Sie den Text an und prüfen Sie die Veröffentlichung.",
    noticeCta: "Installer öffnen",
    copied: "Kopiert",
    copyReport: "Ergebnisse kopieren",
    download: "PDF herunterladen",
    pdfTitle: "KI-Transparenzscan einer öffentlichen Seite",
    pdfGenerated: "Erstellt",
    pdfFindings: "Erkannte Berührungspunkte",
    pdfActions: "Priorisierte Maßnahmen",
    pdfScope:
      "Umfang: schnelle Beobachtung der einzigen in diesem PDF aufgeführten URL. Weitere Seiten und private Systeme liegen außerhalb dieses Scans.",
    disclaimer:
      "Technischer Scan einer öffentlichen Seite, keine Rechtsberatung. Verordnung (EU) 2024/1689, Artikel 50.",
    chatWhat: (name, disclosureFound) =>
      `${name} ist auf der Seite sichtbar. ${
        disclosureFound
          ? "Ein Hinweis wurde gefunden; prüfen Sie Zeitpunkt und Sichtbarkeit."
          : "Auf der gescannten Seite wurde kein Hinweis gefunden."
      }`,
    chatFix:
      "Wenn Sie für den Interaktionshinweis verantwortlich sind, passen Sie den kostenlosen RapidAct-Hinweis an. Klären Sie Ihre Rolle separat.",
    otherWhat: name =>
      `${name} ist auf der Seite sichtbar. Prüfen Sie, ob Besucher den KI-Einsatz erkennen.`,
    otherFix:
      "Prüfen Sie die einschlägige Kennzeichnungspflicht und dokumentieren Sie die Entscheidung.",
  },
  fr: {
    seoTitle: "Scan gratuit des mentions IA d’un site | RapidAct",
    seoDescription:
      "Scannez une page publique pour détecter l’IA visible et les mentions, puis obtenez des actions concrètes.",
    eyebrow: "Scan gratuit d’une page publique",
    title: "Vérifiez une page pour l’IA visible",
    intro:
      "Saisissez une URL publique. RapidAct vérifie la page rendue pour repérer les fonctions IA destinées aux visiteurs et les mentions visibles.",
    scope: "Premier contrôle rapide · une page · jusqu’à 5 points de contact IA",
    urlLabel: "Adresse du site web",
    placeholder: "votre-site.fr",
    scan: "Scanner le site",
    scanning: "Analyse en cours",
    emailGateLabel: "Recevoir votre analyse",
    emailGateTitle: "Débloquez le résultat du scan",
    emailGateBody:
      "Saisissez votre e-mail pour lancer l’analyse, voir le résultat et débloquer le PDF d’une page. Toute adresse e-mail valide fonctionne.",
    emailGateField: "E-mail professionnel",
    emailGateHint:
      "Nous l’utilisons pour cette analyse et son suivi pertinent.",
    emailGateContinue: "Lancer l’analyse gratuite",
    emailGateCancel: "Annuler",
    emailGateInvalid: "Saisissez une adresse e-mail valide.",
    emailGateError: "Impossible d’enregistrer l’e-mail. Veuillez réessayer.",
    progress: "Scan de page publique",
    progressScope: "Une page rendue · jusqu’à 5 points distincts · aucun formulaire",
    elapsed: seconds => `${seconds} s`,
    stages: [
      {
        label: "Démarrage du navigateur",
        detail:
          "Validation de l’adresse et création de l’inspection en direct.",
      },
      {
        label: "Inspection de la page rendue",
        detail: "Le navigateur sécurisé vérifie l’IA visible et ses mentions.",
      },
      {
        label: "Préparation du résultat",
        detail: "Structuration des preuves observées et de l’action suivante.",
      },
    ],
    fullLabel: "Analyse gratuite terminée",
    fullBody:
      "Ce résultat couvre la page publique soumise. L’évaluation à 99 € structure vos systèmes d’IA, rôles, mentions requises et preuves dans un plan d’action vérifié pour l’entreprise.",
    fullCta: "Commencer l’évaluation · 99 €",
    fullWhatsapp: "Demander l’analyse complète",
    bookCall: "Réserver un appel spécialiste",
    failureTitle: "Cette page n’a pas pu être scannée",
    rateLimited: "Limite de scans atteinte. Réessayez dans quelques minutes.",
    invalidUrl: "Saisissez une adresse de site public valide.",
    unreachable: () =>
      "Impossible de lire un résultat fiable. Réessayez une fois ou réservez une vérification.",
    failureRetry: "Relancer cette analyse",
    scanStatus: {
      complete: "Inspection de la page publique terminée",
      partial: "Inspection partielle — vérifiez les blocages",
    },
    pagesInspected: "Page inspectée",
    blockersTitle: "Blocages de l’inspection",
    source: "Source",
    readiness: "fonctions IA visibles",
    summary: (total, high, undisclosed) =>
      `${total} point${total === 1 ? "" : "s"} de contact IA · ${high} forte exposition · ${undisclosed} sans mention visible`,
    article: "Article",
    evidence: "Correspondance technique",
    disclosureFound: "Mention trouvée — vérifiez le moment et la visibilité",
    disclosureMissing:
      "Aucune mention trouvée — vérifiez le rôle et la première interaction",
    noSignaturesTitle: "Aucun point de contact IA visible observé",
    noSignaturesBody:
      "Aucun contrôle IA orienté visiteur n’a été observé sur cette page. Les autres pages et les systèmes internes ne sont pas couverts par ce scan.",
    evidenceBody:
      "Conservez l’URL, le texte approuvé, le rôle, le responsable, la date et la vérification ordinateur/mobile. L’avis ne crée pas de journal de preuves.",
    assessmentTitle: "Évaluer toute l’entreprise · 99 €",
    assessmentBody:
      "Recevez l’inventaire, les classifications, les mentions et le plan priorisé sous 24–48 h.",
    noticeTitle: "Ajouter l’avis visiteur · Gratuit",
    noticeBody:
      "Si vous utilisez l’IA ailleurs, copiez un script, adaptez le message et vérifiez le résultat publié.",
    noticeCta: "Ouvrir l’installation",
    copied: "Copié",
    copyReport: "Copier les résultats",
    download: "Télécharger le PDF",
    pdfTitle: "Analyse de transparence IA d’une page publique",
    pdfGenerated: "Généré",
    pdfFindings: "Points de contact détectés",
    pdfActions: "Actions prioritaires",
    pdfScope:
      "Portée : observation rapide de l’unique URL listée dans ce PDF. Les autres pages et les systèmes privés sont hors périmètre.",
    disclaimer:
      "Scan technique d’une page publique, pas un avis juridique. Règlement (UE) 2024/1689, article 50.",
    chatWhat: (name, disclosureFound) =>
      `${name} est visible sur la page. ${
        disclosureFound
          ? "Une mention a été trouvée ; vérifiez son moment et sa visibilité."
          : "Aucune mention n’a été trouvée sur la page scannée."
      }`,
    chatFix:
      "Si vous êtes responsable de l’avis d’interaction, adaptez et publiez l’avis RapidAct gratuit. Confirmez votre rôle séparément.",
    otherWhat: name =>
      `${name} est visible sur la page. Vérifiez si les visiteurs identifient l’intervention de l’IA.`,
    otherFix:
      "Vérifiez l’obligation d’étiquetage pertinente et documentez la décision.",
  },
  it: {
    seoTitle: "Scansione gratuita degli avvisi IA sul sito | RapidAct",
    seoDescription:
      "Scansiona una pagina pubblica per rilevare IA visibile e avvisi, poi ottieni azioni concrete.",
    eyebrow: "Scansione gratuita di pagina pubblica",
    title: "Controlla una pagina per l’IA visibile",
    intro:
      "Inserisci un URL pubblico. RapidAct controlla la pagina renderizzata per rilevare funzioni IA rivolte ai visitatori e avvisi visibili.",
    scope: "Primo controllo rapido · una pagina · fino a 5 punti di contatto IA",
    urlLabel: "Indirizzo del sito web",
    placeholder: "il-tuo-sito.it",
    scan: "Scansiona sito",
    scanning: "Scansione",
    emailGateLabel: "Ricevi la scansione",
    emailGateTitle: "Sblocca il risultato della scansione",
    emailGateBody:
      "Inserisci l’e-mail per avviare la scansione, vedere il risultato e sbloccare il PDF di una pagina. Qualsiasi indirizzo e-mail valido è accettato.",
    emailGateField: "E-mail di lavoro",
    emailGateHint: "La usiamo per questa scansione e il relativo seguito.",
    emailGateContinue: "Avvia scansione gratuita",
    emailGateCancel: "Annulla",
    emailGateInvalid: "Inserisci un indirizzo e-mail valido.",
    emailGateError: "Non è stato possibile salvare l’e-mail. Riprova.",
    progress: "Scansione pagina pubblica",
    progressScope: "Una pagina renderizzata · fino a 5 punti distinti · nessun modulo",
    elapsed: seconds => `${seconds} s`,
    stages: [
      {
        label: "Avvio del browser",
        detail: "Convalida dell’indirizzo e creazione dell’ispezione dal vivo.",
      },
      {
        label: "Controllo della pagina renderizzata",
        detail: "Il browser sicuro verifica l’IA visibile e i relativi avvisi.",
      },
      {
        label: "Preparazione del risultato",
        detail: "Organizzazione delle prove osservate e della prossima azione.",
      },
    ],
    fullLabel: "Scansione gratuita completata",
    fullBody:
      "Questo risultato copre la pagina pubblica inviata. La valutazione da 99 € organizza sistemi IA, ruoli, avvisi richiesti e prove in un piano d’azione aziendale verificato.",
    fullCta: "Inizia valutazione · 99 €",
    fullWhatsapp: "Richiedi scansione completa",
    bookCall: "Prenota una chiamata specialistica",
    failureTitle: "Impossibile scansionare la pagina",
    rateLimited: "Limite di scansioni raggiunto. Riprova tra qualche minuto.",
    invalidUrl: "Inserisci un indirizzo web pubblico valido.",
    unreachable: () =>
      "Non è stato possibile leggere un risultato affidabile. Riprova o prenota una verifica.",
    failureRetry: "Riprova questa scansione",
    scanStatus: {
      complete: "Ispezione della pagina pubblica completata",
      partial: "Ispezione parziale — controlla i blocchi",
    },
    pagesInspected: "Pagina ispezionata",
    blockersTitle: "Blocchi dell’ispezione",
    source: "Fonte",
    readiness: "funzioni IA visibili",
    summary: (total, high, undisclosed) =>
      `${total} punto${total === 1 ? "" : "i"} di contatto IA · ${high} alta esposizione · ${undisclosed} senza avviso visibile`,
    article: "Articolo",
    evidence: "Corrispondenza tecnica",
    disclosureFound: "Avviso trovato — verifica tempistica e visibilità",
    disclosureMissing:
      "Nessun avviso trovato — verifica ruolo e prima interazione",
    noSignaturesTitle: "Nessun punto di contatto IA visibile osservato",
    noSignaturesBody:
      "In questa pagina non è stato osservato alcun controllo IA rivolto ai visitatori. Altre pagine e sistemi interni non rientrano in questa scansione.",
    evidenceBody:
      "Registra URL, testo approvato, ruolo, responsabile, data e verifica desktop/mobile. L’avviso non crea un registro di prove.",
    assessmentTitle: "Valuta tutta l’azienda · 99 €",
    assessmentBody:
      "Ricevi inventario, classificazioni, avvisi e piano prioritario entro 24–48 ore.",
    noticeTitle: "Aggiungi l’avviso visitatore · Gratis",
    noticeBody:
      "Se usi l’IA altrove, copia uno script, adatta il messaggio e verifica il risultato pubblicato.",
    noticeCta: "Apri installazione",
    copied: "Copiato",
    copyReport: "Copia risultati",
    download: "Scarica PDF",
    pdfTitle: "Scansione trasparenza IA di una pagina pubblica",
    pdfGenerated: "Generato",
    pdfFindings: "Punti di contatto rilevati",
    pdfActions: "Azioni prioritarie",
    pdfScope:
      "Ambito: osservazione rapida dell’unico URL elencato nel PDF. Le altre pagine e i sistemi privati sono fuori ambito.",
    disclaimer:
      "Scansione tecnica di una pagina pubblica, non consulenza legale. Regolamento (UE) 2024/1689, articolo 50.",
    chatWhat: (name, disclosureFound) =>
      `${name} è visibile sulla pagina. ${
        disclosureFound
          ? "È stato trovato un avviso; verifica tempistica e visibilità."
          : "Non è stato trovato alcun avviso sulla pagina."
      }`,
    chatFix:
      "Se sei responsabile dell’avviso di interazione, adatta e pubblica l’avviso RapidAct gratuito. Conferma il ruolo separatamente.",
    otherWhat: name =>
      `${name} è visibile sulla pagina. Verifica se i visitatori riconoscono l’uso dell’IA.`,
    otherFix:
      "Verifica l’obbligo di etichettatura pertinente e documenta la decisione.",
  },
};
