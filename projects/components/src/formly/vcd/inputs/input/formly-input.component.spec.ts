/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormlyFieldConfig, FormlyForm, FormlyModule } from '@ngx-formly/core';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { CommonUtil } from '../../../../utils/index';
import { WidgetFinder, WidgetObject } from '../../../../utils/test/index';
import { VCD_FORMLY_INPUT_TYPES, VcdFormlyFieldConfig, VcdFormlyTemplateOptions } from '../../vcd-formly.config';
import { VcdFormlyModule } from '../../vcd-formly.module';
import { FormlyInputComponent } from './formly-input.component';

export class VcdFormlyInputWidgetObject extends WidgetObject<FormlyInputComponent> {
    static tagName = `vcd-formly-input`;
}

describe('vcd-formly-input', () => {
    let testHostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let vcdFormlyInputComponent: FormlyInputComponent;
    let templateOptions: VcdFormlyTemplateOptions;

    beforeEach(async () => {
        let vcdFormlyInputWidgetObject: VcdFormlyInputWidgetObject;
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
        templateOptions = { ...VCD_FORM_INPUT_TEMPLATE_OPTIONS };
        testHostComponent.fields[0].templateOptions = templateOptions;
        finder.detectChanges();
    });
    it('getters return the values set on VcdFormlyFieldConfig.templateOptions object', () => {
        const templateOptionsWithMinMax = { ...templateOptions };
        templateOptionsWithMinMax.min = 1;
        templateOptionsWithMinMax.max = 10;
        testHostComponent.fields[0].templateOptions = templateOptionsWithMinMax;
        finder.detectChanges();
        expect(vcdFormlyInputComponent.min).toEqual(1);
        expect(vcdFormlyInputComponent.max).toEqual(10);
    });
    it('getters return default values for properties not set on the VcdFormlyFieldConfig.templateOptions object', () => {
        expect(vcdFormlyInputComponent.min).toEqual(Number.MIN_SAFE_INTEGER);
        expect(vcdFormlyInputComponent.max).toEqual(Number.MAX_SAFE_INTEGER);
        expect(vcdFormlyInputComponent.type).toEqual('text');
        expect(vcdFormlyInputComponent.hintPosition).toEqual('top-left');
        expect(vcdFormlyInputComponent.errorLabels).toEqual([]);
    });
    it(
        'onEnterClicked and onEscapeClicked methods return the same values as functions with same names on ' +
            'VcdFormlyFieldConfig.templateOptions',
        () => {
            expect(vcdFormlyInputComponent.onEnterClicked()).toEqual(
                templateOptions.onEnterClicked(vcdFormlyInputComponent.field)
            );

            expect(vcdFormlyInputComponent.onEscapeClicked()).toEqual(
                templateOptions.onEscapeClicked(vcdFormlyInputComponent.field)
            );
        }
    );
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

function getCopyOfObj<T extends { [key: string]: any }>(obj: T): T {
    return { ...obj };
}
