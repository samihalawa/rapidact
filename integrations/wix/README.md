# RapidAct for Wix

This Wix CLI app contains one dashboard page and one embedded-script extension.
The site owner enters a Badge ID and language, then the dashboard calls Wix's
`embedScript()` API. The badge JavaScript and image are bundled into the Wix app
version; the public RapidAct manifest is used only for version awareness in the
dashboard.

## Verify

```sh
npm install
npm run verify
```

To run the Wix sandbox, authenticate with `npx wix login`, link this source to
the RapidAct app so the CLI creates `wix.config.json`, run `npm run release`
once to register the embedded-script extension, and then run `npm run dev`.
