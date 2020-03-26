/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import Prism from 'prismjs';
import {JsComponent} from '../js.component';
import {Tabset} from '../tabset/tabset.component';
import {html} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';

/**
 * Each language to be displayed within the tabbed interface
 */
interface SourceCode {
    /**
     * The user friendly language name to be displayed on its tab.
     *
     * It'd be great if it could be deduced from languageId but the list can grow and we
     * don't want to keep maintaining a parallel list
     */
    language: string;

    /**
     * The language to highlight the source code in
     * @see https://prismjs.com/#supported-languages
     */
    languageId: string;

    /**
     * The code associated with this language
     */
    sourceCode: string;
}

/**
 * Displays code in a {@link Tabset}
 */
export class TabbedCodeViewer extends JsComponent {
    tabs: Tabset;

    constructor(codes: SourceCode[] = []) {
        super();

        this.tabs = new Tabset(
            codes.map((code: SourceCode) => ({
                title: code.language,
                panel: html`
                    <pre class=${'language-' + code.languageId}><code class=${'language-' + code.languageId}>${
                        unsafeHTML(Prism.highlight(code.sourceCode, code.languageId))
                    }</code></pre>
                `,
            }))
        );
    }

    onRender(): void {
        this.tabs.render(this.el);
    }
}
