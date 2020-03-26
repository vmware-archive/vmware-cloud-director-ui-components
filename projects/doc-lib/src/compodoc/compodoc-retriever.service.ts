/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {Type} from '@angular/core';
import {ApiParameters, DocumentationRetrieverService} from '../documentation-retriever.service';
import {CompodocComponent, CompodocModule, CompodocSchema} from './compodoc-schema';

/**
 * This service retrieves specific properties from compodoc generated documentation
 */
export class CompoDocRetrieverService implements DocumentationRetrieverService {
    constructor(private documentationJson: CompodocSchema[]) {}

    public getOverview(component: Type<any>): string {
        return this.getComponent(component).description;
    }

    public getTypescriptSourceCode(component: Type<any>): string {
        return this.getComponent(component).sourceCode;
    }

    public getHtmlSourceCode(component: Type<any>): string {
        return this.getComponent(component).templateData;
    }

    public getCssSourceCode(component: Type<any>): string {
        const styleUrlsData = this.getComponent(component).styleUrlsData;
        if (!styleUrlsData) {
            return;
        }
        return styleUrlsData.map(styleUrl => styleUrl.data).join('\n\n\n');
    }

    public getComponent(component: Type<any>): CompodocComponent {
        for (const documentationJson of this.documentationJson) {
            const compodocComponent = documentationJson.components.find(c => c.name === component.name);
            if (compodocComponent) {
                return compodocComponent;
            }
        }
        return { styleUrlsData: [] } as CompodocComponent;
    }

    public getModule(moduleName: string): CompodocModule | null {
        for (const documentationJson of this.documentationJson) {
            const compodocComponent = documentationJson.modules.find(module => module.name === moduleName);
            if (compodocComponent) {
                return compodocComponent;
            }
        }
        return null;
    }

    public getInputParameters(component: Type<any>): ApiParameters[] {
        const comp = this.getComponent(component);
        return comp.inputsClass || [];
    }

    public getOutputParameters(component: Type<any>): ApiParameters[] {
        const comp = this.getComponent(component);
        return comp.outputsClass || [];
    }
}
