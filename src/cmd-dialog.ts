import Fuse from "fuse.js";
import { html, LitElement, type PropertyValues, type TemplateResult, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { tinykeys } from "tinykeys";
import type { Action } from "./action.js";
import type { CmdAction } from "./cmd-action.js";
import "./cmd-action.js";
import style from "./style.css?inline.css";

@customElement("cmd-dialog")
export class CmdDialog extends LitElement {
	static override styles = unsafeCSS(style);

	/**
	 * The mode of the dialog (dark/light).
	 */
	@property({ type: String }) theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

	/**
	 * The placeholder text for the input.
	 */
	@property({ type: String }) placeholder = "Type a command or search...";

	/**
	 * The footer notice for the dialog.
	 */
	@property({ type: String }) note = "";

	/**
	 * Show the close button (default: false).
	 */
	@property({ type: Boolean }) showCloseButton = false;

	/**
	 * Open dialog hotkey
	 * Meta+K (Mac) or Ctrl+K (Windows)
	 * @see https://github.com/jamiebuilds/tinykeys
	 */
	@property({ type: String }) hotkey = "$mod+k";

	/**
	 * Array of actions
	 */
	@property({
		type: Array,
		hasChanged() {
			return true;
		},
	})
	actions = [] as Action[];

	/**
	 * Search input value
	 * @private
	 */
	@state() private _search = "";

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
		return this.shadowRoot?.querySelector("dialog") as HTMLDialogElement;
	}

	/**
	 * Return the input element.
	 */
	get input(): HTMLInputElement {
		return this.shadowRoot?.querySelector("input") as HTMLInputElement;
	}

	/**
	 * Return the index of the selected action.
	 * @private
	 */
	private get _selectedIndex(): number {
		return this._selected ? this._results.indexOf(this._selected) : -1;
	}

	/**
	 * Return if the dialog is open.
	 */
	get isOpen() {
		return this.dialog.open;
	}

	/**
	 * Open the dialog.
	 */
	public open() {
		if (!this.dialog.open) {
			this.dialog.showModal();
			this.dispatchEvent(new CustomEvent("open", { detail: this }));
		}
	}

	/**
	 * Close the dialog.
	 */
	public close() {
		this.dialog.close();
	}

	/**
	 * Toggle the dialog.
	 */
	public toggle() {
		if (this.dialog.open) {
			this.close();
		} else {
			this.open();
		}
	}

	override connectedCallback() {
		super.connectedCallback();

		// Activate/deactivate dialog
		const toggleDialog = (event: KeyboardEvent) => {
			this.toggle();
			event.preventDefault();
		};

		for (const hotkey of this.hotkey.split("|")) {
			tinykeys(window, { [hotkey]: toggleDialog });
		}

		const navigate = {
			next: (event: KeyboardEvent) => {
				this._selected = this._selectedIndex >= this._results.length - 1 ? this._results[0] : this._results[this._selectedIndex + 1];
				event.preventDefault();
			},
			prev: (event: KeyboardEvent) => {
				this._selected = this._selectedIndex === 0 ? this._results[this._results.length - 1] : this._results[this._selectedIndex - 1];
				event.preventDefault();
			},
			open: (event: KeyboardEvent) => {
				this._triggerAction(this._results[this._selectedIndex], event);
				event.preventDefault();
			},
		};

		// Navigate through actions
		tinykeys(this, {
			ArrowUp: navigate.prev,
			"Shift+Tab": navigate.prev,
			ArrowDown: navigate.next,
			Tab: navigate.next,
			Enter: navigate.open,
		});
	}

	override update(changedProperties: PropertyValues<this>) {
		if (changedProperties.has("actions")) {
			// Register action hotkeys
			for (const action of this.actions.filter((item) => Boolean(item.hotkey))) {
				const hotkeys = action.hotkey ? action.hotkey.split("|") : [];
				for (const hotkey of hotkeys) {
					tinykeys(window, {
						[hotkey]: (event: KeyboardEvent) => {
							this._triggerAction(action, event);
						},
					});
				}
			}

			// Setup fuse search
			this.fuse = new Fuse(this.actions, {
				keys: [
					{ name: "title", weight: 2 },
					{ name: "tags", weight: 1 },
					{ name: "url", weight: 1 },
				],
			});
		}

		super.update(changedProperties);
	}

	override render() {
		// Search for matches
		if (this._search.length > 0) {
			const results = this.fuse?.search(this._search);
			if (results) {
				this._results = results.map((item) => item.item);
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
				(action) =>
					html`
						<cmd-action
							.action=${action}
							.selected=${live(action === this._selected)}
							.theme=${this.theme}
							@mouseover=${(event: MouseEvent) => {
								this._actionFocused(action, event);
							}}
							@actionSelected=${(event: CustomEvent<Action>) => {
								this._triggerAction(event.detail, event);
							}}
						></cmd-action>
					`,
			)}
			</ul>
		`;

		return html`
			<dialog
				part="dialog"
				class="${this.theme}"
				@close="${this.onClose}"
				@click="${(event: MouseEvent) => {
					if (event.target === this.dialog) {
						this.close();
					}
				}}"
			>

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
					<button type="button" @click="${this.close}" class="${this.showCloseButton ? "" : "hidden"}">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x size-6">
							<path d="M18 6 6 18"/>
							<path d="m6 6 12 12"/>
						</svg>
					</button>
				</form>

				<!-- Action list -->
				<main part="dialog-body">${actionList}</main>

				<!-- Footer -->
				<slot name="footer">
					<p>
						<kbd part="kbd" aria-label="Select action">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							     class="lucide lucide-arrow-up-icon lucide-arrow-up size-3">
								<path d="M20 4v7a4 4 0 0 1-4 4H4"/>
								<path d="m9 10-5 5 5 5"/>
							</svg>
						</kbd>
						to select
						<kbd part="kbd" aria-label="Navigate Up">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							     class="lucide lucide-arrow-up-icon lucide-arrow-up size-3">
								<path d="m5 12 7-7 7 7"/>
								<path d="M12 19V5"/>
							</svg>
						</kbd>
						<kbd part="kbd" aria-label="Navigate down">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
							     class="lucide lucide-arrow-down-icon lucide-arrow-down size-3">
								<path d="M12 5v14"/>
								<path d="m19 12-7 7-7-7"/>
							</svg>
						</kbd> to navigate <kbd part="kbd">esc</kbd> to close
					</p>
					${unsafeHTML(this.note ?? `<span>${this._results.length} options</span>`)}
				</slot>
			</dialog>
		`;
	}

	/**
	 * Handle on close event.
	 * @protected
	 */
	protected onClose() {
		this.input.value = "";
		this._selected = undefined;
		this._results = this.actions;

		this.dispatchEvent(new CustomEvent("close", { detail: this }));
	}

	/**
	 * Render the results on input.
	 * @param event
	 * @private
	 */
	private async _onInput(event: InputEvent) {
		const input = event.target as HTMLInputElement;
		this._search = input.value;

		// Make sure we return to the top of the list after re-searching
		this._selected = undefined;

		await this.updateComplete;

		this.dispatchEvent(
			new CustomEvent("change", {
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
	 * @param parentEvent
	 * @private
	 */
	private _triggerAction(action?: Action, parentEvent?: KeyboardEvent | CustomEvent) {
		const actionEvent = new CustomEvent("action", {
			detail: {
				search: this._search,
				action,
				parentEvent,
			},
			bubbles: true,
			composed: true,
			cancelable: true,
		});

		if (action && this.dispatchEvent(actionEvent)) {
			this._selected = action;

			if (action.onAction) {
				if (action.onAction(parentEvent)) {
					this.close();
				}
			} else if (action.url) {
				window.open(action.url, action.target ?? "_self");
				this.close();
			}
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"cmd-dialog": CmdDialog;
	}
}
