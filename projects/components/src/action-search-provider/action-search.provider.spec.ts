/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { MockTranslationService } from '@vcd/i18n';
import { ActionItem } from '../common/interfaces';
import { ActionSearchProvider } from './action-search.provider';

interface HasActionSearchProvider {
    actionSearchProvider: ActionSearchProvider<any, any>;
}

interface MockRecord {
    stopped: boolean;
}

const getMockActionsList = (): ActionItem<MockRecord, any>[] => [
    {
        textKey: 'Contextual 1',
        handler: () => null,
        isTranslatable: false,
    },
    {
        textKey: 'power.actions',
        children: [
            {
                textKey: 'Start',
                handler: () => null,
                availability: (records?) => (records[0] ? records[0].stopped : true),
                isTranslatable: false,
            },
            {
                textKey: 'Stop',
                handler: () => null,
                availability: (records?) => (records[0] ? !records[0].stopped : true),
                isTranslatable: false,
            },
        ],
    },
];

describe('ActionSearchProvider', () => {
    beforeEach(function (this: HasActionSearchProvider): void {
        this.actionSearchProvider = new ActionSearchProvider(new MockTranslationService());
    });
    describe('actions', () => {
        it('when set, the search method will give the action that matches with the search' + ' text', function (
            this: HasActionSearchProvider
        ): void {
            const searchResults = this.actionSearchProvider.search('sta');
            expect(searchResults.items).toEqual([]);
            this.actionSearchProvider.actions = getMockActionsList();
            const searchResults2 = this.actionSearchProvider.search('sta');
            expect(searchResults2.items[0].displayText).toEqual('Start');
            const searchResults1 = this.actionSearchProvider.search('sto');
            expect(searchResults1.items[0].displayText).toEqual('Stop');
        });
    });

    describe('selectedEntities', () => {
        it(
            'when set with an entity that will yield ActionItem.availability as false, the search method does not return the ActionItem' +
                ' as it is unavailable',
            function (this: HasActionSearchProvider): void {
                this.actionSearchProvider.actions = getMockActionsList();

                let searchResults = this.actionSearchProvider.search('sto');
                expect(searchResults.items[0].displayText).toEqual('Stop');

                this.actionSearchProvider.selectedEntities = [
                    {
                        stopped: true,
                    },
                ];
                searchResults = this.actionSearchProvider.search('sto');
                expect(searchResults.items).toEqual([]);
            }
        );
    });
});
