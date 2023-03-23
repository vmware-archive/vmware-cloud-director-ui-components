/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WidgetFinder, WidgetObject } from '../../utils/test/widget-object';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { CheckBoxStyling, FormCheckboxComponent } from './form-checkbox.component';

export class VcdFormCheckboxWidgetObject extends WidgetObject<FormCheckboxComponent> {
    static tagName = `vcd-form-checkbox`;

    private get checkboxElement(): HTMLInputElement {
        return this.findElement('input').nativeElement;
    }

    get value(): boolean {
        return this.checkboxElement.checked;
    }

    toggle(): void {
        this.checkboxElement.checked = !this.checkboxElement.checked;
        this.checkboxElement.dispatchEvent(new Event('change'));
        this.detectChanges();
    }
}

describe('FormCheckboxComponent', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let checkboxInput: VcdFormCheckboxWidgetObject;
    let toggleSwitchInput: VcdFormCheckboxWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        const checkboxWidgetObjects = finder.findWidgets({ woConstructor: VcdFormCheckboxWidgetObject });
        checkboxInput = checkboxWidgetObjects[0];
        toggleSwitchInput = checkboxWidgetObjects[1];
    });

    describe('isCheckbox', () => {
        it('returns true when styling is set as checkbox and false when set as toggle-switch', () => {
            expect(hostComponent.checkboxComponent.isCheckbox).toEqual(true);
            expect(hostComponent.toggleSwitchComponent.isCheckbox).toEqual(false);
        });
    });

    describe('view to model changes', () => {
        it('toggles the form control value when checkbox is toggled', () => {
            expect(hostComponent.checkboxComponent.formControl.value).toEqual(true);
            expect(hostComponent.toggleSwitchComponent.formControl.value).toEqual(false);
            checkboxInput.toggle();
            toggleSwitchInput.toggle();
            expect(hostComponent.checkboxComponent.formControl.value).toEqual(false);
            expect(hostComponent.toggleSwitchComponent.formControl.value).toEqual(true);
        });
    });

    describe('model to view changes', () => {
        it('toggles the checkbox when form control value is toggled', () => {
            expect(checkboxInput.value).toEqual(true);
            hostComponent.checkboxComponent.formControl.setValue(!hostComponent.checkboxComponent.formControl.value);
            finder.detectChanges();
            expect(checkboxInput.value).toEqual(false);
        });
    });
});

@Component({
    template: `
        <form>
            <vcd-form-checkbox
                #checkbox
                [label]="'Checkbox'"
                [formControl]="formGroup.controls.checkboxInput"
                [description]="'Helper Text'"
            >
            </vcd-form-checkbox>

            <vcd-form-checkbox
                #toggleswitch
                [label]="'Toggle switch'"
                [styling]="styling.TOGGLESWITCH"
                [formControl]="formGroup.controls.toggleInput"
                [description]="'Helper Text'"
            >
            </vcd-form-checkbox>
        </form>
    `,
})
class TestHostComponent {
    formGroup = this.fb.group({
        checkboxInput: [true],
        toggleInput: [false],
    });
    styling = CheckBoxStyling;

    @ViewChild('checkbox', { static: true }) checkboxComponent: FormCheckboxComponent;
    @ViewChild('toggleswitch', { static: true }) toggleSwitchComponent: FormCheckboxComponent;

    constructor(private fb: FormBuilder) {}
}
