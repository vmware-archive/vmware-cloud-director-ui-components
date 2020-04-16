/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Component, Directive, Input, OnDestroy, OnInit, Optional, Self, ViewChild } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NgControl,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { TranslationService } from '@vcd/i18n';
import { SelectOption } from '../../common/interfaces';
import { SubscriptionTracker, SubscriptionTrackerMixin } from '../../common/subscription';
import { Unit } from '../../utils/unit/unit';
import { UnitFormatter } from '../../utils/unit/unit-formatter';
import { BaseFormControl } from '../base-form-control';
import { FormSelectComponent } from '../form-select/form-select.component';
import { FormValidators } from '../validators';

/**
 * Directive for adding min, max inputs to {@link NumberWithUnitFormInputComponent} and also add min, max validators to
 * the list of {@link NumberWithUnitFormInputComponent.formControl} validators
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'vcd-number-with-unit-form-input[min],vcd-number-with-unit-form-input[max]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MinMaxValidator, multi: true }],
})
/* tslint:enable:directive-selector */
export class MinMaxValidator implements Validator {
    @Input() min: number;
    @Input() max: number;
    validate(control: AbstractControl): ValidationErrors | null {
        const validators: ValidatorFn[] = [];
        if (typeof this.min !== 'undefined') {
            validators.push(Validators.min(this.min));
        }
        if (typeof this.max !== 'undefined') {
            validators.push(Validators.max(this.max));
        }
        return Validators.compose(validators)(control);
    }
}

/**
 * -1 is the number to specify a value of unlimited.
 */
export const UNLIMITED = -1;

/**
 * A numerical form input component with unit selection and unlimited checkbox.
 * It doesn't take custom validation because it serve a specific use case.
 */
@Component({
    selector: 'vcd-number-with-unit-form-input',
    templateUrl: './number-with-unit-form-input.component.html',
    styleUrls: ['./number-with-unit-form-input.component.scss'],
})
export class NumberWithUnitFormInputComponent extends BaseFormControl implements OnInit, OnDestroy {
    @ViewChild('unitDropdown', { static: false }) unitDropdown: FormSelectComponent;

    tracker = new SubscriptionTracker(this);

    /**
     * Show the Unlimited checkbox
     */
    @Input() showUnlimitedOption = true;

    /**
     * List of available units
     */
    @Input()
    set unitOptions(unitOptions: Unit[]) {
        this._unitOptions = unitOptions;

        this.unitOptions.forEach(unitOption => {
            const comboOption: SelectOption = {
                display: unitOption.getUnitName(),
                value: unitOption.getMultiplier(),
            };
            this.comboOptionUnitMap.set(comboOption, unitOption);
            this.comboOptions.push(comboOption);
        });
    }

    get unitOptions(): Unit[] {
        return this._unitOptions;
    }

    /**
     * Input 'placeholder' field.
     */
    @Input() placeholder: string = null;

    /**
     * The value when the component is set to unlimited.
     */
    @Input() unlimitedValue = UNLIMITED;

    /**
     * Minimum value allowed.
     * (This is an input specified in the component attribute.)
     */
    @Input() min = UNLIMITED;

    /**
     * Maximum value allowed.
     * (This is an input specified in the component attribute.)
     */
    @Input() max = Number.MAX_SAFE_INTEGER;

    /**
     * Input 'size' field.
     */
    @Input() size: number = null;

    /**
     * Maximum number of characters (in UTF-16 code units) that the user can enter.
     */
    @Input() maxlength: number = null;

    /**
     * The direction for displaying the hint
     */
    @Input() hintPosition = 'top-left';

    /**
     * Hint to display in the content of a signpost
     */
    @Input() hint: string;

    /**
     * The unit of FormControl.value. Not required when a single {@link unitOptions} is passed in
     */
    @Input() inputValueUnit: Unit;

    public formGroup: FormGroup;

    private _unitOptions: Unit[];

    /**
     * A drop down of available units
     *
     * This list is constructed from list of
     * available units in _unitOptions
     */
    comboOptions: SelectOption[] = [];

    /**
     * Map of SelectOption and Unit which is used to
     * extract Unit for a given SelectOption.
     *
     */
    private comboOptionUnitMap: Map<SelectOption, Unit> = new Map();

    // value set to the formGroup
    private bestValue: number = null;
    // unit set to the formGroup
    private bestUnit: Unit;

    constructor(
        @Self() @Optional() controlDirective: NgControl,
        private fb: FormBuilder,
        private translationService: TranslationService,
        private unitFormattter: UnitFormatter
    ) {
        super(controlDirective);
    }

