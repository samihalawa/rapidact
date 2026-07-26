# RapidAct marketplace apps

RapidAct uses native marketplace distribution:

- `wordpress/` — WordPress.org plugin with the badge JavaScript and image
  bundled locally.
- `shopify/` — public OAuth app based on Shopify's official React Router
  template, with a theme app extension.
- `wix/` — Wix CLI app with a dashboard settings page and embedded-script
  extension.

Each app contains version `1.0.0` of the same disclosure runtime. The public
`/badge-manifest.json` reports version metadata only. Executable updates are
published through WordPress.org, Shopify app versions, and Wix app versions.

There are no public ZIP downloads, ScriptTag integrations, GTM instructions,
Zaraz instructions, or remote-code updaters.
