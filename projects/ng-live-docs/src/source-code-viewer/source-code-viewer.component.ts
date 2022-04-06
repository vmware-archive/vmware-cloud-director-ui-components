/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import Prism from 'prismjs';
import { DocumentationRetrieverService } from '../documentation-retriever.service';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

/**
 * To display the 3 code parts(TypeScript, HTML and CSS) of a component
 */
@Component({
    selector: 'vmw-source-code-viewer',
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

    constructor(private documentationRetriever: DocumentationRetrieverService) {}

    /**
     * The component which source (typescript, html, css) will be displayed
     */
    @Input()
    set component(component: Type<any>) {
        if (!component) {
            return;
        }
        const tsSource = this.documentationRetriever.getTypescriptSourceCode(component);
        if (tsSource) {
            this.typescriptSourceCode = Prism.highlight(tsSource, Prism.languages.typescript);
        }

        const htmlSource = this.documentationRetriever.getHtmlSourceCode(component);
        if (htmlSource) {
            this.htmlSourceCode = Prism.highlight(htmlSource, Prism.languages.html);
        }

        const cssSource = this.documentationRetriever.getCssSourceCode(component);
        if (cssSource) {
            this.cssSourceCode = Prism.highlight(cssSource, Prism.languages.scss);
        }
    }
}
