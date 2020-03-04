/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { WidgetFinder } from '../widget-object';
import { ClrDatagridWidgetObject } from './datagrid.wo';
import { Component, Type } from '@angular/core';
import {
    ComponentRendererConstructor,
    DatagridFilter,
    DatagridModule,
    GridColumn,
    GridDataFetchResult,
    RendererSpec,
} from '../../../datagrid';
import { TestBed } from '@angular/core/testing';
import { MockRecord } from '../../../datagrid/mock-data';
import { By } from '@angular/platform-browser';

/**
 * Returned by the {@link createDatagridFilterTestHelper} to help grid filters tests to access the filter component
 * and provide API to interact with underlying HTML elements
 */
export interface DatagridFilterTestHelper<V, C> {
    /**
     * The filter component instance
     */
    component: DatagridFilter<V, C>;
    /**
     * To enter input into the form fields of a filter
     * @param value to be entered into filter input
     * @param inputCssSelector for querying a specific input element from the filter UI widget
     */
    enterInput: (value: string, inputCssSelector?: string) => void;
}

/**
 * Used inside beforeEach function and does the following:
 * -Creates a testing module with {@link FilterTestHostComponent} that has only single column for filter testing
 * -Adds the filter to grid column({@link FilterTestHostComponent.column})
 * -Opens the filter and returns an object of {@link DatagridFilterTestHelper} type
 *
 * @param filterType to be created in the test host component grid's column
 * @param tagName The component selector of the filter being created. Used for Querying the filter element.
 * @param config The configuration for the filter
 *
 * Example:
 * beforeEach(function(this: HasDgStringFilter): void {
 *          this.filter = createDatagridFilterTestHelper(
 *              DatagridStringFilterComponent,
 *              'vcd-dg-string-filter',
 *              { wildCardPosition: WildCardPosition.END, value: 'testInput-1' }
 *          );
 *  });
 */
export function createDatagridFilterTestHelper<V, C>(
    filterType: Type<DatagridFilter<V, C>>,
    tagName: string,
    config?: C
): DatagridFilterTestHelper<V, C> {
    // Create testbed
    TestBed.configureTestingModule({
        imports: [DatagridModule],
        declarations: [FilterTestHostComponent],
    }).compileComponents();

    // Add the filter to grid column
    const finder = new WidgetFinder(FilterTestHostComponent);
    const grid = finder.find(ClrDatagridWidgetObject);
    finder.hostComponent.setFilter(filterType, finder, config || ({} as C));
    const filterDebugEl = grid.getFilter(tagName);

    function enterInput(value: string, cssSelector?: string): void {
        const cssQuery = By.css(cssSelector ? cssSelector : 'input');
        const filterInput: HTMLInputElement = filterDebugEl.query(cssQuery).nativeElement;
        filterInput.value = value;
        filterInput.dispatchEvent(new Event('input'));
        finder.detectChanges();
    }

    return {
        component: filterDebugEl.componentInstance,
        enterInput,
    };
}

/**
 * TestHostComponent that has only single column for filter testing.
 */
@Component({
    template: `
        <vcd-datagrid [gridData]="gridData" [columns]="[column]"></vcd-datagrid>
    `,
})
class FilterTestHostComponent {
    gridData: GridDataFetchResult<MockRecord> = {
        items: [],
    };

    column: GridColumn<any> = {
        displayName: 'Filter',
        renderer: 'Does not matter',
        queryFieldName: 'queryFieldName',
    };

    /**
     * Creates the filterRendererSpec and adds it to the column above
     */
    setFilter<V, C>(
        filterType: Type<DatagridFilter<V, C>>,
        finder: WidgetFinder<FilterTestHostComponent>,
        config: C
    ): void {
        this.column.filterRendererSpec = RendererSpec({ type: filterType as ComponentRendererConstructor<C>, config });
        finder.detectChanges();
    }
}
