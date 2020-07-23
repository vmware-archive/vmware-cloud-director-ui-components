/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { MockTranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces/index';
import { SpotlightSearchService } from '../spotlight-search/index';
import { ActionSearchProvider } from './action-search.provider';

interface HasActionSearchProvider {
    actionSearchProvider: ActionSearchProvider<any, any>;
}

const MOCK_DATA: ActionItem<any, any>[] = [
    {
        textKey: 'Contextual 1',
        handler: () => console.log('Contextual 1'),
    },
    {
        textKey: 'power.actions',
        children: [
            {
                textKey: 'Start',
                handler: () => console.log('Starting '),
            },
            {
                textKey: 'Stop',
                handler: () => console.log('Stopping '),
            },
        ],
    },
];

describe('ActionSearchProvider', () => {
    beforeEach(function(this: HasActionSearchProvider): void {
        this.actionSearchProvider = new ActionSearchProvider(
            new SpotlightSearchService(),
            new MockTranslationService()
        );
    });
    describe('actions', () => {
        it('updates the flattened list of available actions when set', function(this: HasActionSearchProvider): void {
            expect((this.actionSearchProvider as any).flatListOfAvailableActions).toEqual([]);
            this.actionSearchProvider.actions = MOCK_DATA;
            expect((this.actionSearchProvider as any).flatListOfAvailableActions).toEqual(
                (this.actionSearchProvider as any).getFlatListOfAvailableActions(MOCK_DATA)
            );
        });
    });

    describe('selectedEntities', () => {
        it('calls the updateFlatListOfAvailableActions method when set', function(this: HasActionSearchProvider): void {
            const spy = spyOn(this.actionSearchProvider as any, 'updateFlatListOfAvailableActions').and.callFake(
                () => null
            );
            this.actionSearchProvider.selectedEntities = [];
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('actionProviderName', () => {
        it('calls the register method when set', function(this: HasActionSearchProvider): void {
            const spy = spyOn(this.actionSearchProvider, 'register').and.callFake(() => null);
            this.actionSearchProvider.actionProviderName = 'blah';
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('register', () => {
        it('calls the registerProvider method of spotlight search service', function(this: HasActionSearchProvider): void {
            const spy = spyOn((this.actionSearchProvider as any).spotlightSearchService, 'registerProvider');
            this.actionSearchProvider.register();
            expect(spy).toHaveBeenCalledWith(
                this.actionSearchProvider,
                '{"key":"vcd.cc.action.provider.section.title","params":[{"actionProviderName":""}]}'
            );
        });

        it(
            'calls the registerProvider method of spotlight search service if registration id exists' + ' already',
            function(this: HasActionSearchProvider): void {
                const spy = spyOn((this.actionSearchProvider as any).spotlightSearchService, 'unregisterProvider');
                (this.actionSearchProvider as any).spotlightSearchProviderRegistrationId = 'some_id';
                this.actionSearchProvider.register();
                expect(spy).toHaveBeenCalled();
            }
        );
    });

    describe('unregister', () => {
        it('calls the registerProvider method of spotlight search service', function(this: HasActionSearchProvider): void {
            const spy = spyOn((this.actionSearchProvider as any).spotlightSearchService, 'unregisterProvider');
            (this.actionSearchProvider as any).spotlightSearchProviderRegistrationId = 'some_id';
            this.actionSearchProvider.unregister();
            expect(spy).toHaveBeenCalled();
        });
    });
});
