/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */
import { DatagridFilter, FilterConfig } from './datagrid-filter';
import { Component, Host, OnInit } from '@angular/core';
import { ClrDatagridFilter } from '@clr/angular';
import { FormBuilder } from '@angular/forms';
import { FilterBuilder } from '../../utils/filter-builder';

/**
 * Options displayed in a select input option list
 */
export interface SelectOption {
    /**
     * Value of a option
     */
    value: string | number;
    /**
     * Text to be shown for the option
     */
    display: string;
    /**
     * Used for translation of the {@link SelectOption.display} text
     */
    isTranslatable?: boolean;
}

/**
 * List of select options and initial value for the filter are passed through this
 */
export interface DatagridSelectFilterConfig extends FilterConfig<string | number> {
    /**
     * List of select options
     */
    options: SelectOption[];
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
})
export class DatagridSelectFilterComponent extends DatagridFilter<string | number, DatagridSelectFilterConfig>
    implements OnInit {
    /**
     * Displayed as the first option with a falsy value. Selecting this option would deactivate the filter
     */
    anyChoice: SelectOption = {
        value: '',
        display: '',
    };

    constructor(@Host() private filterContainer: ClrDatagridFilter, private fb: FormBuilder) {
        super(filterContainer);
        this.formGroup = this.fb.group({
            filterSelect: '',
        });
    }

    ngOnInit(): void {
        this.debounceChanges(this.formGroup.valueChanges);
    }

    setValue(value: string | number): void {
        if (!this.config.options.find(option => option.value === value)) {
            throw Error('The value being set on select filter is not equal to any of the options');
        }
        this.formGroup.setValue({
            filterSelect: value,
        });
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        const value = this.formGroup.get('filterSelect').value;
        return filterBuilder.equalTo(value).getString();
    }

    isActive(): boolean {
        return !!this.formGroup && this.formGroup.get('filterSelect').value;
    }
}
