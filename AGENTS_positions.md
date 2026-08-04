# INDEX

RapidAct Google site name | Organization schema and og:site_name do not express Google's preferred search-result site name | put a WebSite entity with RapidAct name and root URL on the canonical homepage | do not expect Organization or Open Graph metadata to control the Google site-name label | verify homepage JSON-LD, Google URL Inspection and the later public result label separately
RapidAct initial JavaScript | eager route imports, content-coupled language constants and pre-consent analytics load unused code on the homepage | lazy-load client routes, keep SSR eager, isolate language metadata, scope tRPC and load analytics only after full consent | do not put route data, API providers or third-party analytics above every route | verify prerendered HTML, hydration, consent states, bundle gzip, SEO verifier and a fresh production Lighthouse run
RapidAct Search Console sitemap diagnosis | a newly submitted sitemap can retain `Couldn't fetch` after Google can already retrieve it live | run URL Inspection `Test live URL` on the exact sitemap before changing sitemap architecture or resubmitting | do not infer a current fetch defect from the delayed Sitemaps report alone | verify the live test result, XML validity, URL limits, crawler responses and the later processed Sitemaps row separately
RapidAct WordPress ownership review | the submitting account can look unrelated to the RapidAct brand even when the plugin is official | keep the official brand, align contributor metadata to `sami2`, and prove control with the exact root-domain TXT requested by WordPress.org | do not rename the product, resubmit from another account, or treat a repository/domain claim as ownership proof | verify public TXT resolution, source/ZIP byte equality, authenticated upload, and the same review-thread reply
RapidAct multilingual SEO graph | translated Markdown and shared navigation can emit English-twin links or localized aliases for English-only routes, while deprecated rich-result markup adds noise | localize only routes with real language twins, keep legal/requirements/assets canonical, link every canonical page, and use currently supported truthful schema | do not prefix every root-relative link, leave published pages orphaned, or retain obsolete FAQ schema | verify all canonical HTML for localized-twin routing, zero redirecting global links, zero orphans, unique descriptions, supported JSON-LD and exact canonical/hreflang reciprocity
RapidAct commercial CTA hierarchy | the free scanner was promoted as the header and secondary hero conversion action even though it has produced only internal or QA submissions | make the €99 report and specialist booking the two primary commercial actions while retaining the scanner as a supporting tool | do not remove the scanner or let it displace booking/report CTAs in the header, hero, shared bands, specimen or footer | verify all five locales at phone/tablet/desktop, exact Cal.com/report destinations, analytics attributes, and live route rendering
RapidAct IndexNow submission | the global endpoint can reject a newly published valid key while direct Bing accepts the same verified payload | host the root key and submit the canonical batch to Bing's official IndexNow endpoint | do not treat the global aggregator's initial SiteVerificationNotCompleted response as a site crawl failure | verify the live key as IndexNowBot and require HTTP 200/202 for the exact canonical URL count
RapidAct search indexability | sitemap URLs and client-side metadata still expose one empty shell plus unlimited soft-404 canonicals | prerender every canonical route and serve only generated route documents; return a noindex 404 for unknowns | do not treat JavaScript rendering, sitemap counts or managed bot defaults as indexing proof | verify every sitemap URL's raw Googlebot HTML, canonical, H1, metadata bounds, hreflang, unknown 404 and live crawler policy
RapidAct SPA direct routes | an unrestricted extensionless shell fallback turns fabricated paths into homepage duplicates | serve prerendered documents for known extensionless GET/HEAD routes and a true noindex 404 for unknowns | do not use one generic shell as the production fallback or infer browser failure from one Accept shape | verify browser and _/_ on canonical routes, redirects, missing assets, unknown paths and the deployed bundle
RapidAct outbound drafts | Gmail-only checks can miss existing Close drafts and create duplicate send risk | search the lead and email activities first, then update one canonical Close draft in place | do not infer “no Gmail draft” means no draft or keep competing versions across systems | verify exact lead/contact/recipient, draft status, subject/body read-back and one eventual send activity
RapidAct conversion consent | a fixed analytics prompt can cover the first paid-form fields and CTA on a new mobile visit | render the same two consent choices as an in-flow banner on report/start while retaining the compact fixed prompt elsewhere | do not remove consent choices, hide the explanatory copy, or add another modal before payment | verify the fresh-storage report route at 320/375/392px with the prompt in document flow, both controls at least 44px, no horizontal overflow and the form visible below
RapidAct localized report width | long translated compound words can preserve intrinsic grid width and push the phone page beyond its viewport | constrain both report grid children and allow heading/chapter hyphenation | do not shorten substantive localized content or trust one language at one width | verify all five report locales at 320, 375 and 392px with document width equal to viewport and a 48px enabled CTA
RapidAct paid conversion flow | global fixed badge and WhatsApp controls can cover the primary CTA on phone screens | suppress floating controls only on report/start routes while retaining them elsewhere | do not let persistent support/compliance widgets compete with or obstruct payment progression | verify 390px report CTA is clear, five localized routes have two primary fields, and homepage still shows both widgets
RapidAct commercial analytics | browser and Tag Assistant QA can produce plausible leads, key events and funnel activity that are not buyer demand | persist an explicit QA session classification, mark PostHog users natively as internal/test, and keep the paid assessment as the first commercial CTA without removing the free qualification path | do not diagnose price or checkout from test conversions, hardcode one device ID, or add more conversion sections | verify QA and external properties separately in GA4/PostHog, CRM lead identities, assessment click routing and zero unclassified verification events
RapidAct production asset continuity | committed runtime builds can publish new HTML while ignored hashed assets stay untracked, and cached shells or fixed runtimes can outlive a deployment | force-stage every generated asset referenced by committed HTML, revalidate mutable runtimes, and cache only versioned/hashed assets immutably | do not trust a successful deploy, commit ignored `dist` changes without an asset-manifest check, or apply immutable caching to a fixed path | verify every HTML asset reference is tracked, every named JS/CSS returns 200, fresh bodies match the release, and exact routes hydrate
RapidAct lead email capture | browser and API validation drift turned malformed input into a false storage error, while generic DB retention cannot preserve partner context | use one shared validator and normalizer, classify server validation errors accurately, allow scanner retention through DB or CRM, and keep partner success CRM-backed | do not use looser client regexes, report invalid input as a save outage, or count a generic lead row as a complete partner enquiry | verify valid and invalid browser states, normalized API input, scanner retention, and partner metadata in Close
Shopify marketplace release | a released CLI version is not a hosted/submitted app, provider-named domains fail review, an authenticated document loader alone does not generate observable session-token telemetry, and posting to the parent document can miss an index action | use a neutral host, AppProvider, persistent sessions and one bearer-token client request to the route that owns authenticate.admin, then exercise the installed dev-store app | do not rely on initial SSR authentication, post to a parent document that returns 405, use a provider-named host, expose the secret, mutate theme files or claim submission before the dashboard says Submitted | verify exact release commit, authenticated action returns 200, live OAuth URL, active embed, storefront badge, both embedded checks green and submitted provider state
Marketplace review locks | Wix can show DECLINED with zero blockers, return Error 500, and display a transient submission-success toast without persisting a review submission | recover exact reviewer feedback through app support and require a hard-reloaded distribution state before treating a submission as accepted | do not infer approval from zero blockers, trust a toast without persistence, or confuse a provider dashboard failure with app-code failure | verify the reloaded Wix status and reviewer feedback, local Plugin Check JSON, PHP lint, and submitted package bytes
RapidAct WordPress installation | code-only installation excludes nontechnical users before the directory listing is live | offer the exact bundled plugin as a downloadable ZIP with three native WordPress steps, while keeping code as an alternative | do not expose review status, use a custom updater or ship a ZIP that differs from the submission source | byte-compare ZIP/source, run Plugin Check, test upload/activate/settings, verify the live download and submit the same ZIP to WordPress.org
RapidAct conversion truth | fulfilled API calls and repeat checkout clicks can inflate key events without retained leads or new intent | gate lead conversions on DB or CRM retention, keep partner success CRM-backed, and dedupe checkout initiation per reference/session | do not equate mutation fulfillment with captured lead, emit success and failure for one attempt, or treat initiation value as revenue | verify forced-failure branches, repeat payment clicks, GTM parameter forwarding and purchase remains provider-confirmed only
RapidAct partner distribution | copying enterprise partner-program complexity would slow the first referral and obscure the €99 entry offer | use one paid-discovery assessment, explicit €69 partner cost, typed legal/audit/delivery entry points and partner-owned follow-on fees | do not add tiers, certification, portals, minimums or unverified applicability claims | verify economics, first-client form, typed deep links, CRM capture and sent-message destinations
RapidAct localized platform guides | translating only a shared shell flattened product-specific guidance and produced broken custom-site grammar | localize each platform's role, evidence boundary and install nuance independently | do not interpolate a generic platform name into legal or technical sentences | verify 24 localized routes, semantic tests, language-specific accessibility labels and phone/desktop overflow
RapidAct scanner result integrity | optional Anchor fields can arrive as JSON null and URL edits can leave a prior result visible | normalize nullable optional evidence at the parser boundary, clear result state on every new input, and report observed counts rather than a compliance-like score | do not reject a valid scan because absent evidence is null, attribute an old result to a new URL, or imply 100 means compliant | verify deepswapai.io completes, the inspected URL matches, changing input removes the result, and the three-step result renders in five languages on phone/desktop
RapidAct scanner engine | broad scans and the legacy `browser-use` agent made the free preview slow or fail at the provider layer | use native `gemini-computer-use` for one strict four-step Anchor task, unwrap its structured result envelope, and return at most five distinct functional touchpoints from the submitted page | do not navigate, simulate percentage progress, silently downgrade, expose provider errors, or treat AI-related content and badges as functional AI | verify live duration, exactly one inspected URL, at most five deduplicated findings, failure/retry, five languages, PDF, phone/desktop and production
RapidAct Typebot guide | a copied AI example was live but failed with `No model provided`, while an open-ended loop had no reliable completion | use one optional finite assessment, explicit Kimi model, native lead endpoint, deterministic final links | do not replace the scanner, copy an unrelated bot, or rely on a published badge as runtime proof | verify the published viewer chat through CRM capture, AI answer, clean logs and final action links
RapidAct scanner conversion gate | the company-assessment escalation appeared before the free result and email capture happened afterwards | require a closable email gate before scanning, then show PDF and complete-scan escalation only after the result | do not let Typebot replace the direct scanner or put full-scan sales copy before results | verify close/invalid/valid modal states, one-page PDF, prefilled WhatsApp, Close sync and five languages live
RapidAct category positioning | a product-workflow hero still made the scanner, badge and report look like the category | lead with the EU AI Act transparency practice; present tools and assessment as its methods | do not call Agents AI Ltd. a law firm or let product mechanics displace Article 50 expertise | verify hero, metadata, structured data, specialist credentials, service scope and five languages live
RapidAct product hierarchy | the paid assessment displaced the free operational product and made RapidAct read like a report shop | lead with discover, disclose, implement, assess; keep the assessment as paid escalation | do not use the specimen, report contents, pricing, and payment FAQ as the whole above-the-fold identity | verify hero, nav, section order, metadata, footer, CTA paths, and five languages at phone/tablet/desktop widths
RapidAct installation dashboard | pre-publication fallbacks can remain after a marketplace app becomes the simpler verified path, and saved Wix listing edits remain unpublished until the separate market-listing update is sent | make the published Wix app the only Wix route, keep WordPress ZIP and code options where they still solve real access gaps, write store copy for buyers rather than reviewers, then use Distribute → Update Market Listing | do not show Wix code/display alternatives, internal implementation language, duplicate headings or release-status copy, or treat saved listing fields as public | verify the Wix add-to-site destination, one-path modal, listing copy/keywords/media, provider status Market listing updated and live, other platform snippets, five languages and live phone/desktop layouts
RapidAct conversion page | the hero preview and later sections repeated the same offer details | show actual specimen pages in the hero and reserve detailed lists for their dedicated section | do not repeat long deliverable or free-tool explanations | verify the full page for repeated claims and a clear primary CTA
RapidAct scanner conversion | a spinner made the public-page preview feel unfinished and gave failures no next step | show readable scan phases and a permanent full-assessment fallback | do not imply the technical preview makes a company compliant | verify progress, success, unreachable, and CTA events live
RapidAct brand assets | redrawn SVG and generated marks drifted from the approved logo | use the exact tight-crop raster pack by purpose, plus semantic text for the wordmark and disclosure | do not redraw, stretch, or retain superseded marks | verify header, footer, badge, favicon, PWA, social, and five languages live
RapidAct responsive report rows | three children collapsed when the grid changed from two to three columns | place the description explicitly at each breakpoint | do not rely on implicit grid flow across column-count changes | verify 640–1023px and desktop rendered rows
RapidAct mobile header | the language selector displaced navigation and the conversion action | keep compact logo, 44px booking CTA and 44px menu; place the small language selector inside the drawer | do not expose the desktop nav or language selector in the phone header or restore the scan as the primary action | verify the real phone/tablet header, drawer links, language control, no overflow, exact booking destination and 44px targets
RapidAct analytics | shared, local, duplicated, pageview-only, name-only, stale data-layer values, or relative gateway transport measurement obscures conversion diagnosis | use dedicated RapidAct GA4/PostHog resources, a production-host allowlist, one GTM loader, one data-layer event per product action, reset all mapped fields per event, explicit GTM parameter mappings and an absolute first-party gateway transport URL | do not track localhost, emit repeated PostHog opt-ins, send the same event through both gtag and GTM, let commercial fields persist between events, pass `/metrics` as a relative transport host, or reuse another product property | prove exact GA4/PostHog event names and parameters, replay/errors, gateway config, proxied DNS and Ads link
RapidAct production deploy | runtime copies committed dist only | force-add the verified dist bundle with source changes | do not restore or omit generated assets before pushing | prove Coolify deployed the artifact commit and inspect the live UI
RapidAct product claims | claims outran shipped surfaces | promise only the scanner, hosted badge, written report and working direct installation; keep marketplace release state internal until a listing is public | do not expose review/submission/publication status or imply native packages are listed | run the customer-facing claim sweep and inspect rendered installer/platform routes

