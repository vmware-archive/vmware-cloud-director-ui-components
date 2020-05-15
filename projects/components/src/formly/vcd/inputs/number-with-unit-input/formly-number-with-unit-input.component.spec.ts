/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { UNLIMITED } from '../../../../form/number-with-unit-input/number-with-unit-form-input.component';
import { Bytes, CommonUtil, WidgetFinder, WidgetObject } from '../../../../utils';
import { VCD_FORMLY_INPUT_TYPES, VcdFormlyFieldConfig, VcdFormlyTemplateOptions } from '../../vcd-formly.config';
import { VcdFormlyModule } from '../../vcd-formly.module';
import { FormlyNumberWithUnitInputComponent } from './formly-number-with-unit-input.component';

export class VcdFormlyNumberWithUnitInputWidgetObject extends WidgetObject<FormlyNumberWithUnitInputComponent> {
    static tagName = `vcd-formly-number-with-unit-input`;
}

describe('FormlyNumberWithUnitInputComponent', () => {
    let testHostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let vcdFormlyNumberWithUnitInputWidgetObject: VcdFormlyNumberWithUnitInputWidgetObject;
    let formlyNumberWithUnitInputComponent: FormlyNumberWithUnitInputComponent;
    let templateOptions: VcdFormlyTemplateOptions;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormlyModule.forRoot(), VcdFormlyModule],
            declarations: [TestHostComponent],
            providers: [
                {
                    provide: TranslationService,
                    useValue: new MockTranslationService(),
                },
            ],
        }).compileComponents();

        finder = new WidgetFinder(TestHostComponent);
        finder.detectChanges();

        testHostComponent = finder.hostComponent;
        vcdFormlyNumberWithUnitInputWidgetObject = finder.find(VcdFormlyNumberWithUnitInputWidgetObject);
        formlyNumberWithUnitInputComponent = vcdFormlyNumberWithUnitInputWidgetObject.component;
    });
    beforeEach(() => {
        templateOptions = CommonUtil.getNewObj(VCD_NUMBER_WITH_UNIT_INPUT_TEMPLATE_OPTIONS);
    });
    it('getters return correct values for passing them as inputs to vcd-number-with-unit-form-input', () => {
        expect(formlyNumberWithUnitInputComponent.min).toEqual(UNLIMITED);
        expect(formlyNumberWithUnitInputComponent.max).toEqual(Number.MAX_SAFE_INTEGER);
        expect(formlyNumberWithUnitInputComponent.hintPosition).toEqual('top-left');
        expect(formlyNumberWithUnitInputComponent.errorLabels).toEqual([]);
        expect(formlyNumberWithUnitInputComponent.showUnlimitedOption).toEqual(true);
        expect(formlyNumberWithUnitInputComponent.unlimitedValue).toEqual(UNLIMITED);
        templateOptions.showUnlimitedOption = false;
        templateOptions.unlimitedValue = 1000;
        testHostComponent.fields[0].templateOptions = CommonUtil.getNewObj(templateOptions);
        finder.detectChanges();
        expect(formlyNumberWithUnitInputComponent.showUnlimitedOption).toEqual(false);
        expect(formlyNumberWithUnitInputComponent.unlimitedValue).toEqual(1000);
    });
});

@Component({
    template: `
        <div class="clr-form-horizontal">
            <formly-form [model]="model" [fields]="fields"></formly-form>
        </div>
    `,
})
export class TestHostComponent {
    @ViewChild(FormlyForm) formlyForm: FormlyForm;

    model: any = {};
    fields: VcdFormlyFieldConfig[] = [
        {
            key: 'formlyInput4',
            type: VCD_FORMLY_INPUT_TYPES.number_with_unit_input,
            templateOptions: CommonUtil.getNewObj(VCD_NUMBER_WITH_UNIT_INPUT_TEMPLATE_OPTIONS),
        },
    ];
}

const VCD_NUMBER_WITH_UNIT_INPUT_TEMPLATE_OPTIONS = {
    label: 'Number with unit input',
    required: true,
    showAsterisk: true,
    inputValueUnit: Bytes.MB,
    unitOptions: Bytes.types,
};
