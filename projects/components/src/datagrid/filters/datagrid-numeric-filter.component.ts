/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, Input, OnInit } from '@angular/core';
import { DatagridFilter, FilterConfig } from './datagrid-filter';
import { ClrDatagridFilter } from '@clr/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterBuilder } from '../../utils/filter-builder';
import { ComponentRenderer } from '..';

enum BetweenNumbers {
    from = 'from',
    to = 'to',
}

export interface DatagridNumericFilterConfig<V> extends FilterConfig<V> {
    from: boolean;
    to: boolean;
}

export type DatagridNumberFilterValueType = [number, number];

@Component({
    selector: 'vcd-dg-numeric-filter',
    template: `
        <div [formGroup]="formGroup" [ngClass]="{ 'clr-form-control': !(config && config.from && config.to) }">
            <label *ngIf="config && config.from && !config.to" for="min" class="clr-control-label">Min</label>
            <label *ngIf="config && !config.from && config.to" for="max" class="clr-control-label">Max</label>

            <input
                *ngIf="config && config.from"
                class="min-input clr-input"
                type="number"
                id="min"
                [formControlName]="'from'"
            />

            <span *ngIf="config && config.from && config.to">
                -
            </span>

            <input
                *ngIf="config && config.to"
                class="max-input clr-input"
                type="number"
                id="max"
                [formControlName]="'to'"
            />
        </div>
    `,
    styles: [
        `
            .min-input {
                margin-right: 10px;
            }
            .max-input {
                margin-left: 10px;
            }
        `,
    ],
})
export class DatagridNumericFilterComponent<
    R,
    V extends DatagridNumberFilterValueType,
    C extends DatagridNumericFilterConfig<V>
> extends DatagridFilter<R, V, C> implements OnInit {
    formGroup: FormGroup;

    constructor(@Host() private filterContainer: ClrDatagridFilter, private fb: FormBuilder) {
        super(filterContainer);
        this.formGroup = this.fb.group({
            from: null,
            to: null,
        });
    }

    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(_ => this.changes.next());
    }

    setValue(values: V): void {
        if (
            values &&
            (values[0] !== this.formGroup.get(BetweenNumbers.from).value ||
                values[1] !== this.formGroup.get(BetweenNumbers.to).value)
        ) {
            if (typeof values[0] === 'number' && this.config.from) {
                this.formGroup.get(BetweenNumbers.from).setValue(values[0]);
            } else {
                this.formGroup.get(BetweenNumbers.from).setValue(null);
            }
            if (typeof values[1] === 'number' && this.config.to) {
                this.formGroup.get(BetweenNumbers.to).setValue(values[1]);
            } else {
                this.formGroup.get(BetweenNumbers.to).setValue(null);
            }
        }
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        const values = Object.keys(this.formGroup.value).map(control => this.formGroup.get(control).value);
        return filterBuilder.betweenNumbers(values).getString();
    }

    isActive(): boolean {
        return (
            !!this.formGroup &&
            (this.formGroup.get(BetweenNumbers.from).value || !!this.formGroup.get(BetweenNumbers.to).value)
        );
    }
}
