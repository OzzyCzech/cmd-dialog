import { LitElement, type TemplateResult } from "lit";
import type { Action } from "./action.js";

export declare class CmdAction extends LitElement {
	/**
	 * The styles
	 */
	static styles: import("lit").CSSResult;
	/**
	 * The mode of the dialog (dark/light).
	 */
	theme: string;
	/**
	 * Action object
	 */
	action: Action;
	/**
	 * Is the action selected
	 */
	selected: boolean;
	constructor();
	/**
	 * Get hotkeys
	 * @private
	 */
	private get hotkeys();
	/**
	 * Get description
	 * @private
	 */
	private get description();
	/**
	 * Get icon
	 * @private
	 */
	private get img();
	/**
	 * Scroll to show element
	 */
	ensureInView(): void;
	/**
	 * Click event
	 */
	click(): void;
	/**
	 * Updated
	 * @param changedProperties
	 */
	updated(changedProperties: Map<string, unknown>): void;
	render(): TemplateResult<1>;
}
declare global {
	interface HTMLElementTagNameMap {
		"cmd-action": CmdAction;
	}
}
