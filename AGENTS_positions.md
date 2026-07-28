# INDEX

RapidAct conversion truth | fulfilled API calls and repeat checkout clicks can inflate key events without retained leads or new intent | gate lead conversions on DB or CRM retention, keep partner success CRM-backed, and dedupe checkout initiation per reference/session | do not equate mutation fulfillment with captured lead, emit success and failure for one attempt, or treat initiation value as revenue | verify forced-failure branches, repeat payment clicks, GTM parameter forwarding and purchase remains provider-confirmed only
RapidAct partner distribution | copying enterprise partner-program complexity would slow the first referral and obscure the €99 entry offer | use one paid-discovery assessment, explicit €69 partner cost, typed legal/audit/delivery entry points and partner-owned follow-on fees | do not add tiers, certification, portals, minimums or unverified applicability claims | verify economics, first-client form, typed deep links, CRM capture and sent-message destinations
RapidAct localized platform guides | translating only a shared shell flattened product-specific guidance and produced broken custom-site grammar | localize each platform's role, evidence boundary and install nuance independently | do not interpolate a generic platform name into legal or technical sentences | verify 24 localized routes, semantic tests, language-specific accessibility labels and phone/desktop overflow
RapidAct scanner result integrity | optional Anchor fields can arrive as JSON null and URL edits can leave a prior result visible | normalize nullable optional evidence at the parser boundary, clear result state on every new input, and report observed counts rather than a compliance-like score | do not reject a valid scan because absent evidence is null, attribute an old result to a new URL, or imply 100 means compliant | verify deepswapai.io completes, the inspected URL matches, changing input removes the result, and the three-step result renders in five languages on phone/desktop
RapidAct scanner engine | a broad three-page, 80-step Anchor task made the free preview slow and encouraged false-positive exploration | make one strict four-step Anchor `perform-web-task` call that inspects only the submitted rendered page | do not navigate, simulate percentage progress, silently downgrade, or treat AI-related content and badges as functional AI | verify live duration, exactly one inspected URL, functional evidence, failure/retry, five languages, PDF, phone/desktop and production
RapidAct Typebot guide | a copied AI example was live but failed with `No model provided`, while an open-ended loop had no reliable completion | use one optional finite assessment, explicit Kimi model, native lead endpoint, deterministic final links | do not replace the scanner, copy an unrelated bot, or rely on a published badge as runtime proof | verify the published viewer chat through CRM capture, AI answer, clean logs and final action links
RapidAct scanner conversion gate | the company-assessment escalation appeared before the free result and email capture happened afterwards | require a closable email gate before scanning, then show PDF and complete-scan escalation only after the result | do not let Typebot replace the direct scanner or put full-scan sales copy before results | verify close/invalid/valid modal states, one-page PDF, prefilled WhatsApp, Close sync and five languages live
RapidAct category positioning | a product-workflow hero still made the scanner, badge and report look like the category | lead with the EU AI Act transparency practice; present tools and assessment as its methods | do not call Agents AI Ltd. a law firm or let product mechanics displace Article 50 expertise | verify hero, metadata, structured data, specialist credentials, service scope and five languages live
RapidAct product hierarchy | the paid assessment displaced the free operational product and made RapidAct read like a report shop | lead with discover, disclose, implement, assess; keep the assessment as paid escalation | do not use the specimen, report contents, pricing, and payment FAQ as the whole above-the-fold identity | verify hero, nav, section order, metadata, footer, CTA paths, and five languages at phone/tablet/desktop widths
RapidAct installation dashboard | marketplace-only UI stranded users before listings were public, while pending-publication labels exposed internal release state | show only working direct platform installation until a real listing URL is verified; retain native packages internally | do not advertise unpublished listings, expose submission status, publish direct ZIPs, or report a copy conversion before the clipboard succeeds | verify all platform/style snippets, bundled runtime parity, clipboard feedback, preview, no pending copy, five languages and live phone/desktop layouts
RapidAct conversion page | the hero preview and later sections repeated the same offer details | show actual specimen pages in the hero and reserve detailed lists for their dedicated section | do not repeat long deliverable or free-tool explanations | verify the full page for repeated claims and a clear primary CTA
RapidAct scanner conversion | a spinner made the public-page preview feel unfinished and gave failures no next step | show readable scan phases and a permanent full-assessment fallback | do not imply the technical preview makes a company compliant | verify progress, success, unreachable, and CTA events live
RapidAct brand assets | redrawn SVG and generated marks drifted from the approved logo | use the exact tight-crop raster pack by purpose, plus semantic text for the wordmark and disclosure | do not redraw, stretch, or retain superseded marks | verify header, footer, badge, favicon, PWA, social, and five languages live
RapidAct responsive report rows | three children collapsed when the grid changed from two to three columns | place the description explicitly at each breakpoint | do not rely on implicit grid flow across column-count changes | verify 640–1023px and desktop rendered rows
RapidAct mobile header | the language selector displaced navigation and the conversion action | keep compact logo, 44px Scan CTA and 44px menu; place the small language selector inside the drawer | do not expose the desktop nav or language selector in the phone header | verify the real phone/tablet header, drawer links, language control, no overflow and 44px targets
RapidAct analytics | shared, local, duplicated, pageview-only, or name-only measurement obscures conversion diagnosis | use dedicated RapidAct GA4/PostHog resources, a production-host allowlist, one GTM loader and one direct Google-tag event command per product event | do not track localhost, emit repeated PostHog opt-ins, keep the incomplete GTM product tag active, or reuse another product property | prove exact GA4/PostHog event names and parameters, replay/errors, gateway config, and Ads link
RapidAct production deploy | runtime copies committed dist only | force-add the verified dist bundle with source changes | do not restore or omit generated assets before pushing | prove Coolify deployed the artifact commit and inspect the live UI
RapidAct product claims | claims outran shipped surfaces | promise only the scanner, hosted badge, written report and working direct installation; keep marketplace release state internal until a listing is public | do not expose review/submission/publication status or imply native packages are listed | run the customer-facing claim sweep and inspect rendered installer/platform routes

