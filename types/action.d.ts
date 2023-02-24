export interface Action {
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
     * @see https://wangchujiang.com/hotkeys/
     */
    hotkey?: string;
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
    handler?: Function;
    /**
     * Tags of the action (optional)
     */
    tags?: string[];
}
