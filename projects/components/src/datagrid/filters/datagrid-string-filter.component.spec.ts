/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/test/datagrid/filter-utils';
import { DatagridFilter } from './datagrid-filter';
import {
    DatagridStringFilter,
    DatagridStringFilterComponent,
    DatagridStringFilterConfig,
    WildCardPosition,
} from './datagrid-string-filter.component';

export interface HasDgStringFilter {
    filter: DatagridFilter<string, DatagridStringFilterConfig>;
}

describe('Datagrid string filter', () => {
    describe('DatagridStringFilter factory function', () => {
        it('simplifies the creation of filters', () => {
            const newFilter = DatagridStringFilter(WildCardPosition.END, '');
            expect(newFilter.config.wildCardPosition).toEqual(WildCardPosition.END);
            expect(newFilter.config.value).toEqual('');
        });
    });

    describe('setValue', () => {
        beforeEach(function(this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent);
        });
        it('sets filterText input with the text passed in', function(this: HasDgStringFilter): void {
            this.filter.setValue('test-input');
            expect(this.filter.formGroup.get('filterText').value).toEqual('test-input');
        });
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function(this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent, {
                wildCardPosition: WildCardPosition.END,
            });
        });
        it('throws an error when query field is undefined', function(this: HasDgStringFilter): void {
            this.filter.config = {
                wildCardPosition: WildCardPosition.END,
            };
            expect(() => this.filter.getValue()).toThrowError('Query field is not specified');
        });
        it('returns a FIQL string with equalTo operator and * added at the end of filter input', function(this: HasDgStringFilter): void {
            this.filter.setValue('test-input');
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==test-input*`);
        });
        // tslint:disable-next-line:max-line-length
        it('returns a FIQL string with equalTo operator and * added at the beginning of filter input', function(this: HasDgStringFilter): void {
            this.filter.config = {
                ...this.filter.config,
                wildCardPosition: WildCardPosition.START,
            };
            this.filter.setValue('test-input');
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==*test-input`);
        });
    });
});
