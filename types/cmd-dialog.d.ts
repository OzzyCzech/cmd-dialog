import { LitElement, type PropertyValues, type TemplateResult } from "lit";
import type { Action } from "./action.js";
import "./cmd-action.js";

export declare class CmdDialog extends LitElement {
	static styles: import("lit").CSSResult;
	/**
	 * The mode of the dialog (dark/light).
	 */
	theme: string;
	/**
	 * The placeholder text for the input.
	 */
	placeholder: string;
	/**
	 * The footer notice for the dialog.
	 */
	note: string;
	/**
	 * Show the close button (default: false).
	 */
	showCloseButton: boolean;
	/**
	 * Open dialog hotkey
	 * Meta+K (Mac) or Ctrl+K (Windows)
	 * @see https://github.com/jamiebuilds/tinykeys
	 */
	hotkey: string;
	/**
	 * Array of actions
	 */
	actions: Action[];
	/**
	 * Search input value
	 * @private
	 */
	private _search;
	/**
	 * Selected action
	 * @private
	 */
	private _selected?;
	/**
	 * All actions that match the input
	 * @private
	 */
	private _results;
	/**
	 * Fuse.js instance
	 * @private
	 */
	private fuse;
	/**
	 * Return the dialog element.
	 */
	get dialog(): HTMLDialogElement;
	/**
	 * Return the input element.
	 */
	get input(): HTMLInputElement;
	/**
	 * Return the index of the selected action.
	 * @private
	 */
	private get _selectedIndex();
	/**
	 * Return if the dialog is open.
	 */
	get isOpen(): boolean;
	/**
	 * Open the dialog.
	 */
	open(): void;
	/**
	 * Close the dialog.
	 */
	close(): void;
	/**
	 * Toggle the dialog.
	 */
	toggle(): void;
	connectedCallback(): void;
	update(changedProperties: PropertyValues<this>): void;
	render(): TemplateResult<1>;
	/**
	 * Handle on close event.
	 * @protected
	 */
	protected onClose(): void;
	/**
	 * Render the results on input.
	 * @param event
	 * @private
	 */
	private _onInput;
	/**
	 * Handle focus on action.
	 * @param action
	 * @param $event
	 * @private
	 */
	private _actionFocused;
	/**
	 * Trigger the action.
	 * @param action
	 * @param parentEvent
	 * @private
	 */
	private _triggerAction;
}
declare global {
	interface HTMLElementTagNameMap {
		"cmd-dialog": CmdDialog;
	}
}
