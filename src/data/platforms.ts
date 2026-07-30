import type { Lang } from "@/lib/content";

export const PLATFORM_SLUGS = [
  "wordpress",
  "wix",
  "shopify",
  "tidio",
  "botpress",
  "custom-website",
] as const;

export type PlatformSlug = (typeof PLATFORM_SLUGS)[number];

export interface PlatformGuide {
  slug: PlatformSlug;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  detectionNote: string;
  freeInstall: string[];
  commonWidgets: string[];
  installUrl?: string;
}

export const PLATFORMS: PlatformGuide[] = [
  {
    slug: "wordpress",
    name: "WordPress",
    metaTitle: "AI disclosure on WordPress — Article 50 setup | RapidAct",
    metaDescription:
      "Add a clear AI-interaction notice to WordPress with one configurable RapidAct script and no visitor tracking.",
    h1: "Add an AI disclosure notice to WordPress",
    intro:
      "If you provide an AI assistant under your own service or brand, Article 50(1) may require a clear notice before the first interaction. The free RapidAct notice gives you that visible technical layer without replacing the role and scope assessment.",
    detectionNote:
      "Run the free website scan first. A live browser performs a fast inspection of the submitted rendered page for functional AI touchpoints, disclosure wording and exact source evidence. Other pages, private plugins, back-office AI and contractual roles remain outside the free scan.",
    freeInstall: [
      "Open the RapidAct installer and choose WordPress.",
      "Download the WordPress plugin ZIP.",
      "In WordPress, open Plugins → Add New Plugin → Upload Plugin, then install and activate the ZIP.",
      "Open Settings → RapidAct AI Disclosure and choose the language, message, position and colour.",
      "Open the live page in a private window and verify the notice is visible before a visitor starts the AI interaction.",
    ],
    commonWidgets: [
      "Tidio (Lyro AI)",
      "WPBot",
      "Zendesk",
      "LiveChat / ChatBot.com",
      "Smartsupp",
      "Chatbase",
      "JivoChat",
    ],
  },
  {
    slug: "wix",
    name: "Wix",
    metaTitle:
      "AI disclosure on Wix — EU AI Act Article 50 setup guide | RapidAct",
    metaDescription:
      "Add an EU AI Act Article 50 notice to your Wix site with the official RapidAct app. Tailor the message and publish without code.",
    h1: "Add EU AI Act Badge to Wix",
    intro:
      "Wix sites often use AI chat, assistants or generated content. RapidAct adds one clear visitor notice across your site through the official Wix app, with no code or page-by-page editing.",
    detectionNote:
      "Run the free scan first: a live browser inspects the published Wix experience, including client-rendered widgets, and records any visible AI touchpoints or disclosure wording with the source URL.",
    installUrl: "https://wix.to/JKi80ih",
    freeInstall: [
      "Select Install on Wix to open the official Wix installation flow.",
      "Choose the Wix site where you want to add RapidAct and confirm the installation.",
      "Choose the language and notice details, then publish the site.",
      "Open the published page in a private window and verify the notice appears before the first AI interaction.",
    ],
    commonWidgets: ["Wix Chat (AI)", "Tidio", "Chatbase", "Custom GPT apps"],
  },
  {
    slug: "shopify",
    name: "Shopify",
    metaTitle:
      "AI disclosure on Shopify — EU AI Act Article 50 for online stores | RapidAct",
    metaDescription:
      "Add a clear AI-interaction notice to Shopify through the storefront theme with configurable wording.",
    h1: "Add an AI disclosure notice to Shopify",
    intro:
      "If your store provides an AI shopping or support assistant, you may need a clear direct-interaction notice. AI-generated content has separate rules, so first classify the system and your role; use the notice where it fits.",
    detectionNote:
      "The free scan opens the submitted rendered storefront page, then records functional AI touchpoints, disclosure wording and exact source evidence. It does not open other pages or infer whether an image was AI-generated when that is not directly observable.",
    freeInstall: [
      "Open the RapidAct installer and choose Shopify.",
      "Copy the generated script into the theme before the closing body tag.",
      "Choose the language and notice details, then save the theme.",
      "Open the storefront in a private window and verify the disclosure is visible before the first AI interaction.",
    ],
    commonWidgets: [
      "Tidio (Lyro)",
      "Gorgias AI Agent",
      "Willdesk",
      "Chatty",
      "Rep AI",
    ],
  },
  {
    slug: "tidio",
    name: "Tidio",
    metaTitle:
      "Tidio & Lyro AI disclosure — Article 50 compliance for Tidio users | RapidAct",
    metaDescription:
      "Using Tidio or Lyro AI? Learn when an Article 50 interaction notice may be needed and add a free, configurable notice without changing chat vendors.",
    h1: "Add a clear AI notice alongside Tidio or Lyro",
    intro:
      "Lyro can answer visitors automatically. Article 50(1) places the direct-interaction notice on the AI-system provider, while deployers have distinct duties in other Article 50 cases. Establish your role first, then make the notice clear before the first automated exchange.",
    detectionNote:
      "The free scan inspects the rendered page as a visitor, records visible Tidio or Lyro interactions and checks whether disclosure wording is actually observable. These observations do not determine your legal role.",
    freeInstall: [
      "Keep Tidio exactly as it is — you don't need to change vendors.",
      "Open the RapidAct notice installer and copy the production script.",
      "Paste it into the same site template that loads Tidio and name the AI assistant in the message.",
      "Publish, then verify in a private window that the disclosure is visible before the visitor starts chatting.",
    ],
    commonWidgets: [
      "Tidio live chat",
      "Lyro AI agent",
      "Tidio flows (automated replies)",
    ],
  },
  {
    slug: "botpress",
    name: "Botpress",
    metaTitle:
      "Botpress AI agent disclosure — Article 50 compliance guide | RapidAct",
    metaDescription:
      "Add a visible AI-interaction notice to a Botpress webchat without rebuilding the bot. One free script and practical verification steps.",
    h1: "Give your Botpress agent a clear AI identity",
    intro:
      "Botpress agents can hold natural conversations, so visitors may not know they are interacting with AI. If you are the provider responsible for the direct-interaction notice, disclose that fact before the exchange starts and keep the wording specific to the system.",
    detectionNote:
      "The free scan opens the rendered site and records a Botpress interaction only when it can observe direct evidence on the public page, together with any visible disclosure wording and the source URL.",
    freeInstall: [
      "Open the RapidAct notice installer and copy the production script.",
      "Add it to every page where the Botpress webchat loads and customize the title and message.",
      "Also consider repeating the notice in the bot's first message, then verify both surfaces in a private window.",
    ],
    commonWidgets: [
      "Botpress Webchat",
      "Custom GPT-based agents",
      "Voiceflow bots (similar setup)",
    ],
  },
  {
    slug: "custom-website",
    name: "Any website",
    metaTitle:
      "AI disclosure for any website — one script tag, EU AI Act ready | RapidAct",
    metaDescription:
      "No WordPress, no Wix? One script tag adds the Article 50 AI disclosure to any website — Webflow, Squarespace, custom stacks. Free, EN/ES, with evidence options.",
    h1: "Any stack, one script tag, disclosure done",
    intro:
      "Custom site, Webflow, Squarespace or a React app: the technical installation is the same. First establish whether Article 50 requires a direct-interaction notice for your role and system; if it does, the notice is one script you can paste yourself.",
    detectionNote:
      "The free scan uses a live browser for a fast inspection of the submitted rendered public page rather than relying on a fixed signature list. It reports directly observed evidence and clearly marks a page it could not inspect.",
    freeInstall: [
      "Copy the RapidAct snippet from the guide page.",
      "Paste it before the closing body tag of your pages (or in your tag manager).",
      "Set the title, message, provider, details URL, position and accent color with data attributes.",
      "Publish and verify the real page, at desktop and mobile widths, before relying on it.",
    ],
    commonWidgets: [
      "Custom GPT assistants",
      "Intercom Fin",
      "Drift",
      "HubSpot chat",
      "Voice AI widgets",
    ],
  },
];

