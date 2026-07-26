# WordPress.org submission

RapidAct AI Disclosure is distributed only through the WordPress Plugin
Directory. The public plugin bundles its JavaScript and image; the RapidAct
manifest is informational and never supplies executable code.

## Verify

From the repository root:

```sh
npm run verify:wordpress
```

Then install the plugin on a disposable WordPress site, save a Badge ID in
**Settings → RapidAct AI Disclosure**, and confirm the published page contains
`#rapidact-ai-disclosure` and the matching `data-badge-id`.

## Submit

1. Read the current [Detailed Plugin Guidelines](https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/).
2. Submit the plugin from [Add Your Plugin](https://wordpress.org/plugins/developers/add/).
3. When WordPress.org approves the slug, check out its assigned SVN repository.
4. Copy this directory into `trunk/`, place listing artwork in SVN `assets/`,
   validate the readme, and commit.
5. Tag `1.0.0` in SVN. Future releases are uploaded through the same SVN
   repository and reach sites through WordPress's native updater.

Do not publish a separate ZIP download or configure a custom update server.
