# INDEX

RapidAct production deploy | runtime copies committed dist only | force-add the verified dist bundle with source changes | do not restore or omit generated assets before pushing | prove Coolify deployed the artifact commit and inspect the live UI
RapidAct product claims | invented installers and evidence logging | promise only shipped badge/scanner/report | do not advertise plugins, apps, extensions, hosted logs, or retired tiers | run product-claim sweep plus rendered installer proof

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
