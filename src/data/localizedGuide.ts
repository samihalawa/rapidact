import type { Lang } from "@/lib/content";

export type GuideCopy = {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  noticeMessage: string;
  installLabel: string;
  installTitle: string;
  installBody: string;
  preview: string;
  installCode: string;
  copy: string;
  copied: string;
  installerTitle: string;
  installerBody: string;
  tagManagerTitle: string;
  tagManagerBody: string;
  anySiteTitle: string;
  openGuide: string;
  installers: Record<
    "wordpress" | "shopify" | "wix",
    {
      type: string;
      body: string;
      action: string;
    }
  >;
  steps: [string, string, string][];
  scope: string;
  scopeLink: string;
  appliesTitle: string;
  appliesBody: string;
  deadlineTitle: string;
  deadlineBody: string;
  riskTitle: string;
  riskBody: string;
  dutiesTitle: string;
  readGuide: string;
  platformsTitle: string;
};

export const GUIDE_COPY: Record<Lang, GuideCopy> = {
  en: {
    seoTitle: "EU AI Act Article 50: duties and free AI notice | RapidAct",
    seoDescription:
      "Identify the Article 50 duty that applies, publish the right notice and install RapidAct’s free visitor-facing AI disclosure.",
    title: "Act on EU AI Act Article 50",
    intro:
      "From 2 August 2026, Article 50 sets transparency duties for specific AI uses. Identify the system, confirm your role and publish the right notice at the right moment.",
    noticeMessage:
      "This site uses an AI assistant. You are interacting with an AI system, not a person.",
    installLabel: "Free AI notice",
    installTitle: "Publish your visitor notice in one paste",
    installBody:
      "Copy the script into your site-wide custom code, tailor the message and check the published notice as a visitor.",
    preview: "Preview",
    installCode: "Install code",
    copy: "Copy code",
    copied: "Copied",
    installerTitle: "Choose the fastest installation",
    installerBody:
      "Each option is a thin installer for the same RapidAct runtime. Improvements load from rapidact.eu automatically; there is no copied engine to maintain.",
    tagManagerTitle: "Already use Google Tag Manager?",
    tagManagerBody:
      "Create a Custom HTML tag, paste the hosted script below and trigger it on Initialization – All Pages. No RapidAct login or OAuth access is required.",
    anySiteTitle: "Any website: copy the hosted script",
    openGuide: "Installation guide",
    installers: {
      wordpress: {
        type: "Direct plugin · ZIP",
        body: "Upload, activate and tailor the notice from WordPress Settings.",
        action: "Download WordPress plugin",
      },
      shopify: {
        type: "Theme kit · ZIP",
        body: "Add one Liquid snippet and one render line to your storefront.",
        action: "Download Shopify kit",
      },
      wix: {
        type: "Custom Code · ZIP",
        body: "Paste once in Wix Custom Code and apply it to every page.",
        action: "Download Wix kit",
      },
    },
    steps: [
      ["01", "Copy", "Copy the script. No account required."],
      ["02", "Tailor", "State how visitors encounter AI on your site."],
      ["03", "Publish", "Check the notice on desktop and mobile."],
    ],
    scope:
      "The notice addresses one visitor-facing disclosure step. Your exact duty still depends on the system and whether you are its provider or deployer.",
    scopeLink: "Check the Commission’s Article 50 guidance",
    appliesTitle: "Confirm whether Article 50 applies",
    appliesBody:
      "Check your role and the system’s function. Duties cover certain direct AI interactions, emotion or biometric categorisation, deepfakes and some AI-generated public-interest text.",
    deadlineTitle: "Plan for 2 August 2026",
    deadlineBody:
      "Article 50 applies from 2 August 2026. A limited transition for some machine-readable marking duties is not a general delay. Record which rule applies to each system.",
    riskTitle: "Document the decision",
    riskBody:
      "Article 50 infringements can attract fines of up to €15 million or 3% of worldwide annual turnover. Keep the system, role, approved wording, publication date and rendered notice together.",
    dutiesTitle: "Choose the relevant duty",
    readGuide: "Open guide",
    platformsTitle: "Install the notice on your platform",
  },
  es: {
    seoTitle:
      "Artículo 50 de la Ley de IA: obligaciones y aviso gratis | RapidAct",
    seoDescription:
      "Identifica la obligación del artículo 50, publica el aviso correcto e instala gratis la divulgación de IA de RapidAct.",
    title: "Actúa sobre el artículo 50 de la Ley de IA",
    intro:
      "Desde el 2 de agosto de 2026, el artículo 50 establece obligaciones de transparencia para usos concretos de IA. Identifica el sistema, confirma tu función y publica el aviso adecuado en el momento correcto.",
    noticeMessage:
      "Este sitio utiliza un asistente de IA. Estás interactuando con un sistema de IA, no con una persona.",
    installLabel: "Aviso de IA gratuito",
    installTitle: "Publica el aviso para visitantes con un solo pegado",
    installBody:
      "Copia el script en el código global de tu web, adapta el mensaje y comprueba el aviso publicado como visitante.",
    preview: "Vista previa",
    installCode: "Código de instalación",
    copy: "Copiar código",
    copied: "Copiado",
    installerTitle: "Elige la instalación más rápida",
    installerBody:
      "Cada opción es un instalador ligero para el mismo sistema RapidAct. Las mejoras se cargan automáticamente desde rapidact.eu, sin mantener copias.",
    tagManagerTitle: "¿Ya usas Google Tag Manager?",
    tagManagerBody:
      "Crea una etiqueta HTML personalizada, pega el script alojado y actívala en Inicialización – Todas las páginas. No necesitas iniciar sesión en RapidAct ni usar OAuth.",
    anySiteTitle: "Cualquier web: copia el script alojado",
    openGuide: "Guía de instalación",
    installers: {
      wordpress: {
        type: "Plugin directo · ZIP",
        body: "Súbelo, actívalo y adapta el aviso desde Ajustes de WordPress.",
        action: "Descargar plugin WordPress",
      },
      shopify: {
        type: "Kit de tema · ZIP",
        body: "Añade un snippet Liquid y una línea de renderizado a tu tienda.",
        action: "Descargar kit Shopify",
      },
      wix: {
        type: "Código personalizado · ZIP",
        body: "Pégalo una vez en Código personalizado y aplícalo a todas las páginas.",
        action: "Descargar kit Wix",
      },
    },
    steps: [
      ["01", "Copia", "Copia el script. No necesitas una cuenta."],
      ["02", "Adapta", "Explica cómo encuentran la IA los visitantes."],
      ["03", "Publica", "Comprueba el aviso en móvil y ordenador."],
    ],
    scope:
      "El aviso cubre un paso visible para el visitante. La obligación exacta depende del sistema y de si eres proveedor o responsable del despliegue.",
    scopeLink: "Consulta la guía de la Comisión sobre el artículo 50",
    appliesTitle: "Confirma si se aplica el artículo 50",
    appliesBody:
      "Revisa tu función y lo que hace el sistema. Las obligaciones cubren determinadas interacciones directas con IA, categorización emocional o biométrica, deepfakes y algunos textos de interés público generados por IA.",
    deadlineTitle: "Prepárate para el 2 de agosto de 2026",
    deadlineBody:
      "El artículo 50 se aplica desde el 2 de agosto de 2026. La transición limitada para algunas marcas legibles por máquina no es un aplazamiento general. Registra qué norma corresponde a cada sistema.",
    riskTitle: "Documenta la decisión",
    riskBody:
      "Las infracciones pueden alcanzar 15 millones de euros o el 3 % de la facturación mundial anual. Conserva juntos el sistema, la función, el texto aprobado, la fecha de publicación y el aviso renderizado.",
    dutiesTitle: "Elige la obligación pertinente",
    readGuide: "Abrir guía",
    platformsTitle: "Instala el aviso en tu plataforma",
  },
  de: {
    seoTitle:
      "EU AI Act Artikel 50: Pflichten und kostenloser KI-Hinweis | RapidAct",
    seoDescription:
      "Bestimmen Sie die Artikel-50-Pflicht, veröffentlichen Sie den richtigen Hinweis und installieren Sie den kostenlosen RapidAct KI-Hinweis.",
    title: "Setzen Sie Artikel 50 des EU AI Act um",
    intro:
      "Ab 2. August 2026 gelten Transparenzpflichten für bestimmte KI-Anwendungen. Identifizieren Sie das System, klären Sie Ihre Rolle und veröffentlichen Sie den passenden Hinweis rechtzeitig.",
    noticeMessage:
      "Diese Website nutzt einen KI-Assistenten. Sie interagieren mit einem KI-System, nicht mit einer Person.",
    installLabel: "Kostenloser KI-Hinweis",
    installTitle: "Veröffentlichen Sie den Besucherhinweis mit einem Einfügen",
    installBody:
      "Kopieren Sie das Skript in den globalen Website-Code, passen Sie die Aussage an und prüfen Sie den veröffentlichten Hinweis als Besucher.",
    preview: "Vorschau",
    installCode: "Installationscode",
    copy: "Code kopieren",
    copied: "Kopiert",
    installerTitle: "Wählen Sie die schnellste Installation",
    installerBody:
      "Jede Option ist ein schlanker Installer für dieselbe RapidAct-Laufzeit. Verbesserungen werden automatisch von rapidact.eu geladen.",
    tagManagerTitle: "Nutzen Sie bereits Google Tag Manager?",
    tagManagerBody:
      "Erstellen Sie ein benutzerdefiniertes HTML-Tag, fügen Sie das gehostete Skript ein und verwenden Sie Initialisierung – Alle Seiten. Kein RapidAct-Login oder OAuth-Zugriff nötig.",
    anySiteTitle: "Jede Website: gehostetes Skript kopieren",
    openGuide: "Installationsanleitung",
    installers: {
      wordpress: {
        type: "Direktes Plugin · ZIP",
        body: "Hochladen, aktivieren und den Hinweis in WordPress anpassen.",
        action: "WordPress-Plugin laden",
      },
      shopify: {
        type: "Theme-Kit · ZIP",
        body: "Ein Liquid-Snippet und eine Render-Zeile zum Shop hinzufügen.",
        action: "Shopify-Kit laden",
      },
      wix: {
        type: "Benutzerdefinierter Code · ZIP",
        body: "Einmal in Wix einfügen und auf alle Seiten anwenden.",
        action: "Wix-Kit laden",
      },
    },
    steps: [
      ["01", "Kopieren", "Kopieren Sie das Skript. Kein Konto nötig."],
      ["02", "Anpassen", "Beschreiben Sie, wie Besucher mit KI interagieren."],
      [
        "03",
        "Veröffentlichen",
        "Prüfen Sie den Hinweis auf Desktop und Mobilgerät.",
      ],
    ],
    scope:
      "Der Hinweis deckt einen sichtbaren Offenlegungsschritt ab. Die genaue Pflicht hängt vom System und Ihrer Anbieter- oder Betreiberrolle ab.",
    scopeLink: "Artikel-50-Leitfaden der Kommission prüfen",
    appliesTitle: "Prüfen Sie die Anwendbarkeit von Artikel 50",
    appliesBody:
      "Prüfen Sie Rolle und Systemfunktion. Pflichten betreffen bestimmte direkte KI-Interaktionen, Emotions- oder biometrische Kategorisierung, Deepfakes und einige KI-generierte Texte von öffentlichem Interesse.",
    deadlineTitle: "Planen Sie für den 2. August 2026",
    deadlineBody:
      "Artikel 50 gilt ab 2. August 2026. Die begrenzte Übergangsfrist für einzelne maschinenlesbare Kennzeichnungen ist keine allgemeine Verschiebung. Ordnen Sie jedem System die richtige Regel zu.",
    riskTitle: "Dokumentieren Sie die Entscheidung",
    riskBody:
      "Verstöße können mit bis zu 15 Mio. € oder 3 % des weltweiten Jahresumsatzes geahndet werden. Dokumentieren Sie System, Rolle, Freigabetext, Veröffentlichungsdatum und gerenderten Hinweis.",
    dutiesTitle: "Wählen Sie die relevante Pflicht",
    readGuide: "Leitfaden öffnen",
    platformsTitle: "Installieren Sie den Hinweis auf Ihrer Plattform",
  },
  fr: {
    seoTitle:
      "Article 50 de l’AI Act : obligations et avis IA gratuit | RapidAct",
    seoDescription:
      "Identifiez l’obligation de l’article 50, publiez la bonne mention et installez gratuitement l’avis IA RapidAct.",
    title: "Agissez sur l’article 50 de l’AI Act",
    intro:
      "À partir du 2 août 2026, l’article 50 impose des obligations de transparence pour certains usages de l’IA. Identifiez le système, confirmez votre rôle et publiez la bonne mention au bon moment.",
    noticeMessage:
      "Ce site utilise un assistant IA. Vous interagissez avec un système d’IA, pas avec une personne.",
    installLabel: "Avis IA gratuit",
    installTitle: "Publiez l’avis visiteur en un seul collage",
    installBody:
      "Copiez le script dans le code global du site, adaptez le message et vérifiez l’avis publié comme un visiteur.",
    preview: "Aperçu",
    installCode: "Code d’installation",
    copy: "Copier le code",
    copied: "Copié",
    installerTitle: "Choisissez l’installation la plus rapide",
    installerBody:
      "Chaque option est un installateur léger pour le même moteur RapidAct. Les améliorations se chargent automatiquement depuis rapidact.eu.",
    tagManagerTitle: "Vous utilisez déjà Google Tag Manager ?",
    tagManagerBody:
      "Créez une balise HTML personnalisée, collez le script hébergé et déclenchez-la sur Initialisation – Toutes les pages. Aucun compte RapidAct ni accès OAuth requis.",
    anySiteTitle: "Tout site : copiez le script hébergé",
    openGuide: "Guide d’installation",
    installers: {
      wordpress: {
        type: "Extension directe · ZIP",
        body: "Importez, activez et adaptez l’avis dans les réglages WordPress.",
        action: "Télécharger pour WordPress",
      },
      shopify: {
        type: "Kit de thème · ZIP",
        body: "Ajoutez un snippet Liquid et une ligne de rendu à la boutique.",
        action: "Télécharger pour Shopify",
      },
      wix: {
        type: "Code personnalisé · ZIP",
        body: "Collez-le une fois dans Wix et appliquez-le à toutes les pages.",
        action: "Télécharger pour Wix",
      },
    },
    steps: [
      ["01", "Copier", "Copiez le script. Aucun compte requis."],
      ["02", "Adapter", "Indiquez comment les visiteurs rencontrent l’IA."],
      ["03", "Publier", "Vérifiez l’avis sur ordinateur et mobile."],
    ],
    scope:
      "L’avis traite une étape visible pour le visiteur. L’obligation exacte dépend du système et de votre rôle de fournisseur ou déployeur.",
    scopeLink: "Consulter les lignes directrices de la Commission",
    appliesTitle: "Confirmez si l’article 50 s’applique",
    appliesBody:
      "Vérifiez votre rôle et la fonction du système. Les obligations couvrent certaines interactions directes avec l’IA, la catégorisation émotionnelle ou biométrique, les deepfakes et certains textes d’intérêt public générés par IA.",
    deadlineTitle: "Préparez le 2 août 2026",
    deadlineBody:
      "L’article 50 s’applique à partir du 2 août 2026. La transition limitée de certains marquages lisibles par machine n’est pas un report général. Associez la bonne règle à chaque système.",
    riskTitle: "Documentez la décision",
    riskBody:
      "Les infractions peuvent atteindre 15 millions d’euros ou 3 % du chiffre d’affaires annuel mondial. Conservez le système, le rôle, le texte approuvé, la date et l’avis rendu.",
    dutiesTitle: "Choisissez l’obligation pertinente",
    readGuide: "Ouvrir le guide",
    platformsTitle: "Installez l’avis sur votre plateforme",
  },
  it: {
    seoTitle: "Articolo 50 AI Act: obblighi e avviso IA gratuito | RapidAct",
    seoDescription:
      "Identifica l’obbligo dell’articolo 50, pubblica l’avviso corretto e installa gratuitamente l’avviso IA RapidAct.",
    title: "Agisci sull’articolo 50 dell’AI Act",
    intro:
      "Dal 2 agosto 2026, l’articolo 50 stabilisce obblighi di trasparenza per usi specifici dell’IA. Identifica il sistema, conferma il tuo ruolo e pubblica l’avviso giusto al momento giusto.",
    noticeMessage:
      "Questo sito utilizza un assistente IA. Stai interagendo con un sistema di IA, non con una persona.",
    installLabel: "Avviso IA gratuito",
    installTitle: "Pubblica l’avviso per i visitatori con un solo incolla",
    installBody:
      "Copia lo script nel codice globale del sito, adatta il messaggio e verifica l’avviso pubblicato come visitatore.",
    preview: "Anteprima",
    installCode: "Codice di installazione",
    copy: "Copia codice",
    copied: "Copiato",
    installerTitle: "Scegli l’installazione più rapida",
    installerBody:
      "Ogni opzione è un installer leggero per lo stesso runtime RapidAct. I miglioramenti vengono caricati automaticamente da rapidact.eu.",
    tagManagerTitle: "Usi già Google Tag Manager?",
    tagManagerBody:
      "Crea un tag HTML personalizzato, incolla lo script ospitato e attivalo su Inizializzazione – Tutte le pagine. Non servono accesso RapidAct o OAuth.",
    anySiteTitle: "Qualsiasi sito: copia lo script ospitato",
    openGuide: "Guida all’installazione",
    installers: {
      wordpress: {
        type: "Plugin diretto · ZIP",
        body: "Carica, attiva e personalizza l’avviso dalle impostazioni WordPress.",
        action: "Scarica plugin WordPress",
      },
      shopify: {
        type: "Kit tema · ZIP",
        body: "Aggiungi uno snippet Liquid e una riga di rendering al negozio.",
        action: "Scarica kit Shopify",
      },
      wix: {
        type: "Codice personalizzato · ZIP",
        body: "Incolla una volta in Wix e applica il codice a tutte le pagine.",
        action: "Scarica kit Wix",
      },
    },
    steps: [
      ["01", "Copia", "Copia lo script. Nessun account richiesto."],
      ["02", "Adatta", "Indica come i visitatori incontrano l’IA."],
      ["03", "Pubblica", "Controlla l’avviso su desktop e mobile."],
    ],
    scope:
      "L’avviso copre un passaggio visibile al visitatore. L’obbligo esatto dipende dal sistema e dal tuo ruolo di fornitore o deployer.",
    scopeLink: "Consulta le linee guida della Commissione",
    appliesTitle: "Conferma se si applica l’articolo 50",
    appliesBody:
      "Verifica ruolo e funzione del sistema. Gli obblighi coprono alcune interazioni dirette con IA, categorizzazione emotiva o biometrica, deepfake e determinati testi di interesse pubblico generati dall’IA.",
    deadlineTitle: "Preparati per il 2 agosto 2026",
    deadlineBody:
      "L’articolo 50 si applica dal 2 agosto 2026. La transizione limitata per alcuni contrassegni leggibili da macchina non è un rinvio generale. Associa la regola corretta a ogni sistema.",
    riskTitle: "Documenta la decisione",
    riskBody:
      "Le violazioni possono comportare sanzioni fino a 15 milioni di euro o al 3% del fatturato annuo mondiale. Conserva sistema, ruolo, testo approvato, data e avviso renderizzato.",
    dutiesTitle: "Scegli l’obbligo pertinente",
    readGuide: "Apri guida",
    platformsTitle: "Installa l’avviso sulla tua piattaforma",
  },
};
