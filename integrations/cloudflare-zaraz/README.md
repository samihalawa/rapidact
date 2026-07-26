# Install RapidAct with Cloudflare Zaraz

This is an optional path for sites that already use Cloudflare Zaraz. No OAuth
or RapidAct account access is needed.

1. In Zaraz, add a **Custom HTML** tool.
2. Paste:

```html
<script defer src="https://rapidact.eu/rapidact-badge.js" data-position="right"></script>
```

3. Run it on page views across the whole site.
4. Publish and check the live page as a visitor.

The installation continues to use the same canonical RapidAct runtime as every
other platform adapter.
