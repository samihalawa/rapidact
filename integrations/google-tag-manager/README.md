# Install RapidAct with Google Tag Manager

Use the Google Tag Manager container that is already installed on the site.
RapidAct does not request account access and there is no OAuth connection.

1. Open **Tags**, choose **New**, then select **Custom HTML**.
2. Paste:

```html
<script defer src="https://rapidact.eu/rapidact-badge.js" data-position="right"></script>
```

3. Choose the **Initialization – All Pages** trigger.
4. Use GTM Preview to check the published page, then publish the container.

The tag stays small and stable. Badge improvements load from the canonical
RapidAct runtime, so there is no platform package to update.
