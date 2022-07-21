/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';

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

export interface StackBlitzInfo {
    /** Something like 'vcd-ui-cc-starter-clarity-v8-yhe4yg', then ID of a StackBlitz URL */
    templateId: string;
    /** The name of the project displaying examples */
    projectName: string;

    /**
     * Finds a module for a component
     * If this is null or an empty string is returned, the module is not added to the example
     */
    moduleFinder?(componentName: string): string;
}
