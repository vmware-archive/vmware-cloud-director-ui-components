/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    AfterContentChecked,
    Component,
    Injectable,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslationService } from '@vcd/i18n';
import { SelectOption } from '../../common/interfaces';
import { SubscriptionTracker } from '../../common/subscription';
import { FormValidators } from '../../form/validators';
import { Unit } from '../../utils/unit/unit';
import { UnitFormatter } from '../../utils/unit/unit-formatter';
import { BaseFormControl } from '../base-form-control';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormSelectComponent } from '../form-select/form-select.component';

/**
 * -1 is the number to specify a value of unlimited.
 */
export const UNLIMITED = -1;

/**
 * A numerical form input component with unit selection and unlimited checkbox.
 *
 * If a single element array is provided for the units, then there is no unit selection
 * but rather a string notation for the unit. If the array is empty then there are no units at all.
 *
 * The display of unlimited checkbox is configurable.
 */
@Component({
    selector: 'vcd-number-with-unit-form-input',
    templateUrl: './number-with-unit-form-input.component.html',
    styleUrls: ['./number-with-unit-form-input.component.scss'],
})
export class NumberWithUnitFormInputComponent
    extends BaseFormControl
    implements OnChanges, OnInit, OnDestroy, AfterContentChecked {
    /**
     * List of available units. Consider the following options for the array:
     * # array with more than one elements
     *    - a dropdown unit selection is shown. You must also provide {@link inputValueUnit}
     * # single element array
     *    - a string notation for no dropdown, {@link inputValueUnit} is derived from the element
     * # empty array
     *    - no units at all
     */
    @Input()
    set unitOptions(unitOptions: Unit[]) {
        this._unitOptions = unitOptions || [];

        if (this._unitOptions.length === 1) {
            this.inputValueUnit = this._unitOptions[0];
        }

        this.comboOptionUnitMap.clear();
        this.comboOptions = [];
        this._unitOptions.forEach((unitOption) => {
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
     * The base unit of the component. The value of this FormControl is calculated based on this property.
     * Required when a multi element array is provided for {@link unitOptions} and it should be one of those values.
     */
    @Input() inputValueUnit: Unit;

    /**
     * The initial display unit.
     * This is useful if you want to prevent finding best match when displaying a value for the first time.
     * For example if you provide 1024 MB and you want it to be displayed as 1024MB instead of 1GB
     */
    @Input() initialValueUnit: Unit;

    /**
     * Show the Unlimited checkbox. Can be set just once only at render time.
     */
    @Input() showUnlimitedOption = true;

    /**
     * The value when the component is set to unlimited. Default is -1.
     */
    @Input() unlimitedValue: number = UNLIMITED;

    /**
     * Minimum value allowed relevant to {@link inputValueUnit}. Default is 0.
     */
    @Input() min: number = 0;

    /**
     * Maximum value allowed relevant to {@link inputValueUnit}. Default is {@link Number.MAX_SAFE_INTEGER}.
     */
    @Input() max: number = Number.MAX_SAFE_INTEGER;

    /**
     * Input 'placeholder' field.
     */
    @Input() placeholder: string = null;

    /**
     * Input 'size' field.
     */
    @Input() size: number = 10;

    /**
     * Maximum number of characters (in UTF-16 code units) that the user can enter.
     */
    @Input() maxlength: number = null;

    /**
     * Hint to display in the content of a signpost
     */
    @Input() hint: string;

    /**
     * The direction for displaying the hint
     */
    @Input() hintPosition = 'top-left';

    public formGroup: FormGroup;

    private _unitOptions: Unit[] = [];

    /**
     * A drop down of available units
     *
     * This list is constructed from list of
     * available units in {@link unitOptions}
     */
    comboOptions: SelectOption[] = [];

    /**
     * Map of SelectOption and Unit which is used to
     * extract Unit for a given SelectOption.
     */
    private comboOptionUnitMap: Map<SelectOption, Unit> = new Map();

    // value set to the number input of the formGroup
    private bestValue: number = null;

    // unit set to the selected dropdown select of the formGroup
    private bestUnit: Unit;

    /**
     * The minimum value calculated from the {@link min} value converted to the currently selected unit
     */
    unitMin: number;

    /**
     * The maximum value calculated from the {@link max} value converted to the currently selected unit
     */
    unitMax: number;

    /**
     * This is the last real value for the input. Used in case when user toggles the unlimited checkbox twice in a row.
     * When unlimited is checked the value of the input is cleared, then when toggled again, the input value should be
     * set to the last value.
     */
    lastRealValue: number = null;

    /**
     * Set the unit in the dropdown.
     * @param value Should be one of the value that you pass in {@link #unitOptions} to select the Unit.
     */
    set selectedUnit(value: number) {
        this.formGroup.get('comboUnitOptions').setValue(value);
    }

    @ViewChild('unitDropdown', { static: false }) unitDropdown: FormSelectComponent;
    @ViewChild('limitedInput', { static: false }) limitedInput: FormInputComponent;

    tracker = new SubscriptionTracker(this);

    constructor(
        @Self() @Optional() controlDirective: NgControl,
        private fb: FormBuilder,
        private translationService: TranslationService,
        private unitFormatter: UnitFormatter
    ) {
        super(controlDirective);
    }

    ngOnDestroy(): void {
        this.tracker.unsubscribeAll();
    }

    ngOnInit(): void {
        // Calculate the best unit and value. Take into account if initial unit is provided.
        if (this.initialValueUnit) {
            this.bestUnit = this.initialValueUnit;
            this.bestValue = this.initialValue
                ? this.inputValueUnit.getOutputValue(this.initialValue, this.bestUnit)
                : null;
        } else {
            this.computeBestUnitAndValue(this.initialValue as number);
        }

        // Build the form group based on the best unit and value, considering also if unlimited is enabled
        if (!this.showUnlimitedOption) {
            this.formGroup = this.fb.group({
                limited: [this.bestValue === this.unlimitedValue ? null : this.bestValue],
                comboUnitOptions: this.bestUnit.getMultiplier(),
            });
        } else {
            this.formGroup = this.fb.group({
                limited: [this.bestValue === this.unlimitedValue ? null : this.bestValue],
                comboUnitOptions: [this.bestUnit.getMultiplier()],
                unlimited: this.bestValue === this.unlimitedValue,
            });
            // Remember the value in case the control value is programmatically set to unlimited
            if (this.bestValue !== this.unlimitedValue) {
                this.lastRealValue = this.bestValue;
            }
            this.tracker.subscribe(this.formGroup.get('unlimited').valueChanges, (unlimitedChecked) => {
                const input = this.formGroup.get('limited');
                if (unlimitedChecked) {
                    // When going to unlimited remember the value of the input before clearing it
                    this.lastRealValue = input.value;
                    input.setValue(null);
                } else {
                    input.setValue(this.lastRealValue);
                }
                this.updateUnlimitedDisabledState();
            });
        }
        this.tracker.subscribe(this.formGroup.get('comboUnitOptions').valueChanges, () => {
            // Mark the input as dirty since if it was not touched no error will be displayed even if there are some
            this.recalculateUnitMinMax();
            this.onChange(this.getValue());
        });
        this.tracker.subscribe(this.formGroup.get('limited').valueChanges, () => {
            this.onChange(this.getValue());
        });
        this.recalculateUnitMinMax();
        this.updateUnlimitedDisabledState();
        // This code should be here since the formGroup has been created in the ngOnInit. If the disabled()
        // call has been done in a constructor this component would not have been initialized
        if (this.disabled) {
            this.updateDisabledState(true, true);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.recalculateUnitMinMax();
    }

    ngAfterContentChecked(): void {
        if (!this.limitedInput) {
            return;
        }
        Object.defineProperty(this.limitedInput, 'showErrors', {
            get: this.limitedInputShowErrors,
        });
    }

    limitedInputShowErrors = () => {
        return this.showErrors && this.errors ? {} : null;
    };

    writeValue(value: number): void {
        if (!this.formGroup) {
            this.initialValue = value;
            return;
        }
        const input = this.formGroup.get('limited');
        if (value === null) {
            if (this.showUnlimitedOption) {
                // Set Unlimited checkbox to false because the form control was reset
                this.formGroup.get('unlimited').setValue(false);
            }
            input.setValue(null);
            this.updateUnlimitedDisabledState();
            return;
        }

        if (this.showUnlimitedOption) {
            if (value !== this.unlimitedValue) {
                this.computeBestUnitAndValue(value);
                this.lastRealValue = this.bestValue;
                input.setValue(this.bestValue);
                this.selectedUnit = this.bestUnit.getMultiplier();
            }
            this.formGroup.get('unlimited').setValue(value === this.unlimitedValue);
        } else {
            this.computeBestUnitAndValue(value);
            this.lastRealValue = this.bestValue;
            input.setValue(this.bestValue);
            this.selectedUnit = this.bestUnit.getMultiplier();
        }

        this.updateUnlimitedDisabledState();
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.updateDisabledState(isDisabled, true);
    }

    private updateUnlimitedDisabledState(): void {
        if (!this.showUnlimitedOption || this.disabled) {
            return;
        }
        this.updateDisabledState(this.formGroup?.get('unlimited')?.value, false);
    }

    updateDisabledState(isDisabled: boolean, updateUnlimitedCheckbox: boolean): void {
        if (this.formGroup) {
            // Do not emit when changing the disable state
            if (isDisabled) {
                this.formGroup.get('comboUnitOptions').disable({ emitEvent: false });
                this.formGroup.get('limited').disable({ emitEvent: false });
                if (updateUnlimitedCheckbox) {
                    this.formGroup.get('unlimited')?.disable({ emitEvent: false });
                }
            } else {
                this.formGroup.get('comboUnitOptions').enable({ emitEvent: false });
                this.formGroup.get('limited').enable({ emitEvent: false });
                if (updateUnlimitedCheckbox) {
                    this.formGroup.get('unlimited')?.enable({ emitEvent: false });
                }
            }
        }
    }

    private computeBestUnitAndValue(value: number): void {
        if (this.unitOptions.length === 0) {
            this.bestValue = value;
            this.bestUnit = NoUnit.INSTANCE;
        } else if (value === null) {
            this.bestValue = null;
            this.bestUnit = this.unitOptions[0];
        } else {
            this.bestUnit = this.inputValueUnit.findBestUnit(value, this.unitOptions);
            this.bestValue = this.inputValueUnit.getOutputValue(value, this.bestUnit);
        }
    }

    private getValue(): number {
        if (this.formGroup.get('unlimited')?.value) {
            return this.unlimitedValue;
        }

        const value = this.formGroup.get('limited').value;
        if (value && this.unitOptions.length) {
            return this.getSelectedUnit().getOutputValue(value, this.inputValueUnit);
        }
        return value;
    }

    private getSelectedUnit(): Unit {
        const value = this.formGroup.get('comboUnitOptions').value;
        const selectedComboUnit = this.comboOptions.find(
            // tslint:disable-next-line:triple-equals
            (co) => co.value == value
        );
        const selectedUnit = this.comboOptionUnitMap.get(selectedComboUnit);
        return selectedUnit;
    }

    private recalculateUnitMinMax(): void {
        if (!this.formGroup) {
            return;
        }
        const selectedUnit = this.getSelectedUnit();
        this.unitMin = selectedUnit ? this.inputValueUnit.getOutputValue(this.min, selectedUnit) : this.min;
        this.unitMax = selectedUnit ? this.inputValueUnit.getOutputValue(this.max, selectedUnit) : this.max;
    }

    get displayValue(): string {
        if (this.formGroup.get('unlimited') && this.formGroup.get('unlimited').value) {
            return this.translationService.translate('vcd.cc.unlimited');
        }

        const value = this.formGroup.get('limited').value;
        if (value) {
            if (this.unitDropdown) {
                // Return the value and the selected unit.
                const inputUnit: Unit = this.comboOptionUnitMap.get(this.unitDropdown.selectedOption);
                return this.unitFormatter.bestFormat(value, inputUnit, this.unitOptions);
            } else if (this.unitOptions.length === 1) {
                // Return the value and the predefined unit. For example, 100 %.
                return this.unitFormatter.bestFormat(value, this.unitOptions[0], this.unitOptions);
            } else if (this.isReadOnly) {
                // Return the value with best unit when #limited FormControl.value
                // is set programmatically

                const displayComboUnit = this.comboOptions.find(
                    // tslint:disable-next-line:triple-equals
                    (co) => co.value == this.formGroup.get('comboUnitOptions').value
                );
                const displayUnit = this.comboOptionUnitMap.get(displayComboUnit);
                if (displayUnit) {
                    return this.unitFormatter.bestFormat(value, displayUnit, this.unitOptions);
                }
            }
            // Return only the value when unitOptions was not set.
            return value.toString();
        }
        return;
    }

    /**
     * Up to now (when this function has been introduced) all our form errors were in the form
     * `{ [key]: true }` which made it quite impossible to add custom parameters for translation.
     *  `errorLabels` are a perfect example for this use case
     *
     * Now the errors are in format `{ [key]: any }` where any can be either an array [] for positional
     * based message format or `{msgKey: string}` for a named message format.
     *
     * For `errorLabels` we
     *
     */
    get errors(): ValidationErrors {
        if (this.errorLabels.length) {
            return this.errorLabels.reduce(
                (acc, cur) => ({
                    ...acc,
                    [cur]: true,
                }),
                {}
            );
        }
        return this.formControl.errors;
    }

    getErrorTranslationParams(errorObjectValue: any): any {
        // `errorObjectValue === true` is the 'old' case see comments for `errors`
        if (!errorObjectValue || errorObjectValue === true) {
            return [this.getValue(), this.min.toString(), this.max.toString()];
        }
        return errorObjectValue;
    }
}

@Injectable({
    providedIn: 'root',
})
export class NumberWithUnitsFormValidatorsFactory {
    constructor(private unitFormatter: UnitFormatter) {}

    public isInRange(min: number, max: number, inputUnit: Unit, availableUnits: Unit[], unlimited = -1): ValidatorFn {
        const res = FormValidators.createNullSafeValidator((control: any) => {
            const value = control.value;

            const isNumber = !isNaN(Number(control.value)) && isFinite(control.value);

            if (isNumber) {
                if (value >= min && value <= max) {
                    return null;
                }
                if (unlimited !== null && value === unlimited) {
                    return null;
                }
            }

            if (inputUnit && availableUnits && availableUnits.length) {
                const minString = this.unitFormatter.bestFormat(min, inputUnit, availableUnits);
                const maxString = this.unitFormatter.bestFormat(max, inputUnit, availableUnits);
                return { 'vcd.cc.warning.numRange': [value, minString, maxString] };
            }
            return { 'vcd.cc.warning.numRange': [value, min, max] };
        });
        return res;
    }
}

class NoUnit extends Unit {
    public static readonly INSTANCE = new NoUnit(1, '');
    findBestUnit(value: number, availableUnits: Unit[]): Unit {
        return NoUnit.INSTANCE;
    }

    getUnitNameTranslationKey(): string {
        return '';
    }

    getValueWithUnitTranslationKey(): string {
        return '{0}';
    }
}
