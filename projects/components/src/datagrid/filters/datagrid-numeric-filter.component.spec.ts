/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import {
    DatagridFilter,
    DatagridNumericFilterComponent,
    DatagridNumericFilterConfig,
    DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES,
} from '..';
import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/test/datagrid/filter-utils';
import { fakeAsync, tick } from '@angular/core/testing';

interface HasDgNumericFilter {
    filter: DatagridFilter<[number, number], DatagridNumericFilterConfig>;
}

describe('Datagrid numeric filter', () => {
    describe('setValue', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent);
        });
        it('sets from and to when both are defined', function(this: HasDgNumericFilter): void {
            this.filter.setValue([1, 2]);
            expect(this.filter.formGroup.get('from').value).toEqual(1);
            expect(this.filter.formGroup.get('to').value).toEqual(2);
        });
        it('sets only from when to is null', function(this: HasDgNumericFilter): void {
            this.filter.setValue([1, null]);
            expect(this.filter.formGroup.get('from').value).toEqual(1);
            expect(this.filter.formGroup.get('to').value).toEqual(null);
        });
        it('sets only to when from is null', function(this: HasDgNumericFilter): void {
            this.filter.setValue([null, 2]);
            expect(this.filter.formGroup.get('from').value).toEqual(null);
            expect(this.filter.formGroup.get('to').value).toEqual(2);
        });
        it('does not set when undefined or null is passed', function(this: HasDgNumericFilter): void {
            this.filter.setValue(undefined);
            expect(this.filter.formGroup.get('from').value).toEqual(null);
            expect(this.filter.formGroup.get('to').value).toEqual(null);
            this.filter.setValue(null);
            expect(this.filter.formGroup.get('from').value).toEqual(null);
            expect(this.filter.formGroup.get('to').value).toEqual(null);
        });
    });

    describe('ClrDatagridFilterInterface.changes', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent);
        });
        it('emits when setValue is called', fakeAsync(function(this: HasDgNumericFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.setValue([1, 2]);
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
        it('emits when config is set', fakeAsync(function(this: HasDgNumericFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.config = { value: [1, 2] };
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent);
        });
        it('returns a FIQL string with gt as operator when only from is set', function(this: HasDgNumericFilter): void {
            this.filter.setValue([1, null]);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}=gt=1`);
        });
        it('returns a FIQL string with both ge and le as operators when both limits are set', function(this: HasDgNumericFilter): void {
            this.filter.setValue([1, 10]);
            expect(this.filter.getValue()).toEqual(`(${queryFieldName}=ge=1;${queryFieldName}=le=10)`);
        });
        it('returns a FIQL string with lt as operator when only to is set', function(this: HasDgNumericFilter): void {
            this.filter.setValue([null, 10]);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}=lt=10`);
        });
        it('returns a FIQL string with both ge and le as operators when both limits are 0', function(this: HasDgNumericFilter): void {
            this.filter.setValue([0, 0]);
            expect(this.filter.getValue()).toEqual(`(${queryFieldName}=ge=0;${queryFieldName}=le=0)`);
        });
    });

    describe('isActive', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent);
        });
        it('returns false when formGroup is undefined', function(this: HasDgNumericFilter): void {
            this.filter.formGroup = null;
            expect(this.filter.isActive()).toEqual(false);
        });
        it('returns false when both from and to inputs are null', function(this: HasDgNumericFilter): void {
            this.filter.setValue([null, null]);
            expect(this.filter.isActive()).toEqual(false);
        });
        it('returns true when either from or to or both inputs are defined', function(this: HasDgNumericFilter): void {
            this.filter.setValue([1, null]);
            expect(this.filter.isActive()).toEqual(true);
            this.filter.setValue([null, 1]);
            expect(this.filter.isActive()).toEqual(true);
            this.filter.setValue([1, 2]);
            expect(this.filter.isActive()).toEqual(true);
        });
        it('does not return false when inputs are 0', function(this: HasDgNumericFilter): void {
            this.filter.setValue([0, null]);
            expect(this.filter.isActive()).toEqual(true);
            this.filter.setValue([null, 0]);
            expect(this.filter.isActive()).toEqual(true);
        });
    });
});
