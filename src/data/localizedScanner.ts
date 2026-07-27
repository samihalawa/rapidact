import type { Lang } from "@/lib/content";

type ScannerCopy = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  scope: string;
  companyLead: string;
  companyLink: string;
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
  stages: { label: string; detail: string }[];
  fullLabel: string;
  fullTitle: string;
  fullBody: string;
  fullCta: string;
  fullWhatsapp: string;
  guidedCta: string;
  failureTitle: string;
  rateLimited: string;
  invalidUrl: string;
  unreachable: (error: string) => string;
  failureCta: string;
  scoreLabels: [string, string, string];
  readiness: string;
  summary: (total: number, high: number, undisclosed: number) => string;
  article: string;
  evidence: string;
  disclosureFound: string;
  disclosureMissing: string;
  noSignaturesTitle: string;
  noSignaturesBody: string;
  planTitle: string;
  planSubtitle: string;
  step: string;
  alwaysStep: string;
  evidenceBody: string;
  assessmentTitle: string;
  assessmentBody: string;
  noticeTitle: string;
  noticeBody: string;
  leadDone: string;
  emailPlaceholder: string;
  sendPlan: string;
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
    title: "Check your website’s visible AI disclosures",
    intro:
      "Enter a public URL. RapidAct checks published HTML, scripts and 52 known AI signatures, then returns a technical disclosure preview. No account required.",
    scope:
      "A signature match is a technical signal, not a legal classification. Your role, purpose and applicable exceptions still need review.",
    companyLead:
      "Need the company-wide view, including private systems and a written action plan?",
    companyLink: "Start the €99 assessment",
    placeholder: "your-site.com",
    scan: "Scan website",
    scanning: "Scanning",
    emailGateLabel: "Receive your scan",
    emailGateTitle: "Where should we unlock the result?",
    emailGateBody:
      "Enter your work email to run the scan and access the one-page PDF. Any valid email address works.",
    emailGateField: "Work email",
    emailGateHint: "We use it for this scan and relevant follow-up.",
    emailGateContinue: "Run free scan",
    emailGateCancel: "Cancel",
    emailGateInvalid: "Enter a valid email address.",
    emailGateError: "We could not save your email. Please try again.",
    progress: "Public-page scan",
    stages: [
      {
        label: "Connecting to the page",
        detail: "Checking the address and public response.",
      },
      {
        label: "Reading published code",
        detail: "Reviewing the HTML, scripts and embedded tools.",
      },
      {
        label: "Checking AI signatures",
        detail: "Comparing the page with 52 known technologies.",
      },
      {
        label: "Preparing results",
        detail: "Turning matches into a score and next actions.",
      },
    ],
    fullLabel: "Free scan complete",
    fullTitle: "This preview checks one public page",
    fullBody:
      "Other pages, private systems and internal AI use may still need review. Request the complete scan and a company-wide action plan.",
    fullCta: "Start assessment · €99",
    fullWhatsapp: "Request complete scan",
    guidedCta: "Prefer guided questions? Use the AI guide",
    failureTitle: "This page could not be scanned",
    rateLimited: "Scan limit reached. Try again in a few minutes.",
    invalidUrl: "Enter a valid public website address.",
    unreachable: error =>
      `The page did not respond (${error}). You can retry another public URL or continue with a manual company assessment.`,
    failureCta: "Continue with assessment · €99",
    scoreLabels: [
      "High visible exposure — review now",
      "Disclosure gaps found",
      "Low visible exposure",
    ],
    readiness: "visible readiness / 100",
    summary: (total, high, undisclosed) =>
      `${total} AI touchpoint${total === 1 ? "" : "s"} · ${high} high exposure · ${undisclosed} without visible disclosure`,
    article: "Article",
    evidence: "Technical match",
    disclosureFound: "Disclosure wording found — verify timing and prominence",
    disclosureMissing:
      "No disclosure wording found — review your role and first-interaction notice",
    noSignaturesTitle: "No known AI signatures found on this page",
    noSignaturesBody:
      "The scan checks 52 vendor signatures. Custom AI and off-page systems may still require review.",
    planTitle: "Your implementation preview",
    planSubtitle: "Copy the result or download the one-page PDF.",
    step: "Action",
    alwaysStep: "Keep implementation evidence",
    evidenceBody:
      "Record the live URL, approved wording, provider or deployer role, owner, publication date and desktop/mobile check. The notice does not create an evidence log.",
    assessmentTitle: "Assess the whole company · €99",
    assessmentBody:
      "Get the inventory, classifications, required notices and prioritised action plan within 24–48h.",
    noticeTitle: "Install the visitor notice · Free",
    noticeBody:
      "Copy one script, tailor the message and check the published result.",
    leadDone: "Scan unlocked.",
    emailPlaceholder: "Work email",
    sendPlan: "Email this plan",
    copied: "Copied",
    copyReport: "Copy results",
    download: "Download PDF",
    pdfTitle: "Public-page AI transparency scan",
    pdfGenerated: "Generated",
    pdfFindings: "Detected touchpoints",
    pdfActions: "Priority actions",
    pdfScope:
      "Scope: automated review of one public page. Private systems, custom AI and organisational roles require a complete assessment.",
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
    title: "Comprueba los avisos de IA visibles en tu web",
    intro:
      "Introduce una URL pública. RapidAct revisa el HTML, los scripts y 52 firmas de IA conocidas, y devuelve una vista técnica. No necesitas una cuenta.",
    scope:
      "Una firma es una señal técnica, no una clasificación jurídica. Aún debes revisar tu función, la finalidad y las excepciones aplicables.",
    companyLead:
      "¿Necesitas revisar toda la empresa, incluidos sistemas privados y un plan escrito?",
    companyLink: "Iniciar la evaluación de 99 €",
    placeholder: "tu-web.es",
    scan: "Escanear web",
    scanning: "Escaneando",
    emailGateLabel: "Recibe tu escaneo",
    emailGateTitle: "¿Dónde desbloqueamos el resultado?",
    emailGateBody:
      "Introduce tu correo de trabajo para ejecutar el escaneo y acceder al PDF de una página. Se acepta cualquier correo válido.",
    emailGateField: "Correo de trabajo",
    emailGateHint: "Lo usamos para este escaneo y su seguimiento.",
    emailGateContinue: "Ejecutar escaneo gratis",
    emailGateCancel: "Cancelar",
    emailGateInvalid: "Introduce un correo válido.",
    emailGateError: "No hemos podido guardar el correo. Inténtalo de nuevo.",
    progress: "Escaneo de página pública",
    stages: [
      {
        label: "Conectando con la página",
        detail: "Comprobando la dirección y la respuesta pública.",
      },
      {
        label: "Leyendo el código publicado",
        detail: "Revisando HTML, scripts y herramientas integradas.",
      },
      {
        label: "Comprobando firmas de IA",
        detail: "Comparando la página con 52 tecnologías conocidas.",
      },
      {
        label: "Preparando resultados",
        detail: "Convirtiendo las coincidencias en puntuación y acciones.",
      },
    ],
    fullLabel: "Escaneo gratuito completado",
    fullTitle: "Esta vista previa comprueba una página pública",
    fullBody:
      "Otras páginas, los sistemas privados y el uso interno de IA pueden necesitar revisión. Solicita el escaneo completo y un plan para toda la empresa.",
    fullCta: "Iniciar evaluación · 99 €",
    fullWhatsapp: "Solicitar escaneo completo",
    guidedCta: "¿Prefieres preguntas guiadas? Usa la guía de IA",
    failureTitle: "No se ha podido escanear la página",
    rateLimited: "Límite de escaneos alcanzado. Inténtalo en unos minutos.",
    invalidUrl: "Introduce una dirección web pública válida.",
    unreachable: error =>
      `La página no ha respondido (${error}). Prueba otra URL pública o continúa con una evaluación manual de empresa.`,
    failureCta: "Continuar con la evaluación · 99 €",
    scoreLabels: [
      "Exposición visible alta — revísala ahora",
      "Faltan avisos visibles",
      "Exposición visible baja",
    ],
    readiness: "preparación visible / 100",
    summary: (total, high, undisclosed) =>
      `${total} punto${total === 1 ? "" : "s"} de IA · ${high} de exposición alta · ${undisclosed} sin aviso visible`,
    article: "Artículo",
    evidence: "Coincidencia técnica",
    disclosureFound: "Aviso encontrado — comprueba el momento y la visibilidad",
    disclosureMissing:
      "No se encontró un aviso — revisa tu función y la primera interacción",
    noSignaturesTitle: "No se encontraron firmas de IA conocidas",
    noSignaturesBody:
      "El escaneo comprueba 52 firmas. La IA propia y los sistemas fuera de esta página pueden requerir revisión.",
    planTitle: "Vista previa de implementación",
    planSubtitle: "Copia el resultado o descarga el PDF de una página.",
    step: "Acción",
    alwaysStep: "Conserva las pruebas de implementación",
    evidenceBody:
      "Registra la URL, el texto aprobado, la función, el responsable, la fecha y la comprobación en móvil y ordenador. El aviso no crea un registro de pruebas.",
    assessmentTitle: "Evalúa toda la empresa · 99 €",
    assessmentBody:
      "Recibe el inventario, las clasificaciones, los avisos y el plan priorizado en 24–48 h.",
    noticeTitle: "Instala el aviso para visitantes · Gratis",
    noticeBody:
      "Copia un script, adapta el mensaje y comprueba el resultado publicado.",
    leadDone: "Escaneo desbloqueado.",
    emailPlaceholder: "Correo de trabajo",
    sendPlan: "Enviar por correo",
    copied: "Copiado",
    copyReport: "Copiar resultados",
    download: "Descargar PDF",
    pdfTitle: "Escaneo de transparencia de IA en página pública",
    pdfGenerated: "Generado",
    pdfFindings: "Puntos detectados",
    pdfActions: "Acciones prioritarias",
    pdfScope:
      "Alcance: revisión automática de una página pública. Los sistemas privados, la IA propia y las funciones de la organización requieren una evaluación completa.",
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
    title: "Prüfen Sie die sichtbaren KI-Hinweise Ihrer Website",
    intro:
      "Geben Sie eine öffentliche URL ein. RapidAct prüft HTML, Skripte und 52 bekannte KI-Signaturen und liefert eine technische Vorschau. Kein Konto nötig.",
    scope:
      "Eine Signatur ist ein technisches Signal, keine rechtliche Klassifizierung. Rolle, Zweck und Ausnahmen müssen separat geprüft werden.",
    companyLead:
      "Benötigen Sie die unternehmensweite Sicht einschließlich interner Systeme und Maßnahmenplan?",
    companyLink: "99-€-Bewertung starten",
    placeholder: "ihre-website.de",
    scan: "Website scannen",
    scanning: "Scan läuft",
    emailGateLabel: "Scan erhalten",
    emailGateTitle: "Wohin dürfen wir das Ergebnis freischalten?",
    emailGateBody:
      "Geben Sie Ihre geschäftliche E-Mail ein, um den Scan zu starten und auf das einseitige PDF zuzugreifen. Jede gültige E-Mail-Adresse funktioniert.",
    emailGateField: "Geschäftliche E-Mail",
    emailGateHint: "Wir verwenden sie für diesen Scan und relevante Nachfragen.",
    emailGateContinue: "Kostenlosen Scan starten",
    emailGateCancel: "Abbrechen",
    emailGateInvalid: "Geben Sie eine gültige E-Mail-Adresse ein.",
    emailGateError:
      "Die E-Mail konnte nicht gespeichert werden. Bitte erneut versuchen.",
    progress: "Öffentlicher Seiten-Scan",
    stages: [
      {
        label: "Verbindung zur Seite",
        detail: "Adresse und öffentliche Antwort werden geprüft.",
      },
      {
        label: "Veröffentlichter Code",
        detail: "HTML, Skripte und eingebettete Tools werden gelesen.",
      },
      {
        label: "KI-Signaturen",
        detail: "Abgleich mit 52 bekannten Technologien.",
      },
      {
        label: "Ergebnisse",
        detail: "Treffer werden in Bewertung und Maßnahmen übersetzt.",
      },
    ],
    fullLabel: "Kostenloser Scan abgeschlossen",
    fullTitle: "Diese Vorschau prüft eine öffentliche Seite",
    fullBody:
      "Weitere Seiten, private Systeme und interne KI-Nutzung können weiterhin geprüft werden müssen. Fordern Sie den vollständigen Scan und einen unternehmensweiten Maßnahmenplan an.",
    fullCta: "Bewertung starten · 99 €",
    fullWhatsapp: "Vollständigen Scan anfordern",
    guidedCta: "Lieber geführte Fragen? KI-Leitfaden öffnen",
    failureTitle: "Diese Seite konnte nicht gescannt werden",
    rateLimited: "Scan-Limit erreicht. Versuchen Sie es in einigen Minuten.",
    invalidUrl: "Geben Sie eine gültige öffentliche Webadresse ein.",
    unreachable: error =>
      `Die Seite antwortete nicht (${error}). Prüfen Sie eine andere URL oder fahren Sie mit der manuellen Bewertung fort.`,
    failureCta: "Mit Bewertung fortfahren · 99 €",
    scoreLabels: [
      "Hohe sichtbare Exposition — jetzt prüfen",
      "Hinweislücken gefunden",
      "Niedrige sichtbare Exposition",
    ],
    readiness: "sichtbare Bereitschaft / 100",
    summary: (total, high, undisclosed) =>
      `${total} KI-Kontaktpunkt${total === 1 ? "" : "e"} · ${high} hohe Exposition · ${undisclosed} ohne sichtbaren Hinweis`,
    article: "Artikel",
    evidence: "Technischer Treffer",
    disclosureFound: "Hinweis gefunden — Zeitpunkt und Sichtbarkeit prüfen",
    disclosureMissing:
      "Kein Hinweis gefunden — Rolle und erste Interaktion prüfen",
    noSignaturesTitle: "Keine bekannte KI-Signatur gefunden",
    noSignaturesBody:
      "Der Scan prüft 52 Signaturen. Individuelle KI und interne Systeme können dennoch relevant sein.",
    planTitle: "Ihre Implementierungsvorschau",
    planSubtitle:
      "Ergebnis kopieren oder als einseitiges PDF herunterladen.",
    step: "Maßnahme",
    alwaysStep: "Implementierungsnachweise sichern",
    evidenceBody:
      "Dokumentieren Sie URL, Freigabetext, Rolle, Verantwortlichen, Datum und Desktop-/Mobilprüfung. Der Hinweis erstellt kein Nachweisprotokoll.",
    assessmentTitle: "Gesamtes Unternehmen bewerten · 99 €",
    assessmentBody:
      "Erhalten Sie Inventar, Klassifizierungen, Hinweise und Maßnahmenplan in 24–48 Stunden.",
    noticeTitle: "Besucherhinweis installieren · Kostenlos",
    noticeBody:
      "Ein Skript kopieren, Aussage anpassen und Veröffentlichung prüfen.",
    leadDone: "Scan freigeschaltet.",
    emailPlaceholder: "Geschäftliche E-Mail",
    sendPlan: "Plan per E-Mail",
    copied: "Kopiert",
    copyReport: "Ergebnisse kopieren",
    download: "PDF herunterladen",
    pdfTitle: "KI-Transparenzscan einer öffentlichen Seite",
    pdfGenerated: "Erstellt",
    pdfFindings: "Erkannte Berührungspunkte",
    pdfActions: "Priorisierte Maßnahmen",
    pdfScope:
      "Umfang: automatisierte Prüfung einer öffentlichen Seite. Private Systeme, individuelle KI und Organisationsrollen erfordern eine vollständige Bewertung.",
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
    title: "Vérifiez les mentions IA visibles sur votre site",
    intro:
      "Saisissez une URL publique. RapidAct vérifie le HTML, les scripts et 52 signatures IA connues, puis fournit un aperçu technique. Aucun compte requis.",
    scope:
      "Une signature est un signal technique, pas une classification juridique. Le rôle, la finalité et les exceptions doivent encore être vérifiés.",
    companyLead:
      "Besoin d’une vue globale, y compris les systèmes internes et un plan écrit ?",
    companyLink: "Commencer l’évaluation à 99 €",
    placeholder: "votre-site.fr",
    scan: "Scanner le site",
    scanning: "Analyse en cours",
    emailGateLabel: "Recevoir votre analyse",
    emailGateTitle: "Où devons-nous débloquer le résultat ?",
    emailGateBody:
      "Saisissez votre e-mail professionnel pour lancer l’analyse et accéder au PDF d’une page. Toute adresse e-mail valide fonctionne.",
    emailGateField: "E-mail professionnel",
    emailGateHint:
      "Nous l’utilisons pour cette analyse et son suivi pertinent.",
    emailGateContinue: "Lancer l’analyse gratuite",
    emailGateCancel: "Annuler",
    emailGateInvalid: "Saisissez une adresse e-mail valide.",
    emailGateError:
      "Impossible d’enregistrer l’e-mail. Veuillez réessayer.",
    progress: "Scan de page publique",
    stages: [
      {
        label: "Connexion à la page",
        detail: "Vérification de l’adresse et de la réponse publique.",
      },
      {
        label: "Lecture du code publié",
        detail: "Analyse du HTML, des scripts et des outils intégrés.",
      },
      {
        label: "Vérification des signatures IA",
        detail: "Comparaison avec 52 technologies connues.",
      },
      {
        label: "Préparation des résultats",
        detail: "Conversion des correspondances en score et actions.",
      },
    ],
    fullLabel: "Analyse gratuite terminée",
    fullTitle: "Cet aperçu vérifie une page publique",
    fullBody:
      "D’autres pages, systèmes privés et usages internes de l’IA peuvent encore nécessiter un examen. Demandez l’analyse complète et un plan d’action pour l’entreprise.",
    fullCta: "Commencer l’évaluation · 99 €",
    fullWhatsapp: "Demander l’analyse complète",
    guidedCta: "Vous préférez être guidé ? Ouvrir le guide IA",
    failureTitle: "Cette page n’a pas pu être scannée",
    rateLimited: "Limite de scans atteinte. Réessayez dans quelques minutes.",
    invalidUrl: "Saisissez une adresse de site public valide.",
    unreachable: error =>
      `La page n’a pas répondu (${error}). Essayez une autre URL ou poursuivez avec l’évaluation manuelle.`,
    failureCta: "Continuer avec l’évaluation · 99 €",
    scoreLabels: [
      "Exposition visible élevée — à examiner",
      "Mentions manquantes",
      "Faible exposition visible",
    ],
    readiness: "préparation visible / 100",
    summary: (total, high, undisclosed) =>
      `${total} point${total === 1 ? "" : "s"} de contact IA · ${high} forte exposition · ${undisclosed} sans mention visible`,
    article: "Article",
    evidence: "Correspondance technique",
    disclosureFound: "Mention trouvée — vérifiez le moment et la visibilité",
    disclosureMissing:
      "Aucune mention trouvée — vérifiez le rôle et la première interaction",
    noSignaturesTitle: "Aucune signature IA connue trouvée",
    noSignaturesBody:
      "Le scan vérifie 52 signatures. L’IA sur mesure et les systèmes internes peuvent toujours être concernés.",
    planTitle: "Aperçu de mise en œuvre",
    planSubtitle: "Copiez le résultat ou téléchargez le PDF d’une page.",
    step: "Action",
    alwaysStep: "Conserver les preuves de mise en œuvre",
    evidenceBody:
      "Conservez l’URL, le texte approuvé, le rôle, le responsable, la date et la vérification ordinateur/mobile. L’avis ne crée pas de journal de preuves.",
    assessmentTitle: "Évaluer toute l’entreprise · 99 €",
    assessmentBody:
      "Recevez l’inventaire, les classifications, les mentions et le plan priorisé sous 24–48 h.",
    noticeTitle: "Installer l’avis visiteur · Gratuit",
    noticeBody:
      "Copiez un script, adaptez le message et vérifiez le résultat publié.",
    leadDone: "Analyse débloquée.",
    emailPlaceholder: "E-mail professionnel",
    sendPlan: "Envoyer ce plan",
    copied: "Copié",
    copyReport: "Copier les résultats",
    download: "Télécharger le PDF",
    pdfTitle: "Analyse de transparence IA d’une page publique",
    pdfGenerated: "Généré",
    pdfFindings: "Points de contact détectés",
    pdfActions: "Actions prioritaires",
    pdfScope:
      "Portée : examen automatisé d’une page publique. Les systèmes privés, l’IA sur mesure et les rôles de l’organisation exigent une évaluation complète.",
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
    title: "Controlla gli avvisi IA visibili sul tuo sito",
    intro:
      "Inserisci un URL pubblico. RapidAct verifica HTML, script e 52 firme IA note, poi restituisce un’anteprima tecnica. Nessun account richiesto.",
    scope:
      "Una firma è un segnale tecnico, non una classificazione legale. Ruolo, finalità ed eccezioni devono essere verificati separatamente.",
    companyLead:
      "Ti serve la visione aziendale completa, inclusi sistemi interni e piano scritto?",
    companyLink: "Inizia la valutazione da 99 €",
    placeholder: "il-tuo-sito.it",
    scan: "Scansiona sito",
    scanning: "Scansione",
    emailGateLabel: "Ricevi la scansione",
    emailGateTitle: "Dove dobbiamo sbloccare il risultato?",
    emailGateBody:
      "Inserisci l’e-mail di lavoro per avviare la scansione e accedere al PDF di una pagina. Qualsiasi indirizzo e-mail valido è accettato.",
    emailGateField: "E-mail di lavoro",
    emailGateHint: "La usiamo per questa scansione e il relativo seguito.",
    emailGateContinue: "Avvia scansione gratuita",
    emailGateCancel: "Annulla",
    emailGateInvalid: "Inserisci un indirizzo e-mail valido.",
    emailGateError:
      "Non è stato possibile salvare l’e-mail. Riprova.",
    progress: "Scansione pagina pubblica",
    stages: [
      {
        label: "Connessione alla pagina",
        detail: "Verifica dell’indirizzo e della risposta pubblica.",
      },
      {
        label: "Lettura del codice pubblicato",
        detail: "Analisi di HTML, script e strumenti incorporati.",
      },
      {
        label: "Controllo firme IA",
        detail: "Confronto con 52 tecnologie note.",
      },
      {
        label: "Preparazione risultati",
        detail: "Conversione delle corrispondenze in punteggio e azioni.",
      },
    ],
    fullLabel: "Scansione gratuita completata",
    fullTitle: "Questa anteprima controlla una pagina pubblica",
    fullBody:
      "Altre pagine, sistemi privati e usi interni dell’IA possono richiedere una verifica. Richiedi la scansione completa e un piano d’azione aziendale.",
    fullCta: "Inizia valutazione · 99 €",
    fullWhatsapp: "Richiedi scansione completa",
    guidedCta: "Preferisci domande guidate? Apri la guida IA",
    failureTitle: "Impossibile scansionare la pagina",
    rateLimited: "Limite di scansioni raggiunto. Riprova tra qualche minuto.",
    invalidUrl: "Inserisci un indirizzo web pubblico valido.",
    unreachable: error =>
      `La pagina non ha risposto (${error}). Prova un altro URL o continua con la valutazione manuale.`,
    failureCta: "Continua con la valutazione · 99 €",
    scoreLabels: [
      "Esposizione visibile alta — verifica ora",
      "Avvisi mancanti",
      "Esposizione visibile bassa",
    ],
    readiness: "preparazione visibile / 100",
    summary: (total, high, undisclosed) =>
      `${total} punto${total === 1 ? "" : "i"} di contatto IA · ${high} alta esposizione · ${undisclosed} senza avviso visibile`,
    article: "Articolo",
    evidence: "Corrispondenza tecnica",
    disclosureFound: "Avviso trovato — verifica tempistica e visibilità",
    disclosureMissing:
      "Nessun avviso trovato — verifica ruolo e prima interazione",
    noSignaturesTitle: "Nessuna firma IA nota trovata",
    noSignaturesBody:
      "La scansione controlla 52 firme. L’IA personalizzata e i sistemi interni possono essere comunque rilevanti.",
    planTitle: "Anteprima di implementazione",
    planSubtitle: "Copia il risultato o scarica il PDF di una pagina.",
    step: "Azione",
    alwaysStep: "Conserva le prove di implementazione",
    evidenceBody:
      "Registra URL, testo approvato, ruolo, responsabile, data e verifica desktop/mobile. L’avviso non crea un registro di prove.",
    assessmentTitle: "Valuta tutta l’azienda · 99 €",
    assessmentBody:
      "Ricevi inventario, classificazioni, avvisi e piano prioritario entro 24–48 ore.",
    noticeTitle: "Installa l’avviso visitatore · Gratis",
    noticeBody:
      "Copia uno script, adatta il messaggio e verifica il risultato pubblicato.",
    leadDone: "Scansione sbloccata.",
    emailPlaceholder: "E-mail di lavoro",
    sendPlan: "Invia il piano",
    copied: "Copiato",
    copyReport: "Copia risultati",
    download: "Scarica PDF",
    pdfTitle: "Scansione trasparenza IA di una pagina pubblica",
    pdfGenerated: "Generato",
    pdfFindings: "Punti di contatto rilevati",
    pdfActions: "Azioni prioritarie",
    pdfScope:
      "Ambito: verifica automatica di una pagina pubblica. Sistemi privati, IA personalizzata e ruoli organizzativi richiedono una valutazione completa.",
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