type PlatformPageCopy = {
  notFound: string;
  back: string;
  platforms: string;
  confirmTitle: string;
  installTitle: (platform: PlatformGuide) => string;
  addNotice: string;
  installOfficial: (platform: PlatformGuide) => string;
  assessment: (platform: PlatformGuide) => string;
  otherPlatforms: string;
};

type PlatformLocale = {
  names: Partial<Record<PlatformSlug, string>>;
  metaTitle: (name: string) => string;
  metaDescription: (name: string) => string;
  customMetaTitle: string;
  customMetaDescription: string;
  h1: Record<PlatformSlug, string>;
  intro: Record<PlatformSlug, string>;
  detectionNote: Record<PlatformSlug, string>;
  openInstaller: (name: string) => string;
  customOpenInstaller: string;
  placement: Record<PlatformSlug, string>;
  configure: string;
  verify: string;
  specialInstall?: Partial<Record<PlatformSlug, string[]>>;
  widgetLabels: Partial<Record<string, string>>;
};

export const PLATFORM_PAGE_COPY: Record<Lang, PlatformPageCopy> = {
  en: {
    notFound: "Platform guide not found",
    back: "Back to RapidAct",
    platforms: "Platforms",
    confirmTitle: "Confirm the tool and its role",
    installTitle: platform => `Install the notice on ${platform.name}`,
    addNotice: "Add the AI-use notice",
    installOfficial: platform => `Install RapidAct on ${platform.name}`,
    assessment: platform =>
      `Need to confirm which systems and duties apply? The €99 company assessment covers ${platform.name} and the other AI systems your organisation operates.`,
    otherPlatforms: "Other platforms",
  },
  es: {
    notFound: "No se ha encontrado la guía de la plataforma",
    back: "Volver a RapidAct",
    platforms: "Plataformas",
    confirmTitle: "Confirma la herramienta y tu función",
    installTitle: platform =>
      platform.slug === "custom-website"
        ? "Instala el aviso en tu web"
        : `Instala el aviso en ${platform.name}`,
    addNotice: "Añadir el aviso de uso de IA",
    installOfficial: platform => `Instalar RapidAct en ${platform.name}`,
    assessment: platform =>
      `¿Necesitas confirmar qué sistemas y obligaciones se aplican? La evaluación de empresa de 99 € cubre ${
        platform.slug === "custom-website" ? "tu web" : platform.name
      } y el resto de sistemas de IA de tu organización.`,
    otherPlatforms: "Otras plataformas",
  },
  de: {
    notFound: "Plattform-Leitfaden nicht gefunden",
    back: "Zurück zu RapidAct",
    platforms: "Plattformen",
    confirmTitle: "Tool und eigene Rolle prüfen",
    installTitle: platform =>
      platform.slug === "custom-website"
        ? "Hinweis auf Ihrer Website installieren"
        : `Hinweis auf ${platform.name} installieren`,
    addNotice: "KI-Nutzungshinweis hinzufügen",
    installOfficial: platform => `RapidAct auf ${platform.name} installieren`,
    assessment: platform =>
      `Müssen Sie klären, welche Systeme und Pflichten gelten? Das Unternehmens-Assessment für 99 € deckt ${
        platform.slug === "custom-website" ? "Ihre Website" : platform.name
      } und die weiteren KI-Systeme Ihrer Organisation ab.`,
    otherPlatforms: "Weitere Plattformen",
  },
  fr: {
    notFound: "Guide de plateforme introuvable",
    back: "Retour à RapidAct",
    platforms: "Plateformes",
    confirmTitle: "Confirmez l’outil et votre rôle",
    installTitle: platform =>
      platform.slug === "custom-website"
        ? "Installer la mention sur votre site"
        : `Installer la mention sur ${platform.name}`,
    addNotice: "Ajouter la mention d’utilisation de l’IA",
    installOfficial: platform => `Installer RapidAct sur ${platform.name}`,
    assessment: platform =>
      `Besoin de confirmer les systèmes et obligations applicables ? L’évaluation d’entreprise à 99 € couvre ${
        platform.slug === "custom-website" ? "votre site" : platform.name
      } et les autres systèmes d’IA de votre organisation.`,
    otherPlatforms: "Autres plateformes",
  },
  it: {
    notFound: "Guida della piattaforma non trovata",
    back: "Torna a RapidAct",
    platforms: "Piattaforme",
    confirmTitle: "Conferma lo strumento e il tuo ruolo",
    installTitle: platform =>
      platform.slug === "custom-website"
        ? "Installa l’avviso sul tuo sito"
        : `Installa l’avviso su ${platform.name}`,
    addNotice: "Aggiungi l’avviso sull’uso dell’IA",
    installOfficial: platform => `Installa RapidAct su ${platform.name}`,
    assessment: platform =>
      `Devi confermare quali sistemi e obblighi si applicano? La valutazione aziendale da 99 € copre ${
        platform.slug === "custom-website" ? "il tuo sito" : platform.name
      } e gli altri sistemi di IA della tua organizzazione.`,
    otherPlatforms: "Altre piattaforme",
  },
};

