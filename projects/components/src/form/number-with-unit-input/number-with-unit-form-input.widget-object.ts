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

    get unlimitedFormControl(): AbstractControl {
        return this.component.formGroup.get('unlimited');
    }

    get valueFormControl(): AbstractControl {
        return this.component.formGroup.get('limited');
    }

    get unitFormControl(): AbstractControl {
        return this.component.formGroup.get('comboUnitOptions');
    }

    selectUnit(unit: Unit): void {
        this.component.selectedUnit = unit.getMultiplier();
    }

    setInputValueUnit(unit: Unit): void {
        this.component.inputValueUnit = unit;
    }

    isInputValueFucused(): boolean {
        return document.activeElement === this.inputElement;
    }

    get selectedUnit(): number {
        return this.component.formGroup.get('comboUnitOptions').value;
    }

    get selectedUnitDisplayValue(): string {
        return (
            this.component.unitOptions
                // tslint:disable-next-line:triple-equals
                .find((item) => item.getMultiplier() == this.selectedUnit)
                .getUnitName()
        );
    }

    setUnitOptionsToPercent(): void {
        this.component.unitOptions = [Percent.ZERO_TO_100];
        this.component.inputValueUnit = Percent.ZERO_TO_1;
        this.unitFormControl.setValue(this.component.unitOptions[0].getMultiplier());
        this.fixture.detectChanges();
    }

    setUnitOptionsToNone(): void {
        this.component.unitOptions = [];
        this.fixture.detectChanges();
    }

    getNativeElement(cssSelector: string): HTMLElement {
        return this.findElement(cssSelector) && this.findElement(cssSelector).nativeElement;
    }

    get isUnitDropDownDisplayed(): boolean {
        return !!this.getNativeElement('.combo-options');
    }

    /**
     * Returns an empty string if there is no HTML for single unit
     */
    get singleUnitDisplayText(): string {
        const element = this.getNativeElement('.single-option');
        return element ? element.innerHTML : '';
    }

    private get inputElement(): HTMLInputElement {
        return this.getNativeElement('vcd-form-input input') as HTMLInputElement;
    }
}