## 2026-08-04 — Declare the preferred Google site name with WebSite schema

- Status: CURRENT
- Project/root: `rapidact`; canonical homepage structured data and Google search-result site-name label.
- Mistake: Organization schema and `og:site_name` named RapidAct, but the homepage omitted Google's site-name-specific WebSite entity and Google displayed `rapidact.eu` above results.
- Do: render one WebSite entity on the root homepage with `name=RapidAct`, the canonical root URL and `rapidact.eu` as the alternate name.
- Don't: add the entity to subpages, duplicate the homepage, or treat Organization/Open Graph metadata as site-name control.
- Evidence: public non-personalized Google result and current homepage JSON-LD on 2026-08-04; Google Search Central site-name documentation.
- Trigger terms: Google site name, SERP label, rapidact.eu label, WebSite schema, brand name.
- Verify before reuse: require the exact WebSite JSON-LD in raw and rendered homepage HTML, validate the root URL in Search Console, and treat a later public `RapidAct` label as separate asynchronous proof.

## 2026-08-03 — Keep homepage language metadata separate from route content

- Status: CURRENT
- Project/root: `rapidact`; client route loading, SSR prerendering, shared language metadata, Markdown registry and route-scoped tRPC providers.
- Mistake: static page imports, a global tRPC provider and `i18n` importing `lib/content` pulled every route plus all 559 Markdown documents into the homepage JavaScript.
- Do: lazy-load page modules in the client, resolve them eagerly only in the SSR build, keep tRPC providers on the three routes that use them, store language constants in a dependency-free module, and defer GTM/PostHog network code until full consent.
- Don't: weaken prerendering, duplicate route surfaces, import the eager content registry into global providers/navigation, or load third-party analytics before the visitor opts in.
- Evidence: client main bundle changed from `1,940.59 kB / 398.32 kB gzip` to `285.25 kB / 91.63 kB gzip`; content moved to an on-demand `content` chunk while all 559 prerenders, TypeScript and 79 tests passed.
- Trigger terms: PageSpeed unused JavaScript, large initial bundle, Markdown registry, `import.meta.glob`, global tRPC provider, route splitting.
- Verify before reuse: build both client and SSR targets, run the complete SEO verifier, render homepage/content/report/scanner routes, and compare a fresh production Lighthouse report after deployment.

