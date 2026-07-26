(function () {
  "use strict";

  if (document.getElementById("rapidact-ai-disclosure")) return;

  var script = document.currentScript;
  var language =
    (script && script.dataset.language) ||
    document.documentElement.lang ||
    "en";
  var isSpanish = language.toLowerCase().startsWith("es");
  var title =
    (script && script.dataset.title) ||
    (isSpanish ? "Transparencia de IA" : "AI transparency");
  var message =
    (script && script.dataset.message) ||
    (isSpanish
      ? "Este sitio utiliza un asistente de IA. Estás interactuando con un sistema de IA, no con una persona."
      : "This site uses an AI assistant. You are interacting with an AI system, not a person.");
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
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  var root = host.attachShadow ? host.attachShadow({ mode: "open" }) : host;
  root.innerHTML =
    "<style>" +
    ":host{all:initial}" +
    "*,*::before,*::after{box-sizing:border-box}" +
    ".ra-wrap{display:flex;flex-direction:column;align-items:" +
    (position === "left" ? "flex-start" : "flex-end") +
    ";gap:8px}" +
    ".ra-panel{display:none;width:min(360px,calc(100vw - 32px));border:1px solid #d8d8d2;background:#fff;color:#16181d;padding:18px;box-shadow:0 18px 45px rgba(22,24,29,.16)}" +
    ".ra-panel[data-open=true]{display:block}" +
    ".ra-eyebrow{margin:0 0 6px;font-size:11px;line-height:1.2;font-weight:750;letter-spacing:.1em;text-transform:uppercase;color:#6b7280}" +
    ".ra-title{margin:0;font-size:15px;line-height:1.35;font-weight:750}" +
    ".ra-copy{margin:8px 0 0;font-size:14px;line-height:1.55;color:#4b5563}" +
    ".ra-meta{margin:12px 0 0;padding-top:12px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.5;color:#6b7280}" +
    ".ra-meta:empty{display:none}" +
    ".ra-links{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:14px}" +
    ".ra-link{color:" +
    accent +
    ";font-size:12px;line-height:1.4;font-weight:700;text-underline-offset:3px}" +
    ".ra-button{display:inline-flex;min-height:46px;align-items:center;gap:9px;border:1px solid #d8d8d2;border-radius:6px;background:#fff;color:#16181d;padding:8px 13px;box-shadow:0 5px 18px rgba(22,24,29,.12);cursor:pointer;font:inherit}" +
    ".ra-button:hover{border-color:#9ca3af;background:#f8f8f6}" +
    ".ra-button:focus-visible{outline:3px solid " +
    accent +
    "55;outline-offset:3px}" +
    ".ra-icon{display:grid;width:23px;height:23px;place-items:center;border-radius:4px;background:" +
    accent +
    ";color:#fff;font-size:13px;font-weight:800}" +
    ".ra-button-title{display:block;font-size:12px;line-height:1.15;font-weight:750;text-align:left}" +
    ".ra-button-sub{display:block;margin-top:2px;font-size:10px;line-height:1.15;color:#6b7280;text-align:left}" +
    "@media (prefers-reduced-motion:no-preference){.ra-panel{animation:ra-in .16s ease-out}@keyframes ra-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}}" +
    "</style>" +
    '<div class="ra-wrap">' +
    '<section class="ra-panel" role="dialog" aria-label="' +
    safeTitle +
    '" data-open="false">' +
    '<p class="ra-eyebrow">' +
    (isSpanish ? "Aviso de transparencia" : "Transparency notice") +
    "</p>" +
    '<h2 class="ra-title">' +
    safeTitle +
    "</h2>" +
    '<p class="ra-copy"></p>' +
    '<p class="ra-meta"></p>' +
    '<div class="ra-links">' +
    '<a class="ra-link ra-details" target="_blank" rel="noopener"></a>' +
    '<a class="ra-link" href="https://rapidact.eu/article-50#install" target="_blank" rel="noopener">' +
    (isSpanish ? "Badge gratuito de RapidAct" : "Free badge by RapidAct") +
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
    (isSpanish ? "Ver aviso" : "View notice") +
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
    system && (isSpanish ? "Sistema: " : "System: ") + system,
    provider && (isSpanish ? "Responsable: " : "Responsible: ") + provider,
  ]
    .filter(Boolean)
    .join(" · ");

  if (detailsUrl) {
    details.href = detailsUrl;
    details.textContent = isSpanish ? "Más información" : "More details";
  } else {
    details.remove();
  }

  button.addEventListener("click", function () {
    var open = panel.getAttribute("data-open") !== "true";
    panel.setAttribute("data-open", String(open));
    button.setAttribute("aria-expanded", String(open));
    button.querySelector(".ra-button-sub").textContent = open
      ? isSpanish
        ? "Cerrar aviso"
        : "Close notice"
      : isSpanish
        ? "Ver aviso"
        : "View notice";
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    panel.setAttribute("data-open", "false");
    button.setAttribute("aria-expanded", "false");
    button.querySelector(".ra-button-sub").textContent = isSpanish
      ? "Ver aviso"
      : "View notice";
  });

  document.body.appendChild(host);
})();
