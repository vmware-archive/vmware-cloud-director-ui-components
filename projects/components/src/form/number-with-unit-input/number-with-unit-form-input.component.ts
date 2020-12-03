/*!
 * Copyright 2020 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Injectable,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormBuilder, NgControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TranslationService } from '@vcd/i18n';
import { SelectOption } from '../../common/interfaces';
import { FormValidators } from '../../form/validators';
import { Unit } from '../../utils/unit/unit';
import { UnitFormatter } from '../../utils/unit/unit-formatter';
import { BaseFormControl, defaultValidatorForControl } from '../base-form-control';

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
export class NumberWithUnitFormInputComponent extends BaseFormControl implements OnChanges, OnInit {
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

    private _unitOptions: Unit[] = [];

    /**
     * The input field element, where numbers are entered. Null if readonly.
     */
    @ViewChild('textInput', { static: false }) textInput: ElementRef;

    private get textInputEl(): HTMLInputElement {
        return this.textInput?.nativeElement as HTMLInputElement;
    }

    /** ngModel for the number input */
    textInputValue: string = null;

    /** ngModel for the unit selector */
    unitsControlValue: string = null;

    /** ngModel for the unlimited checkbox */
    unlimitedControlValue = false;

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

    // Value set to the number input of the formGroup
    private bestValue: number = null;

    // Unit set to the selected dropdown select of the formGroup
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
     * Should this functionality be provided at the base class?
     */
    private ngOnInitCalled = false;

    /**
     * Set the unit in the dropdown.
     * @param value Should be one of the value that you pass in {@link #unitOptions} to select the Unit.
     */
    set selectedUnit(value: number) {
        this.unitsControlValue = value.toString();
    }

    constructor(
        @Self() @Optional() controlDirective: NgControl,
        private fb: FormBuilder,
        private translationService: TranslationService,
        private unitFormatter: UnitFormatter,
        private changeDetector: ChangeDetectorRef
    ) {
        super(controlDirective);
    }

    ngOnInit(): void {
        this.ngOnInitCalled = true;

        defaultValidatorForControl(this.formControl, () => this.validateNumber());

        this.writeValue(this.initialValue as number);

        this.recalculateUnitMinMax();
    }

    /**
     * Fires a change event reading the value from the current state of the UI
     */
    fireUiChange(): void {
        this.onChange(this.getValue());
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.recalculateUnitMinMax();
    }

    onUnlimitedCheckboxChange(unlimitedChecked: boolean): void {
        this.unlimitedControlValue = unlimitedChecked;
        this.textInputValue = unlimitedChecked ? '' : this.lastRealValue?.toString() || '';

        if (!unlimitedChecked) {
            // Usability requirements imply the focus to be on the input element when 'unlimited checkbox' is
            // deselected in order to be easier for the user to modify the value.
            this.changeDetector.detectChanges();
            this.textInputEl.focus();
            this.textInputEl.select();
        } else {
            this.lastRealValue = this.bestValue;
        }
        this.fireUiChange();
    }

    /**
     * Called when the unit dropdown changes
     */
    onUnitChange(value: string): void {
        this.unitsControlValue = value;
        this.recalculateUnitMinMax();
        this.fireUiChange();
    }

    /**
     * Called when user types into the textfield
     */
    onTextInputChange(value: string): void {
        this.textInputValue = value;
        this.fireUiChange();
    }

    get shouldDisableNumberAndUnitControls(): true | null {
        const shouldDisable = this.unlimitedControlValue || this.disabled;
        return shouldDisable || null;
    }

    /**
     * Whether the current value is unlimited
     */
    private isUnlimitedValue(value = this.formControl.value): boolean {
        return value === this.unlimitedValue;
    }

    /**
     * Delegate the number parsing to the number input
     */
    private validateNumber(): ValidationErrors {
        if (this.isUnlimitedValue()) {
            return null;
        }
        return this.textInputEl?.validity.badInput ? { 'vcd.cc.bad.input': true } : null;
    }

    writeValue(value: number): void {
        // This gets called before ngOnInit. Store the value and we'll call it
        // again from ngOnInit so that `@Input` parameters will be set
        if (!this.ngOnInitCalled) {
            this.initialValue = value;
            return;
        }

        if (value === null) {
            if (this.showUnlimitedOption) {
                // Set Unlimited checkbox to false because the form control was reset
                this.unlimitedControlValue = false;
            }
            this.textInputValue = '';
            return;
        }

        if (this.initialValueUnit) {
            this.bestUnit = this.initialValueUnit;
            this.bestValue = value ? this.inputValueUnit.getOutputValue(value, this.bestUnit) : null;
            // So that defaulting the best unit only happens once
            this.initialValueUnit = null;
        } else {
            this.computeBestUnitAndValue(value as number);
        }

        if (this.showUnlimitedOption) {
            this.unlimitedControlValue = this.isUnlimitedValue(value);
        }

        if (!this.isUnlimitedValue(value)) {
            this.lastRealValue = this.bestValue;
            this.textInputValue = this.bestValue.toString();
            this.unitsControlValue = this.bestUnit.getMultiplier().toString();
        } else {
            this.textInputValue = '';
        }
    }

    private computeBestUnitAndValue(value: number): void {
        // Nothing to do when setting to unlimited
        if (this.isUnlimitedValue(value)) {
            return;
        }
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

    /**
     * Figures out the control value accessor's value based on the UI state
     */
    private getValue(): number {
        if (this.unlimitedControlValue) {
            return this.unlimitedValue;
        }

        const value = this.textInputValue;

        if (value === '') {
            return null;
        }

        if (this.unitOptions.length) {
            return this.getSelectedUnit().getOutputValue(value, this.inputValueUnit);
        }
        return Number(value);
    }

    /**
     * Reads the selected unit from the UI
     */
    private getSelectedUnit(): Unit {
        const value = Number(this.unitsControlValue);
        const selectedComboUnit = this.getSelectedComboUnit(value);
        return this.comboOptionUnitMap.get(selectedComboUnit);
    }

    /**
     * Returns the SelectOption for the given value
     * @param value The value which we're trying to match within the component's combo options
     */
    private getSelectedComboUnit(value: number): SelectOption {
        return this.comboOptions.find((co) => Number(co.value) === value);
    }

    private recalculateUnitMinMax(): void {
        const selectedUnit = this.getSelectedUnit();
        if (!this.inputValueUnit || !selectedUnit) {
            [this.unitMin, this.unitMax] = [this.min, this.max];
            return;
        }
        this.unitMin = this.inputValueUnit.getOutputValue(this.min, selectedUnit);
        this.unitMax = this.inputValueUnit.getOutputValue(this.max, selectedUnit);
    }

    get displayValue(): string {
        if (this.unlimitedControlValue) {
            return this.translationService.translate('vcd.cc.unlimited');
        }

        const value = Number(this.textInputValue);

        if (!value) {
            return '';
        }

        if (this.unitOptions.length > 1) {
            // Return the value and the selected unit.
            const unitValue = Number(this.unitsControlValue);

            const displayComboUnit = this.comboOptions.find(
                // tslint:disable-next-line:triple-equals
                (co) => co.value == unitValue
            );
            const inputUnit: Unit = this.comboOptionUnitMap.get(displayComboUnit);
            return this.unitFormatter.bestFormat(value, inputUnit, this.unitOptions);
        }

        if (this.unitOptions.length === 1) {
            // Return the value and the predefined unit. For example, 100 %.
            return this.unitFormatter.bestFormat(value, this.unitOptions[0], this.unitOptions);
        }

        if (this.isReadOnly) {
            const displayComboUnit = this.comboOptions.find(
                (co) => Number(co.value) === Number(this.unitsControlValue)
            );
            const displayUnit = this.comboOptionUnitMap.get(displayComboUnit);
            if (displayUnit) {
                return this.unitFormatter.bestFormat(value, displayUnit, this.unitOptions);
            }
        }
        // Return only the value when unitOptions was not set.
        return value.toString();
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
            return this.errorLabels.reduce((acc, cur) => ({ ...acc, [cur]: true }), {});
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
