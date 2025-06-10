export type Action = {
	/**
	 * Unique id of the action (optional)
	 */
	id?: string;
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
	 * @see https://github.com/jamiebuilds/tinykeys
	 */
	hotkey?: string;
	/**
	 * URL of the action (optional)
	 */
	url?: string;
	/**
	 * Target of the action (optional)
	 * default is `_self`
	 */
	target?: string;
	/**
	 * Handler of the action (optional)
	 */
	onAction?: (event?: KeyboardEvent | CustomEvent) => boolean;
	/**
	 * Tags of the action (optional)
	 */
	tags?: string[];
};
