/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ExampleEntry } from '../documentation';

@Component({
    selector: 'vcd-example-viewer',
    templateUrl: './example-viewer.component.html',
    styleUrls: ['./example-viewer.component.scss'],
})
export class ExampleViewerComponent {
    /**
     * For showing and hiding of {@link SourceCodeViewerComponent} in the HTML
     */
    showSourceCode = false;

    constructor(private resolver: ComponentFactoryResolver) {}

    /**
     * Gets the example entry from documentation entry and renders the example component
     */
    private _exampleEntry: ExampleEntry;
    @Input()
    set exampleEntry(exampleEntry: ExampleEntry) {
        this._exampleEntry = exampleEntry;
        this.createExample();
    }
    get exampleEntry(): ExampleEntry {
        return this._exampleEntry;
    }

    /**
     * Container for rendering the example component
     */
    @ViewChild('exampleContainer', { static: true, read: ViewContainerRef })
    exampleContainer: ViewContainerRef;

    private createExample(): void {
        this.exampleContainer.clear();
        const exampleEntry = this.exampleEntry;
        if (!exampleEntry || !exampleEntry.component) {
            return;
        }
        const factory = this.resolver.resolveComponentFactory(exampleEntry.component);
        this.exampleContainer.createComponent(factory);
    }
}
