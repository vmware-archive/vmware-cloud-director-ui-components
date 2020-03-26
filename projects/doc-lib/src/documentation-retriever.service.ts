/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {Type} from '@angular/core';
import {CompodocComponent, CompodocModule} from './compodoc/compodoc-schema';

/**
 * Represents the inputClass/outputClass properties of a component in compodoc generated documentation
 */
export interface ApiParameters {
    /**
     * Represents name of input/output property of a component
     */
    name: string;
    /**
     * Represents Data type of input/output property
     */
    type: string;
    /**
     * Represents JS doc of input/output property
     */
    description: string;
}

/**
 * Service exposing methods for retrieving the documentation for a given component.
 */
export abstract class DocumentationRetrieverService {
    /**
     * Returns the overview help documentation for the provided component
     */
    public abstract getOverview(component: Type<any>): string;

    /**
     * Returns the typescript source code for the provided component
     */
    public abstract getTypescriptSourceCode(component: Type<any>): string;

    /**
     * Returns the HTML source code for the provided component
     */
    public abstract getHtmlSourceCode(component: Type<any>): string;

    /**
     * Returns the CSS source code for the provided component
     */
    public abstract getCssSourceCode(component: Type<any>): string;

    /**
     * Returns the inputsClass property value of the provided component from the Compodoc generated JSON
     */
    public abstract getInputParameters(component: Type<any>): ApiParameters[];

    /**
     * Returns the outputsClass property value of the provided component from the Compodoc generated JSON
     */
    public abstract getOutputParameters(component: Type<any>): ApiParameters[];

    /** The raw CompoDoc component */
    public abstract getComponent(component: Type<any>): CompodocComponent;

    /** The raw Compodoc module object */
    public abstract getModule(moduleName: string): CompodocModule;
}
