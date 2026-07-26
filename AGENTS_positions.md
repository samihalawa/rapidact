# INDEX

RapidAct platform installers | copied platform engines drifted from the hosted badge and created marketplace-shaped overhead | keep one canonical runtime on rapidact.eu with thin WordPress, Shopify, Wix, GTM, and Zaraz adapters | do not build a Shopify app, WordPress update server, OAuth flow, copied engine, or call an unpublished kit a marketplace app | verify package integrity, real WordPress activation, localized rendered downloads, and live ZIP responses
RapidAct conversion page | the hero preview and later sections repeated the same offer details | show actual specimen pages in the hero and reserve detailed lists for their dedicated section | do not repeat long deliverable or free-tool explanations | verify the full page for repeated claims and a clear primary CTA
RapidAct scanner conversion | a spinner made the public-page preview feel unfinished and gave failures no next step | show readable scan phases and a permanent full-assessment fallback | do not imply the technical preview makes a company compliant | verify progress, success, unreachable, and CTA events live
RapidAct brand assets | redrawn SVG and generated marks drifted from the approved logo | use the exact tight-crop raster pack by purpose, plus semantic text for the wordmark and disclosure | do not redraw, stretch, or retain superseded marks | verify header, footer, badge, favicon, PWA, social, and five languages live
RapidAct responsive report rows | three children collapsed when the grid changed from two to three columns | place the description explicitly at each breakpoint | do not rely on implicit grid flow across column-count changes | verify 640–1023px and desktop rendered rows
RapidAct mobile header | language selector displaced the conversion action | keep compact logo, two-letter language selector, and assessment CTA visible | do not replace the CTA with a hamburger or full language name | verify the real phone header and 44px targets
RapidAct analytics | shared or duplicated measurement obscures conversion diagnosis | use dedicated RapidAct GA4/PostHog resources, one GTM loader, Consent Mode, and Cloudflare gateway | do not double-load gtag or reuse another product property | prove live events, replay, gateway config, and Ads link
RapidAct production deploy | runtime copies committed dist only | force-add the verified dist bundle with source changes | do not restore or omit generated assets before pushing | prove Coolify deployed the artifact commit and inspect the live UI
RapidAct product claims | claims outran shipped surfaces | promise only the scanner, hosted badge, written report, direct WordPress plugin, and Shopify/Wix install kits | do not call install kits marketplace apps or advertise extensions, hosted logs, or retired tiers | run product-claim sweep plus rendered installer and download proof

## 2026-07-26 — Platform adapters share one hosted runtime

- Status: CURRENT
- Project/root: `rapidact`; WordPress, Shopify, Wix, and the Article 50 installer page.
- Mistake: copying detection engines and signature databases into each platform package, then presenting source-only Shopify extension files as an installable product.
- Do: keep `rapidact-badge.js` canonical on `rapidact.eu`; ship a direct WordPress settings plugin, a Shopify Liquid kit, a Wix Custom Code kit, and paste-only GTM/Zaraz paths.
- Don't: fork the runtime, build a Shopify app, WordPress update server or OAuth flow, add speculative evidence/license/database layers, or call Shopify/Wix kits marketplace apps.
- Evidence: `integrations/`, `api/installers.test.ts`, disposable WordPress 6.8 activation proof, and localized `/article-50#install` browser checks in this task.
- Trigger terms: WordPress plugin, Shopify app, Wix plugin, install kit, central updates, paid later, hosted runtime.
- Verify before reuse: ZIP contents match source; WordPress activates and prints the canonical script; all five localized installer views have 44px actions and no horizontal overflow; live downloads return valid ZIPs.

## 2026-07-26 — The conversion page previews depth without repeating it

- Status: CURRENT
- Project/root: `rapidact`; homepage specimen, assessment outline, pricing, and free-tool sections.
- Mistake: the hero reproduced all six assessment rows, then the next section repeated them; pricing also repeated the scanner and notice explanation shown later.
- Do: use rendered pages from the real specimen in the hero, keep the full assessment outline in one section, and explain the free tools once.
- Don't: use another long HTML deliverables panel as a document preview or repeat secondary offers around the main €99 decision.
- Evidence: user-supplied full-page screenshot and correction in this task; `src/sections/Hero.tsx`, `Pricing.tsx`, and the generated specimen page images.
- Trigger terms: redundant copy, long page, specimen mockup, conversion, free tools, CTA hierarchy.
- Verify before reuse: inspect the entire desktop page and phone flow; confirm the PDF preview is legible as a document, the primary CTA remains visually dominant, and every removed duplicate still has one reachable canonical section.

## 2026-07-26 — Scanner progress must lead to the complete assessment

- Status: CURRENT
- Project/root: `rapidact`; free website scanner and paid-assessment conversion.
- Mistake: a lone loading spinner made the real public-page scan feel like a placeholder, while blocked scans had no strong continuation path.
- Do: show concise phases for the actual fetch, page read, signature check, and preview build; keep a compact €99 full-assessment CTA visible before and after results.
- Don't: say the automated page preview performs a complete company scan or makes the site compliant.
- Evidence: user correction in this task; `src/pages/Scanner.tsx` now separates the public-page preview from private systems, roles, disclosures, and the written action plan.
- Trigger terms: scanner, spinner, progress, preview, fallback, full scan, compliance.
- Verify before reuse: render progress through completion; test reachable, unreachable, and transport-error states; confirm scan and fallback analytics events fire once.

## 2026-07-26 — Exact tight-crop pack is the only active RapidAct mark

