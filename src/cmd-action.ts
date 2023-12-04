import {html, LitElement, nothing, type TemplateResult, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import {repeat} from 'lit/directives/repeat.js';
import {type Action} from './action.js';
import style from './style.css?inline'; // eslint-disable-line n/file-extension-in-import

@customElement('cmd-action')
export class CmdAction extends LitElement {
	/**
	 * The styles
	 */
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

	constructor() {
		super();
		this.addEventListener('click', this.click);
	}

	/**
	 * Get hotkeys
	 * @private
	 */
	private get hotkeys() {
		if (this.action?.hotkey) {
			const hotkeys = (typeof this.action.hotkey === 'object' ? this.action.hotkey?.key as string : this.action.hotkey as string)
				.replace('cmd', '⌘')
				.replace('shift', '⇧')
				.replace('alt', '⌥')
				.replace('ctrl', '⌃')
				.split('+');
			return hotkeys.length > 0 ? html`<span>${repeat(hotkeys, hotkey => html`<kbd part="kbd">${hotkey}</kbd>`)}</span>` : '';
		}

		return nothing;
	}

	/**
	 * Get description
	 * @private
	 */
	private get description() {
		return this.action.description ? html`<small part="description">${this.action.description}</small>` : nothing;
	}

	/**
	 * Get icon
	 * @private
	 */
	private get img(): TemplateResult | typeof nothing {
		return this.action.img ? html`<span>${unsafeHTML(this.action.img)}</span>` : nothing;
	}

	/**
	 * Scroll to show element
	 */
	public ensureInView() {
		requestAnimationFrame(() => {
			this.scrollIntoView({block: 'nearest'});
		});
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
			}),
		);
	}

	/**
	 * Updated
	 * @param changedProperties
	 */
	override updated(changedProperties: Map<string, unknown>) {
		if (changedProperties.has('selected') && this.selected) {
			this.ensureInView();
		}
	}

	override render() {
		const classes = {
			selected: this.selected,
			dark: this.theme === 'dark',
		};

		return html`
			<li class=${classMap(classes)} part="action ${this.selected ? 'selected' : ''}">
				${this.img}
				<strong part="title">
					${this.action.title}
					${this.description}
				</strong>
				${this.hotkeys}
			</li>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cmd-action': CmdAction;
	}
}
