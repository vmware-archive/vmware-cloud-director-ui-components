/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { fakeAsync, tick } from '@angular/core/testing';
import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/test/datagrid/filter-utils';
import { DatagridFilter, DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES } from './datagrid-filter';
import { DatagridSelectFilterComponent, DatagridSelectFilterConfig } from './datagrid-select-filter.component';

interface HasDgSelectFilter {
    filter: DatagridFilter<string | number, DatagridSelectFilterConfig>;
}

describe('Datagrid select filter', () => {
    describe('config', () => {
        beforeEach(function(this: HasDgSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                options: [
                    {
                        value: 30,
                        display: 'Thirty',
                    },
                    {
                        value: 60,
                        display: 'sixty',
                    },
                ],
            });
        });
        it('configures the filter options as list of options passed in', function(this: HasDgSelectFilter): void {
            expect(this.filter.config.options[0]).toEqual({
                value: 30,
                display: 'Thirty',
            });
            expect(this.filter.config.options[1]).toEqual({
                value: 60,
                display: 'sixty',
            });
        });
    });

    describe('setValue', () => {
        beforeEach(function(this: HasDgSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                options: [
                    {
                        value: 30,
                        display: 'Thirty',
                    },
                    {
                        value: 60,
                        display: 'sixty',
                    },
                ],
            });
        });
        it('sets the select formControl with the value passed in', function(this: HasDgSelectFilter): void {
            this.filter.setValue(60);
            expect(this.filter.formGroup.get('filterSelect').value).toEqual(60);
        });
        it('throws an error when a value that is not in the list of options is passed', function(this: HasDgSelectFilter): void {
            expect(() => this.filter.setValue('test-input')).toThrowError(
                'The value being set on select filter is not equal to any of the options'
            );
        });
    });

    describe('ClrDatagridFilterInterface.changes', () => {
        beforeEach(function(this: HasDgSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                options: [
                    {
                        value: 30,
                        display: 'Thirty',
                    },
                    {
                        value: 60,
                        display: 'sixty',
                    },
                ],
            });
        });
        it('emits when setValue is called', fakeAsync(function(this: HasDgSelectFilter): void {
            const filterChanges = spyOn(this.filter.changes, 'next');
            this.filter.setValue(30);
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(filterChanges).toHaveBeenCalled();
        }));
        it('emits when config is set', fakeAsync(function(this: HasDgSelectFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.config = {
                options: [
                    {
                        value: 30,
                        display: 'Thirty',
                    },
                ],
                value: 30,
            };
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function(this: HasDgSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                options: [
                    {
                        value: 30,
                        display: 'Thirty',
                    },
                    {
                        value: 60,
                        display: 'sixty',
                    },
                ],
            });
        });
        it('returns a FIQL string with queryFieldName equalTo selectedValue', function(this: HasDgSelectFilter): void {
            this.filter.setValue(30);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==30`);
        });
    });

    describe('when customFiql is set to be true', () => {
        beforeEach(function(this: HasDgSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                customFiql: true,
                options: [
                    {
                        display: 'Option 1',
                        value: 'field1==false;field2==true',
                    },
                    {
                        display: 'Option 2',
                        value: '(field1=ge=1;field2=le=10)',
                    },
                ],
            });
        });
        describe('getValue', () => {
            it('returns value of the selected option without converting to FIQL', function(this: HasDgSelectFilter): void {
                const customFiqlOptionValue = '(field1=ge=1;field2=le=10)';
                this.filter.setValue(customFiqlOptionValue);
                expect(this.filter.getValue()).toEqual(customFiqlOptionValue);
            });
        });
    });
});
