/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DatagridFilter } from './datagrid-filter';
import {
    DatagridMultiSelectFilterComponent,
    DatagridMultiSelectFilterConfig,
} from './datagrid-multiselect-filter.component';
import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/filter-utils';

interface HasDgMultiSelectFilter {
    filter: DatagridFilter<string[], DatagridMultiSelectFilterConfig>;
}

describe('DatagridMultiSelectFilterComponent', () => {
    describe('setValue', () => {
        beforeEach(function (this: HasDgMultiSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridMultiSelectFilterComponent, {
                options: [
                    {
                        value: 'CA',
                        display: 'California',
                    },
                    {
                        value: 'MA',
                        display: 'Massachusetts',
                    },
                    {
                        value: 'NC',
                        display: 'North Carolina',
                    },
                ],
            });
        });

        it('sets the form controls as true that have the same names as values passed', function (this: HasDgMultiSelectFilter): void {
            this.filter.setValue(['CA', 'NC']);
            expect(this.filter.formGroup.get('CA').value).toEqual(true);
            expect(this.filter.formGroup.get('NC').value).toEqual(true);
            expect(this.filter.formGroup.get('MA').value).toEqual(false);
        });

        // eslint-disable-next-line max-len
        it('throws an error if any of the values passed does not match with names of any form controls', function (this: HasDgMultiSelectFilter): void {
            expect(() => this.filter.setValue(['CA', 'TX'])).toThrowError(
                `A multi select filter option with value 'TX' does not exist`
            );
        });
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function (this: HasDgMultiSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridMultiSelectFilterComponent, {
                options: [
                    {
                        value: 'MA',
                        display: 'Massachusetts',
                    },
                    {
                        value: 'NC',
                        display: 'North Carolina',
                    },
                ],
            });
        });
        it('returns a FIQL with queryFieldName equalTo any of the options selected', function (this: HasDgMultiSelectFilter): void {
            this.filter.setValue(['MA', 'NC']);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==MA,${queryFieldName}==NC`);
        });
    });
});