- Status: CURRENT
- Project/root: `rapidact`; site chrome, disclosure badge, browser icons, PWA, Windows tiles, structured data, and social sharing.
- Mistake: retaining a redrawn SVG shield and generated horizontal badge after the approved exact tight-crop raster pack was supplied.
- Do: use `rapidact-exact-symbol.png` for visible lockups and the pack's purpose-built favicon, Apple, PWA, maskable, Windows, and social assets; keep wordmark/disclosure text semantic.
- Don't: redraw, recolor, stretch, crop again, or leave a superseded mark reachable from an active page or metadata tag.
- Evidence: user-supplied `RapidAct_Exact_Logo_Favicon_PWA_Pack_TightCrop` and its README stating no logo was redrawn.
- Trigger terms: logo, branding, favicon, PWA, badge, social image, app icon.
- Verify before reuse: compare source hashes with the supplied pack, then inspect header, footer, badge, install preview, favicon/manifest metadata, and EN/ES/DE/FR/IT live.

## 2026-07-26 — Responsive report rows require explicit placement

- Status: CURRENT
- Project/root: `rapidact`; report-offer rows between tablet and desktop breakpoints.
- Mistake: a three-child row used two columns at `sm` and three at `lg`, so implicit flow placed the description in a narrow first-column strip.
- Do: place the description in column two at `sm` and column three at `lg` when the grid changes shape.
- Don't: rely on auto-placement when one semantic row has more children than the intermediate breakpoint has columns.
- Evidence: user-selected production defect in this task; corrected `ReportOffer.tsx` rendered with full-width descriptions at the same mid-width.
- Trigger terms: report rows, numbered section, giant blank area, collapsed text, tablet, responsive grid.
- Verify before reuse: render 640–1023px and desktop widths; confirm every number, title, and description stays on its intended row without horizontal overflow.

## 2026-07-26 — Mobile navigation preserves the conversion path

- Status: CURRENT
- Project/root: `rapidact`; responsive header and localized buyer journey.
- Mistake: allowing a large language control or generic mobile menu to replace the primary assessment action.
- Do: keep the compact horizontal brand, two-letter language selector, and short localized assessment CTA visible on phones.
- Don't: hide the conversion action behind a hamburger or show a full-width language picker.
- Evidence: user correction in this task; `SiteNav.tsx` and `i18n.tsx` implement the compact header and 44px controls.
- Trigger terms: phone, responsive, header, language selector, hamburger, conversion CTA.
- Verify before reuse: inspect the rendered header at a real phone viewport, then desktop; confirm no wrap, clipping, overlap, or sub-44px control.

## 2026-07-26 — Analytics resources are product-specific and single-loader

- Status: CURRENT
- Project/root: `rapidact`; acquisition, conversion, consent, and replay measurement.
- Mistake: reusing another product's property or loading GTM and gtag independently, creating contaminated or duplicate events.
- Do: keep RapidAct's dedicated GA4 property, PostHog project, GTM container, Ads link, Consent Mode v2, and Cloudflare `/metrics` gateway.
- Don't: emit a purchase before payment proof, capture form contents, or add a second Google loader.
- Evidence: `src/lib/analytics.ts`, GA4 property `547132092`, GTM `GTM-TZFZ5ZHK`, and Cloudflare zone config read-back on 2026-07-26.
- Trigger terms: GA4, GTM, Google Ads, PostHog, consent, replay, Cloudflare gateway, conversion.
- Verify before reuse: one loader in the DOM, live pageviews and explicit events, a PostHog replay, Ads property link, and gateway `enabled=true`, `setUpTag=false`.

## 2026-07-26 — Production serves the committed distribution bundle

- Status: CURRENT
- Project/root: `rapidact`; GitHub-to-Coolify production deployment.
- Mistake: treating a passing local build and pushed source as sufficient while `dist/` remained ignored and unchanged.
- Do: build locally, force-add the complete verified `dist/` output, and push the source and artifact together.
- Don't: restore generated assets before closure or assume Coolify rebuilds the application from TypeScript.
- Evidence: `Dockerfile` copies only `dist/`; `.gitignore` ignores that directory; Coolify deployment `i239tu493tdqrq7tkchyrhg7` built commit `ed039d2` from the old tracked bundle.
- Trigger terms: deploy, Coolify, production, dist, build artifact, live UI.
- Verify before reuse: Coolify logs name the artifact commit, local and remote refs match, and the live installer plus exact WhatsApp destination render at `rapidact.eu`.

## 2026-07-26 — Product claims must resolve to a shipped surface

- Status: CURRENT
- Project/root: `rapidact`; website conversion, platform guides, and multilingual content.
- Mistake: pages advertised WordPress/Wix/Shopify installers, a Chrome extension, automatic evidence logging, and a retired €59 tier that the repository did not ship.
- Do: keep the offer canonical as the free public scanner, free one-script badge, and €99 written assessment; describe evidence as a proportionate implementation record.
- Don't: treat a technical badge as a universal Article 50 certificate or assign provider/deployer duties from a public signature match alone.
- Evidence: `public/rapidact-badge.js`, `src/pages/Guide.tsx`, `src/config.ts`, `api/badge.test.ts`, and the 2026-07-26 multilingual content sweep.
- Trigger terms: badge, plugin, app, extension, evidence log, pricing tier, Article 50 role, conversion copy.
- Verify before reuse: zero retired/invented-product matches, tests and build pass, copy interaction works, and desktop/mobile live pages show the badge plus exact WhatsApp destination.
