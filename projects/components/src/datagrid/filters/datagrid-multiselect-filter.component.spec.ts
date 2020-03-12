/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { DatagridFilter, DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES } from './datagrid-filter';
import { fakeAsync, tick } from '@angular/core/testing';
import {
    DatagridMultiSelectFilterComponent,
    DatagridMultiSelectFilterConfig,
} from './datagrid-multiselect-filter.component';
import { createDatagridFilterTestHelper, FilterTestHostComponent } from '../../utils/test/datagrid/filter-utils';

interface HasDgMultiSelectFilter {
    filter: DatagridFilter<string[], DatagridMultiSelectFilterConfig>;
}

describe('DatagridMultiSelectFilterComponent', () => {
    describe('config', () => {
        beforeEach(function(this: HasDgMultiSelectFilter): void {
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
        it('sets the filter options as list of options passed in', function(this: HasDgMultiSelectFilter): void {
            expect(this.filter.config.options[0]).toEqual({
                value: 'MA',
                display: 'Massachusetts',
            });
            expect(this.filter.config.options[1]).toEqual({
                value: 'NC',
                display: 'North Carolina',
            });
        });

        it('creates form controls that are of same number as number of options passed in', function(this: HasDgMultiSelectFilter): void {
            const formControls = Object.keys(this.filter.formGroup.getRawValue());
            expect(formControls.length).toEqual(this.filter.config.options.length);
        });

        it('creates form controls with values of options as their names', function(this: HasDgMultiSelectFilter): void {
            const formControlNames = Object.keys(this.filter.formGroup.getRawValue());
            this.filter.config.options.forEach((option, i) => expect(option.value).toEqual(formControlNames[i]));
        });
    });

    describe('setValue', () => {
        beforeEach(function(this: HasDgMultiSelectFilter): void {
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

        it('sets the form controls as true that have the same names as values passed', function(this: HasDgMultiSelectFilter): void {
            this.filter.setValue(['CA', 'NC']);
            expect(this.filter.formGroup.get('CA').value).toEqual(true);
            expect(this.filter.formGroup.get('NC').value).toEqual(true);
            expect(this.filter.formGroup.get('MA').value).toEqual(false);
        });

        // tslint:disable-next-line:max-line-length
        it('throws an error if any of the values passed does not match with names of any form controls', function(this: HasDgMultiSelectFilter): void {
            expect(() => this.filter.setValue(['CA', 'TX'])).toThrowError(
                `A multi select filter option with value 'TX' does not exist`
            );
        });
    });

    describe('ClrDatagridFilterInterface.changes', () => {
        beforeEach(function(this: HasDgMultiSelectFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridMultiSelectFilterComponent, {
                options: [
                    {
                        value: 'MA',
                        display: 'Massachusetts',
                    },
                ],
            });
        });
        it('emits when setValue is called', fakeAsync(function(this: HasDgMultiSelectFilter): void {
            const filterChanges = spyOn(this.filter.changes, 'next');
            this.filter.setValue(['MA']);
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(filterChanges).toHaveBeenCalled();
        }));
        it('emits when config is set', fakeAsync(function(this: HasDgMultiSelectFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.config = {
                options: [
                    {
                        value: 'NC',
                        display: 'Massachusetts',
                    },
                ],
                value: ['NC'],
            };
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
    });

    describe('getValue', () => {
        const queryFieldName = FilterTestHostComponent.filterColumn.queryFieldName;
        beforeEach(function(this: HasDgMultiSelectFilter): void {
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
        it('returns a FIQL with queryFieldName equalTo any of the options selected', function(this: HasDgMultiSelectFilter): void {
            this.filter.setValue(['MA', 'NC']);
            expect(this.filter.getValue()).toEqual(`${queryFieldName}==MA,${queryFieldName}==NC`);
        });
    });
});
