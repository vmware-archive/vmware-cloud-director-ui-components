/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {Component, Input, Type} from '@angular/core';
import {ApiParameters, DocumentationRetrieverService} from '../documentation-retriever.service';

@Component({
    selector: ' vcd-api-viewer',
    templateUrl: './api-viewer.component.html',
    styleUrls: ['./api-viewer.component.scss'],
})
export class ApiViewerComponent {
    inputParameters: ApiParameters[];
    outputParameters: ApiParameters[];

    constructor(private documentationRetriever: DocumentationRetrieverService) {}

    /**
     * Gets the input and output parameters from the Compodoc generated documentation json
     */
    @Input()
    set component(component: Type<any>) {
        if (!component) {
            return;
        }
        this.inputParameters = this.documentationRetriever.getInputParameters(component);
        this.outputParameters = this.documentationRetriever.getOutputParameters(component);
    }
}
