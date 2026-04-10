# cmd-dialog documentation

## Installation

```shell
pnpm add cmd-dialog
```

Or from CDN:

```html
<script type="module" src="https://esm.sh/cmd-dialog"></script>
```

## Basic usage

```html
<cmd-dialog></cmd-dialog>

<script type="module">
	import "cmd-dialog";

	const dialog = document.querySelector("cmd-dialog");
	dialog.actions = [
		{ title: "Home", url: "/", hotkey: "$mod+h" },
		{ title: "Settings", hotkey: "$mod+,", onAction: () => true },
	];
</script>
```

## HTML attributes

- `theme` — Theme of the dialog. Possible values: `light` or `dark`. Default is based on browser preference.
- `hotkey` — Hotkey to open/close the dialog. Default: `$mod+k`. Multiple hotkeys can be separated by `|`.
- `placeholder` — Placeholder text for the search input. Default: `Type a command or search...`.
- `note` — HTML content shown in the footer. Default shows the number of available options.
- `showCloseButton` — Whether the close button is visible. Default: `false`.

## Properties

- `actions` — Array of [Action](#action) objects.
- `isOpen` — Read-only boolean indicating whether the dialog is open.

```js
const dialog = document.querySelector("cmd-dialog");

if (dialog.isOpen) {
	// dialog is open
}
```

## Methods

- `open()` — Opens the dialog.
- `close()` — Closes the dialog.
- `toggle()` — Toggles the dialog open/closed.

## Events

The `cmd-dialog` element fires three custom events:

- `open` — Fired when the dialog opens.
- `close` — Fired when the dialog closes.
- `action` — Fired when an action is selected.

### The `action` event

Fired when an action is executed via keyboard shortcut, Enter key, or mouse click. The `event.detail` contains:

- `search` — The current search input value.
- `action` — The selected action object.
- `parentEvent` — The original event (`KeyboardEvent` or `CustomEvent`).

The event is cancelable — call `event.preventDefault()` to prevent the action from executing:

```js
dialog.addEventListener("action", (event) => {
	if (dialog.isOpen && event.detail.parentEvent instanceof KeyboardEvent && event.detail.parentEvent.key !== "Enter") {
		event.preventDefault(); // do not fire action when dialog is open and key is not Enter
	}
});
```

## Action

An action is a plain object describing a command in the dialog. Every action must have a `title`; all other properties are optional.

| Property      | Type       | Description                                                                                       |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `id`          | `string`   | Unique identifier.                                                                                |
| `title`       | `string`   | **Required.** Display name of the action.                                                         |
| `description` | `string`   | Secondary text shown below the title.                                                             |
| `img`         | `string`   | SVG markup for the action icon.                                                                   |
| `hotkey`      | `string`   | Keyboard shortcut ([tinykeys](https://github.com/jamiebuilds/tinykeys) syntax).                   |
| `url`         | `string`   | URL to open when the action is selected.                                                          |
| `target`      | `string`   | Link target (`_self`, `_blank`, etc.). Default: `_self`.                                          |
| `onAction`    | `function` | Callback when the action is selected. Return `true` to close the dialog, `false` to keep it open. |
| `tags`        | `string[]` | Additional search terms for [Fuse.js](https://www.fusejs.io/examples.html).                       |

```js
const actions = [
	{
		id: "action-1",
		title: "Action 1",
		description: "Description of action 1",
		img: "<svg>...</svg>",
		hotkey: "Control+a",
		url: "https://example.com",
		target: "_blank",
		onAction: () => true,
		tags: ["action", "example"],
	},
];
```

### Hotkeys

The `hotkey` property uses [tinykeys](https://github.com/jamiebuilds/tinykeys) syntax. Use `$mod` for the platform modifier (Cmd on Mac, Ctrl on Windows/Linux). Multiple hotkeys can be separated with `|`:

```js
dialog.actions = [
	{
		title: "Action 1",
		hotkey: "$mod+a|$mod+b",
		url: "https://example.com",
	},
];
```

### Icons

The `img` property accepts an SVG string:

```js
dialog.actions = [
	{
		title: "Action 1",
		img: "<svg>...</svg>",
	},
];
```

### URL actions

Use the `url` property to navigate when the action is selected. The `target` property works the same as the [HTML anchor `target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target) attribute:

```js
dialog.actions = [
	{
		title: "Open Google",
		url: "https://google.com",
		target: "_blank",
	},
];
```

### Custom action callback

Use `onAction` to run custom logic. The callback receives the triggering event (`KeyboardEvent` or `CustomEvent`):

```js
dialog.actions = [
	{
		title: "Custom action",
		onAction: (event) => {
			console.log("Action selected", event);
			return true; // close the dialog
		},
	},
];
```

Return `true` to close the dialog after the action, or `false` to keep it open:

```js
dialog.actions = [
	{
		title: "Stay open",
		onAction: () => {
			console.log("Dialog stays open");
			return false;
		},
	},
];
```
