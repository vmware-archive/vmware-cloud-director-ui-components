/*!
 * Copyright 2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LazyString } from '@vcd/i18n';

export interface ComboOption {
    display: LazyString;
    value: string;
}

/**
 * A togggle that allows you to select all and choose the type of right to apply.
 */
@Component({
    selector: 'vcd-select-all-toggle',
    templateUrl: 'select-all-toggle.component.html',
    styleUrls: ['./select-all-toggle.component.scss'],
})
export class VcdSelectAllToggleComponent {
    /**
     * The right options that should be displayed in the dropdown.
     */
    @Input()
    rightsOptions: ComboOption[];

    /**
     * The text that is displayed next to the toggle.
     */
    @Input()
    description: LazyString;

    /**
     * The right that they are set to if currently selected.
     * If unset, will be set to false.
     */
    @Input()
    set selection(value: string | undefined) {
        if (value === undefined) {
            this.isSelected = false;
        } else {
            this.isSelected = true;
            this._selectedRightValue = value;
        }
    }

    /**
     * Ouput when the value behind select all is changed or undefined if select all is disabled.
     */
    @Output()
    selectionChange: EventEmitter<string | undefined> = new EventEmitter();

    set selectedRight(selectedValue: string) {
        if (this.isSelected) {
            this._selectedRightValue = selectedValue;
            this.selectionChange.emit(this.selectedRight);
        }
    }

    get selectedRight(): string {
        return this._selectedRightValue || this.rightsOptions[0].value;
    }

    private _selectedRightValue: string;
    isSelected = false;

    selectAllChange(): void {
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
            this.selectionChange.emit(this.selectedRight);
        } else {
            this.selectionChange.emit(undefined);
        }
    }
}
