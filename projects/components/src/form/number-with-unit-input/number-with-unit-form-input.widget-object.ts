/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { AbstractControl } from '@angular/forms';
import { WidgetObject } from '../../utils/test/widget-object';
import { Percent, Unit } from '../../utils/unit/unit';
import { NumberWithUnitFormInputComponent } from './number-with-unit-form-input.component';

/**
 * Test wrapper for the VCD Number With Unit Form Input component.
 */
export class NumberWithUnitFormInputWidgetObject extends WidgetObject<NumberWithUnitFormInputComponent> {
    static tagName = 'vcd-number-with-unit-form-input';

    get formControl(): AbstractControl {
        return this.component.formControl;
    }

    get displayValue(): string {
        return this.component.displayValue;
    }

    /**
     * Reads from the readonly section. If widget is not readonly, it returns an empty string;
     */
    get readonlyText(): string {
        return this.getText('.readonly-text');
    }

    setInputValueUnit(unit: Unit): void {
        this.component.inputValueUnit = unit;
    }

    selectUnit(unit: Unit): void {
        this.component.onUnitChange(unit.getMultiplier().toString());
    }

    get isShowingUnlimitedCheckbox(): boolean {
        return !!this.unlimitedCheckbox;
    }

    private get unlimitedCheckbox(): HTMLElement {
        return this.getNativeElement('.clr-checkbox-wrapper label');
    }

    clickUnlimitedCheckbox(): void {
        this.component.onUnlimitedCheckboxChange(!this.component.unlimitedControlValue);
        this.detectChanges();
    }

    private get unitDropdown(): HTMLSelectElement {
        return this.getNativeElement('select') as HTMLSelectElement;
    }

    set textInputValue(num: string) {
        this.component.onTextInputChange(num);
        this.detectChanges();
    }

    get isShowingUnitDropdown(): boolean {
        return !!this.unitDropdown;
    }

    get isUnitDropdownDisabled(): boolean {
        return this.unitDropdown?.disabled;
    }

    private get inputElement(): HTMLInputElement {
        return this.getNativeElement('input[type=number]') as HTMLInputElement;
    }

    get isInputValueFocused(): boolean {
        return document.activeElement === this.inputElement;
    }

    get isInputFieldDisabled(): boolean {
        return this.inputElement.disabled;
    }

    get selectedUnitDisplayValue(): string {
        return this.component.unitOptions
            .find((item) => item.getMultiplier() === Number(this.component.unitsControlValue))
            .getUnitName();
    }

    setUnitOptionsToPercent(): void {
        this.component.unitOptions = [Percent.ZERO_TO_100];
        this.component.inputValueUnit = Percent.ZERO_TO_1;
        this.component.unitsControlValue = this.component.unitOptions[0].getMultiplier().toString();
        this.fixture.detectChanges();
    }

    setUnitOptionsToNone(): void {
        this.component.unitOptions = [];
        this.fixture.detectChanges();
    }

    getNativeElement(cssSelector: string): HTMLElement {
        return this.findElement(cssSelector)?.nativeElement;
    }

    get isUnitDropDownDisplayed(): boolean {
        return !!this.getNativeElement('.combo-options');
    }

    /**
     * Returns an empty string if there is no HTML for single unit
     */
    get singleUnitDisplayText(): string {
        return this.getText('.single-option');
    }
}