## 2026-07-29 — Conversion events require retained leads and unique checkout intent

- Status: CURRENT
- Project/root: `rapidact`; scanner gate, assessment intake, partner intake and bunq checkout analytics.
- Mistake: fulfilled lead mutations were counted as conversions even when neither DB nor Close retained the lead; partner intake could emit success and failure together, and repeated checkout clicks could multiply €99 initiation value.
- Do: emit lead conversions only when DB storage or the required CRM path succeeds, make success/failure mutually exclusive, and dedupe `payment_initiated` per non-PII checkout ID within the browser session.
- Don't: treat mutation fulfillment as capture proof, count checkout initiation as revenue, or emit `purchase` without provider confirmation and a stable transaction ID.
- Evidence: independent analytics critique on 2026-07-29; `api/routers/leads.ts`, `api/routers/report.ts`, `src/pages/{Scanner,Report,Partners}.tsx`.
- Trigger terms: key event, lead, retained, stored, CRM, duplicate, bunq, checkout, purchase, value.
- Verify before reuse: exercise retained/unretained branches, repeat one payment click, inspect the published GTM parameter map, and read exact GA4/PostHog payloads.

## 2026-07-29 — Product-event parameters use the loaded Google tag directly

- Status: CURRENT
- Project/root: `rapidact`; GA4/GTM custom product-event forwarding.
- Mistake: the GTM GA4 product-event tag forwarded `{{Event}}` but its published Event Parameters table was empty, so event names arrived while diagnostic and value fields were dropped.
- Do: keep the single GTM loader and Google configuration tag, send each custom event once through the already-loaded `gtag` command with its complete payload, and keep the incomplete GTM product tag paused.
- Don't: combine direct custom-event commands with an active GTM product-event tag, add another Google loader, or infer parameter receipt from an event name.
- Evidence: authenticated GTM read on 2026-07-29 showed measurement `G-PEFSF0DS02`, event name `{{Event}}` and zero published event-parameter rows; `src/lib/analytics.ts`.
- Trigger terms: GA4, GTM, parameter, event name, value, currency, checkout ID, lead source, duplicate.
- Verify before reuse: publish the paused tag, capture one live Google collect body, confirm exact parameters, and verify PostHog receives the same event payload once.

## 2026-07-28 — Partner distribution starts with one paid client discovery

