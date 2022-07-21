/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Type } from '@angular/core';
import { CompoDocRetrieverService } from './compodoc-retriever.service';
import { CompodocSchema } from './compodoc-schema';

const DOCUMENTATION: CompodocSchema[] = [
    {
        components: [
            {
                name: 'comp',
                description: '',
                sourceCode: '',
                templateUrl: [],
                templateData: '',
                styleUrls: [],
                styleUrlsData: [],
                inputsClass: [
                    {
                        name: 'param',
                        type: 'SomeInterface',
                        description: '',
                    },
                    {
                        name: 'param2',
                        type: 'SomeType',
                        description: '',
                    },
                ],
                outputsClass: [
                    {
                        name: 'param',
                        type: 'SomeInterface',
                        description: '',
                    },
                    {
                        name: 'param2',
                        type: 'SomeType',
                        description: '',
                    },
                ],
                file: '',
                selector: '',
            },
        ],
        modules: [],
        interfaces: [
            {
                name: 'SomeInterface',
            },
        ],
        injectables: [],
        classes: [],
        directives: [],
        miscellaneous: {
            variables: [],
            functions: [],
            typealiases: [
                {
                    name: 'SomeType',
                },
            ],
            enumerations: [],
        },
    },
];

describe('CompoDocRetrieverService', () => {
    const compoDocRetrieverService = new CompoDocRetrieverService(DOCUMENTATION);

    describe('getInputParameters', () => {
        it('adds the type link for a linked interface', () => {
            const inputs = compoDocRetrieverService.getInputParameters({
                name: 'comp',
            } as Type<unknown>);
            expect(inputs[0].typeLink).toEqual('interfaces/SomeInterface.html');
        });

        it('adds the type link for a linked type', () => {
            const inputs = compoDocRetrieverService.getInputParameters({
                name: 'comp',
            } as Type<unknown>);
            expect(inputs[1].typeLink).toEqual('miscellaneous/typealiases.html#SomeType');
        });
    });

    describe('getOutputParameters', () => {
        it('adds the type link for a linked interface', () => {
            const outputs = compoDocRetrieverService.getOutputParameters({
                name: 'comp',
            } as Type<unknown>);
            expect(outputs[0].typeLink).toEqual('interfaces/SomeInterface.html');
        });

        it('adds the type link for a linked type', () => {
            const outputs = compoDocRetrieverService.getOutputParameters({
                name: 'comp',
            } as Type<unknown>);
            expect(outputs[1].typeLink).toEqual('miscellaneous/typealiases.html#SomeType');
        });
    });
});