## 2026-08-03 — Test the sitemap at Google's live fetch layer before redesigning it

- Status: CURRENT
- Project/root: `rapidact`; Google Search Console domain property, `/sitemap.xml`, crawler delivery and multilingual URL set.
- Mistake: the Sitemaps report retained `Couldn't fetch`, which could invite unnecessary sitemap splitting or repeated submission even while current network probes were healthy.
- Do: use URL Inspection → `Test live URL` on the exact sitemap, then validate XML, current size/count, protocol/IP variants and crawler delivery before changing the sitemap.
- Don't: treat the delayed Sitemaps table, an HTTP 200 alone, or a prior screenshot as the current Google fetch result.
- Evidence: on 2026-08-03 Search Console's live test for `https://rapidact.eu/sitemap.xml` said `URL is available to Google` and `Page can be indexed`; the 559-URL XML was valid and identical across HTTP/1.1, HTTP/2, IPv4, IPv6 and repeated Googlebot requests.
- Trigger terms: sitemap couldn't fetch, sitemap could not be read, Search Console processing, split sitemap, resubmit sitemap, indexing delay.
- Verify before reuse: repeat the exact live test and crawler/XML probes; treat the later Sitemaps row and actual indexed-page reporting as separate asynchronous proof states.

## 2026-08-02 — WordPress ownership is proved without renaming RapidAct

