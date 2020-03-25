/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { html, render, TemplateResult } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { JsComponent } from '../js.component';

export interface VcdTab {
    /**
     * The tab's title, what appears at the top.
     * TODO: Consider making this support TemplateResult
     */
    title: string | TemplateResult;
    /**
     * The tab contents, an HTML string. This is prone to script injection
     * TODO: Accept a TemplateResult to mitigate this
     */
    panel: string | TemplateResult;
}

interface VcdTabInternal extends VcdTab {
    /**
     * Unique ID for this tab, needed for a11y but we don't force users to create it
     */
    id: string;
}

/**
 * Create unique IDs for tab's aria attributes.
 */
const getId = (() => {
    let id = 0;
    return () => `live-docs-${++id}`;
})();

/**
 * A VanillaJS implementation of Clarity tabs
 */
export class Tabset extends JsComponent {
    private _tabs: VcdTabInternal[];

    private selectedTab: VcdTabInternal;

    /**
     * @param tabs The tabs to be displayed
     */
    constructor(tabs?: VcdTab[]) {
        super();
        this.tabs = tabs;
    }

    /**
     * Re-render using the given tabs
     */
    public set tabs(tabs: VcdTab[]) {
        if (!tabs) {
            tabs = [];
        }
        this._tabs = tabs.map(tab => ({ ...tab, id: getId() }));
        this.selectedTab = this._tabs[0];
        if (this.el) {
            this.internalRender();
        }
    }

    private tabsTemplate(): TemplateResult {
        return html`
            <ul class="nav" role="tablist">
                ${this._tabs.map(tab => this.getTabTemplate(tab))}
            </ul>
            ${this.tabPanels()}
        `;
    }

    private getTabTemplate(tab: VcdTabInternal): TemplateResult {
        return html`
            <li role="presentation" class="nav-item">
                <button
                    id="${tab.id}"
                    class=${this.getTabCssClasName(tab)}
                    aria-controls="${tab.id}-panel"
                    aria-selected="${this.getAriaSelectedValue(tab)}"
                    type="button"
                >
                    ${tab.title}
                </button>
            </li>
        `;
    }

    private tabPanels(): TemplateResult[] {
        return this._tabs.map(
            tab => html`
                <section
                    id="${tab.id}-panel"
                    role="tabpanel"
                    aria-labelledby=${tab.id}
                    aria-hidden=${this.getAriaHiddenValue(tab)}
                >
                    ${tab.panel}
                </section>
            `
        );
    }

    protected onRender(): void {
        this.el.addEventListener('click', this.onClick);
        this.internalRender();
    }

    private internalRender(): void {
        render(this.tabsTemplate(), this.el);
    }

    protected onBeforeDestroy(): void {
        this.el.removeEventListener('click', this.onClick);
    }

    onClick = (e: MouseEvent) => {
        const button = this.up(e.target as HTMLElement, 'li.nav-item button');
        if (!button) {
            return;
        }
        this.selectedTab = this._tabs.find(tab => tab.id === button.id);
        render(this.tabsTemplate(), this.el);
    };

    private getTabCssClasName(tab: VcdTabInternal): string {
        const active = this.isActive(tab) ? 'active' : '';
        return `btn btn-link nav-link ${active}`;
    }

    private getAriaSelectedValue(tab: VcdTabInternal): string {
        return String(this.isActive(tab));
    }

    private getAriaHiddenValue(tab: VcdTabInternal): string {
        return String(!this.isActive(tab));
    }

    private isActive(tab: VcdTabInternal): boolean {
        return tab === this.selectedTab;
    }
}
