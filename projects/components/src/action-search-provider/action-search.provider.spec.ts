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
    beforeEach(function(this: HasActionSearchProvider): void {
        this.actionSearchProvider = new ActionSearchProvider(new MockTranslationService());
    });
    describe('actions', () => {
        it('when set, the search method will give the action that matches with the search' + ' text', async function(
            this: HasActionSearchProvider
        ): Promise<void> {
            const searchResults = await this.actionSearchProvider.search('sta');
            expect(searchResults.items).toEqual([]);
            this.actionSearchProvider.actions = getMockActionsList();
            const searchResults2 = await this.actionSearchProvider.search('sta');
            expect(searchResults2.items[0].displayText).toEqual('Start');
            const searchResults1 = await this.actionSearchProvider.search('sto');
            expect(searchResults1.items[0].displayText).toEqual('Stop');
        });
    });

    describe('selectedEntities', () => {
        it(
            'when set with an entity that will yield ActionItem.availability as false, the search method does not return the ActionItem' +
                ' as it is unavailable',
            async function(this: HasActionSearchProvider): Promise<void> {
                this.actionSearchProvider.actions = getMockActionsList();

                let searchResults = await this.actionSearchProvider.search('sto');
                expect(searchResults.items[0].displayText).toEqual('Stop');

                this.actionSearchProvider.selectedEntities = [
                    {
                        stopped: true,
                    },
                ];
                searchResults = await this.actionSearchProvider.search('sto');
                expect(searchResults.items).toEqual([]);
            }
        );
    });

    describe('pause and unpause', () => {
        it(
            'when pause is not called by default, search returns a promise which is resolved without having to' +
                'call unpause',
            async function(this: HasActionSearchProvider): Promise<void> {
                this.actionSearchProvider.actions = getMockActionsList();
                let searchResultsBeforePausing;
                searchResultsBeforePausing = await this.actionSearchProvider.search('sta');
                expect(searchResultsBeforePausing.items[0].displayText).toEqual('Start');
            }
        );
        it(
            'when pause method is called, search returns a promise which is not resolved until unpause' + 'is called',
            async function(this: HasActionSearchProvider): Promise<void> {
                this.actionSearchProvider.actions = getMockActionsList();
                const unpauseAfter1second = (): void => {
                    setTimeout(() => {
                        this.actionSearchProvider.unPause();
                    }, 1000);
                };
                const checkResultsAfter500ms = (): void => {
                    setTimeout(() => {
                        expect(searchResultsAfterPausing).toEqual(undefined);
                    }, 500);
                };

                const checkResultsAfter1second = (): void => {
                    setTimeout(() => {
                        expect(searchResultsAfterPausing.items[0].displayText).toEqual('Start');
                    }, 1000);
                };

                this.actionSearchProvider.pause();
                unpauseAfter1second();
                checkResultsAfter500ms();
                checkResultsAfter1second();
                const searchResultsAfterPausing = await this.actionSearchProvider.search('sta');
            }
        );
    });
});
