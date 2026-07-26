# RapidAct for Shopify

This is the minimum public Shopify app: the official React Router OAuth
template, one embedded admin page, and one theme app extension. The storefront
JavaScript and image are bundled in the extension and served by Shopify's CDN.

The public JSON manifest is used only to compare version numbers in the app
home. Executable updates are released with `shopify app deploy` and Shopify app
versioning.

## Verify

```sh
npm install
npm run verify
```

For the real sandbox check, link the project with `npm run config:link`, run
`npm run dev`, install it on a development store, enable the RapidAct app embed,
enter a Badge ID, and confirm `#rapidact-ai-disclosure` appears on the published
storefront.