- Status: CURRENT
- Project/root: `rapidact`; `/partners`, partner lead capture and outbound partner campaign.
- Mistake: a copied enterprise partner programme would add tiers, certification, portals and onboarding before a first paid referral; generic partner links also default every recipient to the legal motion.
- Do: sell one €99 Article 50 company assessment as paid discovery at a €69 founding-partner cost, let the partner choose the client price and keep all follow-on service fees, and deep-link legal, audit and delivery firms to their exact motion.
- Don't: claim Article 50 applicability before assessment or require a dashboard, minimum, certification or programme onboarding.
- Evidence: current-thread Drata comparison, two independent pre-send critiques, `src/data/localizedPartners.ts`, `src/pages/Partners.tsx` and the 30-row Close campaign.
- Trigger terms: partner, affiliate, reseller, audit firm, law firm, referral, white label, Drata.
- Verify before reuse: render the three typed routes in five languages, submit a first-client enquiry through Close, and read back exact recipient, sender, link type and sent state for outreach.

## 2026-07-28 — Platform translations preserve platform-specific meaning

- Status: CURRENT
- Project/root: `rapidact`; localized platform guides, shared navigation and installer links.
- Mistake: a generic translated template inserted platform names into every sentence, produced phrases such as “site in Any website,” and removed Shopify content-label, Tidio/Lyro role and Botpress first-message guidance.
- Do: translate each platform’s actual role, evidence boundary and installation nuance; localize the home, language and close labels and preserve the locale in breadcrumbs and not-found links.
- Don't: infer localization quality from a translated heading or interpolate a generic platform label into legal or technical copy.
- Evidence: independent critique on 2026-07-28; `src/data/platforms.ts`, `platforms.test.ts`, and local 375/1280px browser audit of 24 routes.
- Trigger terms: multilingual, platform guide, Any website, Tidio, Lyro, Shopify, Botpress, language selector.
- Verify before reuse: run semantic tests, inspect all 24 localized routes for `html[lang]`, title, H1 and overflow, then open the mobile drawer and confirm localized accessibility names.

## 2026-07-28 — Public installation copy describes only working paths

- Status: CURRENT
- Project/root: `rapidact`; Article 50 installer, platform guides, badge manifest and native packages.
- Mistake: public tiles and metadata described store submission or publication state even though no verified listing URL existed.
- Do: present the exact direct installation path for every platform; retain locally bundled WordPress, Shopify and Wix packages as internal release assets until an actual listing URL is verified.
- Don't: expose “submission build”, “awaiting”, “pending”, directory-review labels or marketplace distribution values in the customer-facing site or public badge manifest.
- Evidence: user correction on 2026-07-28, customer-facing `rg` sweep, simplified `BadgeInstallDashboard.tsx`, `platforms.ts` and `badge-manifest.json`.
- Trigger terms: marketplace, directory, publication, submission build, awaiting, pending, app store, installer.
- Verify before reuse: render installer/platform routes in five languages, search built assets for unfinished copy, byte-compare the three native runtime bundles, and add a store action only with a live verified URL.

## 2026-07-28 — Mobile navigation uses one compact menu

- Status: CURRENT
- Project/root: `rapidact`; shared phone/tablet header and localized navigation.
- Mistake: the visible language selector replaced the expected menu and left core routes unreachable from the phone header.
- Do: keep logo, short Scan CTA and 44px menu visible; put all navigation links and the small language selector inside the drawer.
- Don't: show the desktop nav or standalone language selector below `lg`, or hide the Scan conversion action in the drawer.
- Evidence: user correction on 2026-07-28 plus rendered 375px proof showing 55×44 Scan, 44×44 menu and `scrollWidth === innerWidth`.
- Trigger terms: phone, hamburger, menu, language selector, responsive header, conversion CTA.
- Verify before reuse: open/close the drawer at phone and tablet widths, select each language, inspect all links and ensure no horizontal overflow or sub-44px controls.

## 2026-07-28 — Scanner results must remain attributable and accept provider nulls

- Status: CURRENT
- Project/root: `rapidact`; `/scanner`, `api/lib/anchor.ts`, localized result UI and PDF.
- Mistake: the parser rejected a successful Anchor result when Gemini returned `disclosure_text: null`; editing the input could also leave the previous site’s result visible, and the numeric readiness score looked like a compliance verdict.
- Do: normalize nullable optional evidence at the provider boundary, clear all result/error/copy state when the URL changes, and present one observed-touchpoint count followed by assessment and implementation steps.
- Don't: expose internal Anchor codes, keep a result after its input changes, or describe a one-page observation as a readiness score out of 100.
- Evidence: direct Anchor workflow `78007` returned the requested `deepswapai.io` page with `disclosure_text: null`; the production defect showed `deepswapai.io` in the field while the result still named `oulang.ai`.
- Trigger terms: anchor-invalid-result, deepswapai.io, stale result, wrong URL, score 100, too many sections, scanner conversion.
- Verify before reuse: complete a live `deepswapai.io` scan, match the exact inspected URL/title, change the input and confirm the result disappears, inspect the three numbered sections plus PDF in EN/ES/DE/FR/IT at phone and desktop widths.

