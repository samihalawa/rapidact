import type { Lang } from "@/lib/content";

export type InstallerCopy = {
  choosePlatform: string;
  choosePlatformBody: string;
  marketplace: string;
  direct: string;
  recommended: string;
  installOn: string;
  chooseDisplay: string;
  installAndVerify: string;
  marketplacePending: string;
  marketplacePendingBody: string;
  installFrom: string;
  viewStatus: string;
  manualFallback: string;
  manualFallbackBody: string;
  code: string;
  copy: string;
  copied: string;
  close: string;
  preview: string;
  previewTitle: string;
  location: string;
  locations: Record<string, string>;
  styles: Record<
    "bubble" | "standard" | "popup" | "iframe",
    { name: string; description: string }
  >;
};

export const INSTALLER_COPY: Record<Lang, InstallerCopy> = {
  en: {
    choosePlatform: "Choose your platform",
    choosePlatformBody:
      "Start with the official marketplace app where available. Until publication, use the exact manual fallback for your stack.",
    marketplace: "Marketplace",
    direct: "Direct install",
    recommended: "Recommended",
    installOn: "Install RapidAct on",
    chooseDisplay: "Choose how the notice appears",
    installAndVerify: "Install and verify",
    marketplacePending: "Marketplace publication pending",
    marketplacePendingBody:
      "The native app is prepared, but the public listing is not yet available. Use the manual fallback now or check the latest review status.",
    installFrom: "Install from",
    viewStatus: "View marketplace status",
    manualFallback: "Manual fallback",
    manualFallbackBody:
      "Paste this code in the location shown, publish, then open the live page as a visitor.",
    code: "Installation code",
    copy: "Copy code",
    copied: "Copied",
    close: "Close installer",
    preview: "Open live preview",
    previewTitle: "Live preview",
    location: "Paste in",
    locations: {
      wordpress: "a Custom HTML block or your site footer",
      shopify: "Online Store → Themes → Edit code, before </body>",
      wix: "Settings → Custom Code → Body end",
      html: "your shared layout, before </body>",
      react: "a component rendered on every AI-enabled route",
      nextjs: "a client component in your root layout",
      gtm: "a Custom HTML tag triggered on AI-enabled pages",
      webflow: "Project Settings → Custom Code → Footer",
    },
    styles: {
      bubble: {
        name: "Bubble",
        description: "Compact corner badge that opens the full notice.",
      },
      standard: {
        name: "Standard",
        description: "Full notice placed directly inside your page.",
      },
      popup: {
        name: "Popup",
        description: "Badge trigger with a centred notice overlay.",
      },
      iframe: {
        name: "Iframe",
        description: "Isolated notice frame for restrictive builders.",
      },
    },
  },
  es: {
    choosePlatform: "Elige tu plataforma",
    choosePlatformBody:
      "Empieza con la app oficial cuando esté disponible. Hasta su publicación, usa el método manual exacto para tu web.",
    marketplace: "Marketplace",
    direct: "Instalación directa",
    recommended: "Recomendado",
    installOn: "Instala RapidAct en",
    chooseDisplay: "Elige cómo aparece el aviso",
    installAndVerify: "Instala y comprueba",
    marketplacePending: "Publicación pendiente",
    marketplacePendingBody:
      "La app nativa está preparada, pero la ficha pública aún no está disponible. Usa la alternativa manual o consulta el estado de revisión.",
    installFrom: "Instalar desde",
    viewStatus: "Ver estado del marketplace",
    manualFallback: "Alternativa manual",
    manualFallbackBody:
      "Pega este código en la ubicación indicada, publica y abre la web como visitante.",
    code: "Código de instalación",
    copy: "Copiar código",
    copied: "Copiado",
    close: "Cerrar instalador",
    preview: "Abrir vista previa",
    previewTitle: "Vista previa",
    location: "Pegar en",
    locations: {
      wordpress: "un bloque HTML personalizado o el pie de la web",
      shopify: "Tienda online → Temas → Editar código, antes de </body>",
      wix: "Ajustes → Código personalizado → Final del body",
      html: "la plantilla común, antes de </body>",
      react: "un componente visible en cada ruta con IA",
      nextjs: "un componente cliente del layout raíz",
      gtm: "una etiqueta HTML personalizada para páginas con IA",
      webflow: "Ajustes del proyecto → Código personalizado → Footer",
    },
    styles: {
      bubble: {
        name: "Burbuja",
        description: "Distintivo compacto que abre el aviso completo.",
      },
      standard: {
        name: "Integrado",
        description: "Aviso completo dentro del contenido de la página.",
      },
      popup: {
        name: "Ventana",
        description: "Distintivo que abre un aviso centrado.",
      },
      iframe: {
        name: "Iframe",
        description: "Marco aislado para constructores restrictivos.",
      },
    },
  },
  de: {
    choosePlatform: "Plattform auswählen",
    choosePlatformBody:
      "Nutzen Sie die offizielle Marketplace-App, sobald sie verfügbar ist. Bis dahin erhalten Sie den passenden manuellen Einbau.",
    marketplace: "Marketplace",
    direct: "Direkte Installation",
    recommended: "Empfohlen",
    installOn: "RapidAct installieren auf",
    chooseDisplay: "Darstellung des Hinweises",
    installAndVerify: "Installieren und prüfen",
    marketplacePending: "Veröffentlichung ausstehend",
    marketplacePendingBody:
      "Die native App ist vorbereitet, die öffentliche Listung aber noch nicht verfügbar. Nutzen Sie vorerst den manuellen Einbau oder prüfen Sie den Review-Status.",
    installFrom: "Installieren über",
    viewStatus: "Marketplace-Status ansehen",
    manualFallback: "Manueller Einbau",
    manualFallbackBody:
      "Code an der angegebenen Stelle einfügen, veröffentlichen und die Live-Seite als Besucher öffnen.",
    code: "Installationscode",
    copy: "Code kopieren",
    copied: "Kopiert",
    close: "Installer schließen",
    preview: "Live-Vorschau öffnen",
    previewTitle: "Live-Vorschau",
    location: "Einfügen in",
    locations: {
      wordpress: "einen individuellen HTML-Block oder den Website-Footer",
      shopify: "Onlineshop → Themes → Code bearbeiten, vor </body>",
      wix: "Einstellungen → Benutzerdefinierter Code → Body-Ende",
      html: "das gemeinsame Layout, vor </body>",
      react: "eine Komponente auf jeder KI-fähigen Route",
      nextjs: "eine Client-Komponente im Root-Layout",
      gtm: "ein Benutzerdefiniertes-HTML-Tag auf KI-Seiten",
      webflow: "Projekteinstellungen → Custom Code → Footer",
    },
    styles: {
      bubble: {
        name: "Bubble",
        description: "Kompaktes Eck-Badge öffnet den vollständigen Hinweis.",
      },
      standard: {
        name: "Standard",
        description: "Vollständiger Hinweis direkt im Seiteninhalt.",
      },
      popup: {
        name: "Popup",
        description: "Badge öffnet einen zentrierten Hinweis.",
      },
      iframe: {
        name: "Iframe",
        description: "Isolierter Hinweis für eingeschränkte Baukästen.",
      },
    },
  },
  fr: {
    choosePlatform: "Choisissez votre plateforme",
    choosePlatformBody:
      "Privilégiez l’application officielle lorsqu’elle est disponible. Avant sa publication, utilisez l’installation manuelle adaptée.",
    marketplace: "Marketplace",
    direct: "Installation directe",
    recommended: "Recommandé",
    installOn: "Installer RapidAct sur",
    chooseDisplay: "Choisissez l’affichage",
    installAndVerify: "Installer et vérifier",
    marketplacePending: "Publication en attente",
    marketplacePendingBody:
      "L’application native est prête, mais sa fiche publique n’est pas encore disponible. Utilisez l’alternative manuelle ou consultez l’état de la révision.",
    installFrom: "Installer depuis",
    viewStatus: "Voir l’état du marketplace",
    manualFallback: "Alternative manuelle",
    manualFallbackBody:
      "Collez ce code à l’emplacement indiqué, publiez puis ouvrez la page comme un visiteur.",
    code: "Code d’installation",
    copy: "Copier le code",
    copied: "Copié",
    close: "Fermer l’installateur",
    preview: "Ouvrir l’aperçu",
    previewTitle: "Aperçu en direct",
    location: "Coller dans",
    locations: {
      wordpress: "un bloc HTML personnalisé ou le pied de page",
      shopify: "Boutique en ligne → Thèmes → Modifier le code, avant </body>",
      wix: "Paramètres → Code personnalisé → Fin du body",
      html: "le modèle partagé, avant </body>",
      react: "un composant présent sur chaque route avec IA",
      nextjs: "un composant client du layout racine",
      gtm: "une balise HTML personnalisée sur les pages avec IA",
      webflow: "Paramètres du projet → Custom Code → Footer",
    },
    styles: {
      bubble: {
        name: "Bulle",
        description: "Badge discret qui ouvre l’avis complet.",
      },
      standard: {
        name: "Intégré",
        description: "Avis complet intégré au contenu de la page.",
      },
      popup: {
        name: "Fenêtre",
        description: "Badge ouvrant un avis centré.",
      },
      iframe: {
        name: "Iframe",
        description: "Cadre isolé pour les éditeurs restrictifs.",
      },
    },
  },
  it: {
    choosePlatform: "Scegli la piattaforma",
    choosePlatformBody:
      "Usa l’app ufficiale quando disponibile. Fino alla pubblicazione, segui l’installazione manuale adatta al tuo sito.",
    marketplace: "Marketplace",
    direct: "Installazione diretta",
    recommended: "Consigliato",
    installOn: "Installa RapidAct su",
    chooseDisplay: "Scegli come appare l’avviso",
    installAndVerify: "Installa e verifica",
    marketplacePending: "Pubblicazione in attesa",
    marketplacePendingBody:
      "L’app nativa è pronta, ma la scheda pubblica non è ancora disponibile. Usa l’alternativa manuale o controlla lo stato della revisione.",
    installFrom: "Installa da",
    viewStatus: "Vedi stato marketplace",
    manualFallback: "Alternativa manuale",
    manualFallbackBody:
      "Incolla il codice nella posizione indicata, pubblica e apri il sito come visitatore.",
    code: "Codice di installazione",
    copy: "Copia codice",
    copied: "Copiato",
    close: "Chiudi installazione",
    preview: "Apri anteprima",
    previewTitle: "Anteprima",
    location: "Incolla in",
    locations: {
      wordpress: "un blocco HTML personalizzato o il footer del sito",
      shopify: "Negozio online → Temi → Modifica codice, prima di </body>",
      wix: "Impostazioni → Codice personalizzato → Fine del body",
      html: "il layout condiviso, prima di </body>",
      react: "un componente su ogni route con IA",
      nextjs: "un componente client nel layout principale",
      gtm: "un tag HTML personalizzato sulle pagine con IA",
      webflow: "Impostazioni progetto → Custom Code → Footer",
    },
    styles: {
      bubble: {
        name: "Bolla",
        description: "Badge compatto che apre l’avviso completo.",
      },
      standard: {
        name: "Integrato",
        description: "Avviso completo inserito nella pagina.",
      },
      popup: {
        name: "Popup",
        description: "Badge che apre un avviso centrato.",
      },
      iframe: {
        name: "Iframe",
        description: "Riquadro isolato per builder restrittivi.",
      },
    },
  },
};
