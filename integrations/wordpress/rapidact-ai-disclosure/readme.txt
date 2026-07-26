=== RapidAct AI Disclosure ===
Contributors: rapidact
Tags: ai, disclosure, transparency, notice
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add a clear, configurable AI-use notice to every public page.

== Description ==

RapidAct AI Disclosure adds a visitor-facing notice that can name the AI
system, the responsible organisation, and a page with more information.

The plugin intentionally stays small:

* one settings screen
* one WordPress option
* no custom database tables
* no visitor tracking or cookies
* no bundled detection or evidence engine

The visitor interface loads from https://rapidact.eu/rapidact-badge.js. This
keeps the design, accessibility, translations, and future improvements current
without requiring a new plugin upload.

This ZIP is a direct-install package. WordPress.org does not accept plugins
that execute remotely hosted code, so this hosted-runtime edition is not a
WordPress.org directory submission.

== Installation ==

1. In WordPress, open Plugins > Add New Plugin > Upload Plugin.
2. Upload rapidact-wordpress.zip and activate it.
3. Open Settings > RapidAct AI Disclosure.
4. Choose the language, message, system name, details URL, position, and colour.
5. Save, then check the published site in a private browser window.

== Privacy ==

The plugin makes a public request to rapidact.eu to load the disclosure script
and brand image. The disclosure runtime does not use cookies, local storage, or
visitor analytics.

== Changelog ==

= 1.0.0 =
* Initial direct-install release using the canonical hosted RapidAct runtime.
