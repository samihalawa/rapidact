# RapidAct platform installers

Every installer in this directory is a thin adapter for the same production
runtime:

`https://rapidact.eu/rapidact-badge.js`

The platform packages do not contain a second disclosure engine. Improvements
to the hosted runtime therefore reach every installed site without requiring a
new plugin, theme asset, or Wix snippet.

- `wordpress/` — direct-upload WordPress plugin with a native settings page.
- `shopify/` — reusable Liquid snippet and one render line for `theme.liquid`.
- `wix/` — one Custom Code snippet for all published pages.

Build the downloadable packages from these source folders; do not edit the
ZIP files directly.
