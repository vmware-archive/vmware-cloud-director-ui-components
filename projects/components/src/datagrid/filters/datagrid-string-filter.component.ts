/*!
 * Copyright 2019 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Host, Input, OnInit } from '@angular/core';
import { DatagridFilter, FilterConfig } from './datagrid-filter';
import { ClrDatagridFilter } from '@clr/angular';
import { FilterBuilder } from '../../utils/filter-builder';
import { FormBuilder, FormGroup } from '@angular/forms';

export enum WildCardPosition {
    START = 'START',
    END = 'END',
}

/**
 * Configures the '*' position in the FIQL string output
 */
export interface DatagridStringFilterConfig<V = string> extends FilterConfig<V> {
    wildCardPosition?: WildCardPosition;
}

@Component({
    selector: 'vcd-dg-string-filter',
    template: `
        <form [formGroup]="formGroup">
            <input type="text" name="search" [formControlName]="'filterText'" class="clr-input" />
        </form>
    `,
})
export class DatagridStringFilterComponent extends DatagridFilter<string, DatagridStringFilterConfig>
    implements OnInit {
    constructor(@Host() private filterContainer: ClrDatagridFilter, private fb: FormBuilder) {
        super(filterContainer);
        this.formGroup = this.fb.group({
            filterText: '',
        });
    }

    /**
     * Changes in the formgroup are emitted for updating the clr grid state
     */
    ngOnInit(): void {
        this.formGroup.valueChanges.subscribe(_ => this.changes.next());
    }

    setValue(value: string): void {
        this.formGroup.setValue({
            filterText: value,
        });
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        let value = this.formGroup.get('filterText').value;
        if (this.config && this.config.wildCardPosition) {
            value = this.config.wildCardPosition === WildCardPosition.START ? '*' + value : value + '*';
        }
        return filterBuilder.equalTo(value).getString();
    }

    isActive(): boolean {
        return !!this.formGroup && this.formGroup.get('filterText').value;
    }
}