- Status: CURRENT
- Project/root: `rapidact`; WordPress.org account `sami2`, plugin slug `rapidact-eu-ai-transparency-act-badge`, and owner domain `rapidact.eu`.
- Mistake: the automated review treated `RapidAct` as a possible third-party mark because the submitting email domain was `oulang.ai`; renaming the official product would discard the real brand instead of proving control.
- Do: retain the official RapidAct name, align `Contributors` to `sami2`, publish the exact TXT `wordpressorg-sami2-verification` at the owner-domain root, upload the byte-matched ZIP, and reply in the existing review thread.
- Don't: resubmit through another account, request a new slug, or claim ownership from Git/GitHub alone.
- Evidence: WordPress review `AUTOPREREVIEW TRM-OWN` dated 2026-08-02; Cloudflare record `95a2562753740dbc4ee0d72b794f20bb`; `integrations/wordpress/rapidact-ai-disclosure/readme.txt` and `public/downloads/rapidact-ai-disclosure.zip`.
- Trigger terms: WordPress trademark, ownership, RapidAct name, `sami2`, contributor mismatch, slug reservation, TXT verification.
- Verify before reuse: `dig +short TXT rapidact.eu` shows the exact token; package verifier proves archive/source equality; WordPress upload persists; reply remains in the same review thread.

## 2026-08-02 — Keep the multilingual crawl graph canonical and supported

- Status: CURRENT
- Project/root: `rapidact`; translated Markdown, shared navigation, content metadata and JSON-LD.
- Mistake: translated pages kept root-English links, global English-only routes were prefixed into redirects, one published HTML report was orphaned, vendor descriptions were duplicated, and the homepage retained retired FAQ rich-result markup.
- Do: localize links only when the language twin exists, keep legal/requirements/assets canonical, give every canonical route an incoming link, use vendor-specific descriptions, BreadcrumbList, Organization and Service schema.
- Don't: blindly prefix every root-relative link, use hreflang as a substitute for internal links, or retain unsupported schema because it still parses.
- Evidence: `src/lib/i18n.tsx`, `src/components/MarkdownRenderer.tsx`, `src/pages/ContentPage.tsx`, `scripts/verify-seo.mjs`; local 559-route verifier and Chrome render on 2026-08-02.
- Trigger terms: translated SEO, internal links, orphan, redirect chain, duplicate description, FAQ schema, breadcrumb, crawl graph.
- Verify before reuse: crawl every generated canonical and require localized-twin routing, zero localized aliases for global routes, zero orphans, unique vendor descriptions, supported JSON-LD and reciprocal canonical/hreflang output.

## 2026-08-02 — Report and booking are the commercial actions

- Status: CURRENT
- Project/root: `rapidact`; global navigation, homepage, shared SEO pages, specimen, contact route and footer.
- Mistake: the free scanner remained the header and secondary hero action after the commercial objective shifted to the €99 assessment and specialist conversations.
- Do: present the written report and `cal.com/oulang/aiact` booking as the two primary actions; retain the scanner as a supporting diagnostic.
- Don't: delete the scanner or promote it above the report or booking on a general commercial surface.
- Evidence: user correction on 2026-08-02; scanner storage contains only internal/QA addresses; `src/components/layout/SiteNav.tsx`, `src/sections/Hero.tsx`, `src/pages/Contact.tsx`.
- Trigger terms: main CTA, free scan, book a call, Cal.com, get report, contact page, conversion.
- Verify before reuse: all five locales and responsive widths show the same hierarchy; CTA destinations and analytics attributes are exact; contact and report routes render live.

## 2026-08-02 — Submit IndexNow through the verified direct endpoint

