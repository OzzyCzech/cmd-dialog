[![NPM Downloads](https://img.shields.io/npm/dm/cmd-dialog?style=for-the-badge)](https://www.npmjs.com/package/cmd-dialog)
[![NPM Version](https://img.shields.io/npm/v/cmd-dialog?style=for-the-badge)](https://www.npmjs.com/package/cmd-dialog)
[![NPM License](https://img.shields.io/npm/l/cmd-dialog?style=for-the-badge)](https://github.com/OzzyCzech/cmd-dialog/blob/main/LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/OzzyCzech/cmd-dialog?style=for-the-badge)](https://github.com/OzzyCzech/cmd-dialog/commit/main)

# Command `<dialog>`

Command dialog and keyboard shortcuts palette for web apps.

![](./assets/cmd.dialog.light.png)

## Features

- Keyboard navigation
- Build in dark/light themes
- Customizable action shortcuts with [hotkeys.js](https://wangchujiang.com/hotkeys/)
- Responsive design
- Native `<dialog>` element
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

## Usage

### Attributes

- `theme` - Theme of the dialog. Possible values: `light` or `dark`. Default value is taken from browser preference.
- `hotkey` - List of hotkeys. Default value: `ctrl+k,cmd+k`.
- `placeholder` - Placeholder text for the search input. Default value: `Type a command or search...`.
- `note` - The note in the footer of the dialog box. Default value show number of options.

## Credits

- [LitElement](https://lit.dev/) - A simple base class for creating fast, lightweight web components.
- [Fuse.js](https://fusejs.io/) - Lightweight fuzzy-search library.
- [hotkeys.js](https://wangchujiang.com/hotkeys/) - A robust Javascript library for capturing keyboard input.
- [Ninja Keys](https://github.com/ssleptsov/ninja-keys) - Keyboard shortcuts for any web application.
