/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, OnInit } from '@angular/core';
import { DatagridFilter, FilterConfig, FilterComponentRendererSpec, FilterRendererSpec } from './datagrid-filter';
import { ClrDatagridFilter } from '@clr/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterBuilder } from '../../utils/filter-builder';

enum FormFields {
    from = 'from',
    to = 'to',
}

/**
 * The type of value that goes in the {@link DatagridNumericFilterConfig}.
 */
export type DatagridNumericFilterValue = [number, number];

/**
 * Numeric filter UI widget has only single configuration. So there are no properties in addition to FilterConfig
 */
export type DatagridNumericFilterConfig = FilterConfig<DatagridNumericFilterValue>;

@Component({
    selector: 'vcd-dg-numeric-filter',
    templateUrl: 'datagrid-numeric-filter.component.html',
    styleUrls: ['datagrid-numeric-filter.component.scss'],
})
export class DatagridNumericFilterComponent
    extends DatagridFilter<DatagridNumericFilterValue, DatagridNumericFilterConfig>
    implements OnInit {
    constructor(@Host() filterContainer: ClrDatagridFilter, private fb: FormBuilder) {
        super(filterContainer);
        this.formGroup = this.fb.group({
            [FormFields.from]: null,
            [FormFields.to]: null,
        });
    }
    formGroup: FormGroup;

    ngOnInit(): void {
        this.debounceChanges(this.formGroup.valueChanges);
    }

    setValue(values: DatagridNumericFilterValue): void {
        if (!values) {
            return;
        }
        if (typeof values[0] === 'number') {
            this.formGroup.get(FormFields.from).setValue(values[0]);
        } else {
            this.formGroup.get(FormFields.from).setValue(null);
        }
        if (typeof values[1] === 'number') {
            this.formGroup.get(FormFields.to).setValue(values[1]);
        } else {
            this.formGroup.get(FormFields.to).setValue(null);
        }
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        const from = this.formGroup.get(FormFields.from).value;
        const to = this.formGroup.get(FormFields.to).value;
        if (typeof from === 'number' && typeof to !== 'number') {
            return filterBuilder.greaterThan(from).getString();
        }
        if (typeof from !== 'number' && typeof to === 'number') {
            return filterBuilder.lessThan(to).getString();
        }
        if (typeof from === 'number' && typeof to === 'number') {
            return filterBuilder.betweenNumbers([from, to]).getString();
        }
    }

    isActive(): boolean {
        return !!(
            this.formGroup &&
            (typeof this.formGroup.get(FormFields.from).value === 'number' ||
                typeof this.formGroup.get(FormFields.to).value === 'number')
        );
    }
}

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param value the default value that should go in this numeric filter.
 */
export function DatagridNumericFilter(
    value?: DatagridNumericFilterValue
): FilterRendererSpec<DatagridNumericFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridNumericFilterComponent,
        config: {
            value,
        },
    });
}