- Status: CURRENT
- Project/root: `rapidact`; bulk discovery notifications for the 554 repaired canonical routes.
- Mistake: the global IndexNow endpoint returned `403 SiteVerificationNotCompleted` even though the newly deployed root key file was already readable.
- Do: serve the hexadecimal key at the root and submit the canonical batch through Bing's official `https://www.bing.com/indexnow` endpoint.
- Don't: diagnose the global aggregator's initial validation lag as a robots, Cloudflare or key-file failure.
- Evidence: live IndexNowBot key request returned HTTP 200 with the exact 33-byte body; Bing accepted all 554 URLs with HTTP 200 on 2026-08-02.
- Trigger terms: IndexNow, Bing indexing, URL submission, SiteVerificationNotCompleted, key validation.
- Verify before reuse: key file returns the exact key to the crawler identity; submission response is HTTP 200 or 202 for the expected current canonical count.

## 2026-08-02 — Canonical routes need indexable server HTML

- Status: CURRENT
- Project/root: `rapidact`; public search discovery, multilingual routes, Hono delivery and Cloudflare crawler policy.
- Mistake: 502 sitemap entries and client `Seo` effects looked comprehensive, but every raw route returned one empty shell; fabricated paths returned the homepage with a fabricated self-canonical, and Cloudflare prepended AI-crawler blocks.
- Do: prerender the existing React route tree, serve only generated canonical documents, redirect duplicate URL forms and return a noindex 404 for unknown paths.
- Don't: use the homepage shell as a catch-all, publish hreflang to missing translations, or treat sitemap presence/JavaScript rendering as indexing proof.
- Evidence: `src/entry-server.tsx`, `scripts/seo-routes.mjs`, `scripts/verify-seo.mjs`, `api/lib/vite.ts`; 554-route local Googlebot verification and Cloudflare bot-management read-back on 2026-08-02.
- Trigger terms: Google indexing, site: search, stale title, soft 404, sitemap, canonical, hreflang, robots, crawler.
- Verify before reuse: raw Googlebot HTML for every sitemap URL has one bounded title/description, canonical, rendered H1/body and valid alternates; unknown route is 404/noindex; live Cloudflare has no whole-site bot block.

## 2026-07-30 — Extensionless direct routes do not depend on Accept

- Status: SUPERSEDED by “Canonical routes need indexable server HTML”; the Accept finding remains valid, but the generic production shell fallback created indexable soft duplicates.
- Project/root: `rapidact`; Hono static delivery for React Router routes.
- Mistake: a default curl probe received JSON 404 and was initially read as a browser outage; browser navigation already worked because it sent `Accept: text/html`, while link previews and plain clients still failed.
- Do: serve `index.html` for extensionless `GET` and `HEAD` requests, independent of `Accept`.
- Don't: use the SPA shell for missing asset-like paths or non-read methods, or infer rendered failure from a client with a different request shape.
- Evidence: 2026-07-30 live `/report`, `/example-report`, and `/es` probes with `Accept: */*` versus browser navigation headers; `api/lib/vite.ts`.
- Trigger terms: direct link, 404, Not Found, email preview, curl, Accept, SPA fallback.
- Verify before reuse: both browser navigation and `Accept: */*` return HTML for localized conversion routes; missing `.js` remains a no-store 404; exact pages render after the deployed bundle is live.

## 2026-07-30 — One canonical Close draft per prospect

- Status: CURRENT
- Project/root: `rapidact`; personalized commercial outreach in Close and Gmail.
- Mistake: a Gmail draft search returned empty for AverisAI and Legaia, but both leads already held unsent Close drafts; creating new Gmail drafts would have produced competing versions and double-send risk.
- Do: search the Close lead, contacts and email activities first, then update the existing CRM draft in place with the verified recipient and current personalized copy.
- Don't: infer Gmail absence means no draft, create a second draft before CRM discovery, or send both copies.
- Evidence: Close draft activities `acti_BtHhQ2DUP4brrM1W2PDFHMukaxH9xcNVr24QkP90fyl`, `acti_o5smpptvP3CEW0DlDWLjcvZBqU5w1mydOOEI0Ci9SOF` and `acti_DtbOdM441tbrSsUzFAKsemsWNAmWV2VB9V3wcY0NiQE`, updated 2026-07-30.
- Trigger terms: outreach, send it, draft, Gmail, Close, duplicate, follow-up.
- Verify before reuse: read back lead ID, contact ID, recipient, `status=draft`, subject and body; after authorization, require exactly one outbound send activity and then delivery/reply/payment evidence separately.

## 2026-07-30 — Consent choices stay in flow on paid routes

- Status: CURRENT
- Project/root: `rapidact`; localized `/report` and legacy `/start` conversion routes.
- Mistake: the fixed analytics prompt occupied the required-field and CTA region during a fresh 392px visit, creating an unrelated interaction before the buyer could inspect the form.
- Do: preserve the full explanation and both 44px choices, but place the prompt in normal document flow above paid routes; retain the compact fixed prompt on non-conversion pages.
- Don't: remove consent, hide its explanatory copy, add a modal, or infer abandonment causation from one replay.
- Evidence: 2026-07-30 independent mobile critique and rendered fresh-storage report capture; `src/components/Analytics.tsx`.
- Trigger terms: analytics consent, first visit, mobile overlay, report form, CTA obstruction.
- Verify before reuse: fresh storage at 320/375/392px, prompt `position: relative`, document width equals viewport, both choices are at least 44px, and the report remains visible below rather than underneath it.

## 2026-07-30 — Localized report grids must release intrinsic phone width

