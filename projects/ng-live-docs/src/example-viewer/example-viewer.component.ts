/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { DocumentationRetrieverService } from '../documentation-retriever.service';
import { ExampleEntry } from '../interfaces';
import { StackBlitzWriterService } from '../stack-blitz-writer.service';

@Component({
    selector: 'vmw-example-viewer',
    templateUrl: './example-viewer.component.html',
    styleUrls: ['./example-viewer.component.scss'],
})
export class ExampleViewerComponent implements OnInit {
    /**
     * For showing and hiding of {@link SourceCodeViewerComponent} in the HTML
     */
    showSourceCode = false;

    get sourceCodeButtonText(): string {
        return this.showSourceCode ? 'Show source code' : 'Hide source code';
    }

    constructor(
        private resolver: ComponentFactoryResolver,
        private docRetriever: DocumentationRetrieverService,
        private stackblitzWriter: StackBlitzWriterService,
        private route: ActivatedRoute
    ) {}

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
        const res = this.exampleContainer.createComponent(factory);
        res.changeDetectorRef.detectChanges();
    }

    ngOnInit(): void {
        // If there is an exampleEntry in route data, use it to create the example component.
        this.route.data.subscribe((data: Data) => {
            if (data.exampleEntry) {
                this.exampleEntry = data.exampleEntry;
            }
        });
    }

    onCodeButtonClick(): void {
        this.showSourceCode = !this.showSourceCode;
    }

    onRunButtonClick(): void {
        this.stackblitzWriter.openStackBlitz(this.exampleEntry);
    }
}
