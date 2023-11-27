/*!
 * Copyright 2019-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter } from '@clr/angular';
import { SubscriptionTracker } from '../../common/subscription/subscription-tracker';
import { NumberWithUnitFormInputComponent } from '../../form';
import { FilterBuilder } from '../../utils/filter-builder';
import { Unit } from '../../utils/unit/unit';
import { DatagridFilter, FilterComponentRendererSpec, FilterConfig, FilterRendererSpec } from './datagrid-filter';

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
export interface DatagridNumericFilterConfig extends FilterConfig<DatagridNumericFilterValue> {
    unit?: Unit;
    unitOptions?: Unit[];
}

@Component({
    selector: 'vcd-dg-numeric-filter',
    templateUrl: 'datagrid-numeric-filter.component.html',
    styleUrls: ['datagrid-numeric-filter.component.scss'],
    providers: [SubscriptionTracker],
})
export class DatagridNumericFilterComponent
    extends DatagridFilter<DatagridNumericFilterValue, DatagridNumericFilterConfig>
    implements OnInit
{
    maxNumberLength = Number.MAX_SAFE_INTEGER.toString().length;

    @ViewChild('from') fromInput: NumberWithUnitFormInputComponent;
    @ViewChild('to') toInput: NumberWithUnitFormInputComponent;

    /**
     * Options for the select input of units
     */
    private _unitOptions: Unit[];
    @Input() set unitOptions(val: Unit[]) {
        this._unitOptions = val;
        if (!this.unit && this.unitOptions && this.unitOptions.length) {
            this.unit = this.unitOptions[0];
        }
    }
    get unitOptions(): Unit[] {
        return this._unitOptions;
    }

    /**
     * Base unit to which selected units are converted
     */
    private _unit: Unit;
    @Input() set unit(val: Unit) {
        if (!val && this.unitOptions && this.unitOptions.length) {
            this._unit = this.unitOptions[0];
            return;
        }
        this._unit = val;
    }
    get unit(): Unit {
        return this._unit;
    }

    formGroup = new FormGroup({
        from: new FormControl(null as number),
        to: new FormControl(null as number),
    });

    constructor(filterContainer: ClrDatagridFilter, subTracker: SubscriptionTracker) {
        super(filterContainer, subTracker);
    }

    protected onBeforeSetConfig(config: DatagridNumericFilterConfig): void {
        this.unitOptions = config.unitOptions;
        this.unit = config.unit;
    }

    setValue(values: DatagridNumericFilterValue): void {
        if (!values) {
            return;
        }
        if (typeof values[0] === 'number') {
            this.formGroup.controls.from.setValue(values[0]);
        } else {
            this.formGroup.controls.from.setValue(null);
        }
        if (typeof values[1] === 'number') {
            this.formGroup.controls.to.setValue(values[1]);
        } else {
            this.formGroup.controls.to.setValue(null);
        }
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        const from = this.formGroup.controls.from.value;
        const to = this.formGroup.controls.to.value;
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
            (typeof this.formGroup.controls.from.value === 'number' ||
                typeof this.formGroup.controls.to.value === 'number')
        );
    }

    close(): void {
        this.filterContainer.open = false;
    }
}

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param value the default value that should go in this numeric filter.
 * @param unit initial value for unit input to be selected
 * @param unitOptions Select dropdown options for unit input
 */
export function DatagridNumericFilter(
    value?: DatagridNumericFilterValue,
    unitOptions?: Unit[],
    unit?: Unit
): FilterRendererSpec<DatagridNumericFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridNumericFilterComponent,
        config: {
            value,
            unit,
            unitOptions,
        },
    });
}
