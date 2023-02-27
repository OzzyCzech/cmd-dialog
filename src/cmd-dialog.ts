import {html, LitElement, unsafeCSS, PropertyValues, TemplateResult} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {live} from 'lit/directives/live.js';
import {repeat} from 'lit/directives/repeat.js';
import {unsafeHTML} from "lit/directives/unsafe-html.js";
import Fuse from "fuse.js";

import {Action} from "./action";
import './cmd-action';

import hotkeys from 'hotkeys-js';
import style from './style.css?inline';

@customElement('cmd-dialog')
export class CmdDialog extends LitElement {
	
	static override styles = unsafeCSS(style);
	
	/**
	 * The mode of the dialog (dark/light).
	 */
	@property({type: String}) theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	
	/**
	 * The placeholder text for the input.
	 */
	@property({type: String}) placeholder = 'Type a command or search...';
	
	/**
	 * The footer notice for the dialog.
	 */
	@property({type: String}) note = '';
	
	/**
	 * Open dialog hotkey
	 */
	@property({type: String}) hotkey = 'cmd+k,ctrl+k';
	
	/**
	 * Array of actions
	 */
	@property({
		type: Array,
		hasChanged() {
			return true;
		},
	}) actions = [] as Array<Action>;
	
	/**
	 * Search input value
	 * @private
	 */
	@state() private _search = '';
	
	/**
	 * Selected action
	 * @private
	 */
	@state() private _selected?: Action;
	
	/**
	 * All actions that match the input
	 * @private
	 */
	@state() private _results = [] as Array<Action>;
	
	/**
	 * Fuse.js instance
	 * @private
	 */
	private fuse: Fuse<Action> | undefined;
	
	/**
	 * Open the dialog.
	 */
	public open() {
		this.dialog.showModal();
	}
	
	/**
	 * Close the dialog.
	 */
	public close() {
		this.input.value = ''
		this.dialog.close();
	}
	
	override connectedCallback() {
		super.connectedCallback();
		
		// open dialog
		hotkeys(this.hotkey, (event) => {
			this.open();
			event.preventDefault();
		});
		
		
		// select next
		hotkeys('down,tab', (event) => {
			if (!this.dialog.open) return;
			event.preventDefault();
			
			if (this._selectedIndex >= this._results.length - 1) {
				this._selected = this._results[0];
			} else {
				this._selected = this._results[this._selectedIndex + 1];
			}
		});
		
		// select previous
		hotkeys('up,shift+tab', (event) => {
			if (!this.dialog.open) return;
			event.preventDefault();
			
			if (this._selectedIndex === 0) {
				this._selected = this._results[this._results.length - 1];
			} else {
				this._selected = this._results[this._selectedIndex - 1];
			}
		});
		
		// trigger action
		hotkeys('enter', (event) => {
			if (!this.dialog.open) return;
			event.preventDefault();
			this._triggerAction(this._results[this._selectedIndex]);
		});
	}
	
	override disconnectedCallback() {
		super.disconnectedCallback();
		// unregister hotkeys
		hotkeys.unbind(this.hotkey);
		hotkeys.unbind('down,tab');
		hotkeys.unbind('up,shift+tab');
		hotkeys.unbind('enter');
	}
	
	override update(changedProperties: PropertyValues<this>) {
		if (changedProperties.has('actions')) {
			
			// register action hotkeys
			for (const action of this.actions.filter(item => !!item.hotkey)) {
				hotkeys(action.hotkey || '', (event) => {
					event.preventDefault();
					this._triggerAction(action);
				});
			}
			
			// setup fuse search
			this.fuse = new Fuse(this.actions,
				{
					//findAllMatches: true,
					//includeMatches: true,
					keys: [
						{name: 'title', weight: 2},
						{name: 'tags', weight: 1},
						{name: 'url', weight: 1}
					],
				});
		}
		
		super.update(changedProperties);
	}
	
	override render() {
		// search for matches
		const results = this.fuse?.search(this._search);
		if (results) {
			this._results = results.map(item => item.item);
		}
		
		if (this._search.length > 0) {
			const results = this.fuse?.search(this._search);
			if (results) {
				this._results = results.map(item => item.item);
			}
		} else {
			this._results = this.actions;
		}
		
		// select first result
		if (this._results.length > 0 && this._selectedIndex === -1) {
			this._selected = this._results[0];
		}
		
		// nothing was found
		if (this._results.length === 0) {
			this._selected = undefined;
		}
		
		const actionList: TemplateResult =
			html`
				<ul>
					${repeat(
						this._results,
						(action) =>
							html`
								<cmd-action
									.action=${action}
									.selected=${live(action === this._selected)}
									.theme=${this.theme}
									@mouseover=${() =>
										this._actionFocused(action)}
									@actionSelected=${(event: CustomEvent<Action>) =>
										this._triggerAction(event.detail)}
								></cmd-action>`
					)}
				</ul>`;
		
		return html`
			<dialog
				class="${this.theme}"
				@close="${this.close}"
				@click="${(event: MouseEvent) => {
					if (event.target === this.dialog) this.close(); // close on backdrop click
				}}">

				<!-- Header -->
				<form>
					<input
						type="text"
						spellcheck="false"
						autocomplete="off"
						@input="${this._onInput}"
						placeholder="${this.placeholder}"
						autofocus
					>
				</form>

				<!-- Action list -->
				<main>${actionList}</main>

				<!-- Footer -->
				<slot name="footer">
					<p><kbd>⏎</kbd> to select <kbd>↑</kbd> <kbd>↓</kbd> to navigate <kbd>esc</kbd> to close</p>
					${unsafeHTML(this.note || `<span>${this._results.length} options</span>`)}
				</slot>
			</dialog>
		`;
	}
	
	/**
	 * Render the results on input.
	 * @param event
	 * @private
	 */
	private async _onInput(event: InputEvent) {
		const input = event.target as HTMLInputElement;
		this._search = input.value;
		await this.updateComplete;
		
		this.dispatchEvent(
			new CustomEvent(
				'change', {
					detail: {
						search: input.value,
					},
					bubbles: true,
					composed: true,
				})
		)
	}
	
	/**
	 * Handle focus on action.
	 * @param action
	 * @private
	 */
	private _actionFocused(action: Action) {
		this._selected = action;
	}
	
	/**
	 * Trigger the action.
	 * @param action
	 * @private
	 */
	private _triggerAction(action?: Action) {
		this._selected = action;
		
		// fire selected event even when action is empty/not selected,
		// so possible handle api search for example
		this.dispatchEvent(
			new CustomEvent('selected', {
				detail: {search: this._search, action},
				bubbles: true,
				composed: true,
			})
		);
		
		if (!action) return;
		
		// trigger action
		if (action.handler) {
			const result = action.handler(action);
			if (!result?.keepOpen) {
				this.close();
			}
		} else if (action.url) {
			window.open(action.url, action.target || '_self');
			this.close();
		}
	}
	
	/**
	 * Return the index of the selected action.
	 * @private
	 */
	private get _selectedIndex(): number {
		return !this._selected ? -1 : this._results.indexOf(this._selected);
	}
	
	/**
	 * Return the dialog element.
	 */
	get dialog(): HTMLDialogElement {
		return this.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
	}
	
	/**
	 * Return the input element.
	 */
	get input(): HTMLInputElement {
		return this.shadowRoot?.querySelector('input') as HTMLInputElement;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cmd-dialog': CmdDialog;
	}
}
