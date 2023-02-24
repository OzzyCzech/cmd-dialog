import { LitElement, TemplateResult } from 'lit';
import { Action } from "./action";
export declare class CmdAction extends LitElement {
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
    /**
     * Scroll to show element
     */
    ensureInView(): void;
    constructor();
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
}
declare global {
    interface HTMLElementTagNameMap {
        'cmd-action': CmdAction;
    }
}