    ngOnInit(): void {
        const validator = FormValidators.isNumberInRange(this.min, this.max, 'vcd.cc.warning.numRange');
        const validatorUnlimited = FormValidators.isNumberInRange(-1, this.max, 'vcd.cc.warning.numRange');
        this.computeBestUnitAndValue(this.initialValue as number);
        if (!this.showUnlimitedOption) {
            this.formGroup = this.fb.group({
                limited: [this.bestValue, validator],
                comboUnitOptions: this.bestUnit.getMultiplier(),
            });
        } else {
            this.formGroup = this.fb.group({
                limited: [this.bestValue, validatorUnlimited],
                comboUnitOptions: this.bestUnit.getMultiplier(),
                unlimited: false,
            });
            this.tracker.subscribe(this.formGroup.get('unlimited').valueChanges, value => {
                const input = this.formGroup.get('limited');
                const comboUnitOptions = this.formGroup.get('comboUnitOptions');
                if (value) {
                    input.disable();
                    comboUnitOptions.disable();
                } else {
                    input.enable();
                    comboUnitOptions.enable();
                }
                this.onChange(this.value());
            });
        }
        this.tracker.subscribe(this.formGroup.get('comboUnitOptions').valueChanges, () => {
            this.onChange(this.value());
        });
        this.tracker.subscribe(this.formGroup.get('limited').valueChanges, () => {
            this.onChange(this.value());
        });

        if (this.disabled) {
            this.formGroup.get('comboUnitOptions').disable();
            this.formGroup.get('limited').disable();
        }
    }

    writeValue(value: number): void {
        if (!this.formGroup) {
            this.initialValue = value;
            return;
        }
        if (value === null) {
            if (this.showUnlimitedOption) {
                // Set Unlimited checkbox to false because the form control was reset
                this.formGroup.get('unlimited').setValue(false);
            }
            this.formGroup.get('limited').setValue(null);
            return;
        }
        this.computeBestUnitAndValue(value);
        this.formGroup.get('limited').setValue(this.bestValue);
        this.formGroup.get('comboUnitOptions').setValue(this.bestUnit.getMultiplier());
    }

    private computeBestUnitAndValue(value: number): void {
        if (value === null) {
            this.bestValue = null;
            this.bestUnit = this.unitOptions[0];
        } else {
            this.bestUnit = this.inputValueUnit.findBestUnit(value, this.unitOptions);
            this.bestValue = this.inputValueUnit.getOutputValue(value, this.bestUnit);
        }
    }

    private value(): number {
        if (this.formGroup.get('unlimited') && this.formGroup.get('unlimited').value) {
            return this.unlimitedValue;
        }

        const value = this.formGroup.get('limited').value;
        if (value && this.unitOptions) {
            const selectedComboUnit = this.comboOptions.find(
                // tslint:disable-next-line:triple-equals
                co => co.value == this.formGroup.get('comboUnitOptions').value
            );
            const selectedUnit = this.comboOptionUnitMap.get(selectedComboUnit);
            return selectedUnit.getOutputValue(value, this.inputValueUnit);
        }
        return value;
    }

    get displayValue(): string {
        if (this.formGroup.get('unlimited') && this.formGroup.get('unlimited').value) {
            return this.translationService.translate('unlimited');
        }

        const value = this.formGroup.get('limited').value;
        if (value) {
            if (this.unitOptions && this.unitDropdown) {
                // Return the value and the selected unit.
                const inputUnit: Unit = this.comboOptionUnitMap.get(this.unitDropdown.selectedOption);
                return this.unitFormattter.bestFormat(value, inputUnit, this.unitOptions);
            } else if (this.unitOptions && this.unitOptions.length === 1) {
                // Return the value and the predefined unit. For example, 100 %.
                return this.unitFormattter.bestFormat(value, this.unitOptions[0], this.unitOptions);
            } else if (this.isReadOnly) {
                // Return the value with best unit when #limited FormControl.value
                // is set programmatically
                const displayComboUnit = this.comboOptions.find(
                    // tslint:disable-next-line:triple-equals
                    co => co.value == this.formGroup.get('comboUnitOptions').value
                );
                const displayUnit = this.comboOptionUnitMap.get(displayComboUnit);
                return this.unitFormattter.bestFormat(value, displayUnit, this.unitOptions);
            }
            // Return only the value when unitOptions was not set.
            return value.toString();
        }
        return;
    }

    /**
     * Set the unit in the dropdown.
     * @param value Should be one of the value that you pass in {@link #unitOptions} to select the Unit.
     */
    set selectedUnit(value: number) {
        this.formGroup.get('comboUnitOptions').setValue(value);
    }

    ngOnDestroy(): void {
        this.tracker.unsubscribeAll();
    }
}
