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
    click(): void;
    constructor();
    updated(changedProperties: Map<string, unknown>): void;
    render(): TemplateResult<1>;
    private get hotkeys();
    private get icon();
}
declare global {
    interface HTMLElementTagNameMap {
        'cmd-action': CmdAction;
    }
}
