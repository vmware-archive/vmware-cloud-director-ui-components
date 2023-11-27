/*!
 * Copyright 2019-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter } from '@clr/angular';
import { SelectOption } from '../../common/interfaces/select-option';
import { SubscriptionTracker } from '../../common/subscription/subscription-tracker';
import { FilterBuilder } from '../../utils/filter-builder';
import { DatagridFilter, FilterComponentRendererSpec, FilterConfig, FilterRendererSpec } from './datagrid-filter';

/**
 * List of select options and initial value for the filter are passed through this
 */
export interface DatagridSelectFilterConfig extends FilterConfig<string | number> {
    /**
     * List of select options
     */
    options: SelectOption[];

    /**
     * Switch to disable conversion of filter value to FIQL. Used by {@link DatagridSelectFilterComponent#getValue}
     */
    customFiql?: boolean;
}

/**
 * Used within a clarity grid column {@link DatagridComponent} to render a filter widget with select input
 * Example usage:
 * columns: GridColumn<MockRecord>[] = [{
 *      displayName: 'Custom Select filter',
 *      renderer: 'age',
 *      queryFieldName: 'age',
 *      filterRendererSpec: FilterComponentRendererSpec({
 *          type: DatagridSelectFilterComponent,
 *          config: {
 *              options: [{
 *                  value: 30,
 *                  display: 'Thirty'
 *              }, {
 *                  value: 60,
 *                  display: 'sixty'
 *              }],
 *              value: 60,
 *          },
 *      }),
 *   }]
 */
@Component({
    selector: 'vcd-dg-select-filter',
    templateUrl: 'datagrid-select-filter.component.html',
    providers: [SubscriptionTracker],
})
export class DatagridSelectFilterComponent
    extends DatagridFilter<string | number, DatagridSelectFilterConfig>
    implements OnInit
{
    @ViewChild('selectElement') selectElement: ElementRef;

    /**
     * Displayed as the first option with a falsy value. Selecting this option would deactivate the filter
     */
    anyChoice: SelectOption = {
        value: '',
        display: '',
    };

    formGroup = new FormGroup({
        filterSelect: new FormControl('' as string | number),
    });

    constructor(filterContainer: ClrDatagridFilter, private fb: FormBuilder, subTracker: SubscriptionTracker) {
        super(filterContainer, subTracker);
    }

    protected getDebounceTimeMs(): number {
        return 0;
    }

    setValue(value: string | number): void {
        if (!this.config.options.find((option) => option.value === value)) {
            throw Error('The value being set on select filter is not equal to any of the options');
        }
        this.formGroup.setValue({
            filterSelect: value,
        });
    }

    getValue(): string {
        if (this.config.customFiql) {
            return this.formGroup.controls.filterSelect.value.toString();
        }
        const filterBuilder = new FilterBuilder().is(this.queryField);
        const value = this.formGroup.controls.filterSelect.value;
        return filterBuilder.equalTo(value).getString();
    }

    isActive(): boolean {
        return !!(this.formGroup && this.formGroup.controls.filterSelect.value);
    }

    protected setFocus() {
        this.selectElement?.nativeElement.focus();
    }
}

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param options List of options for select input
 * @param value the default value that should go in this select filter.
 * @param customFiql when set as true will disable any formatting by {@link DatagridSelectFilterComponent#getValue}
 */
export function DatagridSelectFilter(
    options: SelectOption[],
    value?: string | number,
    customFiql?: boolean
): FilterRendererSpec<DatagridSelectFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridSelectFilterComponent,
        config: {
            options,
            value,
            customFiql,
        },
    });
}
