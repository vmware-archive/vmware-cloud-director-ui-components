/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { fakeAsync, tick } from '@angular/core/testing';
import { createDatagridFilterTestHelper } from '../../utils/test/datagrid/filter-utils';
import { DatagridFilter, DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES } from './datagrid-filter';
import { DatagridSelectFilterComponent } from './datagrid-select-filter.component';
import { DatagridStringFilterComponent, WildCardPosition } from './datagrid-string-filter.component';
import { HasDgStringFilter } from './datagrid-string-filter.component.spec';

/**
 * Tests for the DatagridFilter base class use the sub class DatagridStringFilterComponent instead of writing a dummy
 * implementation
 */
describe('DatagridFilter', () => {
    describe('config', () => {
        beforeEach(function (this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent, {
                wildCardPosition: WildCardPosition.END,
            });
        });
        it('configures the filter wildCardPosition as WildCardPosition.END', function (this: HasDgStringFilter): void {
            expect(this.filter.config.wildCardPosition).toEqual(WildCardPosition.END);
        });
    });
    describe('ClrDatagridFilterInterface.changes', () => {
        beforeEach(function (this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent);
        });
        it('emits when setValue is called', fakeAsync(function (this: HasDgStringFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.setValue('test-input');
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
        it('emits when config is set', fakeAsync(function (this: HasDgStringFilter): void {
            const spy = spyOn(this.filter.changes, 'next');
            this.filter.config = { value: 'test-input' };
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(spy).toHaveBeenCalled();
        }));
    });
    describe('debounceChanges', () => {
        it('delays emission of changes by 300 ms when filter value is set', fakeAsync(() => {
            const filter = createDatagridFilterTestHelper(DatagridStringFilterComponent);
            const filterChanges = spyOn(filter.changes, 'next');
            filter.setValue('test-input');
            expect(filterChanges).not.toHaveBeenCalled();
            tick(DEBOUNCE_TIME_FOR_GRID_FILTER_CHANGES);
            expect(filterChanges).toHaveBeenCalled();
        }));
        // Using select filter for this test as it has debounce time as 0
        it('does not delay the emission of changes when debounce time is 0', () => {
            const filter = createDatagridFilterTestHelper(DatagridSelectFilterComponent, {
                options: [{ value: 30, display: 'Thirty' }],
            });
            const filterChanges = spyOn(filter.changes, 'next');
            filter.setValue(30);
            expect(filterChanges).toHaveBeenCalled();
        });
    });
    describe('onBeforeSetConfig', () => {
        beforeEach(function (this: HasDgStringFilter): void {
            this.filter = createDatagridFilterTestHelper(DatagridStringFilterComponent);
        });
        it('gets called with config as parameter when config is set', function (this: HasDgStringFilter): void {
            const onBeforeSetconfigSpy = spyOn<any>(this.filter, 'onBeforeSetConfig');
            this.filter.config = {
                wildCardPosition: WildCardPosition.END,
            };
            expect(onBeforeSetconfigSpy).toHaveBeenCalledWith({
                wildCardPosition: WildCardPosition.END,
            });
        });
    });
});