## 2026-07-28 — The free Anchor scan is a strict one-page preview

- Status: CURRENT
- Project/root: `rapidact`; `/scanner`, `api/routers/scan.ts`, Anchor Browser `perform-web-task`.
- Mistake: expanding the free preview to three pages and 80 browser steps made it take 61 seconds; a looser reduced prompt then misclassified Article 50 links and the RapidAct notice badge as AI systems.
- Do: run one server-side four-step Anchor task on only the submitted rendered page; report only functional controls that accept AI input or return AI output, with directly visible disclosure evidence.
- Don't: navigate, click, submit, perform Article 5/Annex III review, treat AI-related content as a touchpoint, silently downgrade, or show a simulated completion percentage.
- Evidence: direct Anchor workflow `78338` completed the requested `deepswapai.io` page in four steps with one visited URL and a directly observed face-swap finding; workflow `77586` is the falsified loose-prompt comparison.
- Trigger terms: scanner speed, less complete, one page, Anchor Browser, prompt, progress, false positive, fallback.
- Verify before reuse: time the production flow, require exactly one inspected URL and functional evidence, exercise partial/error/retry, inspect PDF plus EN/ES/DE/FR/IT phone/desktop UI, and prove production uses the pushed commit.

## 2026-07-27 — Typebot augments the scanner with one finite guided assessment

- Status: CURRENT
- Project/root: `rapidact`; Typebot workspace, published viewer and scanner result CTA.
- Mistake: treating a published AI sample as working even though its OpenAI-compatible block had no model, then considering an open-ended assistant that could loop without producing a lead or next action.
- Do: use the published `rapidact-guided-assessment` flow as an optional post-result path; collect website, need, email and context, call the native lead mutation, run one grounded Kimi recommendation, then end on scanner/report/WhatsApp links.
- Don't: replace the native scanner, reuse the Oulang lead bot, auto-open a global bubble, or infer AI health from the Typebot “Live” label.
- Evidence: Typebot viewer returned `No model provided` for the old sample; the Kimi `/models` response included `kimi-for-coding`; the repaired published flow ended with an AI recommendation and zero error logs.
- Trigger terms: Typebot, AI guide, guided assessment, Kimi, Live, model, loop, optional form.
- Verify before reuse: start the published viewer bot, complete every input, read back the RapidAct DB and Close record, confirm a non-empty AI answer, zero error logs and the final three action routes.

## 2026-07-27 — Scanner qualifies first, escalates after the result

- Status: CURRENT
- Project/root: `rapidact`; `/scanner`, lead capture, result PDF and complete-scan conversion.
- Mistake: letting visitors scan before providing an email, placing the full-assessment pitch before the result, and offering only a plain-text download.
- Do: open a closable email gate from every scan trigger, accept any valid email, capture it before scanning, then provide the one-page PDF and prefilled WhatsApp complete-scan request after results.
- Don't: make Typebot the only scan path, repeat the email form after results, or show the complete-scan pitch before the free result.
- Evidence: explicit user correction on 2026-07-27; prior source had direct `runScan`, pre-result `fullLabel`, post-result email capture and `rapidact-scan.txt`.
- Trigger terms: scanner modal, professional email, receive it, full scan, PDF, WhatsApp, Typebot, Close CRM.
- Verify before reuse: exercise modal close/invalid/valid states, confirm no pre-result escalation, download and inspect a one-page PDF, inspect the encoded URL in WhatsApp, read back Close sync, and render all five languages on phone and desktop.

## 2026-07-27 — RapidAct leads with the EU AI Act transparency practice

- Status: CURRENT
- Project/root: `rapidact`; homepage category, SEO metadata, structured data, specialist proof and service scope.
- Mistake: correcting the report-heavy page into a product workflow without making EU AI Act transparency expertise the primary category.
- Do: position RapidAct as the EU AI Act transparency practice of Agents AI Ltd.; explain the scanner, notice, plugins, badge and assessment as methods used to scope, implement and document Article 50.
- Don't: claim Agents AI Ltd. is a regulated law firm or let a tool become the category; formal legal opinions remain a counsel handoff.
- Evidence: user correction on 2026-07-27; current CV plus verified Coursera specialization and BSI ISO/IEC 22989 certificate.
- Trigger terms: AI Act focused, law firm, transparency practice, scanner, plugins, badge, specialist education, diplomas.
- Verify before reuse: render hero and compact credentials, inspect SEO/JSON-LD/footer/service-scope copy, test both CTA paths, and confirm EN/ES/DE/FR/IT at phone and desktop widths.

