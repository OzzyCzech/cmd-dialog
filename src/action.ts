export type Hotkey = {
	/**
	 * Hotkey keys
	 *
	 * @see https://wangchujiang.com/hotkeys-js
	 */
	key: string;

	/**
	 * Hotkey scope (default is all)
	 *
	 * there are three scopes options:
	 * - `all` - (default) hotkeys are active everywhere
	 * - `outside` - hotkeys are active only when the dialog is closed
	 * - `any value` - your custom scope that need to be activated manually
	 *
	 * @see https://github.com/jaywcjlove/hotkeys-js#option
	 */
	scope?: string;

	/**
	 * Split key (default is '+')
	 *
	 * @see https://github.com/jaywcjlove/hotkeys-js#option
	 */
	splitKey?: string;
};

export type Action = {
	/**
	 * Title of the action
	 */
	title: string;

	/**
	 * Description of the action (optional)
	 */
	description?: string;

	/**
	 * Icon of the action (optional)
	 */
	img?: string;

	/**
	 * Hotkey of the action (optional)
	 * @see https://wangchujiang.com/hotkeys-js/
	 */
	hotkey?: string | Hotkey;

	/**
	 * Unique id of the action (optional)
	 */
	id?: string;

	/**
	 * Target of the action (optional)
	 */
	target?: string;
	/**
	 * URL of the action (optional)
	 */
	url?: string;

	/**
	 * Handler of the action (optional)
	 */
	onAction?: (action: Action, isDialogOpen?: boolean) => {keepOpen?: boolean};

	/**
	 * Tags of the action (optional)
	 */
	tags?: string[];
};