- Status: CURRENT
- Project/root: `rapidact`; five localized `/report` and legacy `/start` routes.
- Mistake: the German compound `Unternehmensbewertung` preserved a 414px intrinsic grid width inside a 320px viewport; changing CTA copy exposed but did not cause the overflow.
- Do: keep both grid children `min-w-0` and allow localized headings and narrow chapter labels to break and hyphenate naturally.
- Don't: hide overflow, shrink all typography, or shorten substantive translations to make one screenshot fit.
- Evidence: 2026-07-30 local rendered sweep; before fix German `docWidth=430` at `viewport=320`, after fix all 15 locale/width combinations matched the viewport.
- Trigger terms: German, compound word, report, horizontal overflow, 320px, translation, grid min-content.
- Verify before reuse: all five locales at 320/375/392px report `documentElement.scrollWidth === innerWidth`; the filled CTA is enabled and 48px tall; visually inspect the longest locale.

## 2026-07-30 — Paid conversion routes keep floating controls off the CTA

- Status: CURRENT
- Project/root: `rapidact`; localized `/report` and legacy `/start` conversion routes.
- Mistake: the fixed disclosure badge and WhatsApp widget covered the full-width €99 review button at 390px, making the primary action harder to see and tap.
- Do: keep the paid path to company plus work email, place optional context in one disclosure, and suppress both floating controls only during report/start progression.
- Don't: remove the widgets site-wide, hide optional assessment context, or diagnose form friction as the main revenue cause from one ambiguous visit.
- Evidence: 2026-07-30 rendered mobile screenshot and retained QA submission reference `HTW3X6`; `src/App.tsx`, `src/pages/Report.tsx`, `src/index.css`.
- Trigger terms: mobile CTA, widget overlap, badge, WhatsApp, report form, payment.
- Verify before reuse: at 390px the CTA is unobstructed; all five locales expose two primary fields; step 2 opens with a €99 bunq URL; homepage still displays both widgets.

## 2026-07-30 — Commercial funnels exclude persistent QA sessions

- Status: CURRENT
- Project/root: `rapidact`; GA4, PostHog, homepage hero and assessment funnel.
- Mistake: Tag Assistant and repeated browser verification produced a plausible key event and installer/scanner activity, while Close showed only `oulang.ai`, `deepswapai.io` and `example.com` test leads.
- Do: persist QA classification from `qa`, `proof`, `verify` or Tag Assistant, set PostHog's native internal/test-user property, and make the €99 assessment the first hero action while retaining the free scan.
- Don't: hardcode a device ID, call the polluted key event buyer intent, diagnose checkout or price before a qualified submission, or add another sales section.
- Evidence: live GA4/PostHog/Close read-back on 2026-07-30; `src/lib/analytics.ts`, `src/sections/Hero.tsx`.
- Trigger terms: no sales, key event, test traffic, Tag Assistant, PostHog filter, report submission, payment initiated.
- Verify before reuse: one production QA event has `traffic_class=qa`, `traffic_type=internal` and `$internal_or_test_user`; one ordinary session remains external; commercial reports exclude QA; assessment CTA opens the localized report route.

## 2026-07-30 — HTML shells and fixed runtimes must not outlive deployments

- Status: CURRENT
- Project/root: `rapidact`; production static delivery and client routes.
- Mistake: committed HTML has referenced removed or ignored hashed JavaScript after deployment; Cloudflare also retained the fixed `/rapidact-badge.js` for four hours and served old content after a replacement deploy.
- Do: force-stage all generated hashed assets referenced by committed HTML, run a tracked-reference manifest check before commit, revalidate mutable runtimes, and cache only successful content-hashed or explicitly versioned assets immutably.
- Don't: infer the app bundle is healthy from the badge or SSR HTML, trust a successful deployment, commit ignored `dist` output without its referenced assets, or apply immutable/default edge caching to a mutable fixed path.
- Evidence: 2026-07-30 blank-page incident; on 2026-08-03 the fixed badge remained stale; deployment `u4a4psx0ytmltze2fcxkcflr` on 2026-08-04 served new HTML while `index-DETCdil2.js` and `Scanner-Bbyo6XUP.js` returned 404 because ignored assets were absent from commit `8165b10`.
- Trigger terms: blank page, white page, badge only, deploy, hashed asset, stale HTML, 404 bundle, cache.
- Verify before reuse: every `/assets/*` reference in committed HTML resolves to a tracked file, HTML and fixed runtimes use their intended revalidation policy, named JS/CSS return 200, and the exact production route hydrates after a subsequent deploy.

## 2026-07-30 — Public lead forms share one email contract

- Status: CURRENT
- Project/root: `rapidact`; scanner gate, assessment intake, partner intake and lead APIs.
- Mistake: the scanner and report used looser browser checks than the API, so a malformed address reached a server `BAD_REQUEST` and appeared to visitors as “We could not save your email.”
- Do: validate and normalize with the shared contract, mirror every API length limit in the rendered inputs, classify validation failures as invalid input, let scanner success follow retained DB or CRM state, and keep partner success dependent on the CRM path that preserves partner metadata.
- Don't: duplicate email regexes, lowercase only on one side, hide validation failures behind a storage message, or treat a generic DB lead as a complete partner enquiry.
- Evidence: live production calls on 2026-07-30 returned `{"ok":true,"stored":true,"crm":"synced"}` for a valid address and HTTP 400 `BAD_REQUEST` for the browser-accepted malformed shape; independent review caught the partner-context regression and the scanner URL-length mismatch that could still masquerade as an email-storage failure.
- Trigger terms: save email, invalid email, BAD_REQUEST, scanner modal, report form, partner form, Close, retained lead.
- Verify before reuse: submit representative valid/invalid addresses in the rendered forms, read the API response and normalized retained record, and confirm partner fields in Close.

