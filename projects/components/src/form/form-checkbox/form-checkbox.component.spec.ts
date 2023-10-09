/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { WidgetFinder, WidgetObject } from '../../utils/test/widget-object';
import { configureFormInputTestingModule } from '../base-form-control.spec';
import { CheckBoxStyling, FormCheckboxComponent } from './form-checkbox.component';

export class VcdFormCheckboxWidgetObject extends WidgetObject<FormCheckboxComponent> {
    static tagName = `vcd-form-checkbox`;

    private get checkboxElement(): HTMLInputElement {
        return this.findElement('input').nativeElement;
    }

    private get labelElement(): HTMLElement {
        return this.findElement('.clr-form-control > label.clr-control-label')?.nativeElement;
    }

    get value(): boolean {
        return this.checkboxElement.checked;
    }

    toggle(): void {
        this.checkboxElement.checked = !this.checkboxElement.checked;
        this.checkboxElement.dispatchEvent(new Event('change'));
        this.detectChanges();
    }

    getLabelAttributeValue(attribute: string): string {
        return this.labelElement.getAttribute(attribute);
    }

    getInputAttributeValue(attribute: string): string {
        return this.checkboxElement.getAttribute(attribute);
    }

    get hasLabelElement(): boolean {
        return !!this.labelElement;
    }
}

describe('FormCheckboxComponent', () => {
    let hostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let checkboxInput: VcdFormCheckboxWidgetObject;
    let toggleSwitchInput: VcdFormCheckboxWidgetObject;
    let checkboxWithoutLabel: VcdFormCheckboxWidgetObject;

    beforeEach(async () => {
        await configureFormInputTestingModule(TestHostComponent);
        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();
        hostComponent = finder.hostComponent;

        const checkboxWidgetObjects = finder.findWidgets({ woConstructor: VcdFormCheckboxWidgetObject });
        checkboxInput = checkboxWidgetObjects[0];
        toggleSwitchInput = checkboxWidgetObjects[1];
        checkboxWithoutLabel = finder.find({
            woConstructor: VcdFormCheckboxWidgetObject,
            className: 'checkbox-without-label',
        });
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

    describe('ARIA', () => {
        it('has label "for" attribute set to input id when label is set', () => {
            expect(checkboxInput.getLabelAttributeValue('for')).toBe(checkboxInput.getInputAttributeValue('id'));
        });

        it("does not have 'aria-label' attribute when label is set", () => {
            expect(checkboxWithoutLabel.getInputAttributeValue('arial-label')).toBe(null);
        });

        it("has 'aria-label' attribute when label is hidden", () => {
            expect(checkboxWithoutLabel.hasLabelElement).toBe(false);
            expect(checkboxWithoutLabel.getInputAttributeValue('aria-label')).toBeDefined();
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

            <vcd-form-checkbox
                class="checkbox-without-label"
                [label]="'Checkbox aria label'"
                [hideLabel]="true"
                [formControl]="formGroup.controls.noLabelInput"
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
        noLabelInput: [true],
    });
    styling = CheckBoxStyling;

    @ViewChild('checkbox', { static: true }) checkboxComponent: FormCheckboxComponent;
    @ViewChild('toggleswitch', { static: true }) toggleSwitchComponent: FormCheckboxComponent;

    constructor(private fb: FormBuilder) {}
}