## 2026-07-27 — RapidAct is an implementation workflow, not a report shop

- Status: CURRENT
- Project/root: `rapidact`; homepage, navigation, metadata, footer, and localized conversion journey.
- Mistake: allowing the €99 assessment, specimen, contents, procedure, pricing, and purchase FAQ to define almost the entire homepage before visitors saw the scanner, notice, platform guidance, or broader product.
- Do: present one connected path—discover visible AI, disclose it, implement by platform, then assess the whole company when needed; keep the assessment as the paid escalation.
- Don't: remove the assessment conversion or hide its proof; do not let report detail become the full product identity again.
- Evidence: user correction on 2026-07-27 plus the supplied production-page text showing report-first copy from hero through footer.
- Trigger terms: over report oriented, only about report, homepage positioning, product hierarchy, conversion.
- Verify before reuse: render hero, navigation, section order, CTA destinations, metadata and footer in EN/ES/DE/FR/IT at phone, tablet and desktop widths.

## 2026-07-27 — Marketplace-first installation keeps an exact direct fallback

- Status: SUPERSEDED
- Project/root: `rapidact`; Article 50 installer, hosted badge runtime and native marketplace packages.
- Mistake: removing manual installation entirely before public marketplace listings existed, then offering one generic script without real display or framework differences.
- Do: keep WordPress.org, Shopify App Store and Wix App Market primary; while a verified listing URL is absent, provide stack-specific snippets for Bubble, Standard, Popup and Iframe using the canonical hosted script.
- Don't: advertise an unpublished listing, distribute ZIPs, replace locally bundled marketplace assets with remote execution, or copy Typebot chat destinations and settings.
- Evidence: explicit user correction on 2026-07-27, supplied Typebot screenshots as imperfect references, and 2026-07-28 live browser proof that the old copy handler could fail without feedback before the guarded clipboard path was added.
- Trigger terms: install dashboard, Typebot Share, marketplace, manual fallback, Bubble, Standard, Popup, Iframe, GTM, React, Next.js.
- Verify before reuse: preserve the native package assets, but follow the 2026-07-28 public-installation entry above until real listing URLs are verified.

## 2026-07-27 — Platform distribution is marketplace-native

- Status: SUPERSEDED
- Project/root: `rapidact`; WordPress.org, Shopify App Store, Wix App Market, and the Article 50 installer page.
- Mistake: keeping direct ZIP, Liquid snippet, Custom Code, GTM, and Zaraz delivery after the product direction changed to official marketplace discovery and installation.
- Do: bundle the badge in every package; use WordPress.org updates, Shopify OAuth plus a theme app extension, and Wix app versions plus an embedded-script dashboard.
- Don't: execute code supplied by the hosted manifest, run a custom WordPress updater, or describe an app as marketplace-available before platform publication.
- Evidence: explicit user reversal on 2026-07-27; official WordPress plugin guideline 8, Shopify App Store requirements, and Wix embedded-script/version documentation.
- Trigger terms: marketplace, WordPress.org, Shopify app, Wix app, OAuth, update manifest, official distribution.
- Verify before reuse: preserve the native marketplace packages and publication truth, but follow the marketplace-first installer entry above for the current direct-fallback rule.

## 2026-07-26 — Platform adapters share one hosted runtime

- Status: SUPERSEDED
- Project/root: `rapidact`; WordPress, Shopify, Wix, and the Article 50 installer page.
- Mistake: copying detection engines and signature databases into each platform package, then presenting source-only Shopify extension files as an installable product.
- Do: keep `rapidact-badge.js` canonical on `rapidact.eu`; ship a direct WordPress settings plugin, a Shopify Liquid kit, a Wix Custom Code kit, and paste-only GTM/Zaraz paths.
- Don't: fork the runtime, build a Shopify app, WordPress update server or OAuth flow, add speculative evidence/license/database layers, or call Shopify/Wix kits marketplace apps.
- Evidence: `integrations/`, `api/installers.test.ts`, disposable WordPress 6.8 activation proof, and localized `/article-50#install` browser checks in this task.
- Trigger terms: WordPress plugin, Shopify app, Wix plugin, install kit, central updates, paid later, hosted runtime.
- Verify before reuse: do not reuse this approach without an explicit user reversal; the current marketplace-native entry above controls distribution.