## 2026-07-30 — Published Wix app is the single Wix installation path

- Status: CURRENT
- Project/root: `rapidact`; Wix installer, localized Wix guide and Wix App Market listing.
- Mistake: retaining Bubble/Standard/Popup/Iframe and manual-code choices after the official Wix app was published made a one-click product look technical and unfinished.
- Do: lead with the official app, show three buyer steps plus the actual visitor result, use EU AI Act, Article 50, AI transparency and AI disclosure language in the listing, then publish saved edits through Distribute → Update Market Listing.
- Don't: expose Wix code alternatives, duplicate the modal title, label the only route “Recommended,” or describe bundled scripts, native updates and reviewer-oriented internals to buyers.
- Evidence: user correction, public App Market listing and provider status `Market listing updated and live` on 2026-07-30; `src/components/BadgeInstallDashboard.tsx`, `src/data/{badgeInstaller,platforms}.ts`.
- Trigger terms: Wix, install options, App Market, ASO, keywords, visual explanation, technical copy.
- Verify before reuse: saved/reloaded listing fields and keywords, `Distribute → Update Market Listing`, provider status `Market listing updated and live`, public listing media, `https://wix.to/JKi80ih`, absence of Wix manual controls, five locales, and phone/desktop rendering.

## 2026-07-29 — Shopify release requires a neutral host and observable session request

- Status: CURRENT
- Project/root: `rapidact`; Shopify app `403881066497`, OAuth service and theme app extension.
- Mistake: treating `shopify app deploy` as hosting/submission, using a provider-named domain, assuming an authenticated SSR loader would satisfy Shopify's session-token telemetry, or sending the bearer token to a parent document that does not own the index action.
- Do: host on a neutral RapidAct domain with persistent Prisma storage, use `AppProvider`, and trigger one client request to an `authenticate.admin` action before completing the review checks.
- Don't: rely on initial document authentication, use a provider-named host, expose the secret, mutate theme files, claim a released version is listed, or attest to an owner agreement without confirmation.
- Evidence: on 2026-07-29 `app._index.tsx` posted a bearer token to its authenticated index action, the scheduled provider check advanced to `Ready to submit`, and Shopify accepted the submission with `Submitted` plus `We're assigning a reviewer`; post-approval visibility is fully public.
- Trigger terms: Shopify, OAuth, app URL, domain, public distribution, theme app extension, CLI release, App Store, registration.
- Verify before reuse: neutral DNS/TLS, matching app URL, loaded embedded app, bearer-token client action returning 200, active embed plus storefront badge, both embedded checks green, submitted provider state, and local/remote Git SHA.

## 2026-07-29 — Wix rejection feedback and submit-page health are separate

- Status: CURRENT
- Project/root: `rapidact`; Wix App ID `c301e6f6-49fb-4885-bd5d-4f1317f21f5f`, Wix distribution dashboard and WordPress Plugin Check.
- Mistake: treating `Blockers (0)`, a previous release, or a client-side “submitted” toast as proof that Wix review accepted a new submission, then guessing at code changes without the reviewer ticket.
- Do: read the exact Wix status and rejection feedback first. After any submission action, hard-reload the submit and distribution pages; require the owner's explicit acceptance before checking Wix's Partner Agreement.
- Don't: invent the rejection reason, repeat a non-persisting submission, accept the Partner Agreement without owner confirmation, or infer app-code failure from a dashboard 500 or an unstarted GitHub runner.
- Evidence: the dashboard first showed `DECLINED`, `Blockers (0)`, and `Error 500`; a transient success toast did not persist. The provider page later recovered to `You're all set to publish`; the owner explicitly authorized accepting the Partner Agreement, but the submission service and its direct endpoint returned `Error 500` throughout the acceptance attempt. Wix support case `3000008679` remains open.
- Trigger terms: declined, rejected, Blockers 0, rejection ticket, submit page, Error 500, app not editable, plugin check.
- Verify before reuse: obtain the exact reviewer feedback, repair that stated defect, re-run Wix checks, and prove a resubmission persists after hard reload; separately run PHP lint, local Plugin Check, and byte-compare the WordPress ZIP.

## 2026-07-29 — WordPress offers the exact plugin ZIP before directory publication

- Status: CURRENT
- Project/root: `rapidact`; Article 50 installer and `integrations/wordpress/rapidact-ai-disclosure`.
- Mistake: treating manual HTML as the only public fallback left nontechnical WordPress users without a usable installation path; the older no-ZIP guard no longer matches the user's explicit direction.
- Do: generate one ZIP from the exact WordPress.org submission source, lead with download/upload/activate/settings steps, retain manual code as an alternative, and use native WordPress.org updates after publication.
- Don't: expose review status, add a custom updater, load remote executable code, or let the public ZIP differ from the submitted package.
- Evidence: explicit user correction on 2026-07-29; WordPress.org authenticated submission form and current package source.
- Trigger terms: WordPress, nontechnical, download, ZIP, direct install, directory, plugin submission.
- Verify before reuse: byte-compare archive/source, run Plugin Check, upload and activate on WordPress, submit the same ZIP, then verify the production download and five-language phone/desktop installer.

## 2026-07-29 — Conversion events require retained leads and unique checkout intent

