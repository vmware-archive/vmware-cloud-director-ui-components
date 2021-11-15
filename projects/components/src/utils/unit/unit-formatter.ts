/*!
 * Copyright 2020-2021 VMware, Inc.
 * SPDX-License-Identifier: BSD-2-Clause
 */

import { Injectable } from '@angular/core';
import { TranslationService } from '@vcd/i18n';
import { CommonUtil } from '../common-util';
import { Unit } from './unit';

/**
 * UnitFormatter represents provided value and unit into a localized string.
 */
@Injectable()
export class UnitFormatter {
    constructor(private translationService: TranslationService) {}

    /**
     * Converts the provided value in input units to a value in the output units.
     * Example: format(1000, Unit.MB, Unit.GB, 2) = "1 GB"
     *
     * @param value - value of inputUnit
     * @param inputUnit - unit of value
     * @param outputUnit - unit to which value is converted
     * @param precision - how many digits are shown after decimal
     *
     * @returns localized string in format `${value} ${outputUnit.unitName}`
     */
    format(value: number, inputUnit: Unit, outputUnit: Unit, precision?: number): string {
        // TODO response from getOutputValue() needs to be formatted to a localized number
        const outputValue = inputUnit.getOutputValue(value, outputUnit);

        return this.translationService.translate(outputUnit.getValueWithUnitTranslationKey(), [
            CommonUtil.roundTo(outputValue, precision),
        ]);
    }

    /**
     * Converts the value of inputUnit to the best unit out of the provided available units.
     * Example: bestFormat(1000000, Unit.KB, [Unit.KB, Unit.MB, Unit.GB]) = "1 GB"
     *
     * @param value = value of inputUnit
     * @param inputUnit - unit of value
     * @param availableUnits - list of units from which best unit is calculated
     *
     * @returns localized string in format `${value} ${outputUnit.unitName}`
     */
    bestFormat(value: number, inputUnit: Unit, availableUnits: Unit[]): string {
        return this.format(value, inputUnit, inputUnit.findBestUnit(value, availableUnits));
    }
}
