# Command `<dialog>`

Command dialog and keyboard shortcuts for any web application.

![](./assets/cmd.dialog.light.png)

## Features

* Keyboard navigation
* Build in dark/light themes
* Customizable action shortcuts with [hotkeys.js](https://wangchujiang.com/hotkeys/)
* Responsive design
* Native `<dialog>` element
* Fuzzy search with [Fuse.js](https://fusejs.io/)

## Install

```shell
npm i cmd-dialog
```

## Usage

### Attributes

- `theme` - Theme of the dialog. Possible values: `light` or `dark`. Default value is taken from browser preference.
- `hotkeys` - List of hotkeys. Default value: `ctrl+k,cmd+k`.
- `placeholder` - Placeholder text for the search input. Default value: `Type a command or search...`.
- `note` - The note in the footer of the dialog box. Default value show number of options.

## Credits

- [LitElement](https://lit.dev/) - A simple base class for creating fast, lightweight web components.
- [Fuse.js](https://fusejs.io/) - Lightweight fuzzy-search library.
- [hotkeys.js](https://wangchujiang.com/hotkeys/) - A robust Javascript library for capturing keyboard input.
- [Ninja Keys](https://github.com/ssleptsov/ninja-keys) - Keyboard shortcuts for any web application.