- Status: CURRENT
- Project/root: `rapidact`; scanner gate, assessment intake, partner intake and bunq checkout analytics.
- Mistake: fulfilled lead mutations were counted as conversions even when neither DB nor Close retained the lead; partner intake could emit success and failure together, and repeated checkout clicks could multiply €99 initiation value.
- Do: emit canonical scanner, assessment and partner lead conversions only when DB storage or the required CRM path succeeds, make success/failure mutually exclusive, and dedupe `payment_initiated` per non-PII checkout ID within the browser session.
- Don't: treat mutation fulfillment as capture proof, count checkout initiation as revenue, or emit `purchase` without provider confirmation and a stable transaction ID.
- Evidence: independent analytics critique on 2026-07-29; `api/routers/leads.ts`, `api/routers/report.ts`, `src/pages/{Scanner,Report,Partners}.tsx`.
- Trigger terms: key event, lead, retained, stored, CRM, duplicate, bunq, checkout, purchase, value.
- Verify before reuse: exercise retained/unretained branches, repeat one payment click, inspect the published GTM parameter map, and read exact GA4/PostHog payloads.

## 2026-07-29 — Product events use one mapped GTM data-layer path

- Status: CURRENT
- Project/root: `rapidact`; GA4/GTM custom product-event forwarding.
- Mistake: the GTM GA4 product-event tag initially had no parameter rows; a subsequent direct `gtag("event")` workaround left commands in `dataLayer` without producing post-load custom-event requests.
- Do: keep one GTM loader and Google configuration tag, push each custom event once as a named data-layer object, reset every mapped field before applying the current payload, map every commercial parameter explicitly in the generic GA4 event tag, and use an absolute same-origin `https://…/metrics` transport.
- Don't: combine direct custom-event commands with the active GTM product-event tag, allow top-level data-layer values to leak into later events, add another Google loader, pass relative `/metrics` (Google interprets it as host `https://metrics`), or infer parameter receipt from an event name.
- Evidence: authenticated GTM read and live CDP on 2026-07-29; a fresh production request contained `en=badge_installer_platform_selected`, and a retained scanner lead contained `en=scanner_lead_captured`, `_c=1`, `stored=true`, and `crm_status=synced`; `src/lib/analytics.ts`.
- Trigger terms: GA4, GTM, parameter, event name, value, currency, checkout ID, lead source, duplicate.
- Verify before reuse: keep apex and `www` DNS proxied, GET the gateway config, publish the mapped GTM tag, capture a live payment→lead sequence, prove the lead request has no stale payment fields, and verify PostHog receives the same events once.

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

- Status: SUPERSEDED
- Project/root: `rapidact`; Article 50 installer, platform guides, badge manifest and native packages.
- Mistake: public tiles and metadata described store submission or publication state even though no verified listing URL existed.
- Do: present the exact working installation path for every platform; follow the 2026-07-29 WordPress ZIP entry for the current public package rule.
- Don't: expose “submission build”, “awaiting”, “pending”, directory-review labels or marketplace distribution values in the customer-facing site or public badge manifest.
- Evidence: user correction on 2026-07-28, customer-facing `rg` sweep, simplified `BadgeInstallDashboard.tsx`, `platforms.ts` and `badge-manifest.json`.
- Trigger terms: marketplace, directory, publication, submission build, awaiting, pending, app store, installer.
- Verify before reuse: render installer/platform routes in five languages, search built assets for unfinished copy, run `npm run verify:marketplaces` against local package versions, byte-compare the three native runtime bundles, and add a store action only with a live verified URL.

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
- Evidence: direct Anchor workflow `78007` returned `disclosure_text: null`; a fresh production scan on 2026-07-29 inspected exactly `https://deepswapai.io/`, returned title “Deepswapai.io - Free Unlimited,” and identified one Face Swap touchpoint.
- Trigger terms: anchor-invalid-result, deepswapai.io, stale result, wrong URL, score 100, too many sections, scanner conversion.
- Verify before reuse: complete a live `deepswapai.io` scan, match the exact inspected URL/title, change the input and confirm the result disappears, inspect the three numbered sections plus PDF in EN/ES/DE/FR/IT at phone and desktop widths.

## 2026-08-04 — The free Anchor scan uses the fast native agent on one page

- Status: CURRENT
- Project/root: `rapidact`; `/scanner`, `api/routers/scan.ts`, Anchor Browser `perform-web-task`.
- Mistake: expanding the free preview to three pages and 80 browser steps made it take 61 seconds, while retaining the legacy `browser-use` agent later failed at the provider layer or remained running beyond 30 seconds.
- Do: use `gemini-computer-use` for one server-side four-step task on only the submitted rendered page, unwrap its native success envelope, deduplicate findings, and return at most five functional controls with directly visible evidence.
- Don't: navigate, click, submit, perform Article 5/Annex III review, treat AI-related content as a touchpoint, silently downgrade, expose provider error strings, or show a simulated completion percentage.
- Evidence: workflow `86745` returned `Failed to execute tool`; workflow `86750` completed the comparison in two steps; workflow `86772` completed the exact production request in two steps with one visited URL and one directly evidenced face-swap touchpoint.
- Trigger terms: scanner speed, less complete, one page, Anchor Browser, prompt, progress, false positive, fallback.
- Verify before reuse: time the production flow, require exactly one inspected URL and no more than five deduplicated functional findings, exercise failure/retry, inspect PDF plus EN/ES/DE/FR/IT phone/desktop UI, and prove production uses the pushed commit.

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
