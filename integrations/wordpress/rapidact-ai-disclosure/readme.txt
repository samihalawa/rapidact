=== RapidAct AI Disclosure ===
Contributors: rapidact
Tags: ai, disclosure, transparency, notice
Requires at least: 6.0
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add a clear, configurable AI-use notice to every public page.

== Description ==

RapidAct AI Disclosure adds a visitor-facing notice that can name the AI
system, the responsible organisation, and a page with more information.

The plugin stays small:

* one settings screen and one WordPress option
* a locally bundled disclosure script and brand image
* no custom database tables, visitor tracking, cookies, or remote executable code
* an optional Badge ID field
* an optional, administrator-initiated version-information check

The public notice runs entirely from files included in the plugin. WordPress.org
delivers plugin updates through the normal WordPress update screen.

== Installation ==

1. Install RapidAct AI Disclosure from Plugins > Add New.
2. Activate the plugin.
3. Open Settings > RapidAct AI Disclosure.
4. Add the optional Badge ID and tailor the notice.
5. Save, then check the published site in a private browser window.

== Frequently Asked Questions ==

= Does the public notice load code from RapidAct? =

No. The JavaScript and brand image are bundled in the plugin.

= What does the version check send? =

Only an administrator can trigger it. WordPress requests a public JSON manifest
from rapidact.eu and compares version numbers. It never downloads or executes
code; WordPress.org remains the plugin update channel.

== Privacy ==

The public notice does not contact RapidAct, set cookies, use local storage, or
track visitors. The optional administrator-initiated version check requests the
public manifest at https://rapidact.eu/badge-manifest.json.

== Changelog ==

= 1.0.0 =
* Initial WordPress.org submission with a locally bundled disclosure runtime.
