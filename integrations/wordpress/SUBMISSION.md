# WordPress.org submission

RapidAct AI Disclosure is submitted to the WordPress Plugin Directory and is
also available as the same downloadable ZIP from RapidAct while directory
review is in progress. The plugin bundles its JavaScript and image and never
downloads executable code.

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

The direct ZIP is generated from this exact source with
`npm run package:wordpress`. WordPress.org remains the update channel; do not
configure a custom update server.
