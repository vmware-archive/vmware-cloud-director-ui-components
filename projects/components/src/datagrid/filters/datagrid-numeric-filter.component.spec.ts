/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { DatagridNumericFilterComponent, DatagridNumericFilterConfig } from '..';
import { createDatagridFilterTestHelper, DatagridFilterTestHelper } from '../../utils/test/datagrid/filter-utils';

interface HasDgNumericFilter {
    filter: DatagridFilterTestHelper<[number, number], DatagridNumericFilterConfig>;
}

describe('Datagrid numeric filter', () => {
    describe('Component:', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent, 'vcd-dg-numeric-filter', {
                value: [null, 10],
            });
        });
        it('creates a formGroup as expected by the numeric filter', function(this: HasDgNumericFilter): void {
            expect(this.filter.component.formGroup.getRawValue()).toEqual({
                from: null,
                to: 10,
            });
        });
        it('configured with given initial value', function(this: HasDgNumericFilter): void {
            expect(this.filter.component.config.value).toEqual([null, 10]);
        });
        it('getValue is called whenever setValue is called', function(this: HasDgNumericFilter): void {
            const spy = spyOn(this.filter.component, 'getValue');
            this.filter.component.setValue([1, 10]);
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('View:', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent, 'vcd-dg-numeric-filter');
        });
        it('filter changes is triggered whenever the input is changed', function(this: HasDgNumericFilter): void {
            const spy = spyOn(this.filter.component, 'getValue').and.callThrough();
            this.filter.enterInput('1', '.from-input');
            expect(spy).toHaveBeenCalled();
        });
        it('gives a FIQL string with gt as operator when only lower limit is entered', function(this: HasDgNumericFilter): void {
            this.filter.enterInput('1', '.from-input');
            expect(this.filter.component.getValue()).toEqual('queryFieldName=gt=1');
        });
        it('gives a FIQL string with both ge and le as operators when both limits are entered', function(this: HasDgNumericFilter): void {
            this.filter.enterInput('1', '.from-input');
            this.filter.enterInput('10', '.to-input');
            expect(this.filter.component.getValue()).toEqual('(queryFieldName=ge=1;queryFieldName=le=10)');
        });
        it('gives a FIQL string with lt as operator when only upper limit is entered', function(this: HasDgNumericFilter): void {
            this.filter.enterInput('10', '.to-input');
            expect(this.filter.component.getValue()).toEqual('queryFieldName=lt=10');
        });
    });
});
