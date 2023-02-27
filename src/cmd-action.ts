import {html, LitElement, nothing, TemplateResult, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {repeat} from "lit/directives/repeat.js";

import {Action} from "./action";
import style from './style.css?inline';

@customElement('cmd-action')
export class CmdAction extends LitElement {
	
	static override styles = unsafeCSS(style);
	
	/**
	 * The mode of the dialog (dark/light).
	 */
	@property({type: String}) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	
	/**
	 * Action object
	 */
	@property({type: Object}) action!: Action;
	
	/**
	 * Is the action selected
	 */
	@property({type: Boolean}) selected = false;
	
	/**
	 * Scroll to show element
	 */
	ensureInView() {
		requestAnimationFrame(() => this.scrollIntoView({block: 'nearest'}));
	}
	
	constructor() {
		super();
		this.addEventListener('click', this.click);
	}
	
	/**
	 * Click event
	 */
	override click() {
		this.dispatchEvent(
			new CustomEvent('actionSelected', {
				detail: this.action,
				bubbles: true,
				composed: true,
			})
		);
	}
	
	/**
	 * Updated
	 * @param changedProperties
	 */
	override updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has('selected')) {
			if (this.selected) {
				this.ensureInView();
			}
		}
	}
	
	override render() {
		const classes = {
			selected: this.selected,
			dark: this.theme === 'dark',
		};
		
		return html`
			<li class=${classMap(classes)}>
				${this.img}
				<strong>
					${this.action.title}
					${this.description}
				</strong>
				${this.hotkeys}
			</li>
		`;
	}
	
	/**
	 * Get hotkeys
	 * @private
	 */
	private get hotkeys() {
		if (this.action?.hotkey) {
			const hotkeys = this.action.hotkey
				.replace('cmd', '⌘')
				.replace('shift', '⇧')
				.replace('alt', '⌥')
				.replace('ctrl', '⌃')
				.toUpperCase()
				.split('+');
			return hotkeys.length > 0 ? html`<span>${repeat(hotkeys, (hotkey) => html`<kbd>${hotkey}</kbd>`,)}</span>` : '';
		} else {
			return nothing;
		}
	}
	
	/**
	 * Get description
	 * @private
	 */
	private get description() {
		return this.action.description ? html`<small>${this.action.description}</small>` : nothing;
	}
	
	/**
	 * Get icon
	 * @private
	 */
	private get img(): TemplateResult | typeof nothing {
		return this.action.img ? html`<span>${unsafeHTML(this.action.img)}</span>` : nothing;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cmd-action': CmdAction;
	}
}