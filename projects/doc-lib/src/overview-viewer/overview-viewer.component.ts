/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Input, Type } from '@angular/core';
import { DocumentationRetrieverService } from '../documentation-retriever.service';

@Component({
    selector: 'vcd-overview-viewer',
    templateUrl: './overview-viewer.component.html',
    styleUrls: ['./overview-viewer.component.scss'],
})
export class OverviewViewerComponent {
    /**
     * The description of the component from Compodoc generated JSON. This is an HTML encoded string.
     */
    overview: string;
    constructor(private documentationRetriever: DocumentationRetrieverService) {}

    @Input() isNoOverviewMessageShown = true;

    @Input()
    set component(component: Type<any>) {
        if (!component) {
            return;
        }
        // TODO: externalize string literals
        this.overview =
            this.documentationRetriever.getOverview(component) ||
            (this.isNoOverviewMessageShown ? 'No Documentation found' : '');
    }
}
