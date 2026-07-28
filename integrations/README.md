# RapidAct installation channels

RapidAct keeps native marketplaces as the primary distribution channel:

- `wordpress/` — WordPress.org plugin with the badge JavaScript and image
  bundled locally.
- `shopify/` — public OAuth app based on Shopify's official React Router
  template, with a theme app extension.
- `wix/` — Wix CLI app with a dashboard settings page and embedded-script
  extension.

Each app contains version `1.0.0` of the same disclosure runtime. The public
`/badge-manifest.json` reports version metadata only. Executable updates are
published through WordPress.org, Shopify app versions, and Wix app versions.

The website installer provides a direct installation path that loads
`https://rapidact.eu/rapidact-badge.js`. It supports four real display modes:

- `bubble` — the recommended floating badge and expandable notice.
- `standard` — the full notice rendered inside a selected page container.
- `popup` — the badge opens the notice in a centred modal with a backdrop.
- `iframe` — an isolated hosted notice for restrictive website builders.

The dashboard generates stack-specific snippets for WordPress, Shopify, Wix,
plain HTML, React, Next.js, Google Tag Manager, and Webflow. Marketplace
packages continue to bundle the runtime locally; the direct snippets do not
replace those packages or their platform-native update paths.

## Add another platform

1. Add the platform identifier to `BadgePlatform` in
   `src/lib/badgeInstaller.ts`.
2. Add one tile to `platforms` in
   `src/components/BadgeInstallDashboard.tsx`.
3. Add the translated paste location for all five languages in
   `src/data/badgeInstaller.ts`.
4. If the stack needs different code, add that adapter to
   `buildBadgeSnippet`; otherwise it automatically receives the HTML snippet.
5. Add the new platform to the generator test matrix in
   `src/lib/badgeInstaller.test.ts`.

Do not publish direct ZIP downloads or remote-code updaters. Add a marketplace
install action only when its verified listing URL exists in the platform data;
retain the direct installation path for customers who need it.
