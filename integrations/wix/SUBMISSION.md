# Wix App Market submission

## Link and test

1. Authenticate with `npx wix login`.
2. Create the RapidAct app in Wix Dev Center or scaffold the official Wix
   embedded-script template, then link this project so the CLI writes the real
   `wix.config.json`.
3. Run `npm run release` once. Wix must register the embedded-script extension
   before `embedScript()` can activate it.
4. Run `npm run dev`, open the app dashboard on a Wix development site, enter a
   Badge ID and language, and activate.
5. Publish the site. On the live URL confirm `#rapidact-ai-disclosure`, the
   matching `data-badge-id`, and the absence of a remote badge-script request.

## Release and submit

1. Run `npm run build`, then `npm run release` to create the native Wix version.
2. Complete the Wix App Market listing, pricing, privacy, support, app icon,
   screenshots, and test instructions in Dev Center.
3. Run Wix's app checks, supply the review team with a test flow, and submit the
   released version for review.

Future executable changes must be released as Wix app versions. The RapidAct
JSON manifest never injects executable code.
