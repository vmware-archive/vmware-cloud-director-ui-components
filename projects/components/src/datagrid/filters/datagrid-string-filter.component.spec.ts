/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import {
    DatagridStringFilterComponent,
    DatagridStringFilterConfig,
    WildCardPosition,
} from './datagrid-string-filter.component';
import { createDatagridFilterTestHelper, DatagridFilterTestHelper } from '../../utils/test/datagrid/filter-utils';

interface HasDgStringFilter {
    filter: DatagridFilterTestHelper<string, DatagridStringFilterConfig>;
}

describe('Datagrid string filter', () => {
    describe('Component:', () => {
        beforeEach(function(this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent, 'vcd-dg-string-filter', {
                wildCardPosition: WildCardPosition.END,
                value: 'testInput-1',
            });
        });
        it('creates a formGroup as expected by the string filter', function(this: HasDgStringFilter): void {
            expect(this.filter.component.formGroup.getRawValue()).toEqual({
                filterText: 'testInput-1',
            });
        });
        it('configured with given initial value and wild card position', function(this: HasDgStringFilter): void {
            expect(this.filter.component.config.wildCardPosition).toEqual(WildCardPosition.END);
            expect(this.filter.component.config.value).toEqual('testInput-1');
        });
        it('getValue is called whenever setValue is called', function(this: HasDgStringFilter): void {
            const spy = spyOn(this.filter.component, 'getValue');
            this.filter.component.setValue('testInput-1');
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('View:', () => {
        beforeEach(function(this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent, 'vcd-dg-string-filter', {
                wildCardPosition: WildCardPosition.END,
            });
        });
        it('filter changes is triggered whenever the input is changed', function(this: HasDgStringFilter): void {
            const spy = spyOn(this.filter.component, 'getValue').and.callThrough();
            this.filter.enterInput('testInput-1');
            expect(spy).toHaveBeenCalled();
            expect(this.filter.component.getValue()).toEqual('queryFieldName==testInput-1*');
        });
    });
});
