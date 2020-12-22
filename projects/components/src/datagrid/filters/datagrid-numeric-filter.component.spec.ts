/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { NumberWithUnitFormInputWidgetObject } from '../../form/number-with-unit-input/number-with-unit-form-input.widget-object';
import {
    createDatagridFilterTestHelper,
    createDatagridFilterTestHelperWithFinder,
    FilterTestHostComponent,
} from '../../utils/test/datagrid/filter-utils';
import { AngularWidgetObjectFinder } from '../../utils/test/widget-object/angular-widget-finder';
import { Bytes } from '../../utils/unit/unit';
import { DatagridFilter } from './datagrid-filter';
import {
    DatagridNumericFilter,
    DatagridNumericFilterComponent,
    DatagridNumericFilterConfig,
} from './datagrid-numeric-filter.component';

interface HasDgNumericFilter {
    filter: DatagridFilter<[number, number], DatagridNumericFilterConfig>;
}

interface HasFinderAndFilter {
    finder: AngularWidgetObjectFinder;
    filter: DatagridFilter<[number, number], DatagridNumericFilterConfig>;
}

describe('Datagrid numeric filter', () => {
    describe('DatagridNumericFilter factory function', () => {
        it('simplifies the creation of filters', () => {
            const newFilter = DatagridNumericFilter([1, 2]);
            expect(newFilter.config.value).toEqual([1, 2]);
        });
    });

    describe('set unitOptions', () => {
        beforeEach(function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent, {
                unitOptions: [...Bytes.types],
            });
        });
        it('sets the unit options with value given', function(this: HasDgNumericFilter): void {
            expect((this.filter as DatagridNumericFilterComponent).unitOptions).toEqual([...Bytes.types]);
        });

        it('sets the base unit with value of first option when no base unit is set', function(this: HasDgNumericFilter): void {
            expect((this.filter as DatagridNumericFilterComponent).unit).toEqual([...Bytes.types][0]);
        });
    });

    describe('unit', () => {
        it('sets the base unit with value given in config', function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent, {
                unitOptions: [...Bytes.types],
                unit: Bytes.GB,
            });
            expect((this.filter as DatagridNumericFilterComponent).unit).toEqual(Bytes.GB);
        });

        it('sets the base unit with value of first option when null is passed in the config', function(this: HasDgNumericFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent, {
                unitOptions: [...Bytes.types],
                unit: null,
            });
            expect((this.filter as DatagridNumericFilterComponent).unit).toEqual(Bytes.B);
        });
    });

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

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        describe('without units', () => {
            beforeEach(function(this: HasDgNumericFilter): void {
                this.filter = createDatagridFilterTestHelper(DatagridNumericFilterComponent);
            });
            it('returns a FIQL string with gt as operator when only from is set', function(this: HasDgNumericFilter): void {
                this.filter.setValue([1, null]);
                expect(this.filter.getValue()).toEqual(`${queryFieldName}=gt=1`);
            });
            // tslint:disable-next-line: max-line-length
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
        describe('with units', () => {
            beforeEach(function(this: HasFinderAndFilter): void {
                const finderAndFilter = createDatagridFilterTestHelperWithFinder(DatagridNumericFilterComponent, {
                    unitOptions: [...Bytes.types],
                    unit: Bytes.MB,
                });
                this.finder = finderAndFilter.finder;
                this.filter = finderAndFilter.filter;
            });
            it('returns a FIQL string with values converted to base unit of MB from selected unit of ' + 'GB', function(
                this: HasFinderAndFilter
            ): void {
                const [fromValInGb, toValInGb] = [1, 10];
                const [fromValInMb, toValInMb] = [1024, 10240];
                this.filter.setValue([fromValInGb, toValInGb]);
                const filter = this.filter as DatagridNumericFilterComponent;
                filter.fromInput.onUnitChange(Bytes.GB.getMultiplier().toString());
                filter.toInput.onUnitChange(Bytes.GB.getMultiplier().toString());
                expect(this.filter.getValue()).toEqual(
                    `(${queryFieldName}=ge=${fromValInMb};${queryFieldName}=le=${toValInMb})`
                );
            });
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
