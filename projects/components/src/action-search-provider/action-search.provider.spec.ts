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

const getMockActionsList1 = (): ActionItem<MockRecord, any>[] => ([
    {
        textKey: 'Contextual 1',
        handler: () => null,
        isTranslatable: false
    },
    {
        textKey: 'power.actions',
        children: [
            {
                textKey: 'Start',
                handler: () => null,
                availability: (records?) => records[0] ? records[0].stopped : true,
                isTranslatable: false
            },
            {
                textKey: 'Stop',
                handler: () => null,
                availability: (records?) => records[0] ? !records[0].stopped : true,
                isTranslatable: false
            },
        ],
    },
]);

describe('ActionSearchProvider', () => {
    beforeEach(function(this: HasActionSearchProvider): void {
        this.actionSearchProvider = new ActionSearchProvider(
            new MockTranslationService()
        );
    });
    describe('actions', () => {
        it('when set, the search method will give the action that matches with the search' +
            ' text', function(this: HasActionSearchProvider): void {
            const searchResultList = this.actionSearchProvider.search('sta');
            expect(searchResultList).toEqual([]);
            this.actionSearchProvider.actions = getMockActionsList1();
            const searchResultList2 = this.actionSearchProvider.search('sta');
            expect(searchResultList2[0].displayText).toEqual('Start');
            const searchResultList1 = this.actionSearchProvider.search('sto');
            expect(searchResultList1[0].displayText).toEqual('Stop');
        });
    });

    describe('selectedEntities', () => {
        it('when set with an entity whose stopped property is true, the search method does not give Stop action as' +
            ' a result as it is unavailable', function(this: HasActionSearchProvider): void {
            this.actionSearchProvider.actions = getMockActionsList1();

            let searchResultList = this.actionSearchProvider.search('sto');
            expect(searchResultList[0].displayText).toEqual('Stop');

            this.actionSearchProvider.selectedEntities = [{
                stopped: true
            }];
            searchResultList = this.actionSearchProvider.search('sto');
            expect(searchResultList).toEqual([]);
        });

        it('when set with an entity whose stopped property is false, the search method does not give Start action as' +
            ' a result as it is unavailable', function(this: HasActionSearchProvider): void {
            this.actionSearchProvider.actions = getMockActionsList1();

            let searchResultList = this.actionSearchProvider.search('sta');
            expect(searchResultList[0].displayText).toEqual('Start');

            this.actionSearchProvider.selectedEntities = [{
                stopped: false
            }];
            searchResultList = this.actionSearchProvider.search('sta');
            expect(searchResultList).toEqual([]);
        });
    });
});
