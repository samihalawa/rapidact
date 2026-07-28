import type { Lang } from "@/lib/content";

export type InstallerCopy = {
  choosePlatform: string;
  choosePlatformBody: string;
  direct: string;
  recommended: string;
  installOn: string;
  chooseDisplay: string;
  installAndVerify: string;
  manualFallback: string;
  manualFallbackBody: string;
  code: string;
  copy: string;
  copied: string;
  copyFailed: string;
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
      "Choose your platform to get the exact working installation steps and code.",
    direct: "Direct install",
    recommended: "Recommended",
    installOn: "Install RapidAct on",
    chooseDisplay: "Choose how the notice appears",
    installAndVerify: "Install and verify",
    manualFallback: "Installation",
    manualFallbackBody:
      "Paste this code in the location shown, publish, then open the live page as a visitor.",
    code: "Installation code",
    copy: "Copy code",
    copied: "Copied",
    copyFailed: "Select and copy the code below",
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
      "Elige tu plataforma para obtener los pasos y el código exactos de instalación.",
    direct: "Instalación directa",
    recommended: "Recomendado",
    installOn: "Instala RapidAct en",
    chooseDisplay: "Elige cómo aparece el aviso",
    installAndVerify: "Instala y comprueba",
    manualFallback: "Instalación",
    manualFallbackBody:
      "Pega este código en la ubicación indicada, publica y abre la web como visitante.",
    code: "Código de instalación",
    copy: "Copiar código",
    copied: "Copiado",
    copyFailed: "Selecciona y copia el código",
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
      "Wählen Sie Ihre Plattform für die passenden Installationsschritte und den fertigen Code.",
    direct: "Direkte Installation",
    recommended: "Empfohlen",
    installOn: "RapidAct installieren auf",
    chooseDisplay: "Darstellung des Hinweises",
    installAndVerify: "Installieren und prüfen",
    manualFallback: "Installation",
    manualFallbackBody:
      "Code an der angegebenen Stelle einfügen, veröffentlichen und die Live-Seite als Besucher öffnen.",
    code: "Installationscode",
    copy: "Code kopieren",
    copied: "Kopiert",
    copyFailed: "Code unten auswählen und kopieren",
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
      "Choisissez votre plateforme pour obtenir les étapes et le code d’installation exacts.",
    direct: "Installation directe",
    recommended: "Recommandé",
    installOn: "Installer RapidAct sur",
    chooseDisplay: "Choisissez l’affichage",
    installAndVerify: "Installer et vérifier",
    manualFallback: "Installation",
    manualFallbackBody:
      "Collez ce code à l’emplacement indiqué, publiez puis ouvrez la page comme un visiteur.",
    code: "Code d’installation",
    copy: "Copier le code",
    copied: "Copié",
    copyFailed: "Sélectionnez et copiez le code",
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
      "Scegli la piattaforma per ottenere i passaggi e il codice di installazione esatti.",
    direct: "Installazione diretta",
    recommended: "Consigliato",
    installOn: "Installa RapidAct su",
    chooseDisplay: "Scegli come appare l’avviso",
    installAndVerify: "Installa e verifica",
    manualFallback: "Installazione",
    manualFallbackBody:
      "Incolla il codice nella posizione indicata, pubblica e apri il sito come visitatore.",
    code: "Codice di installazione",
    copy: "Copia codice",
    copied: "Copiato",
    copyFailed: "Seleziona e copia il codice",
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
