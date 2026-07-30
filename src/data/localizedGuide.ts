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

export type GuideCardCopy = {
  slug:
    | "chatbot-ai-disclosure"
    | "ai-content-labeling"
    | "deepfake-labeling"
    | "ai-disclosure-evidence";
  title: string;
  description: string;
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
    installTitle: "Publish a clear AI notice for every visitor",
    installBody:
      "Choose your platform, copy the working code and tailor the message. Publish it and check the result as a visitor.",
    preview: "Preview",
    installCode: "Install code",
    copy: "Copy code",
    copied: "Copied",
    installerTitle: "Install on your platform",
    installerBody:
      "Use the guided setup for WordPress, Shopify or Wix, or copy the hosted script for any website.",
    anySiteTitle: "Any website: copy the hosted script",
    openGuide: "Installation guide",
    installers: {
      wordpress: {
        type: "WordPress",
        body: "Add the notice through a Custom HTML block or your site footer.",
        action: "Open WordPress guide",
      },
      shopify: {
        type: "Shopify",
        body: "Add the notice to your theme before the closing body tag.",
        action: "Open Shopify guide",
      },
      wix: {
        type: "Wix",
        body: "Add EU AI Act Badge through the official Wix app—no code required.",
        action: "Open Wix guide",
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
    installTitle: "Publica un aviso de IA claro para cada visitante",
    installBody:
      "Elige tu plataforma, copia el código y adapta el mensaje. Publícalo y comprueba el resultado como visitante.",
    preview: "Vista previa",
    installCode: "Código de instalación",
    copy: "Copiar código",
    copied: "Copiado",
    installerTitle: "Instala en tu plataforma",
    installerBody:
      "Usa la guía para WordPress, Shopify o Wix, o copia el script alojado para cualquier web.",
    anySiteTitle: "Cualquier web: copia el script alojado",
    openGuide: "Guía de instalación",
    installers: {
      wordpress: {
        type: "WordPress",
        body: "Añade el aviso con un bloque HTML personalizado o en el pie.",
        action: "Abrir guía de WordPress",
      },
      shopify: {
        type: "Shopify",
        body: "Añade el aviso al tema antes del cierre del body.",
        action: "Abrir guía de Shopify",
      },
      wix: {
        type: "Wix",
        body: "Añade EU AI Act Badge con la aplicación oficial de Wix, sin código.",
        action: "Abrir guía de Wix",
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
    installTitle:
      "Veröffentlichen Sie einen klaren KI-Hinweis für alle Besucher",
    installBody:
      "Wählen Sie Ihre Plattform, kopieren Sie den fertigen Code und passen Sie den Text an. Veröffentlichen und prüfen Sie ihn als Besucher.",
    preview: "Vorschau",
    installCode: "Installationscode",
    copy: "Code kopieren",
    copied: "Kopiert",
    installerTitle: "Auf Ihrer Plattform installieren",
    installerBody:
      "Nutzen Sie die Anleitung für WordPress, Shopify oder Wix oder das gehostete Skript für jede Website.",
    anySiteTitle: "Jede Website: gehostetes Skript kopieren",
    openGuide: "Installationsanleitung",
    installers: {
      wordpress: {
        type: "WordPress",
        body: "Fügen Sie den Hinweis als HTML-Block oder im Footer ein.",
        action: "WordPress-Anleitung öffnen",
      },
      shopify: {
        type: "Shopify",
        body: "Fügen Sie den Hinweis vor dem schließenden Body-Tag ein.",
        action: "Shopify-Anleitung öffnen",
      },
      wix: {
        type: "Wix",
        body: "Fügen Sie EU AI Act Badge mit der offiziellen Wix-App hinzu – ohne Code.",
        action: "Wix-Anleitung öffnen",
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
    installTitle: "Publiez un avis IA clair pour chaque visiteur",
    installBody:
      "Choisissez votre plateforme, copiez le code et adaptez le message. Publiez-le et vérifiez le résultat comme un visiteur.",
    preview: "Aperçu",
    installCode: "Code d’installation",
    copy: "Copier le code",
    copied: "Copié",
    installerTitle: "Installez sur votre plateforme",
    installerBody:
      "Suivez le guide WordPress, Shopify ou Wix, ou copiez le script hébergé pour tout autre site.",
    anySiteTitle: "Tout site : copiez le script hébergé",
    openGuide: "Guide d’installation",
    installers: {
      wordpress: {
        type: "WordPress",
        body: "Ajoutez l’avis dans un bloc HTML ou le pied de page.",
        action: "Ouvrir le guide WordPress",
      },
      shopify: {
        type: "Shopify",
        body: "Ajoutez l’avis au thème avant la balise body fermante.",
        action: "Ouvrir le guide Shopify",
      },
      wix: {
        type: "Wix",
        body: "Ajoutez EU AI Act Badge avec l’application Wix officielle, sans code.",
        action: "Ouvrir le guide Wix",
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
    installTitle: "Pubblica un avviso IA chiaro per ogni visitatore",
    installBody:
      "Scegli la piattaforma, copia il codice e adatta il messaggio. Pubblicalo e verifica il risultato come visitatore.",
    preview: "Anteprima",
    installCode: "Codice di installazione",
    copy: "Copia codice",
    copied: "Copiato",
    installerTitle: "Installa sulla tua piattaforma",
    installerBody:
      "Segui la guida per WordPress, Shopify o Wix, oppure copia lo script ospitato per qualsiasi sito.",
    anySiteTitle: "Qualsiasi sito: copia lo script ospitato",
    openGuide: "Guida all’installazione",
    installers: {
      wordpress: {
        type: "WordPress",
        body: "Aggiungi l’avviso in un blocco HTML o nel footer.",
        action: "Apri la guida WordPress",
      },
      shopify: {
        type: "Shopify",
        body: "Aggiungi l’avviso al tema prima della chiusura del body.",
        action: "Apri la guida Shopify",
      },
      wix: {
        type: "Wix",
        body: "Aggiungi EU AI Act Badge con l’app Wix ufficiale, senza codice.",
        action: "Apri la guida Wix",
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

export const GUIDE_CARDS: Record<Lang, GuideCardCopy[]> = {
  en: [
    {
      slug: "chatbot-ai-disclosure",
      title: "Chatbot AI disclosure",
      description:
        "Article 50(1) requires providers of direct-interaction AI systems to tell people they are interacting with AI.",
    },
    {
      slug: "ai-content-labeling",
      title: "AI content labelling",
      description:
        "Separate machine-readable provider marking from visible disclosure duties for synthetic content.",
    },
    {
      slug: "deepfake-labeling",
      title: "Deepfake labelling",
      description:
        "Check which realistic AI-generated or manipulated media needs a visible disclosure.",
    },
    {
      slug: "ai-disclosure-evidence",
      title: "Evidence and records",
      description:
        "Keep the live URL, approved wording, owner, screenshots and review dates together.",
    },
  ],
  es: [
    {
      slug: "chatbot-ai-disclosure",
      title: "Aviso de IA en chatbots",
      description:
        "El artículo 50(1) exige que los proveedores informen cuando una persona interactúa directamente con una IA.",
    },
    {
      slug: "ai-content-labeling",
      title: "Etiquetado de contenido con IA",
      description:
        "Distingue el marcado legible por máquinas del proveedor y los avisos visibles sobre contenido sintético.",
    },
    {
      slug: "deepfake-labeling",
      title: "Etiquetado de deepfakes",
      description:
        "Comprueba qué imágenes, audio o vídeo realistas generados o alterados con IA necesitan un aviso visible.",
    },
    {
      slug: "ai-disclosure-evidence",
      title: "Pruebas y registros",
      description:
        "Conserva juntos la URL, el texto aprobado, el responsable, las capturas y las fechas de revisión.",
    },
  ],
  de: [
    {
      slug: "chatbot-ai-disclosure",
      title: "KI-Hinweis bei Chatbots",
      description:
        "Artikel 50(1) verlangt, dass Anbieter Menschen über die direkte Interaktion mit einem KI-System informieren.",
    },
    {
      slug: "ai-content-labeling",
      title: "Kennzeichnung von KI-Inhalten",
      description:
        "Trennen Sie maschinenlesbare Anbieterkennzeichnungen von sichtbaren Hinweisen auf synthetische Inhalte.",
    },
    {
      slug: "deepfake-labeling",
      title: "Deepfake-Kennzeichnung",
      description:
        "Prüfen Sie, welche realistischen KI-generierten oder manipulierten Medien einen sichtbaren Hinweis benötigen.",
    },
    {
      slug: "ai-disclosure-evidence",
      title: "Nachweise und Aufzeichnungen",
      description:
        "Bewahren Sie Live-URL, freigegebenen Text, Verantwortliche, Screenshots und Prüftermine zusammen auf.",
    },
  ],
  fr: [
    {
      slug: "chatbot-ai-disclosure",
      title: "Mention IA pour les chatbots",
      description:
        "L’article 50(1) impose aux fournisseurs d’informer les personnes lorsqu’elles interagissent directement avec une IA.",
    },
    {
      slug: "ai-content-labeling",
      title: "Étiquetage des contenus IA",
      description:
        "Distinguez le marquage lisible par machine du fournisseur et les mentions visibles sur les contenus synthétiques.",
    },
    {
      slug: "deepfake-labeling",
      title: "Étiquetage des deepfakes",
      description:
        "Vérifiez quels médias réalistes générés ou modifiés par IA nécessitent une mention visible.",
    },
    {
      slug: "ai-disclosure-evidence",
      title: "Preuves et registres",
      description:
        "Conservez ensemble l’URL, le texte approuvé, le responsable, les captures et les dates de contrôle.",
    },
  ],
  it: [
    {
      slug: "chatbot-ai-disclosure",
      title: "Avviso IA per i chatbot",
      description:
        "L’articolo 50(1) impone ai fornitori di informare le persone quando interagiscono direttamente con un sistema di IA.",
    },
    {
      slug: "ai-content-labeling",
      title: "Etichettatura dei contenuti IA",
      description:
        "Distingui la marcatura leggibile dalla macchina del fornitore dagli avvisi visibili sui contenuti sintetici.",
    },
    {
      slug: "deepfake-labeling",
      title: "Etichettatura dei deepfake",
      description:
        "Verifica quali contenuti realistici generati o modificati con IA richiedono un avviso visibile.",
    },
    {
      slug: "ai-disclosure-evidence",
      title: "Prove e registri",
      description:
        "Conserva insieme URL, testo approvato, responsabile, schermate e date di revisione.",
    },
  ],
};
