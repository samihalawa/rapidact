(function () {
  "use strict";

  if (document.getElementById("rapidact-ai-disclosure")) return;

  var script = document.currentScript;
  var pathLanguage = window.location.pathname.split("/")[1].toLowerCase();
  var supportedLanguages = ["en", "es", "de", "fr", "it"];
  var language = String(
    (script && script.dataset.language) ||
      (supportedLanguages.indexOf(pathLanguage) >= 0 && pathLanguage) ||
      document.documentElement.lang ||
      navigator.language ||
      "en"
  )
    .toLowerCase()
    .slice(0, 2);
  if (supportedLanguages.indexOf(language) < 0) language = "en";

  var words = {
    en: {
      title: "AI use disclosed",
      message:
        "This site uses an AI assistant. You are interacting with an AI system, not a person.",
      eyebrow: "Clear AI-use notice",
      open: "How AI is used",
      close: "Close notice",
      system: "System",
      provider: "Responsible",
      details: "More information",
      install: "Add this notice",
    },
    es: {
      title: "Uso de IA declarado",
      message:
        "Este sitio utiliza un asistente de IA. Estás interactuando con un sistema de IA, no con una persona.",
      eyebrow: "Aviso claro sobre el uso de IA",
      open: "Cómo se utiliza la IA",
      close: "Cerrar aviso",
      system: "Sistema",
      provider: "Responsable",
      details: "Más información",
      install: "Añadir este aviso",
    },
    de: {
      title: "KI-Einsatz offengelegt",
      message:
        "Diese Website nutzt einen KI-Assistenten. Sie interagieren mit einem KI-System, nicht mit einer Person.",
      eyebrow: "Klarer Hinweis zum KI-Einsatz",
      open: "So wird KI eingesetzt",
      close: "Hinweis schließen",
      system: "System",
      provider: "Verantwortlich",
      details: "Mehr erfahren",
      install: "Diesen Hinweis hinzufügen",
    },
    fr: {
      title: "Usage de l’IA signalé",
      message:
        "Ce site utilise un assistant IA. Vous interagissez avec un système d’IA, et non avec une personne.",
      eyebrow: "Information claire sur l’usage de l’IA",
      open: "Comment l’IA est utilisée",
      close: "Fermer l’avis",
      system: "Système",
      provider: "Responsable",
      details: "En savoir plus",
      install: "Ajouter cet avis",
    },
    it: {
      title: "Uso dell’IA dichiarato",
      message:
        "Questo sito usa un assistente IA. Stai interagendo con un sistema di IA, non con una persona.",
      eyebrow: "Avviso chiaro sull’uso dell’IA",
      open: "Come viene usata l’IA",
      close: "Chiudi avviso",
      system: "Sistema",
      provider: "Responsabile",
      details: "Maggiori informazioni",
      install: "Aggiungi questo avviso",
    },
  };
  var copybook = words[language];
  var languageSuffix = language.charAt(0).toUpperCase() + language.slice(1);
  var localizedTitle = script && script.dataset["title" + languageSuffix];
  var localizedMessage = script && script.dataset["message" + languageSuffix];
  var title =
    localizedTitle || (script && script.dataset.title) || copybook.title;
  var message =
    localizedMessage || (script && script.dataset.message) || copybook.message;
  var system = (script && script.dataset.system) || "";
  var provider = (script && script.dataset.provider) || "";
  var detailsUrl = (script && script.dataset.detailsUrl) || "";
  var position =
    script && script.dataset.position === "left" ? "left" : "right";
  var requestedAccent = (script && script.dataset.color) || "";
  var accent = /^#[0-9a-f]{3,8}$/i.test(requestedAccent)
    ? requestedAccent
    : "#1f3a5f";
  var escapeHtml = function (value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };
  var safeTitle = escapeHtml(title);

  var host = document.createElement("div");
  host.id = "rapidact-ai-disclosure";
  host.style.position = "fixed";
  host.style[position] = "max(16px, env(safe-area-inset-" + position + "))";
  host.style.bottom = "max(16px, env(safe-area-inset-bottom))";
  host.style.zIndex = "2147483000";
  host.style.fontFamily =
    '"IBM Plex Sans", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  root.innerHTML =
    "<style>" +
    ":host{all:initial}" +
    "*,*::before,*::after{box-sizing:border-box}" +
    ".ra-wrap{display:flex;flex-direction:column;align-items:" +
    (position === "left" ? "flex-start" : "flex-end") +
    ";gap:10px}" +
    ".ra-panel{position:relative;display:none;width:min(380px,calc(100vw - 32px));overflow:hidden;border:1px solid #cfd6e2;border-radius:12px;background:#fff;color:#111827;padding:20px;box-shadow:0 22px 55px rgba(5,25,70,.18)}" +
    ".ra-panel::before{position:absolute;inset:0 0 auto;height:4px;background:" +
    accent +
    ";content:''}" +
    ".ra-panel[data-open=true]{display:block}" +
    ".ra-eyebrow{margin:2px 0 7px;font-size:10px;line-height:1.2;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#64748b}" +
    ".ra-title{margin:0;font-size:17px;line-height:1.3;font-weight:700;letter-spacing:-.015em}" +
    ".ra-copy{margin:9px 0 0;font-size:14px;line-height:1.6;color:#475569}" +
    ".ra-meta{margin:14px 0 0;padding-top:12px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.5;color:#64748b}" +
    ".ra-meta:empty{display:none}" +
    ".ra-links{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:14px}" +
    ".ra-link{color:" +
    accent +
    ";font-size:12px;line-height:1.4;font-weight:700;text-underline-offset:3px}" +
    ".ra-button{display:inline-flex;min-height:50px;align-items:center;gap:10px;border:1px solid #cfd6e2;border-radius:10px;background:#fff;color:#111827;padding:8px 14px 8px 9px;box-shadow:0 7px 22px rgba(5,25,70,.14);cursor:pointer;font:inherit}" +
    ".ra-button:hover{border-color:" +
    accent +
    ";background:#f8fafc;transform:translateY(-1px)}" +
    ".ra-button:focus-visible{outline:3px solid " +
    accent +
    "55;outline-offset:3px}" +
    ".ra-icon{display:grid;width:31px;height:33px;place-items:center;clip-path:polygon(50% 0,92% 17%,92% 55%,82% 75%,65% 90%,50% 100%,35% 90%,18% 75%,8% 55%,8% 17%);background:" +
    accent +
    ";color:#fff;font-size:11px;font-weight:800}" +
    ".ra-button-title{display:block;font-size:13px;line-height:1.15;font-weight:700;text-align:left;letter-spacing:-.01em}" +
    ".ra-button-sub{display:block;margin-top:3px;font-size:10.5px;line-height:1.15;color:#64748b;text-align:left}" +
    "@media (max-width:520px){.ra-button{max-width:calc(100vw - 32px)}.ra-links{align-items:flex-start;flex-direction:column;gap:9px}}" +
    "@media (prefers-reduced-motion:no-preference){.ra-panel{animation:ra-in .16s ease-out}@keyframes ra-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}}" +
    "</style>" +
    '<div class="ra-wrap">' +
    '<section class="ra-panel" role="dialog" aria-label="' +
    safeTitle +
    '" data-open="false">' +
    '<p class="ra-eyebrow">' +
    copybook.eyebrow +
    "</p>" +
    '<h2 class="ra-title">' +
    safeTitle +
    "</h2>" +
    '<p class="ra-copy"></p>' +
    '<p class="ra-meta"></p>' +
    '<div class="ra-links">' +
    '<a class="ra-link ra-details" target="_blank" rel="noopener"></a>' +
    '<a class="ra-link" href="https://rapidact.eu/article-50#install" target="_blank" rel="noopener">' +
    copybook.install +
    "</a>" +
    "</div>" +
    "</section>" +
    '<button class="ra-button" type="button" aria-expanded="false">' +
    '<span class="ra-icon" aria-hidden="true">AI</span>' +
    "<span>" +
    '<span class="ra-button-title">' +
    safeTitle +
    "</span>" +
    '<span class="ra-button-sub">' +
    copybook.open +
    "</span>" +
    "</span>" +
    "</button>" +
    "</div>";

  var panel = root.querySelector(".ra-panel");
  var button = root.querySelector(".ra-button");
  var copy = root.querySelector(".ra-copy");
  var meta = root.querySelector(".ra-meta");
  var details = root.querySelector(".ra-details");

  copy.textContent = message;
  meta.textContent = [
    system && copybook.system + ": " + system,
    provider && copybook.provider + ": " + provider,
  ]
    .filter(Boolean)
    .join(" · ");

  if (detailsUrl) {
    details.href = detailsUrl;
    details.textContent = copybook.details;
  } else {
    details.remove();
  }

  button.addEventListener("click", function () {
    var open = panel.getAttribute("data-open") !== "true";
    panel.setAttribute("data-open", String(open));
    button.setAttribute("aria-expanded", String(open));
    button.querySelector(".ra-button-sub").textContent = open
      ? copybook.close
      : copybook.open;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    panel.setAttribute("data-open", "false");
    button.setAttribute("aria-expanded", "false");
    button.querySelector(".ra-button-sub").textContent = copybook.open;
  });

  document.body.appendChild(host);
})();
