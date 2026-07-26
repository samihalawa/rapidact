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
  var defaultBrandUrl =
    "https://rapidact.eu/brand/rapidact-ai-notice-brand.png";
  try {
    if (script && script.src) {
      defaultBrandUrl = new URL(
        "brand/rapidact-ai-notice-brand.png",
        script.src
      ).href;
    }
  } catch (_error) {
    // The absolute production URL above remains the reliable fallback.
  }
  var brandUrl = (script && script.dataset.brandSrc) || defaultBrandUrl;
  var safeBrandUrl = escapeHtml(brandUrl);

  var host = document.createElement("div");
  host.id = "rapidact-ai-disclosure";
  host.style.position = "fixed";
  host.style[position] = "max(16px, env(safe-area-inset-" + position + "))";
  host.style.bottom = "max(16px, env(safe-area-inset-bottom))";
  host.style.zIndex = "2147483000";
  host.style.fontFamily =
    '"Manrope", "Avenir Next", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  root.innerHTML =
    "<style>" +
    ":host{all:initial}" +
    "*,*::before,*::after{box-sizing:border-box}" +
    ".ra-wrap{display:flex;flex-direction:column;align-items:" +
    (position === "left" ? "flex-start" : "flex-end") +
    ";gap:13px}" +
    ".ra-panel{position:relative;display:none;width:min(390px,calc(100vw - 32px));overflow:hidden;border:1px solid #174a9b;border-radius:18px;background:#fff;color:#08152f;box-shadow:0 24px 70px rgba(1,17,58,.25),0 0 0 3px rgba(34,197,255,.08)}" +
    ".ra-panel[data-open=true]{display:block}" +
    ".ra-panel-brand{display:flex;min-height:68px;align-items:center;justify-content:space-between;gap:14px;border-bottom:1px solid rgba(67,206,255,.35);background:#061b50;padding:12px 15px}" +
    ".ra-brand-image{display:block;width:174px;max-width:57%;height:auto;filter:drop-shadow(0 5px 12px rgba(0,0,0,.25))}" +
    ".ra-brand-status{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(109,221,255,.5);border-radius:999px;background:rgba(11,76,169,.48);color:#e9f9ff;padding:6px 9px;font-size:9px;line-height:1;font-weight:800;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap}" +
    ".ra-brand-status::before{width:6px;height:6px;border-radius:50%;background:#53ddff;box-shadow:0 0 9px #53ddff;content:''}" +
    ".ra-panel-body{padding:19px 20px 20px}" +
    ".ra-eyebrow{margin:0 0 7px;font-size:10px;line-height:1.2;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#4c6286}" +
    ".ra-title{margin:0;font-family:'Sora','Avenir Next',ui-sans-serif,system-ui,sans-serif;font-size:18px;line-height:1.3;font-weight:700;letter-spacing:-.025em}" +
    ".ra-copy{margin:9px 0 0;font-size:14px;line-height:1.62;color:#43516a}" +
    ".ra-meta{margin:14px 0 0;padding-top:12px;border-top:1px solid #dbe5f2;font-size:12px;line-height:1.5;color:#5d6c84}" +
    ".ra-meta:empty{display:none}" +
    ".ra-links{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:14px}" +
    ".ra-link{color:" +
    accent +
    ";font-size:12px;line-height:1.4;font-weight:700;text-underline-offset:3px}" +
    ".ra-button{position:relative;display:block;min-width:184px;min-height:52px;border:0;background:transparent;padding:0 0 6px;cursor:pointer;font:inherit;filter:drop-shadow(0 10px 18px rgba(1,17,58,.26));transition:filter .18s ease,transform .18s ease}" +
    ".ra-button:hover{filter:drop-shadow(0 13px 22px rgba(1,17,58,.34));transform:translateY(-2px)}" +
    ".ra-button:focus-visible{outline:3px solid " +
    accent +
    "66;outline-offset:5px;border-radius:999px}" +
    ".ra-button-image{display:block;width:190px;max-width:calc(100vw - 32px);height:auto}" +
    ".ra-button-status{position:absolute;right:9px;bottom:0;max-width:172px;overflow:hidden;border:1px solid #b9d8ff;border-radius:999px;background:#fff;color:#12366c;padding:4px 8px;font-size:9px;line-height:1;font-weight:800;letter-spacing:.07em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;box-shadow:0 5px 12px rgba(1,17,58,.18)}" +
    ".ra-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}" +
    "@media (max-width:520px){.ra-panel-brand{align-items:flex-start;flex-direction:column;gap:8px}.ra-brand-image{max-width:70%}.ra-links{align-items:flex-start;flex-direction:column;gap:9px}}" +
    "@media (prefers-reduced-motion:no-preference){.ra-panel{animation:ra-in .16s ease-out}@keyframes ra-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}}" +
    "</style>" +
    '<div class="ra-wrap">' +
    '<section class="ra-panel" role="dialog" aria-label="' +
    safeTitle +
    '" data-open="false">' +
    '<div class="ra-panel-brand">' +
    '<img class="ra-brand-image" src="' +
    safeBrandUrl +
    '" alt="" aria-hidden="true">' +
    '<span class="ra-brand-status">' +
    safeTitle +
    "</span>" +
    "</div>" +
    '<div class="ra-panel-body">' +
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
    "</div>" +
    "</section>" +
    '<button class="ra-button" type="button" aria-expanded="false">' +
    '<img class="ra-button-image" src="' +
    safeBrandUrl +
    '" alt="" aria-hidden="true">' +
    '<span class="ra-button-status" aria-hidden="true">' +
    safeTitle +
    "</span>" +
    '<span class="ra-sr-only ra-button-title">' +
    safeTitle +
    "</span>" +
    '<span class="ra-sr-only ra-button-sub">' +
    copybook.open +
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
