/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WidgetFinder } from '../widget-object';
import { ClrDatagridWidgetObject } from './datagrid.wo';
import {
    DatagridFilter,
    DatagridModule,
    FilterComponentRendererSpec,
    GridColumn,
    GridDataFetchResult,
} from '../../../datagrid';
import { MockRecord } from '../../../datagrid/mock-data';
import { MockTranslationService, TranslationService } from '@vcd/i18n';

/**
 * Used inside beforeEach functions of filter tests and it does the following:
 * - Creates a testing module with {@link FilterTestHostComponent} that has only single column for filter testing
 * - Sets the filter on the column of host component({@link FilterTestHostComponent})
 * - Opens the filter and returns a component instance of the filter created
 *
 * @param filterType to be created in the test host component grid's column
 * @param config The configuration for the filter
 *
 * Example:
 * beforeEach(function(this: HasDgStringFilter): void {
 *     this.filter = createDatagridFilterTestHelper(
 *         DatagridStringFilterComponent,
 *         { wildCardPosition: WildCardPosition.END, value: 'testInput-1' }
 *     );
 * });
 */
export function createDatagridFilterTestHelper<V, C>(
    filterType: Type<DatagridFilter<V, C>>,
    config?: C
): DatagridFilter<V, C> {
    TestBed.configureTestingModule({
        imports: [DatagridModule],
        declarations: [FilterTestHostComponent],
        providers: [
            {
                provide: TranslationService,
                useClass: MockTranslationService,
            },
        ],
    }).compileComponents();

    // Add the filter to grid column
    const finder = new WidgetFinder(FilterTestHostComponent);
    const grid = finder.find(ClrDatagridWidgetObject);
    finder.hostComponent.setFilter(filterType, finder, config || ({} as C));

    return grid.getFilter(filterType);
}

/**
 * TestHostComponent that has only single column for filter testing.
 */
@Component({
    template: `
        <vcd-datagrid [gridData]="gridData" [columns]="[column]"></vcd-datagrid>
    `,
})
export class FilterTestHostComponent {
    /**
     * Made static so that it can be called in filter unit tests to make sure the FIQL string outputs have the queryFieldName
     * value given in the column definition below
     */
    static filterColumn: GridColumn<any> = {
        displayName: 'Filter',
        renderer: 'Does not matter',
        queryFieldName: 'queryFieldName',
    };
    /**
     * Used inside the html template
     */
    column = FilterTestHostComponent.filterColumn;

    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    /**
     * Creates the filterRendererSpec and adds it to the grid column above
     */
    setFilter<V, C>(
        filterType: Type<DatagridFilter<V, C>>,
        finder: WidgetFinder<FilterTestHostComponent>,
        config: C
    ): void {
        this.column.filterRendererSpec = FilterComponentRendererSpec({ type: filterType, config });
        finder.detectChanges();
    }
}
