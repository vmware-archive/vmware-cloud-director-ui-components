/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { DocumentationContainerApiComponent } from './documentation-container/documentation-container-api.component';
import { DocumentationContainerDocumentationComponent } from './documentation-container/documentation-container-documentation.component';
import { DocumentationContainerExampleComponent } from './documentation-container/documentation-container-example.component';
import { DocumentationContainerComponent } from './documentation-container/documentation-container.component';
import { ExampleViewerComponent } from './example-viewer/example-viewer.component';

/**
 * Represents each entry in {@link DocumentationEntry.examples}, that is an examples that shows a particular usage of a components
 */
export interface ExampleEntry {
    /**
     * Example component written to show usage of the component
     */
    component: Type<unknown>;

    /**
     * The title of the section under which this example will be placed
     */
    title: string;

    /**
     * The subroutes for this example
     */
    urlSegment: string;
}

/**
 * Represents a component being showcased, along with the examples for it.
 */
export interface DocumentationEntry {
    /**
     * The display name that is going to be used for the component
     */
    displayName: string;

    /**
     * The segment to be used in routing when displaying the documentation for this component.
     */
    urlSegment: string;

    /**
     * The component for which the documentation is going to be generated
     */
    component: Type<unknown>;

    /**
     * A list of examples that will show how the component may be used
     */
    examples?: ExampleEntry[];
}

/**
 * To register a documentation entry as value for corresponding component
 */
const documentationEntryMap = new Map<Type<unknown>, DocumentationEntry>();

/**
 * Used in {@link Documentation.registerDocumentationEntry} method to check if the input is a valid {@link DocumentationEntry}
 */
function validateDocumentationMetadata(documentationParams: DocumentationEntry): void {
    if (!documentationParams.urlSegment) {
        throw new Error('urlSegment should be specified and not empty');
    }

    const documentationEntry = Documentation.getAllEntries().find(
        (entry) => entry.urlSegment === documentationParams.urlSegment
    );
    if (documentationEntry) {
        throw new Error(
            `The specified urlSegment '${documentationParams.urlSegment}' for '${documentationParams.displayName}'` +
                `was already defined for '${documentationEntry.displayName}'`
        );
    }

    if (!documentationParams.displayName) {
        throw new Error('displayName should be specified and not empty');
    }
}

export const Documentation = {
    /**
     * Returns all the documentation entries registered into the framework
     */
    getAllEntries(): DocumentationEntry[] {
        return Array.from(documentationEntryMap.values());
    },

    /**
     * Returns angular routes used when displaying the documentation/examples for the components.
     */
    getRoutes(): Routes {
        const routes = Documentation.getAllEntries().map((documentationEntry: DocumentationEntry) => ({
            path: documentationEntry.urlSegment,
            component: DocumentationContainerComponent,
            // Add three tabs as subroutes
            children: [
                {
                    path: 'documentation',
                    component: DocumentationContainerDocumentationComponent,
                    data: { component: documentationEntry.component },
                },
                {
                    path: 'api',
                    component: DocumentationContainerApiComponent,
                    data: { component: documentationEntry.component },
                },
                {
                    path: 'example',
                    component: DocumentationContainerExampleComponent,
                    data: { examples: documentationEntry.examples ? documentationEntry.examples : [] },
                    children: documentationEntry.examples?.length
                        ? documentationEntry.examples.map((exampleEntry: ExampleEntry) => ({
                              path: exampleEntry.urlSegment,
                              component: ExampleViewerComponent,
                              data: { exampleEntry },
                          }))
                        : [],
                },
                {
                    path: '',
                    redirectTo: 'documentation',
                    pathMatch: 'full',
                },
            ],
        }));
        const redirectList = [];
        // Add redirect. The example route will be redirected to the first example.
        routes.forEach((route) => {
            if (route.children.length > 2 && route.children[2].children?.length > 1) {
                route.children.unshift({
                    path: 'example',
                    redirectTo: `example/${route.children[2].children[0].path}`,
                    pathMatch: 'full',
                });
            }
        });
        return [...redirectList, ...routes];
    },

    /**
     * Used for manual registration of documentation entry with a corresponding component.
     */
    registerDocumentationEntry(documentationEntry: DocumentationEntry): void {
        validateDocumentationMetadata(documentationEntry);
        documentationEntryMap.set(documentationEntry.component, documentationEntry);
    },
};
