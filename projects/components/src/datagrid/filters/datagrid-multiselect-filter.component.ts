/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter } from '@clr/angular';
import { SelectOption } from '../../common/interfaces/select-option';
import { FilterBuilder } from '../../utils/filter-builder';
import { IdGenerator } from '../../utils/id-generator/id-generator';
import { DatagridFilter, FilterComponentRendererSpec, FilterConfig, FilterRendererSpec } from './datagrid-filter';

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
 * Used internally for {@link DatagridMultiSelectFilterComponent.options} to add unique IDs to filter options. The IDs are used for
 * associating checkbox options with their labels in the HTML
 */
interface MultiSelectOptionInternal extends MultiSelectOption {
    /**
     * Unique identifier for each checkbox option instantiated in the HTML
     */
    id: string;
}

const idGenerator = new IdGenerator('vcd-multiselect-filter-id');

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
    templateUrl: './datagrid-multiselect-filter.component.html',
})
export class DatagridMultiSelectFilterComponent extends DatagridFilter<string[], DatagridMultiSelectFilterConfig> {
    constructor(@Host() private filterContainer: ClrDatagridFilter) {
        super(filterContainer);
    }

    /**
     * Used inside the HTML to instantiate checkbox options
     */
    options: MultiSelectOptionInternal[];

    createFormGroup(): FormGroup {
        return new FormGroup({});
    }

    /**
     * Overrides the config property because, the formGroup controls are defined by the config set by the caller.
     * Value of each option becomes a formControl name inside the formGroup.
     */
    onBeforeSetConfig(config: DatagridMultiSelectFilterConfig): void {
        this.options = config.options.map(option => ({
            ...option,
            id: idGenerator.generate(),
        }));
        // Remove all the form controls in the form before adding new controls
        Object.keys(this.formGroup.controls).forEach(control => {
            this.formGroup.removeControl(control);
        });
        config.options.forEach(option => {
            this.formGroup.addControl(option.value, new FormControl(false));
        });
    }

    protected getDebounceTimeMs(): number {
        return 1000;
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
            .filter(formControl => this.formGroup.get(formControl).value)
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

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param options List of options for select input
 * @param value the default value that should go in this multi-select filter.
 */
export function DatagridMultiSelectFilter(
    options: MultiSelectOption[],
    value?: string[]
): FilterRendererSpec<DatagridMultiSelectFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridMultiSelectFilterComponent,
        config: {
            options,
            value,
        },
    });
}
