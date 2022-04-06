/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { ApiParameters, DocumentationRetrieverService } from '../documentation-retriever.service';
import {
    CompodocComponent,
    CompodocModule,
    CompodocSchema,
    GenericCompodocItem,
    RawGenericCompodocItem,
} from './compodoc-schema';

const TOP_LEVEL_TYPES = ['classes', 'injectables', 'interfaces', 'modules', 'components', 'directives'];
const MISCELLANEOUS_LEVEL_TYPES = ['variables', 'functions', 'typealiases', 'enumerations'];

/**
 * This service retrieves specific properties from compodoc generated documentation
 */
export class CompoDocRetrieverService implements DocumentationRetrieverService {
    constructor(private documentationJson: CompodocSchema[]) {}

    public getOverview(component: Type<unknown>): string {
        return this.getComponent(component).description;
    }

    public getTypescriptSourceCode(component: Type<unknown>): string {
        return this.getComponent(component).sourceCode;
    }

    public getHtmlSourceCode(component: Type<unknown>): string {
        return this.getComponent(component).templateData;
    }

    public getCssSourceCode(component: Type<unknown>): string {
        const styleUrlsData = this.getComponent(component).styleUrlsData;
        if (!styleUrlsData) {
            return;
        }
        return styleUrlsData.map((styleUrl) => styleUrl.data).join('\n\n\n');
    }

    public getComponent(component: Type<any>): CompodocComponent {
        for (const documentationJson of this.documentationJson) {
            const compodocComponent = documentationJson.components.find((c) => c.name === component.name);
            if (compodocComponent) {
                return compodocComponent;
            }
        }
        return { styleUrlsData: [] } as CompodocComponent;
    }

    public getModule(moduleName: string): CompodocModule | null {
        for (const documentationJson of this.documentationJson) {
            const compodocComponent = documentationJson.modules.find((module) => module.name === moduleName);
            if (compodocComponent) {
                return compodocComponent;
            }
        }
        return null;
    }

    public getInputParameters(component: Type<unknown>): ApiParameters[] {
        const comp = this.getComponent(component);
        return this.addTypeLink(comp.inputsClass);
    }

    public getOutputParameters(component: Type<unknown>): ApiParameters[] {
        const comp = this.getComponent(component);
        return this.addTypeLink(comp.outputsClass);
    }

    /**
     * Adds the correct type link to each parameter if it can be found/
     */
    private addTypeLink(params: ApiParameters[]): ApiParameters[] {
        return params ? params.map((p) => ({ ...p, typeLink: this.getTypeLink(p.type) })) : [];
    }

    /**
     * Parses types that can include generics, including both array types: Type[] or Array<Type> and creates a link for it.
     * @param type The name of a type as a string, one of the top level keys in the generated JSON
     * @return  A relative url that can be used to link to the compodoc documentation,
     * for example "compodoc/classes/ColumnConfig" or "compodoc/types#ColumnConfigType"
     */
    private getTypeLink(type: string): string {
        const rawType = type.split('[')[0].split('<')[0];
        const found = this.traverseDocumentation((item) => item.name === rawType);
        if (!found) {
            return '';
        }
        if (MISCELLANEOUS_LEVEL_TYPES.indexOf(found.itemType) !== -1) {
            return `miscellaneous/${found.itemType}.html#${found.name}`;
        }
        return `${found.itemType}/${found.name}.html`;
    }

    /**
     * Finds the first item in the Compodoc documentation where the callback returns true.
     */
    private traverseDocumentation(callback: TraverseCompodocItemsCallback): GenericCompodocItem {
        for (const documentationJson of this.documentationJson) {
            // Check every documentation type in the given documentation

            for (const itemType of TOP_LEVEL_TYPES) {
                const found = (documentationJson[itemType] as GenericCompodocItem[]).find((item) => callback(item));
                if (found) {
                    return { ...found, itemType };
                }
            }
            for (const itemType of MISCELLANEOUS_LEVEL_TYPES) {
                const found = (documentationJson.miscellaneous[itemType] as GenericCompodocItem[]).find((item) =>
                    callback(item)
                );
                if (found) {
                    return { ...found, itemType };
                }
            }
        }
        return undefined;
    }
}

/**
 * The type of data that can be passed as a callback to traverse a documentation tree.
 */
interface TraverseCompodocItemsCallback {
    /**
     * @return undefined or null if the traversal should continue, otherwise the returned object will be
     * returned to the traverse caller.
     */
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (item: RawGenericCompodocItem): boolean;
}
