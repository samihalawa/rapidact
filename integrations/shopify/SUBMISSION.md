# Shopify App Store submission

The production app is linked to the RapidAct public Shopify app, hosted at
`https://shopify.rapidact.eu`, released as version `1.0.0` and installed on the
RapidAct development store. Public distribution is selected. Shopify requires
the Partner account's one-time App Store registration and business-account
attestation before the review form becomes available; do not invent or commit
those account-owner answers.

## Link and test

1. Create or select the RapidAct public app in the Shopify Partner Dashboard.
2. From this directory run `npm run config:link`, then `npm run dev`.
3. Install through the OAuth flow on a Shopify development store.
4. Open the app, follow its theme-editor link, enable the app embed, enter a
   Badge ID, and save.
5. Check the live storefront at desktop and phone widths. The page must contain
   `#rapidact-ai-disclosure`, the configured `data-badge-id`, and a Shopify CDN
   URL for `rapidact-badge.js`.
6. Trigger or simulate the uninstall and compliance webhook routes and confirm
   they return successful authenticated responses.

## Release and submit

1. Set the production app URL and redirect URLs in the linked app configuration.
2. Host the React Router service with persistent storage for its Prisma session
   database and set `SHOPIFY_API_KEY`, `SHOPIFY_API_SECRET`,
   `SHOPIFY_APP_URL`, and `SCOPES`.
3. Run `npm run deploy` to create the native Shopify app and extension version.
4. Complete the App Store listing, pricing, support, privacy, testing
   instructions, and review credentials in Partner Dashboard using
   `STORE_LISTING.md`.
5. Submit the public distribution version for Shopify review.

Do not ship ScriptTag or theme-file mutations. The theme app extension is the
only storefront integration.
