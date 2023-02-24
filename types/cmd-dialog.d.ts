import { LitElement, PropertyValues, TemplateResult } from "lit";
import { Action } from "./action";
import './cmd-action';
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
     * Open dialog hotkey
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
     * Open the dialog.
     */
    open(): void;
    /**
     * Close the dialog.
     */
    close(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    update(changedProperties: PropertyValues<this>): void;
    render(): TemplateResult<1>;
    /**
     * Render the results on input.
     * @param event
     * @private
     */
    private _onInput;
    /**
     * Handle focus on action.
     * @param action
     * @private
     */
    private _actionFocused;
    /**
     * Trigger the action.
     * @param action
     * @private
     */
    private _triggerAction;
    /**
     * Return the index of the selected action.
     * @private
     */
    private get _selectedIndex();
    /**
     * Return the dialog element.
     */
    get dialog(): HTMLDialogElement;
    /**
     * Return the input element.
     */
    get input(): HTMLInputElement;
}
declare global {
    interface HTMLElementTagNameMap {
        'cmd-dialog': CmdDialog;
    }
}
