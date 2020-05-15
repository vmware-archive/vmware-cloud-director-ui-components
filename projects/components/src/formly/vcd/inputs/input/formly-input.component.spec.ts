/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormlyFieldConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { CommonUtil, WidgetFinder, WidgetObject } from '../../../../utils';
import {
    VCD_FORMLY_CONFIG,
    VCD_FORMLY_INPUT_TYPES,
    VcdFormlyFieldConfig,
    VcdFormlyTemplateOptions,
} from '../../vcd-formly.config';
import { VcdFormlyModule } from '../../vcd-formly.module';
import { FormlyInputComponent } from './formly-input.component';

export class VcdFormlyInputWidgetObject extends WidgetObject<FormlyInputComponent> {
    static tagName = `vcd-formly-input`;
}

describe('vcd-formly-input', () => {
    let testHostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let vcdFormlyInputWidgetObject: VcdFormlyInputWidgetObject;
    let vcdFormlyInputComponent: FormlyInputComponent;
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
        vcdFormlyInputWidgetObject = finder.find(VcdFormlyInputWidgetObject);
        vcdFormlyInputComponent = vcdFormlyInputWidgetObject.component;
    });
    beforeEach(() => {
        templateOptions = CommonUtil.getNewObj(VCD_FORM_INPUT_TEMPLATE_OPTIONS);
    });
    it('getters return correct values for passing them as inputs to vcd-form-input', () => {
        expect(vcdFormlyInputComponent.min).toEqual(Number.MIN_SAFE_INTEGER);
        expect(vcdFormlyInputComponent.max).toEqual(Number.MAX_SAFE_INTEGER);
        expect(vcdFormlyInputComponent.type).toEqual('text');
        expect(vcdFormlyInputComponent.hintPosition).toEqual('top-left');
        expect(vcdFormlyInputComponent.errorLabels).toEqual([]);
        templateOptions.min = 1;
        templateOptions.max = 10;
        testHostComponent.fields[0].templateOptions = CommonUtil.getNewObj(templateOptions);
        finder.detectChanges();
        expect(vcdFormlyInputComponent.min).toEqual(templateOptions.min);
        expect(vcdFormlyInputComponent.max).toEqual(templateOptions.max);
    });
    it('onEnterClicked and onEscapeClicked call the corresponding methods on templateOptions to', () => {
        expect(vcdFormlyInputComponent.onEnterClicked()).toEqual(
            templateOptions.onEnterClicked(vcdFormlyInputComponent.field)
        );

        expect(vcdFormlyInputComponent.onEscapeClicked()).toEqual(
            templateOptions.onEscapeClicked(vcdFormlyInputComponent.field)
        );
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
            key: 'formlyInput',
            type: VCD_FORMLY_INPUT_TYPES.input,
            templateOptions: CommonUtil.getNewObj(VCD_FORM_INPUT_TEMPLATE_OPTIONS),
        },
    ];
}

const VCD_FORM_INPUT_TEMPLATE_OPTIONS = {
    label: 'Hint position',
    placeholder: 'Enter position of the hint',
    required: true,
    showAsterisk: '',
    onEnterClicked: (field: FormlyFieldConfig) => {
        return `Enter clicked on ${field.key}`;
    },
    onEscapeClicked: (field: FormlyFieldConfig) => {
        return `Escape clicked on ${field.key}`;
    },
    hint: 'blah',
};
