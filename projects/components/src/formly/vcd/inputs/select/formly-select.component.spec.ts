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
    it('getters return the values set on VcdFormlyFieldConfig.templateOptions object', async () => {
        expect(formlySelectComponent.errorLabels).toEqual(['error_label1']);
        const selectOptions = await formlySelectComponent.selectOptions.toPromise();
        expect(selectOptions).toEqual(SELECT_TEMPLATE_OPTIONS.options as SelectOption[]);
    });
    it('templateOptions.options can also take an observable of SelectOption[]', async () => {
        const templateOptionsWithSelectOptionsAsObservable = { ...SELECT_TEMPLATE_OPTIONS };
        templateOptionsWithSelectOptionsAsObservable.options = of(SELECT_TEMPLATE_OPTIONS.options as SelectOption[]);
        testHostComponent.fields[0].templateOptions = templateOptionsWithSelectOptionsAsObservable;
        finder.detectChanges();
        const selectOptions = await formlySelectComponent.selectOptions.toPromise();
        expect(selectOptions).toEqual(SELECT_TEMPLATE_OPTIONS.options as SelectOption[]);
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
            templateOptions: { ...SELECT_TEMPLATE_OPTIONS },
        },
    ];
}

const SELECT_TEMPLATE_OPTIONS: VcdFormlyTemplateOptions = {
    label: 'Select input',
    required: true,
    showAsterisk: true,
    errorLabels: ['error_label1'],
    options: [
        { value: '', display: '' },
        { value: 1, display: 'One', isTranslatable: false },
        { value: 2, display: 'required', isTranslatable: true },
    ],
};
