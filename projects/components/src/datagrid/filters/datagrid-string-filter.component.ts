/*!
 * Copyright 2019-2023 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClrDatagridFilter } from '@clr/angular';
import { SubscriptionTracker } from '../../common/subscription/subscription-tracker';
import { FilterBuilder } from '../../utils/filter-builder';
import { DatagridFilter, FilterComponentRendererSpec, FilterConfig, FilterRendererSpec } from './datagrid-filter';
import { TranslationService } from '@vcd/i18n';
import { LazyString } from '../../utils/types';

export enum WildCardPosition {
    NONE = 0,
    START = 1,
    END = 2,
    WRAP = WildCardPosition.START | WildCardPosition.END,
}

/**
 * Configures the '*' position in the FIQL string output
 */
export interface DatagridStringFilterConfig extends FilterConfig<string> {
    wildCardPosition?: WildCardPosition;
    placeholder?: string;
}

@Component({
    selector: 'vcd-dg-string-filter',
    templateUrl: 'datagrid-string-filter.component.html',
    providers: [SubscriptionTracker],
})
export class DatagridStringFilterComponent extends DatagridFilter<string, DatagridStringFilterConfig> {
    formGroup = new FormGroup({
        filterText: new FormControl(''),
    });

    @ViewChild('inputElement') inputElement: ElementRef;

    protected placeholder: LazyString;

    constructor(
        filterContainer: ClrDatagridFilter,
        private translationService: TranslationService,
        subTracker: SubscriptionTracker
    ) {
        super(filterContainer, subTracker);
    }

    setValue(value: string): void {
        this.formGroup.setValue({
            filterText: value,
        });
    }

    getValue(): string {
        const filterBuilder = new FilterBuilder().is(this.queryField);
        let value = this.formGroup.controls.filterText.value;
        if (this.config && this.config.wildCardPosition) {
            value = this.addWildCard(value, this.config.wildCardPosition);
        }
        return filterBuilder.equalTo(value).getString();
    }

    protected onBeforeSetConfig(config: DatagridStringFilterConfig) {
        this.placeholder =
            config?.placeholder || this.translationService.translateAsync('vcd.cc.datagrid.common.filter.items');
    }

    isActive(): boolean {
        return !!(this.formGroup && this.formGroup.controls.filterText.value);
    }

    protected setFocus() {
        this.inputElement?.nativeElement.focus();
    }

    /**
     * Wraps a string with a `wrapCharacter` in given position;
     */
    private addWildCard(input: string, position: WildCardPosition, wildcardCharacter = '*'): string {
        const start = getWrapCharacter(position, WildCardPosition.START);
        const end = getWrapCharacter(position, WildCardPosition.END);
        return `${start}${input}${end}`;
        /**
         * @return `wrapCharacter` if the passed in position should show it, an empty string otherwise
         */
        function getWrapCharacter(inputPosition: WildCardPosition, checkPosition: WildCardPosition): string {
            return inputPosition & checkPosition ? wildcardCharacter : '';
        }
    }
}

/**
 * Creates a {@link FilterRendererSpec} with the given config.
 * @param wildCardPosition where the * should go in the FIQL string output.
 * @param value the default value of the filter
 * @param placeholder for the input field
 */
export function DatagridStringFilter(
    wildCardPosition?: WildCardPosition,
    value?: string,
    placeholder?: string
): FilterRendererSpec<DatagridStringFilterConfig> {
    return FilterComponentRendererSpec({
        type: DatagridStringFilterComponent,
        config: {
            wildCardPosition,
            value,
            placeholder,
        },
    });
}