## 2026-07-26 — The conversion page previews depth without repeating it

- Status: SUPERSEDED
- Project/root: `rapidact`; homepage specimen, assessment outline, pricing, and free-tool sections.
- Mistake: the hero reproduced all six assessment rows, then the next section repeated them; pricing also repeated the scanner and notice explanation shown later.
- Do: use rendered pages from the real specimen in the hero, keep the full assessment outline in one section, and explain the free tools once.
- Don't: use another long HTML deliverables panel as a document preview or repeat secondary offers around the main €99 decision.
- Evidence: user-supplied full-page screenshot and correction in this task; `src/sections/Hero.tsx`, `Pricing.tsx`, and the generated specimen page images.
- Trigger terms: redundant copy, long page, specimen mockup, conversion, free tools, CTA hierarchy.
- Verify before reuse: inspect the entire desktop page and phone flow; confirm the PDF preview is legible as a document, the primary CTA remains visually dominant, and every removed duplicate still has one reachable canonical section.

## 2026-07-26 — Scanner progress must lead to the complete assessment

- Status: SUPERSEDED
- Project/root: `rapidact`; free website scanner and paid-assessment conversion.
- Mistake: a lone loading spinner made the real public-page scan feel like a placeholder, while blocked scans had no strong continuation path.
- Do: historical note only; the 2026-07-28 Anchor-only scanner entry supersedes its static-signature phases and failure fallback.
- Don't: say the automated page preview performs a complete company scan or makes the site compliant.
- Evidence: user correction in this task; `src/pages/Scanner.tsx` now separates the public-page preview from private systems, roles, disclosures, and the written action plan.
- Trigger terms: scanner, spinner, progress, preview, fallback, full scan, compliance.
- Verify before reuse: do not restore this failure CTA or signature-scan architecture; follow the current Anchor-only entry.

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

- Status: SUPERSEDED
- Project/root: `rapidact`; responsive header and localized buyer journey.
- Mistake: allowing a large language control or generic mobile menu to replace the primary assessment action.
- Do: keep the compact horizontal brand, two-letter language selector, and short localized assessment CTA visible on phones.
- Don't: hide the conversion action behind a hamburger or show a full-width language picker.
- Evidence: user correction in this task; `SiteNav.tsx` and `i18n.tsx` implement the compact header and 44px controls.
- Trigger terms: phone, responsive, header, language selector, hamburger, conversion CTA.
- Verify before reuse: follow the 2026-07-28 compact-menu entry above; keep the Scan CTA visible and move language selection into the drawer.

## 2026-07-28 — Analytics is production-only and forwards product events through GTM

- Status: SUPERSEDED
- Project/root: `rapidact`; acquisition, conversion, consent, and replay measurement.
- Mistake: localhost shared the production PostHog project, each load emitted `$opt_in`, and GTM had only an all-pages Google tag—so GA4 recorded pageviews but none of RapidAct's conversion events.
- Do: allow analytics only on `rapidact.eu`/`www`, suppress PostHog's automatic opt-in event, push each product event once, and publish one GA4 Event tag triggered by the bounded RapidAct event-name regex.
- Don't: add another Google loader, call both GTM and direct gtag for custom events, track preview hosts, emit purchases without payment proof, or capture form contents.
- Evidence: PostHog 24-hour host/event queries, live CDP payload `en=badge_installer_platform_selected`, GTM container version 4, and `src/lib/analytics.ts` on 2026-07-28.
- Trigger terms: GA4, GTM, missing events, localhost, `$opt_in`, PostHog, consent, replay, conversion.
- Verify before reuse: one GTM loader; zero analytics scripts on localhost; exact GA4 collect `postData` and PostHog event; replay/error counts; Ads link; gateway `enabled=true`, `setUpTag=false`.
- Superseded by: the 2026-07-29 direct Google-tag event entry after the live GTM tag was found to forward event names without parameters.

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
- Verify before reuse: keep the underlying claim discipline, but follow the 2026-07-28 public-installation entry and keep marketplace release state off customer-facing surfaces.
