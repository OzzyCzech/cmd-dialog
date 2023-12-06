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
	id?: string;

	/**
	 * Target of the action (optional)
	 * default is `_self`
	 */
	target?: string;

	/**
	 * Handler of the action (optional)
	 */
	onAction?: (action: Action, isDialogOpen?: boolean) => {keepOpen?: boolean};

	/**
	 * Tags of the action (optional)
	 */
	tags?: string[];
};