const PLATFORM_LOCALES: Record<Exclude<Lang, "en">, PlatformLocale> = {
  es: {
    names: { "custom-website": "Cualquier web" },
    metaTitle: name => `Aviso de IA en ${name} — artículo 50 | RapidAct`,
    metaDescription: name =>
      `Añade en ${name} un aviso claro de interacción con IA mediante RapidAct y comprueba el resultado en la web publicada.`,
    customMetaTitle:
      "Aviso de IA para cualquier web — un único script | RapidAct",
    customMetaDescription:
      "Añade un aviso claro de interacción con IA a una web propia, Webflow, Squarespace o React mediante un único script configurable.",
    h1: {
      wordpress: "Añade un aviso de IA en WordPress",
      wix: "Añade EU AI Act Badge a Wix",
      shopify: "Añade un aviso de IA en Shopify",
      tidio: "Añade un aviso claro junto a Tidio o Lyro",
      botpress: "Identifica claramente tu agente de Botpress como IA",
      "custom-website": "Un script para el aviso de IA de cualquier web",
    },
    intro: {
      wordpress:
        "Si ofreces un asistente de IA bajo tu propio servicio o marca, el artículo 50(1) puede exigir un aviso claro antes de la primera interacción. El aviso gratuito de RapidAct añade esa capa visible sin sustituir la evaluación de tu función y alcance.",
      wix: "Las webs de Wix suelen usar chats, asistentes o contenido generado con IA. RapidAct añade un aviso claro para visitantes en toda la web mediante la aplicación oficial de Wix, sin código ni edición página por página.",
      shopify:
        "Si tu tienda ofrece un asistente de compras o soporte con IA, puede ser necesario mostrar un aviso claro de interacción directa. El contenido generado por IA tiene reglas diferentes: clasifica primero el sistema y tu función, y usa el aviso donde corresponda.",
      tidio:
        "Lyro puede responder automáticamente a los visitantes. El artículo 50(1) atribuye el aviso de interacción directa al proveedor del sistema de IA, mientras que los responsables del despliegue tienen obligaciones distintas en otros supuestos. Confirma tu función y muestra el aviso antes del primer intercambio automatizado.",
      botpress:
        "Los agentes de Botpress mantienen conversaciones naturales y el visitante puede no saber que interactúa con IA. Si eres responsable del aviso de interacción directa, identifícalo antes de que empiece la conversación y usa un texto específico para ese sistema.",
      "custom-website":
        "En una web propia, Webflow, Squarespace o una aplicación React, la instalación técnica es la misma. Confirma primero si el artículo 50 exige un aviso de interacción directa para tu función y sistema; si lo exige, puedes añadirlo con un único script.",
    },
    detectionNote: {
      wordpress:
        "El escaneo gratuito abre la página pública renderizada y registra puntos de contacto funcionales con IA, el texto del aviso y la evidencia exacta. Otras páginas, plugins privados, IA interna y funciones contractuales quedan fuera del escaneo.",
      wix: "El escaneo gratuito inspecciona la experiencia publicada de Wix, incluidos los widgets cargados en el navegador, y registra los puntos de contacto con IA o avisos visibles junto a la URL de origen.",
      shopify:
        "El escaneo abre la página renderizada de la tienda y registra puntos de contacto funcionales con IA, avisos visibles y la evidencia exacta. No abre otras páginas ni deduce si una imagen fue generada por IA cuando no puede observarlo directamente.",
      tidio:
        "El escaneo inspecciona la página como un visitante, registra las interacciones visibles de Tidio o Lyro y comprueba si el aviso puede verse realmente. Estas observaciones no determinan tu función jurídica.",
      botpress:
        "El escaneo solo registra una interacción de Botpress cuando observa evidencia directa en la página pública, junto con el texto visible del aviso y la URL de origen.",
      "custom-website":
        "El escaneo usa un navegador real para inspeccionar rápidamente la página pública renderizada. Informa solo de evidencia observada y señala claramente cuando no puede inspeccionar una página.",
    },
    openInstaller: name => `Abre el instalador de RapidAct y elige ${name}.`,
    customOpenInstaller:
      "Abre el instalador de RapidAct y elige la opción para cualquier web.",
    placement: {
      wordpress:
        "Descarga el ZIP del plugin, súbelo desde Plugins → Añadir plugin → Subir plugin y actívalo.",
      wix: "Usa el botón oficial de instalación de Wix para añadir RapidAct a tu web sin código.",
      shopify:
        "Copia el script en el tema, antes de la etiqueta de cierre del body.",
      tidio: "Añade el script a la misma plantilla que carga Tidio o Lyro.",
      botpress:
        "Añade el script a todas las páginas donde se carga Botpress Webchat.",
      "custom-website":
        "Pega el script antes del cierre del body o en tu gestor de etiquetas.",
    },
    configure:
      "Ajusta el idioma, el mensaje, la posición y el enlace de detalles.",
    verify:
      "Publica y abre la página en una ventana privada para comprobar que el aviso aparece antes de la interacción con IA.",
    specialInstall: {
      wordpress: [
        "Abre el instalador de RapidAct y elige WordPress.",
        "Descarga el ZIP del plugin y súbelo desde Plugins → Añadir plugin → Subir plugin.",
        "Activa el plugin y abre Ajustes → RapidAct AI Disclosure para adaptar el aviso.",
        "Guarda y comprueba la web publicada en una ventana privada.",
      ],
      wix: [
        "Pulsa Instalar en Wix para abrir la instalación oficial.",
        "Elige la web de Wix donde quieres añadir RapidAct y confirma la instalación.",
        "Configura el idioma y los detalles del aviso, y publica la web.",
        "Abre la web publicada en una ventana privada y comprueba que el aviso aparece antes de la primera interacción con IA.",
      ],
      botpress: [
        "Abre el instalador de avisos de RapidAct y copia el script de producción.",
        "Añádelo a todas las páginas donde se carga Botpress Webchat y personaliza el título y el mensaje.",
        "Repite también el aviso en el primer mensaje del bot y comprueba ambas superficies en una ventana privada.",
      ],
    },
    widgetLabels: {
      "Custom GPT apps": "Aplicaciones GPT personalizadas",
      "Tidio live chat": "Chat en directo de Tidio",
      "Tidio flows (automated replies)":
        "Flujos de Tidio (respuestas automáticas)",
      "Custom GPT-based agents": "Agentes basados en GPT personalizados",
      "Voiceflow bots (similar setup)":
        "Bots de Voiceflow (instalación similar)",
      "Custom GPT assistants": "Asistentes GPT personalizados",
      "Voice AI widgets": "Widgets de IA por voz",
    },
  },
  de: {
    names: { "custom-website": "Jede Website" },
    metaTitle: name => `KI-Hinweis auf ${name} — Artikel 50 | RapidAct`,
    metaDescription: name =>
      `Fügen Sie auf ${name} mit RapidAct einen klaren KI-Interaktionshinweis ein und prüfen Sie die veröffentlichte Seite.`,
    customMetaTitle:
      "KI-Hinweis für jede Website — ein einziges Skript | RapidAct",
    customMetaDescription:
      "Fügen Sie einer eigenen Website, Webflow, Squarespace oder React mit einem konfigurierbaren Skript einen klaren KI-Interaktionshinweis hinzu.",
    h1: {
      wordpress: "KI-Hinweis in WordPress hinzufügen",
      wix: "EU AI Act Badge zu Wix hinzufügen",
      shopify: "KI-Hinweis in Shopify hinzufügen",
      tidio: "Tidio oder Lyro mit einem klaren KI-Hinweis ergänzen",
      botpress: "Botpress-Agenten klar als KI kennzeichnen",
      "custom-website": "Ein Skript für den KI-Hinweis auf jeder Website",
    },
    intro: {
      wordpress:
        "Wenn Sie einen KI-Assistenten unter Ihrem eigenen Dienst oder Ihrer Marke anbieten, kann Artikel 50 Absatz 1 einen klaren Hinweis vor der ersten Interaktion verlangen. Der kostenlose RapidAct-Hinweis schafft diese sichtbare Ebene, ersetzt aber nicht die Prüfung Ihrer Rolle und des Anwendungsbereichs.",
      wix: "Wix-Websites nutzen häufig KI-Chats, Assistenten oder KI-generierte Inhalte. RapidAct fügt über die offizielle Wix-App einen klaren Besucherhinweis auf der gesamten Website hinzu – ohne Code oder seitenweise Bearbeitung.",
      shopify:
        "Wenn Ihr Shop einen KI-Einkaufs- oder Supportassistenten anbietet, kann ein klarer Hinweis auf die direkte Interaktion erforderlich sein. Für KI-generierte Inhalte gelten andere Regeln. Ordnen Sie zuerst System und Rolle ein und verwenden Sie den Hinweis dort, wo er passt.",
      tidio:
        "Lyro kann Besucher automatisch beantworten. Artikel 50 Absatz 1 legt den Hinweis auf die direkte Interaktion dem Anbieter des KI-Systems auf; Betreiber haben in anderen Fällen eigene Pflichten. Klären Sie Ihre Rolle und zeigen Sie den Hinweis vor dem ersten automatisierten Austausch.",
      botpress:
        "Botpress-Agenten können natürliche Gespräche führen, sodass Besucher die KI möglicherweise nicht erkennen. Wenn Sie für den Hinweis auf die direkte Interaktion verantwortlich sind, kennzeichnen Sie das System vor Gesprächsbeginn mit einem konkreten Text.",
      "custom-website":
        "Für eine eigene Website, Webflow, Squarespace oder eine React-App ist die technische Installation gleich. Prüfen Sie zuerst, ob Artikel 50 für Ihre Rolle und Ihr System einen Hinweis verlangt; falls ja, genügt ein einziges Skript.",
    },
    detectionNote: {
      wordpress:
        "Der kostenlose Scan öffnet die gerenderte öffentliche Seite und erfasst funktionale KI-Kontaktpunkte, sichtbare Hinweise und genaue Belege. Weitere Seiten, private Plugins, interne KI und vertragliche Rollen bleiben außerhalb des Scans.",
      wix: "Der kostenlose Scan prüft die veröffentlichte Wix-Seite einschließlich clientseitig geladener Widgets und erfasst sichtbare KI-Kontaktpunkte oder Hinweise mit der Quell-URL.",
      shopify:
        "Der Scan öffnet die gerenderte Shop-Seite und erfasst funktionale KI-Kontaktpunkte, sichtbare Hinweise und genaue Belege. Er öffnet keine weiteren Seiten und leitet nicht ab, ob ein Bild KI-generiert ist, wenn dies nicht direkt erkennbar ist.",
      tidio:
        "Der Scan prüft die Seite aus Besuchersicht, erfasst sichtbare Tidio- oder Lyro-Interaktionen und kontrolliert, ob ein Hinweis tatsächlich erkennbar ist. Daraus wird Ihre rechtliche Rolle nicht abgeleitet.",
      botpress:
        "Der Scan erfasst eine Botpress-Interaktion nur bei direkter Evidenz auf der öffentlichen Seite, zusammen mit sichtbarem Hinweistext und Quell-URL.",
      "custom-website":
        "Der Scan nutzt einen echten Browser für eine schnelle Prüfung der gerenderten öffentlichen Seite. Er berichtet nur direkt beobachtete Evidenz und kennzeichnet Seiten, die nicht geprüft werden konnten.",
    },
    openInstaller: name =>
      `Öffnen Sie den RapidAct-Installer und wählen Sie ${name}.`,
    customOpenInstaller:
      "Öffnen Sie den RapidAct-Installer und wählen Sie die Option für jede Website.",
    placement: {
      wordpress:
        "Laden Sie die Plugin-ZIP herunter, öffnen Sie Plugins → Installieren → Plugin hochladen und aktivieren Sie sie.",
      wix: "Installieren Sie RapidAct über die offizielle Wix-Schaltfläche – ohne Code.",
      shopify:
        "Fügen Sie das Skript im Theme vor dem schließenden body-Tag ein.",
      tidio:
        "Fügen Sie das Skript in dieselbe Vorlage ein, die Tidio oder Lyro lädt.",
      botpress:
        "Fügen Sie das Skript auf jeder Seite ein, auf der Botpress Webchat geladen wird.",
      "custom-website":
        "Fügen Sie das Skript vor dem schließenden body-Tag oder im Tag Manager ein.",
    },
    configure:
      "Passen Sie Sprache, Text, Position und den Link zu weiteren Informationen an.",
    verify:
      "Veröffentlichen Sie die Seite und prüfen Sie in einem privaten Fenster, dass der Hinweis vor der KI-Interaktion erscheint.",
    specialInstall: {
      wordpress: [
        "Öffnen Sie den RapidAct-Installer und wählen Sie WordPress.",
        "Laden Sie die Plugin-ZIP herunter und öffnen Sie Plugins → Installieren → Plugin hochladen.",
        "Aktivieren Sie das Plugin und passen Sie den Hinweis unter Einstellungen → RapidAct AI Disclosure an.",
        "Speichern Sie und prüfen Sie die veröffentlichte Website in einem privaten Fenster.",
      ],
      wix: [
        "Wählen Sie Auf Wix installieren, um die offizielle Installation zu öffnen.",
        "Wählen Sie die Wix-Website aus, auf der RapidAct hinzugefügt werden soll, und bestätigen Sie die Installation.",
        "Konfigurieren Sie Sprache und Hinweisinformationen und veröffentlichen Sie die Website.",
        "Öffnen Sie die veröffentlichte Website in einem privaten Fenster und prüfen Sie, dass der Hinweis vor der ersten KI-Interaktion erscheint.",
      ],
      botpress: [
        "Öffnen Sie den RapidAct-Installer und kopieren Sie das Produktionsskript.",
        "Fügen Sie es auf jeder Seite mit Botpress Webchat ein und passen Sie Titel und Text an.",
        "Wiederholen Sie den Hinweis auch in der ersten Bot-Nachricht und prüfen Sie beide Stellen in einem privaten Fenster.",
      ],
    },
    widgetLabels: {
      "Custom GPT apps": "Benutzerdefinierte GPT-Apps",
      "Tidio live chat": "Tidio-Livechat",
      "Tidio flows (automated replies)":
        "Tidio-Flows (automatisierte Antworten)",
      "Custom GPT-based agents": "Benutzerdefinierte GPT-basierte Agenten",
      "Voiceflow bots (similar setup)": "Voiceflow-Bots (ähnliche Einrichtung)",
      "Custom GPT assistants": "Benutzerdefinierte GPT-Assistenten",
      "Voice AI widgets": "Sprach-KI-Widgets",
    },
  },
  fr: {
    names: { "custom-website": "Tout site web" },
    metaTitle: name => `Mention IA sur ${name} — article 50 | RapidAct`,
    metaDescription: name =>
      `Ajoutez sur ${name} une mention claire d’interaction avec l’IA grâce à RapidAct et vérifiez la page publiée.`,
    customMetaTitle:
      "Mention IA pour tout site web — un seul script | RapidAct",
    customMetaDescription:
      "Ajoutez une mention claire d’interaction avec l’IA à un site sur mesure, Webflow, Squarespace ou React grâce à un script configurable.",
    h1: {
      wordpress: "Ajouter une mention IA sur WordPress",
      wix: "Ajouter EU AI Act Badge à Wix",
      shopify: "Ajouter une mention IA sur Shopify",
      tidio: "Ajouter une mention IA claire à Tidio ou Lyro",
      botpress: "Identifier clairement votre agent Botpress comme une IA",
      "custom-website": "Un script pour la mention IA de tout site web",
    },
    intro: {
      wordpress:
        "Si vous proposez un assistant IA sous votre propre service ou marque, l’article 50, paragraphe 1, peut imposer une mention claire avant la première interaction. La mention gratuite RapidAct ajoute cette couche visible sans remplacer l’analyse de votre rôle et du périmètre.",
      wix: "Les sites Wix utilisent souvent des chats, assistants ou contenus générés par IA. RapidAct ajoute une mention claire pour les visiteurs sur tout le site via l’application Wix officielle, sans code ni modification page par page.",
      shopify:
        "Si votre boutique propose un assistant d’achat ou de support fondé sur l’IA, une mention claire d’interaction directe peut être nécessaire. Les contenus générés par l’IA relèvent de règles distinctes : classez d’abord le système et votre rôle, puis utilisez la mention là où elle convient.",
      tidio:
        "Lyro peut répondre automatiquement aux visiteurs. L’article 50, paragraphe 1, impose la mention d’interaction directe au fournisseur du système d’IA, tandis que les déployeurs ont des obligations distinctes dans d’autres cas. Confirmez votre rôle et affichez la mention avant le premier échange automatisé.",
      botpress:
        "Les agents Botpress peuvent tenir des conversations naturelles, si bien qu’un visiteur peut ne pas savoir qu’il échange avec une IA. Si vous êtes responsable de la mention d’interaction directe, identifiez le système avant le début de l’échange avec un texte précis.",
      "custom-website":
        "Pour un site sur mesure, Webflow, Squarespace ou une application React, l’installation technique est identique. Vérifiez d’abord si l’article 50 exige une mention pour votre rôle et votre système ; si oui, un seul script suffit.",
    },
    detectionNote: {
      wordpress:
        "L’analyse gratuite ouvre la page publique rendue et relève les points de contact IA fonctionnels, les mentions visibles et les preuves exactes. Les autres pages, extensions privées, IA internes et rôles contractuels restent hors périmètre.",
      wix: "L’analyse gratuite inspecte l’expérience Wix publiée, y compris les widgets chargés côté client, et relève les points de contact IA ou mentions visibles avec leur URL source.",
      shopify:
        "L’analyse ouvre la page rendue de la boutique et relève les points de contact IA fonctionnels, les mentions visibles et les preuves exactes. Elle n’ouvre pas d’autres pages et ne déduit pas qu’une image est générée par l’IA si cela n’est pas directement observable.",
      tidio:
        "L’analyse inspecte la page comme un visiteur, relève les interactions Tidio ou Lyro visibles et vérifie si la mention est réellement observable. Ces observations ne déterminent pas votre rôle juridique.",
      botpress:
        "L’analyse ne relève une interaction Botpress que lorsqu’une preuve directe est visible sur la page publique, avec le texte de la mention et l’URL source.",
      "custom-website":
        "L’analyse utilise un navigateur réel pour inspecter rapidement la page publique rendue. Elle rapporte uniquement les preuves observées et signale clairement toute page qu’elle n’a pas pu inspecter.",
    },
    openInstaller: name =>
      `Ouvrez l’installateur RapidAct et choisissez ${name}.`,
    customOpenInstaller:
      "Ouvrez l’installateur RapidAct et choisissez l’option pour tout site web.",
    placement: {
      wordpress:
        "Téléchargez le ZIP, ouvrez Extensions → Ajouter une extension → Téléverser une extension, puis activez-le.",
      wix: "Utilisez le bouton d’installation officiel de Wix pour ajouter RapidAct sans code.",
      shopify:
        "Collez le script dans le thème avant la balise de fermeture du body.",
      tidio:
        "Ajoutez le script au même modèle que celui qui charge Tidio ou Lyro.",
      botpress: "Ajoutez le script à chaque page qui charge Botpress Webchat.",
      "custom-website":
        "Collez le script avant la fermeture du body ou dans votre gestionnaire de balises.",
    },
    configure:
      "Adaptez la langue, le message, la position et le lien vers les détails.",
    verify:
      "Publiez puis ouvrez la page dans une fenêtre privée pour vérifier que la mention apparaît avant l’interaction avec l’IA.",
    specialInstall: {
      wordpress: [
        "Ouvrez l’installateur RapidAct et choisissez WordPress.",
        "Téléchargez le ZIP puis ouvrez Extensions → Ajouter une extension → Téléverser une extension.",
        "Activez l’extension et adaptez la mention dans Réglages → RapidAct AI Disclosure.",
        "Enregistrez et vérifiez le site publié dans une fenêtre privée.",
      ],
      wix: [
        "Sélectionnez Installer sur Wix pour ouvrir l’installation officielle.",
        "Choisissez le site Wix auquel ajouter RapidAct et confirmez l’installation.",
        "Configurez la langue et les détails de la mention, puis publiez le site.",
        "Ouvrez le site publié dans une fenêtre privée et vérifiez que la mention apparaît avant la première interaction avec l’IA.",
      ],
      botpress: [
        "Ouvrez l’installateur RapidAct et copiez le script de production.",
        "Ajoutez-le à chaque page qui charge Botpress Webchat, puis adaptez le titre et le message.",
        "Répétez aussi la mention dans le premier message du bot et vérifiez les deux emplacements dans une fenêtre privée.",
      ],
    },
    widgetLabels: {
      "Custom GPT apps": "Applications GPT personnalisées",
      "Tidio live chat": "Chat en direct Tidio",
      "Tidio flows (automated replies)":
        "Scénarios Tidio (réponses automatisées)",
      "Custom GPT-based agents": "Agents fondés sur des GPT personnalisés",
      "Voiceflow bots (similar setup)":
        "Bots Voiceflow (installation similaire)",
      "Custom GPT assistants": "Assistants GPT personnalisés",
      "Voice AI widgets": "Widgets d’IA vocale",
    },
  },
  it: {
    names: { "custom-website": "Qualsiasi sito" },
    metaTitle: name => `Avviso IA su ${name} — articolo 50 | RapidAct`,
    metaDescription: name =>
      `Aggiungi su ${name} un chiaro avviso di interazione con l’IA tramite RapidAct e verifica la pagina pubblicata.`,
    customMetaTitle:
      "Avviso IA per qualsiasi sito — un unico script | RapidAct",
    customMetaDescription:
      "Aggiungi un chiaro avviso di interazione con l’IA a un sito personalizzato, Webflow, Squarespace o React con uno script configurabile.",
    h1: {
      wordpress: "Aggiungi un avviso IA a WordPress",
      wix: "Aggiungi EU AI Act Badge a Wix",
      shopify: "Aggiungi un avviso IA a Shopify",
      tidio: "Aggiungi un avviso IA chiaro a Tidio o Lyro",
      botpress: "Identifica chiaramente il tuo agente Botpress come IA",
      "custom-website": "Uno script per l’avviso IA di qualsiasi sito",
    },
    intro: {
      wordpress:
        "Se offri un assistente IA con il tuo servizio o marchio, l’articolo 50(1) può richiedere un avviso chiaro prima della prima interazione. L’avviso gratuito RapidAct aggiunge questo livello visibile senza sostituire la valutazione del ruolo e dell’ambito.",
      wix: "I siti Wix usano spesso chat, assistenti o contenuti generati con l’IA. RapidAct aggiunge un avviso chiaro per i visitatori su tutto il sito tramite l’app Wix ufficiale, senza codice o modifiche pagina per pagina.",
      shopify:
        "Se il negozio offre un assistente IA per acquisti o supporto, può essere necessario mostrare un chiaro avviso di interazione diretta. I contenuti generati dall’IA seguono regole diverse: classifica prima il sistema e il tuo ruolo, poi usa l’avviso dove appropriato.",
      tidio:
        "Lyro può rispondere automaticamente ai visitatori. L’articolo 50(1) attribuisce l’avviso di interazione diretta al fornitore del sistema di IA, mentre i deployer hanno obblighi distinti in altri casi. Conferma il tuo ruolo e mostra l’avviso prima del primo scambio automatizzato.",
      botpress:
        "Gli agenti Botpress possono sostenere conversazioni naturali e il visitatore potrebbe non sapere di interagire con un’IA. Se sei responsabile dell’avviso di interazione diretta, identifica il sistema prima dell’inizio dello scambio con un testo specifico.",
      "custom-website":
        "Per un sito personalizzato, Webflow, Squarespace o un’app React, l’installazione tecnica è la stessa. Verifica prima se l’articolo 50 richiede un avviso per il tuo ruolo e sistema; in tal caso basta un unico script.",
    },
    detectionNote: {
      wordpress:
        "La scansione gratuita apre la pagina pubblica renderizzata e registra i punti di contatto IA funzionali, gli avvisi visibili e le prove esatte. Altre pagine, plugin privati, IA interna e ruoli contrattuali restano fuori dall’analisi.",
      wix: "La scansione gratuita ispeziona l’esperienza Wix pubblicata, inclusi i widget caricati nel browser, e registra i punti di contatto IA o gli avvisi visibili con l’URL di origine.",
      shopify:
        "La scansione apre la pagina renderizzata del negozio e registra i punti di contatto IA funzionali, gli avvisi visibili e le prove esatte. Non apre altre pagine e non deduce che un’immagine sia generata dall’IA se non è direttamente osservabile.",
      tidio:
        "La scansione ispeziona la pagina come un visitatore, registra le interazioni Tidio o Lyro visibili e verifica se l’avviso è realmente osservabile. Queste osservazioni non determinano il tuo ruolo giuridico.",
      botpress:
        "La scansione registra un’interazione Botpress solo quando osserva prove dirette sulla pagina pubblica, insieme al testo visibile dell’avviso e all’URL di origine.",
      "custom-website":
        "La scansione usa un browser reale per controllare rapidamente la pagina pubblica renderizzata. Riporta solo le prove osservate e segnala chiaramente le pagine che non può ispezionare.",
    },
    openInstaller: name =>
      `Apri il programma di installazione RapidAct e scegli ${name}.`,
    customOpenInstaller:
      "Apri il programma di installazione RapidAct e scegli l’opzione per qualsiasi sito.",
    placement: {
      wordpress:
        "Scarica lo ZIP, apri Plugin → Aggiungi plugin → Carica plugin e attivalo.",
      wix: "Usa il pulsante di installazione ufficiale di Wix per aggiungere RapidAct senza codice.",
      shopify: "Incolla lo script nel tema prima del tag di chiusura del body.",
      tidio: "Aggiungi lo script allo stesso modello che carica Tidio o Lyro.",
      botpress:
        "Aggiungi lo script a ogni pagina in cui viene caricato Botpress Webchat.",
      "custom-website":
        "Incolla lo script prima della chiusura del body o nel tag manager.",
    },
    configure: "Imposta lingua, messaggio, posizione e link ai dettagli.",
    verify:
      "Pubblica e apri la pagina in una finestra privata per verificare che l’avviso appaia prima dell’interazione con l’IA.",
    specialInstall: {
      wordpress: [
        "Apri il programma di installazione RapidAct e scegli WordPress.",
        "Scarica lo ZIP e apri Plugin → Aggiungi plugin → Carica plugin.",
        "Attiva il plugin e personalizza l’avviso in Impostazioni → RapidAct AI Disclosure.",
        "Salva e verifica il sito pubblicato in una finestra privata.",
      ],
      wix: [
        "Seleziona Installa su Wix per aprire l’installazione ufficiale.",
        "Scegli il sito Wix a cui aggiungere RapidAct e conferma l’installazione.",
        "Configura la lingua e i dettagli dell’avviso, quindi pubblica il sito.",
        "Apri il sito pubblicato in una finestra privata e verifica che l’avviso appaia prima della prima interazione con l’IA.",
      ],
      botpress: [
        "Apri il programma di installazione RapidAct e copia lo script di produzione.",
        "Aggiungilo a ogni pagina che carica Botpress Webchat e personalizza titolo e messaggio.",
        "Ripeti l’avviso anche nel primo messaggio del bot e verifica entrambe le posizioni in una finestra privata.",
      ],
    },
    widgetLabels: {
      "Custom GPT apps": "App GPT personalizzate",
      "Tidio live chat": "Chat dal vivo di Tidio",
      "Tidio flows (automated replies)":
        "Flussi Tidio (risposte automatizzate)",
      "Custom GPT-based agents": "Agenti basati su GPT personalizzati",
      "Voiceflow bots (similar setup)": "Bot Voiceflow (configurazione simile)",
      "Custom GPT assistants": "Assistenti GPT personalizzati",
      "Voice AI widgets": "Widget di IA vocale",
    },
  },
};

