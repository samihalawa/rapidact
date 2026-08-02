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
      details: "Read the Article 50 guide",
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
      details: "Leer la guía del artículo 50",
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
      details: "Artikel-50-Leitfaden lesen",
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
      details: "Lire le guide de l’article 50",
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
      details: "Leggi la guida all’articolo 50",
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
  var badgeId = (script && script.dataset.badgeId) || "";
  var requestedDisplay = (script && script.dataset.display) || "bubble";
  var supportedDisplays = ["bubble", "standard", "popup"];
  var display =
    supportedDisplays.indexOf(requestedDisplay) >= 0
      ? requestedDisplay
      : "bubble";
  var targetSelector = (script && script.dataset.target) || "";
  var showCredit =
    !script || typeof script.dataset.showCredit === "undefined"
      ? true
      : script.dataset.showCredit === "true";
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
    "https://rapidact.eu/brand/rapidact-exact-symbol-128.webp";
  try {
    if (script && script.src) {
      defaultBrandUrl = new URL(
        "brand/rapidact-exact-symbol-128.webp",
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
  if (badgeId) host.setAttribute("data-badge-id", badgeId);
  host.setAttribute("data-display", display);
  if (display === "standard") {
    host.style.position = "relative";
    host.style.display = "block";
    host.style.width = "100%";
  } else {
    host.style.position = "fixed";
    host.style[position] = "max(16px, env(safe-area-inset-" + position + "))";
    host.style.bottom = "max(16px, env(safe-area-inset-bottom))";
  }
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
    ".ra-backdrop{display:none}" +
    ".ra-panel{position:relative;display:none;width:min(390px,calc(100vw - 32px));overflow:hidden;border:1px solid #174a9b;border-radius:18px;background:#fff;color:#08152f;box-shadow:0 24px 70px rgba(1,17,58,.25),0 0 0 3px rgba(34,197,255,.08)}" +
    ".ra-panel[data-open=true]{display:block}" +
    ".ra-panel-brand{display:flex;min-height:78px;align-items:center;justify-content:space-between;gap:14px;border-bottom:1px solid rgba(67,206,255,.35);background:#03123d;padding:11px 15px}" +
    ".ra-brand-lockup{display:flex;min-width:0;align-items:center;gap:10px}" +
    ".ra-brand-actions{display:flex;align-items:center;gap:8px}" +
    ".ra-brand-image{display:block;width:auto;height:54px;flex:none}" +
    ".ra-brand-name{font-family:'Sora','Avenir Next',ui-sans-serif,system-ui,sans-serif;font-size:18px;line-height:1;font-weight:700;letter-spacing:-.045em;color:#fff;white-space:nowrap}" +
    ".ra-brand-name-accent{color:#53ddff}" +
    ".ra-brand-status{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(109,221,255,.5);border-radius:999px;background:rgba(11,76,169,.48);color:#e9f9ff;padding:6px 9px;font-size:9px;line-height:1;font-weight:800;letter-spacing:.09em;text-transform:uppercase;white-space:nowrap}" +
    ".ra-brand-status::before{width:6px;height:6px;border-radius:50%;background:#53ddff;box-shadow:0 0 9px #53ddff;content:''}" +
    ".ra-close{display:grid;width:44px;height:44px;place-items:center;border:1px solid rgba(109,221,255,.42);border-radius:999px;background:rgba(11,76,169,.3);color:#fff;cursor:pointer;font:700 22px/1 ui-sans-serif,system-ui,sans-serif}" +
    ".ra-close:hover{background:rgba(34,116,221,.48)}" +
    ".ra-close:focus-visible{outline:3px solid #53ddff;outline-offset:2px}" +
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
    ".ra-button{position:relative;display:block;min-width:214px;min-height:62px;overflow:hidden;border:1px solid #4ba8ff;border-radius:999px;background:linear-gradient(115deg,#020b27 0%,#06235e 58%,#0b4ba9 100%);padding:7px 17px 7px 12px;cursor:pointer;font:inherit;box-shadow:0 14px 30px rgba(1,17,58,.3),inset 0 0 0 2px #061a48,inset 0 0 0 3px rgba(105,210,255,.78);transition:box-shadow .18s ease,transform .18s ease}" +
    ".ra-button::before{position:absolute;inset:3px;border:1px solid rgba(255,255,255,.16);border-radius:999px;pointer-events:none;content:''}" +
    ".ra-button::after{position:absolute;top:5px;right:18px;left:48px;height:1px;background:linear-gradient(90deg,transparent,rgba(143,226,255,.75),transparent);pointer-events:none;content:''}" +
    ".ra-button:hover{box-shadow:0 17px 34px rgba(1,17,58,.38),inset 0 0 0 2px #061a48,inset 0 0 0 3px rgba(105,210,255,.95);transform:translateY(-2px)}" +
    ".ra-button:focus-visible{outline:3px solid " +
    accent +
    "66;outline-offset:5px;border-radius:999px}" +
    ".ra-button-lockup{position:relative;z-index:1;display:flex;align-items:center;gap:10px;text-align:left}" +
    ".ra-button-image{display:block;width:auto;height:46px;flex:none;filter:drop-shadow(0 2px 5px rgba(0,0,0,.28))}" +
    ".ra-button-copy{display:block;min-width:0}" +
    ".ra-button-name{display:block;font-family:'Sora','Avenir Next',ui-sans-serif,system-ui,sans-serif;font-size:17px;line-height:1.05;font-weight:750;letter-spacing:-.045em;color:#fff;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,.3)}" +
    ".ra-button-name-accent{color:#53ddff}" +
    ".ra-button-status{display:block;margin-top:5px;max-width:145px;overflow:hidden;color:#dff8ff;font-size:8px;line-height:1;font-weight:800;letter-spacing:.085em;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}" +
    ".ra-sr-only{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important}" +
    "@media (max-width:520px){.ra-panel-brand{align-items:flex-start;flex-direction:column;gap:9px}.ra-links{align-items:flex-start;flex-direction:column;gap:9px}.ra-button{min-width:54px;min-height:54px;padding:6px}.ra-button-image{height:38px}.ra-button-copy{display:none}}" +
    (display === "standard"
      ? ".ra-wrap{display:block}.ra-panel{display:block;width:100%;max-width:760px;border-radius:14px;box-shadow:0 14px 42px rgba(1,17,58,.12)}.ra-button,.ra-close{display:none}"
      : "") +
    (display === "popup"
      ? ".ra-backdrop[data-open=true]{position:fixed;z-index:0;inset:-100vh -100vw;display:block;background:rgba(3,18,61,.56);backdrop-filter:blur(4px)}.ra-panel{position:fixed;z-index:1;top:50%;left:50%;width:min(520px,calc(100vw - 32px));max-height:calc(100dvh - 32px);overflow-y:auto;transform:translate(-50%,-50%)}"
      : "") +
    "@media (prefers-reduced-motion:no-preference){.ra-panel[data-open=true]{animation:ra-in .16s ease-out}@keyframes ra-in{from{opacity:0}to{opacity:1}}}" +
    "</style>" +
    '<div class="ra-wrap">' +
    '<div class="ra-backdrop" data-open="false" aria-hidden="true"></div>' +
    '<section class="ra-panel" role="' +
    (display === "standard" ? "region" : "dialog") +
    '" aria-label="' +
    safeTitle +
    '" aria-modal="' +
    (display === "popup" ? "true" : "false") +
    '" tabindex="-1" data-open="' +
    (display === "standard" ? "true" : "false") +
    '">' +
    '<div class="ra-panel-brand">' +
    '<div class="ra-brand-lockup">' +
    '<img class="ra-brand-image" src="' +
    safeBrandUrl +
    '" alt="" aria-hidden="true" width="128" height="128">' +
    '<span class="ra-brand-name">Rapid<span class="ra-brand-name-accent">Act</span></span>' +
    "</div>" +
    '<span class="ra-brand-actions">' +
    '<span class="ra-brand-status">' +
    safeTitle +
    "</span>" +
    '<button class="ra-close" type="button" aria-label="' +
    copybook.close +
    '">&times;</button>' +
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
    (showCredit
      ? '<a class="ra-link" href="https://rapidact.eu/article-50#install" target="_blank" rel="noopener">' +
        copybook.install +
        "</a>"
      : "") +
    "</div>" +
    "</div>" +
    "</section>" +
    '<button class="ra-button" type="button" aria-expanded="false">' +
    '<span class="ra-button-lockup" aria-hidden="true">' +
    '<img class="ra-button-image" src="' +
    safeBrandUrl +
    '" alt="" aria-hidden="true" width="128" height="128">' +
    '<span class="ra-button-copy">' +
    '<span class="ra-button-name">Rapid<span class="ra-button-name-accent">Act</span></span>' +
    '<span class="ra-button-status">' +
    safeTitle +
    "</span>" +
    "</span>" +
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
  var closeButton = root.querySelector(".ra-close");
  var backdrop = root.querySelector(".ra-backdrop");
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

  var setOpen = function (open, focusPanel) {
    panel.setAttribute("data-open", String(open));
    backdrop.setAttribute("data-open", String(open && display === "popup"));
    button.setAttribute("aria-expanded", String(open));
    button.querySelector(".ra-button-sub").textContent = open
      ? copybook.close
      : copybook.open;
    if (open && focusPanel) closeButton.focus();
  };

  button.addEventListener("click", function () {
    var open = panel.getAttribute("data-open") !== "true";
    setOpen(open, open && display === "popup");
  });

  closeButton.addEventListener("click", function () {
    setOpen(false, false);
    button.focus();
  });

  backdrop.addEventListener("click", function () {
    setOpen(false, false);
    button.focus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (panel.getAttribute("data-open") !== "true" || display === "standard")
      return;
    setOpen(false, false);
    button.focus();
  });

  var mount = document.body;
  if (display === "standard" && targetSelector) {
    try {
      mount = document.querySelector(targetSelector) || document.body;
    } catch (_selectorError) {
      mount = document.body;
    }
  }
  mount.appendChild(host);
})();
