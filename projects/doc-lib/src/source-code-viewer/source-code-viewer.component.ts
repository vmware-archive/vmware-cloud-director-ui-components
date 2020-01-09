/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import { DocumentationRetrieverService } from '../documentation-retriever.service';
import { HighlightService } from '../highlight/highlight.service';

/**
 * To display the 3 code parts(TypeScript, HTML and CSS) of a component
 */
@Component({
    selector: 'vcd-source-code-viewer',
    templateUrl: './source-code-viewer.component.html',
    styleUrls: ['./source-code-viewer.component.scss'],
})
export class SourceCodeViewerComponent {
    /**
     * Different source codes of the component
     */
    typescriptSourceCode: string;
    htmlSourceCode: string;
    cssSourceCode: string;

    constructor(
        private documentationRetriever: DocumentationRetrieverService,
        private highlightService: HighlightService
    ) {}

    /**
     * The component which source (typescript, html, css) will be displayed
     */
    @Input()
    set component(component: Type<any>) {
        if (!component) {
            return;
        }
        // TODO: externalize string literals
        this.typescriptSourceCode = this.highlightService.highlightTypescript(
            this.documentationRetriever.getTypescriptSourceCode(component)
        );
        this.htmlSourceCode = this.highlightService.highlightHtml(
            this.documentationRetriever.getHtmlSourceCode(component) || 'No html found'
        );
        this.cssSourceCode = this.highlightService.highlightScss(
            this.documentationRetriever.getCssSourceCode(component) || 'No CSS found'
        );
    }
}