function localizePlatform(base: PlatformGuide, lang: Lang): PlatformGuide {
  if (lang === "en") return base;

  const copy = PLATFORM_LOCALES[lang];
  const name = copy.names[base.slug] ?? base.name;
  return {
    ...base,
    name,
    metaTitle:
      base.slug === "custom-website"
        ? copy.customMetaTitle
        : copy.metaTitle(name),
    metaDescription:
      base.slug === "custom-website"
        ? copy.customMetaDescription
        : copy.metaDescription(name),
    h1: copy.h1[base.slug],
    intro: copy.intro[base.slug],
    detectionNote: copy.detectionNote[base.slug],
    freeInstall: copy.specialInstall?.[base.slug] ?? [
      base.slug === "custom-website"
        ? copy.customOpenInstaller
        : copy.openInstaller(name),
      copy.placement[base.slug],
      copy.configure,
      copy.verify,
    ],
    commonWidgets: base.commonWidgets.map(
      widget => copy.widgetLabels[widget] ?? widget
    ),
  };
}

export function getPlatforms(lang: Lang = "en"): PlatformGuide[] {
  return PLATFORMS.map(platform => localizePlatform(platform, lang));
}

export function getPlatform(
  slug: PlatformSlug | string,
  lang: Lang = "en"
): PlatformGuide | undefined {
  const platform = PLATFORMS.find(p => p.slug === slug);
  return platform ? localizePlatform(platform, lang) : undefined;
}
