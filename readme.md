[![NPM Downloads](https://img.shields.io/npm/dm/cmd-dialog?style=for-the-badge)](https://www.npmjs.com/package/cmd-dialog)
[![NPM Version](https://img.shields.io/npm/v/cmd-dialog?style=for-the-badge)](https://www.npmjs.com/package/cmd-dialog)
[![NPM License](https://img.shields.io/npm/l/cmd-dialog?style=for-the-badge)](https://github.com/OzzyCzech/cmd-dialog/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/cmd-dialog?style=for-the-badge)](https://github.com/OzzyCzech/cmd-dialog/commit/main)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/OzzyCzech/cmd-dialog/main.yml?style=for-the-badge)](https://github.com/OzzyCzech/cmd-dialog/actions)

# Command `<dialog>`

Command dialog and keyboard shortcuts palette for web apps.

![](./assets/cmd.dialog.light.png)

## Features

- Keyboard navigation
- Build in dark/light themes
- Customizable action shortcuts with [tinykeys](https://github.com/jamiebuilds/tinykeys)
- Native `<dialog>` element
- Responsive design
- Fuzzy search with [Fuse.js](https://fusejs.io/)

## Install

```shell
npm i cmd-dialog
```

### From CDN

```html
<script type="module" src="https://esm.run/cmd-dialog"></script>
```

or inside module script

```html
<script type="module">
import cmdDialog from 'https://esm.run/cmd-dialog';
</script>
```

## Dependencies

- [LitElement](https://lit.dev/) - A simple base class for creating fast, lightweight web components.
- [Fuse.js](https://fusejs.io/) - Lightweight fuzzy-search library.
- [tinykeys](https://github.com/jamiebuilds/tinykeys) - A robust Javascript library for capturing keyboard input.

## Credits

- [Ninja Keys](https://github.com/ssleptsov/ninja-keys) - Keyboard shortcuts for any web application.
- 


## License

[MIT]()