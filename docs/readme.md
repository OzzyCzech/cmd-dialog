# Command dialog (cmd-dialog)

## Action

`Action` is a json object that contains the information of a user's action in the dialog.
Every can have the following properties:

- `id` - The id of the action (*optional*).
- `title` - The name of the action (**required**).
- `description` - The description of the action (*optional*).
- `img` - The icon of the action (*optional*).
- `hotkey` - The hotkey of the action (*optional*). Please check [tinykeys](https://github.com/jamiebuilds/tinykeys) for more information.
- `url` - The url of the action (*optional*).
- `target` - Same as anchor [target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target) (*optional*).
- `onAction` - The callback function that is called when the action is selected (*optional*).
- `tags` - The *tags* of the action for better search with [Fuse.js](https://www.fusejs.io/examples.html) (*optional*).

```js
const actions = [
  {
    id: "action-1",
    title: 'Action 1',
    description: 'Description of action 1',
    img: '<svg>...</svg>',
    hotkey: 'ctrl+a',
    url: 'https://example.com',
    target: '_blank',
    onAction: () => console.log('Action was selected'),
    tags: ['action', 'example']
  }
];
```

### The `hotkey` property

The `hotkey` property is a string that contains the hotkey of the action.
Every action can have a different hotkey. Single action can have
multiple hotkeys separated by `|`. Thanks to [tinykeys](https://github.com/jamiebuilds/tinykeys)## The `description` property

```js
const actions = [
  {
    title: 'Action 1',
    hotkey: '$mod+a|$mod+b', // $mod is a modifier key (ctrl or cmd)  
    url: 'https://example.com'
  }
];
```

### Set action icon

The `img` property is a string that contains the SVG code for the action icon.

```js
const actions = [
  {
    title: 'Action 1',
    img: '<svg>...</svg>'
  }
];
```

### Open url action

If you want to open a new page when the action is selected, you can use the `url` property.
With the `target` property you can specify the target of the link - the default value is `_self`.
The `target` property accept same values as the [HTML anchor element target](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target) attribute.

```js
const actions = [
  {
    title: 'Open Google',
    url: 'https://google.com',
    target: '_blank'
  }
];
```

### Custom action callback

If you want to execute custom action when the action is selected, you can use the `onAction` property.
The `onAction` property is a callback function that is called when the action is selected.

```js
const actions = [
  {
    title: 'Custom action',
    onAction: () => console.log('Action was selected')
  }
];
```

To the callback function is passed the `event` object as the first argument.

```js
const actions = [
  {
    title: 'Custom action',
    onAction: (event) => console.log(event)
  }
];
```

Event object can be weather [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) or
`CustomEvent` depending on the action type. The `KeyboardEvent` is passed when the action is
selected by the keyboard shortcut or by the `Enter` key. The `CustomEvent` is passed when the
action is selected by the mouse click.

#### Preventing dialog from closing

Your function can return `false` if you want to prevent the dialog from closing.

```js
const actions = [
  {
    title: 'Custom action',
    onAction: (event) => {
      return false; // dialog will not close
    }
  }
];
```
 



