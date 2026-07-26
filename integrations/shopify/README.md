# Install RapidAct on Shopify

This kit adds one reusable Liquid snippet. It does not copy the RapidAct
runtime into your theme; every storefront loads the current version from
`https://rapidact.eu/rapidact-badge.js`.

## Install

1. In Shopify, open **Online Store → Themes → … → Edit code**.
2. Under **Snippets**, choose **Add a new snippet**, name it
   `rapidact-disclosure`, and paste the contents of
   `snippets/rapidact-disclosure.liquid`.
3. Open `layout/theme.liquid` and paste this immediately before `</body>`:

```liquid
{% render 'rapidact-disclosure',
  system: 'Shopping assistant',
  provider: 'Your company',
  details_url: '/pages/ai-transparency',
  position: 'right',
  color: '#1f3a5f'
%}
```

4. Edit the values, save, and check the live storefront on desktop and mobile.

The notice automatically follows the active Shopify storefront language for
English, Spanish, German, French, and Italian. Other languages fall back to
English.

## Why this is a theme kit

Shopify's one-click **App Embed** experience requires a distributed Shopify
app and merchant activation in the theme editor. This package is the immediate
two-file installation path and does not pretend to be an App Store listing.
The same hosted runtime can later sit behind an App Embed without changing the
visitor interface.
