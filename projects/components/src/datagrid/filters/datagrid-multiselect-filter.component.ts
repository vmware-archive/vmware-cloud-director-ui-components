/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, Input, OnInit } from '@angular/core';
import { DatagridFilter, FilterConfig } from './datagrid-filter';
import { SelectOption } from './datagrid-select-filter.component';
import { ClrDatagridFilter } from '@clr/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterBuilder } from '../../utils/filter-builder';

/**
 * Same as the {@link SelectOption} but value is always a string
 */
export interface MultiSelectOption extends SelectOption {
    value: string;
}

export interface DatagridMultiSelectFilterConfig extends FilterConfig<string[]> {
    /**
     * List of select options
     */
    options: MultiSelectOption[];
}

/**
 * Used within a clarity grid column {@link DatagridComponent} to render a filter widget with list of checkboxes to select
 * multiple options
 * Example usage:
 * columns: GridColumn<MockRecord>[] = [{
 *      displayName: 'Custom Select filter',
 *      renderer: 'state',
 *      queryFieldName: 'state',
 *      filterRendererSpec: FilterComponentRendererSpec({
 *          type: DatagridMultiSelectFilterComponent,
 *          config: {
 *              options: [{
 *                  value: 'CA',
 *                  display: 'California'
 *              }, {
 *                  value: 'MA',
 *                  display: 'Massachusetts'
 *              }],
 *              value: ['MA', 'NC'],
 *          },
 *      }),
 *   }]
 */
@Component({
    selector: 'vcd-dg-multiselect-filter',
    templateUrl: 'datagrid-multiselect-filter.component.html',
})
export class DatagridMultiSelectFilterComponent extends DatagridFilter<string[], DatagridMultiSelectFilterConfig>
    implements OnInit {
    constructor(@Host() private filterContainer: ClrDatagridFilter) {
        super(filterContainer);
        this.formGroup = new FormGroup({});
    }

    /**
     * Overrides the config property because, the formGroup controls are defined by the config set by the caller.
     * Value of each option becomes a formControl name inside the formGroup.
     */
    @Input() set config(config: DatagridMultiSelectFilterConfig) {
        config.options.forEach(option => {
            this.formGroup.addControl(option.value, new FormControl(false));
        });
        // Duplicated from the super's set config method because it was not possible to call by super.config = config or
        // super.config(config)
        this._config = config;
        if (this._config.value) {
            this.setValue(this._config.value);
        }
    }
    get config(): DatagridMultiSelectFilterConfig {
        return this._config;
    }

    ngOnInit(): void {
        this.debounceChanges(this.formGroup.valueChanges);
    }

    setValue(values: string[]): void {
        values.forEach(frmCtrl => {
            const correspondingFormCtrl = this.formGroup.get(frmCtrl);
            if (!correspondingFormCtrl) {
                throw Error(`A multi select filter option with value '${frmCtrl}' does not exist`);
            }
            correspondingFormCtrl.setValue(true);
        });
    }

    getValue(): string {
        const selectedFilters = Object.keys(this.formGroup.getRawValue())
            .filter(frmCtrl => this.formGroup.get(frmCtrl).value)
            .map(selectedOption => new FilterBuilder().is(this.queryField).equalTo(selectedOption));
        return new FilterBuilder().any(...selectedFilters).getString();
    }

    isActive(): boolean {
        return (
            this.formGroup &&
            !!Object.keys(this.formGroup.getRawValue()).filter(frmCtrl => this.formGroup.get(frmCtrl).value).length
        );
    }
}
