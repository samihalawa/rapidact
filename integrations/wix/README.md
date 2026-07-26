# Install RapidAct on Wix

This kit uses Wix's site-wide **Custom Code** setting. The notice always loads
from `https://rapidact.eu/rapidact-badge.js`, so its design, accessibility, and
translations stay current without editing the Wix site again.

## Install

1. Publish the Wix site and connect its domain.
2. In the site dashboard, open **Settings → Custom Code**.
3. Choose **Add Custom Code** and paste `rapidact-custom-code.html`.
4. Name it `RapidAct AI Disclosure`.
5. Select **All pages** and **Load code on each new page**.
6. Place the code in **Body – end**, apply it, and publish.
7. Check the published site on desktop and mobile.

Edit `data-system`, `data-provider`, `data-details-url`, `data-position`, and
`data-color` before pasting. Leave out `data-language` to follow the page or
visitor language automatically (English, Spanish, German, French, or Italian).
