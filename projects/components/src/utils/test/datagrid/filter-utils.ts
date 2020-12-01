/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import {
    DatagridFilter,
    FilterComponentRendererSpec,
    GridColumn,
    GridDataFetchResult,
    VcdDatagridModule,
} from '../../../datagrid';
import { MockRecord } from '../../../datagrid/mock-data';
import { IdGenerator } from '../../id-generator/id-generator';
import { WidgetFinder } from '../widget-object';
import { AngularWidgetObjectFinder } from '../widget-object/angular-widget-finder';
import { TestElement } from '../widget-object/angular-widget-object';
import { ClrDatagridWidgetObject } from './datagrid.wo';

function getFilter<V, C>(element: TestElement, filterType: Type<DatagridFilter<V, C>>): DatagridFilter<V, C> {
    return element.elements[0].parent.parent.parent.query(By.directive(filterType)).componentInstance;
}

/**
 * Creates a testing module with {@link FilterTestHostComponent} that has only single column for filter testing
 */
async function configureTestingModule(): Promise<void> {
    await TestBed.configureTestingModule({
        imports: [VcdDatagridModule],
        declarations: [FilterTestHostComponent],
        providers: [
            {
                provide: TranslationService,
                useClass: MockTranslationService,
            },
            {
                provide: IdGenerator,
                useValue: new IdGenerator('vcd-id'),
            },
        ],
    }).compileComponents();
}

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
    configureTestingModule();

    // Add the filter to grid column
    const wf = new WidgetFinder(FilterTestHostComponent);

    const finder = new AngularWidgetObjectFinder(FilterTestHostComponent);
    const grid = finder.find(ClrDatagridWidgetObject);

    wf.hostComponent.setFilter(filterType, wf, config || ({} as C));
    grid.clrDatagrid.fixture.detectChanges();
    grid.getFilterToggle().click();
    return getFilter(grid.clrDatagrid, filterType);
}

/**
 * Same as the above function but used for tests which need finder
 */
export function createDatagridFilterTestHelperWithFinder<V, C>(
    filterType: Type<DatagridFilter<V, C>>,
    config?: C
): { finder: WidgetFinder; filter: DatagridFilter<V, C> } {
    configureTestingModule();

    // Add the filter to grid column
    const wf = new WidgetFinder(FilterTestHostComponent);
    const finder = new AngularWidgetObjectFinder(FilterTestHostComponent);
    const grid = finder.find(ClrDatagridWidgetObject);
    wf.hostComponent.setFilter(filterType, wf, config || ({} as C));
    grid.clrDatagrid.fixture.detectChanges();
    grid.getFilterToggle().click();

    return {
        finder: wf,
        filter: getFilter(grid.clrDatagrid, filterType),
    };
}

/**
 * TestHostComponent that has only single column for filter testing.
 */
@Component({
    template: ` <vcd-datagrid [gridData]="gridData" [columns]="[column]"></vcd-datagrid> `,
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
        this.column.filter = FilterComponentRendererSpec({ type: filterType, config });
        finder.detectChanges();
    }
}
