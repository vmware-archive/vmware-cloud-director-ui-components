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
     * Ouput when the value behind select all is changed or undefined if select all is disabled.
     */
    @Output()
    selectionChanged: EventEmitter<string | undefined> = new EventEmitter();

    set selectedRight(selectedValue: string) {
        if (this.isSelected) {
            this._selectedRightValue = selectedValue;
            this.selectionChanged.emit(this.selectedRight);
        }
    }

    get selectedRight(): string {
        return this._selectedRightValue || this.rightsOptions[0].value;
    }

    private _selectedRightValue: string;
    isSelected = false;

    private getComboOptionByValue(value: string): ComboOption {
        return this.rightsOptions.find((combo) => combo.value === value);
    }

    selectAllChange(): void {
        this.isSelected = !this.isSelected;
        if (this.isSelected) {
            this.selectionChanged.emit(this.selectedRight);
        } else {
            this.selectionChanged.emit(undefined);
        }
    }
}
