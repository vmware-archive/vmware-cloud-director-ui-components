/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/test/datagrid/filter-utils';
import { DatagridFilter } from './datagrid-filter';
import { DatagridSelectFilterComponent, DatagridSelectFilterConfig } from './datagrid-select-filter.component';

interface HasDgSelectFilter {
    filter: DatagridFilter<string | number, DatagridSelectFilterConfig>;
}

describe('Datagrid select filter', () => {
    describe('setValue', () => {
        beforeEach(function (this: HasDgSelectFilter): void {
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
        it('sets the select formControl with the value passed in', function (this: HasDgSelectFilter): void {
            this.filter.setValue(60);
            expect(this.filter.formGroup.get('filterSelect').value).toEqual(60);
        });
        it('throws an error when a value that is not in the list of options is passed', function (this: HasDgSelectFilter): void {
            expect(() => this.filter.setValue('test-input')).toThrowError(
                'The value being set on select filter is not equal to any of the options'
            );
        });
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function (this: HasDgSelectFilter): void {
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
        it('returns a FIQL string with queryFieldName equalTo selectedValue', function (this: HasDgSelectFilter): void {
            this.filter.setValue(30);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==30`);
        });
    });

    describe('when customFiql is set to be true', () => {
        beforeEach(function (this: HasDgSelectFilter): void {
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
            it('returns value of the selected option without converting to FIQL', function (this: HasDgSelectFilter): void {
                const customFiqlOptionValue = '(field1=ge=1;field2=le=10)';
                this.filter.setValue(customFiqlOptionValue);
                expect(this.filter.getValue()).toEqual(customFiqlOptionValue);
            });
        });
    });
});
