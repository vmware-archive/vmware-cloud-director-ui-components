/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormlyForm, FormlyModule } from '@ngx-formly/core';
import { MockTranslationService, TranslationService } from '@vcd/i18n';
import { of } from 'rxjs';
import { SelectOption } from '../../../../common/interfaces';
import { CommonUtil } from '../../../../utils';
import { WidgetFinder, WidgetObject } from '../../../../utils/test';
import { VCD_FORMLY_INPUT_TYPES, VcdFormlyFieldConfig, VcdFormlyTemplateOptions } from '../../vcd-formly.config';
import { VcdFormlyModule } from '../../vcd-formly.module';
import { FormlySelectComponent } from './formly-select.component';

export class VcdFormlySelectWidgetObject extends WidgetObject<FormlySelectComponent> {
    static tagName = `vcd-formly-select`;
}

describe('FormlySelectComponent', () => {
    let testHostComponent: TestHostComponent;
    let finder: WidgetFinder<TestHostComponent>;
    let formlySelectWidgetObject: VcdFormlySelectWidgetObject;
    let formlySelectComponent: FormlySelectComponent;
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
        formlySelectWidgetObject = finder.find(VcdFormlySelectWidgetObject);
        formlySelectComponent = formlySelectWidgetObject.component;
    });
    beforeEach(() => {
        templateOptions = CommonUtil.getNewObj(SELECT_TEMPLATE_OPTIONS);
    });
    it('getters return correct values for passing them as inputs to vcd-formly-select', async () => {
        expect(formlySelectComponent.errorLabels).toEqual([]);
        const selectOptions = await formlySelectComponent.selectOptions.toPromise();
        expect(selectOptions).toEqual(templateOptions.options as SelectOption[]);
    });
    it('options can take an observable', async () => {
        const templateOptionsWithSelectOptionsAsObservable = CommonUtil.getNewObj(
            templateOptions
        ) as VcdFormlyTemplateOptions;
        templateOptionsWithSelectOptionsAsObservable.options = of(templateOptions.options as SelectOption[]);
        testHostComponent.fields[0].templateOptions = templateOptionsWithSelectOptionsAsObservable;
        finder.detectChanges();
        const selectOptions = await formlySelectComponent.selectOptions.toPromise();
        expect(selectOptions).toEqual(templateOptions.options as SelectOption[]);
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
            key: 'formlyInput3',
            type: VCD_FORMLY_INPUT_TYPES.select,
            templateOptions: CommonUtil.getNewObj(SELECT_TEMPLATE_OPTIONS),
        },
    ];
}

const SELECT_TEMPLATE_OPTIONS = {
    label: 'Select input',
    required: true,
    showAsterisk: true,
    options: [
        { value: '', display: '' },
        { value: 1, display: 'One', isTranslatable: false },
        { value: 2, display: 'required', isTranslatable: true },
    ],
};
