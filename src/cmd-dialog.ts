import {html, LitElement, type PropertyValues, type TemplateResult, unsafeCSS} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {live} from 'lit/directives/live.js';
import {repeat} from 'lit/directives/repeat.js';
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
import Fuse from 'fuse.js';
import hotkeys from 'hotkeys-js';
import {type Action} from './action.js';
import {type CmdAction} from './cmd-action.js';
import './cmd-action.js'; // eslint-disable-line import/no-unassigned-import
import style from './style.css?inline'; // eslint-disable-line n/file-extension-in-import

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
	}) actions = [] as Action[];

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
	@state() private _results = [] as Action[];

	/**
	 * Fuse.js instance
	 * @private
	 */
	private fuse: Fuse<Action> | undefined;

	/**
	 * Return the dialog element.
	 */
	get dialog(): HTMLDialogElement {
		return this.shadowRoot?.querySelector('dialog')!;
	}

	/**
	 * Return the input element.
	 */
	get input(): HTMLInputElement {
		return this.shadowRoot?.querySelector('input')!;
	}

	/**
	 * Return the index of the selected action.
	 * @private
	 */
	private get _selectedIndex(): number {
		return this._selected ? this._results.indexOf(this._selected) : -1;
	}

	/**
	 * Open the dialog.
	 */
	public open() {
		if (!this.dialog.open) {
			this.dialog.showModal();
		}
	}

	/**
	 * Close the dialog.
	 */
	public close() {
		hotkeys.setScope('all');
		this.input.value = '';
		this.dialog.close();
	}

	override connectedCallback() {
		super.connectedCallback();

		// Open dialog
		hotkeys(this.hotkey, 'all', event => {
			this.open();
			hotkeys.setScope('dialog');
			event.preventDefault();
		});

		// Select next
		hotkeys('down,tab', 'dialog', event => {
			this._selected = this._selectedIndex >= this._results.length - 1 ? this._results[0] : this._results[this._selectedIndex + 1];
			event.preventDefault();
		});

		// Select previous
		hotkeys('up,shift+tab', 'dialog', event => {
			this._selected = this._selectedIndex === 0 ? this._results[this._results.length - 1] : this._results[this._selectedIndex - 1];
			event.preventDefault();
			},
		);

		// Trigger action
		hotkeys('enter', 'dialog', event => {
			this._triggerAction(this._results[this._selectedIndex]);
			event.preventDefault();
		});
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		// Unregister hotkeys
		hotkeys.unbind(this.hotkey, 'all');
		hotkeys.unbind('down,tab', 'dialog');
		hotkeys.unbind('up,shift+tab', 'dialog');
		hotkeys.unbind('enter', 'dialog');
	}

	override update(changedProperties: PropertyValues<this>) {
		if (changedProperties.has('actions')) {
			// Register action hotkeys
			for (const action of this.actions.filter(item => Boolean(item.hotkey))) {
				hotkeys(action.hotkey ?? '', 'all', event => {
					event.preventDefault();
					this._triggerAction(action);
				});
			}

			// Setup fuse search
			this.fuse = new Fuse(this.actions,
				{
					keys: [
						{name: 'title', weight: 2},
						{name: 'tags', weight: 1},
						{name: 'url', weight: 1},
					],
				});
		}

		super.update(changedProperties);
	}

	override render() {
		// Search for matches
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

		// Select first result
		if (this._results.length > 0 && this._selectedIndex === -1) {
			this._selected = this._results[0];
		}

		// Nothing was found
		if (this._results.length === 0) {
			this._selected = undefined;
		}

		const actionList: TemplateResult = html`
			<ul part="action-list">${repeat(
				this._results,
				action =>
					html`
						<cmd-action
							.action=${action}
							.selected=${live(action === this._selected)}
							.theme=${this.theme}
							@mouseover=${(event: MouseEvent) => {
								this._actionFocused(action, event);
							}}
							@actionSelected=${(event: CustomEvent<Action>) => {
								this._triggerAction(event.detail);
							}}
						></cmd-action>
					`)}
			</ul>
		`;

		return html`
			<dialog
				part="dialog"
				class="${this.theme}"
				@close="${this.close}"
				@click="${(event: MouseEvent) => {
					if (event.target === this.dialog) {
						this.close();
					} // Close on backdrop click
				}}">

				<!-- Header -->
				<form part="dialog-form">
					<input
						part="input"
						type="text"
						spellcheck="false"
						autocomplete="off"
						@input="${this._onInput}"
						placeholder="${this.placeholder}"
						autofocus
					>
				</form>

				<!-- Action list -->
				<main part="dialog-body">${actionList}</main>

				<!-- Footer -->
				<slot name="footer">
					<p><kbd part="kbd">⏎</kbd> to select <kbd part="kbd">↑</kbd> <kbd part="kbd">↓</kbd> to navigate <kbd part="kbd">esc</kbd> to close</p>
					${unsafeHTML(this.note ?? `<span>${this._results.length} options</span>`)}
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
						actions: this._results,
					},
					bubbles: true,
					composed: true,
				}),
		);
	}

	/**
	 * Handle focus on action.
	 * @param action
	 * @param $event
	 * @private
	 */
	private _actionFocused(action: Action, $event: MouseEvent) {
		this._selected = action;
		($event.target as CmdAction).ensureInView();
	}

	/**
	 * Trigger the action.
	 * @param action
	 * @private
	 */
	private _triggerAction(action?: Action) {
		this._selected = action;

		// Fire selected event even when action is empty/not selected,
		// so possible handle api search for example
		this.dispatchEvent(
			new CustomEvent('selected', {
				detail: {search: this._search, action},
				bubbles: true,
				composed: true,
			}),
		);

		// Trigger action
		if (action) {
			if (action.onAction) {
				const result = action.onAction(action);
				if (!result?.keepOpen) {
					this.close();
				}
			} else if (action.url) {
				window.open(action.url, action.target ?? '_self');
				this.close();
			}
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'cmd-dialog': CmdDialog;
	}
}
