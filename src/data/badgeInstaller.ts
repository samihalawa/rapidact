import type { Lang } from "@/lib/content";
import type { BadgePlatform } from "@/lib/badgeInstaller";

export type InstallerCopy = {
  choosePlatform: string;
  choosePlatformBody: string;
  direct: string;
  pluginAndCode: string;
  officialWixApp: string;
  recommended: string;
  installOn: string;
  chooseSetup: string;
  chooseDisplay: string;
  installAndVerify: string;
  wordpressDownloadTitle: string;
  wordpressDownloadBody: string;
  downloadWordpress: string;
  wordpressStepsTitle: string;
  wordpressSteps: [string, string, string];
  wixInstallTitle: string;
  wixInstallBody: string;
  wixStepsTitle: string;
  wixSteps: [string, string, string];
  installWix: string;
  manualOption: string;
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
  platformLabels: Record<BadgePlatform, string>;
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
      "Choose your platform to get the simplest working installation path.",
    direct: "Direct install",
    pluginAndCode: "Plugin or code",
    officialWixApp: "Official Wix app",
    recommended: "Recommended",
    installOn: "Install RapidAct on",
    chooseSetup: "Choose the setup",
    chooseDisplay: "Choose how the notice appears",
    installAndVerify: "Install and verify",
    wordpressDownloadTitle: "Download the WordPress plugin",
    wordpressDownloadBody:
      "No code needed. Download the ZIP, upload it in WordPress and activate it.",
    downloadWordpress: "Download WordPress plugin (.zip)",
    wordpressStepsTitle: "Install in three steps",
    wordpressSteps: [
      "Open Plugins → Add New Plugin → Upload Plugin.",
      "Choose the downloaded ZIP, then select Install Now and Activate.",
      "Open Settings → RapidAct AI Disclosure, tailor the notice and save.",
    ],
    wixInstallTitle: "Add EU AI Act Badge to your Wix site",
    wixInstallBody:
      "Choose your site, tailor the notice and publish. Wix handles the installation—no code required.",
    wixStepsTitle: "From install to published notice",
    wixSteps: [
      "Add EU AI Act Badge to your Wix site.",
      "Choose the language and notice text.",
      "Publish and check what visitors see.",
    ],
    installWix: "Add EU AI Act Badge to Wix",
    manualOption: "Or install with code",
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
    platformLabels: {
      wordpress: "Plugin or code",
      shopify: "Theme code",
      wix: "Official Wix app",
      html: "One script",
      react: "Component",
      nextjs: "Client component",
      gtm: "Custom HTML tag",
      webflow: "Custom code",
    },
    locations: {
      wordpress: "a Custom HTML block or your site footer",
      shopify: "Online Store → Themes → Edit code, before </body>",
      wix: "the official Wix installation flow",
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
      "Elige tu plataforma para obtener la forma de instalación más sencilla.",
    direct: "Instalación directa",
    pluginAndCode: "Plugin o código",
    officialWixApp: "Aplicación oficial de Wix",
    recommended: "Recomendado",
    installOn: "Instala RapidAct en",
    chooseSetup: "Elige la configuración",
    chooseDisplay: "Elige cómo aparece el aviso",
    installAndVerify: "Instala y comprueba",
    wordpressDownloadTitle: "Descarga el plugin de WordPress",
    wordpressDownloadBody:
      "No necesitas código. Descarga el ZIP, súbelo a WordPress y actívalo.",
    downloadWordpress: "Descargar plugin de WordPress (.zip)",
    wordpressStepsTitle: "Instálalo en tres pasos",
    wordpressSteps: [
      "Abre Plugins → Añadir plugin → Subir plugin.",
      "Elige el ZIP descargado y pulsa Instalar ahora y Activar.",
      "Abre Ajustes → RapidAct AI Disclosure, adapta el aviso y guarda.",
    ],
    wixInstallTitle: "Añade EU AI Act Badge a tu web de Wix",
    wixInstallBody:
      "Elige tu web, adapta el aviso y publica. Wix se encarga de la instalación, sin código.",
    wixStepsTitle: "De la instalación al aviso publicado",
    wixSteps: [
      "Añade EU AI Act Badge a tu web de Wix.",
      "Elige el idioma y el texto del aviso.",
      "Publica y comprueba lo que ven tus visitantes.",
    ],
    installWix: "Añadir EU AI Act Badge a Wix",
    manualOption: "O instalar con código",
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
    platformLabels: {
      wordpress: "Plugin o código",
      shopify: "Código del tema",
      wix: "Aplicación oficial de Wix",
      html: "Un script",
      react: "Componente",
      nextjs: "Componente cliente",
      gtm: "Etiqueta HTML",
      webflow: "Código personalizado",
    },
    locations: {
      wordpress: "un bloque HTML personalizado o el pie de la web",
      shopify: "Tienda online → Temas → Editar código, antes de </body>",
      wix: "el proceso oficial de instalación de Wix",
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
      "Wählen Sie Ihre Plattform für den einfachsten funktionierenden Installationsweg.",
    direct: "Direkte Installation",
    pluginAndCode: "Plugin oder Code",
    officialWixApp: "Offizielle Wix-App",
    recommended: "Empfohlen",
    installOn: "RapidAct installieren auf",
    chooseSetup: "Einrichtung auswählen",
    chooseDisplay: "Darstellung des Hinweises",
    installAndVerify: "Installieren und prüfen",
    wordpressDownloadTitle: "WordPress-Plugin herunterladen",
    wordpressDownloadBody:
      "Kein Code nötig. ZIP herunterladen, in WordPress hochladen und aktivieren.",
    downloadWordpress: "WordPress-Plugin herunterladen (.zip)",
    wordpressStepsTitle: "Installation in drei Schritten",
    wordpressSteps: [
      "Plugins → Installieren → Plugin hochladen öffnen.",
      "Die ZIP-Datei auswählen, Jetzt installieren und Aktivieren wählen.",
      "Einstellungen → RapidAct AI Disclosure öffnen, Hinweis anpassen und speichern.",
    ],
    wixInstallTitle: "EU AI Act Badge zur Wix-Website hinzufügen",
    wixInstallBody:
      "Website auswählen, Hinweis anpassen und veröffentlichen. Wix übernimmt die Installation – ohne Code.",
    wixStepsTitle: "Von der Installation zum veröffentlichten Hinweis",
    wixSteps: [
      "EU AI Act Badge zur Wix-Website hinzufügen.",
      "Sprache und Hinweistext auswählen.",
      "Veröffentlichen und die Besucheransicht prüfen.",
    ],
    installWix: "EU AI Act Badge zu Wix hinzufügen",
    manualOption: "Oder mit Code installieren",
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
    platformLabels: {
      wordpress: "Plugin oder Code",
      shopify: "Theme-Code",
      wix: "Offizielle Wix-App",
      html: "Ein Skript",
      react: "Komponente",
      nextjs: "Client-Komponente",
      gtm: "HTML-Tag",
      webflow: "Benutzerdefinierter Code",
    },
    locations: {
      wordpress: "einen individuellen HTML-Block oder den Website-Footer",
      shopify: "Onlineshop → Themes → Code bearbeiten, vor </body>",
      wix: "den offiziellen Wix-Installationsablauf",
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
      "Choisissez votre plateforme pour obtenir la méthode d’installation la plus simple.",
    direct: "Installation directe",
    pluginAndCode: "Extension ou code",
    officialWixApp: "Application Wix officielle",
    recommended: "Recommandé",
    installOn: "Installer RapidAct sur",
    chooseSetup: "Choisissez la configuration",
    chooseDisplay: "Choisissez l’affichage",
    installAndVerify: "Installer et vérifier",
    wordpressDownloadTitle: "Télécharger l’extension WordPress",
    wordpressDownloadBody:
      "Aucun code requis. Téléchargez le ZIP, importez-le dans WordPress et activez-le.",
    downloadWordpress: "Télécharger l’extension WordPress (.zip)",
    wordpressStepsTitle: "Installation en trois étapes",
    wordpressSteps: [
      "Ouvrez Extensions → Ajouter une extension → Téléverser une extension.",
      "Choisissez le ZIP, puis Installer maintenant et Activer.",
      "Ouvrez Réglages → RapidAct AI Disclosure, adaptez l’avis et enregistrez.",
    ],
    wixInstallTitle: "Ajoutez EU AI Act Badge à votre site Wix",
    wixInstallBody:
      "Choisissez votre site, adaptez la mention et publiez. Wix gère l’installation, sans code.",
    wixStepsTitle: "De l’installation à la mention publiée",
    wixSteps: [
      "Ajoutez EU AI Act Badge à votre site Wix.",
      "Choisissez la langue et le texte de la mention.",
      "Publiez et vérifiez ce que voient les visiteurs.",
    ],
    installWix: "Ajouter EU AI Act Badge à Wix",
    manualOption: "Ou installer avec du code",
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
    platformLabels: {
      wordpress: "Extension ou code",
      shopify: "Code du thème",
      wix: "Application Wix officielle",
      html: "Un script",
      react: "Composant",
      nextjs: "Composant client",
      gtm: "Balise HTML",
      webflow: "Code personnalisé",
    },
    locations: {
      wordpress: "un bloc HTML personnalisé ou le pied de page",
      shopify: "Boutique en ligne → Thèmes → Modifier le code, avant </body>",
      wix: "le parcours d’installation officiel de Wix",
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
      "Scegli la piattaforma per ottenere il metodo di installazione più semplice.",
    direct: "Installazione diretta",
    pluginAndCode: "Plugin o codice",
    officialWixApp: "App Wix ufficiale",
    recommended: "Consigliato",
    installOn: "Installa RapidAct su",
    chooseSetup: "Scegli la configurazione",
    chooseDisplay: "Scegli come appare l’avviso",
    installAndVerify: "Installa e verifica",
    wordpressDownloadTitle: "Scarica il plugin WordPress",
    wordpressDownloadBody:
      "Non serve codice. Scarica lo ZIP, caricalo in WordPress e attivalo.",
    downloadWordpress: "Scarica il plugin WordPress (.zip)",
    wordpressStepsTitle: "Installazione in tre passaggi",
    wordpressSteps: [
      "Apri Plugin → Aggiungi plugin → Carica plugin.",
      "Scegli lo ZIP, quindi Installa ora e Attiva.",
      "Apri Impostazioni → RapidAct AI Disclosure, personalizza l’avviso e salva.",
    ],
    wixInstallTitle: "Aggiungi EU AI Act Badge al tuo sito Wix",
    wixInstallBody:
      "Scegli il sito, personalizza l’avviso e pubblica. Wix gestisce l’installazione, senza codice.",
    wixStepsTitle: "Dall’installazione all’avviso pubblicato",
    wixSteps: [
      "Aggiungi EU AI Act Badge al tuo sito Wix.",
      "Scegli la lingua e il testo dell’avviso.",
      "Pubblica e controlla ciò che vedono i visitatori.",
    ],
    installWix: "Aggiungi EU AI Act Badge a Wix",
    manualOption: "Oppure installa con il codice",
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
    platformLabels: {
      wordpress: "Plugin o codice",
      shopify: "Codice del tema",
      wix: "App Wix ufficiale",
      html: "Uno script",
      react: "Componente",
      nextjs: "Componente client",
      gtm: "Tag HTML",
      webflow: "Codice personalizzato",
    },
    locations: {
      wordpress: "un blocco HTML personalizzato o il footer del sito",
      shopify: "Negozio online → Temi → Modifica codice, prima di </body>",
      wix: "il percorso di installazione ufficiale di Wix",
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
